import {
  createContext,
  createEffect,
  createResource,
  createSignal,
  JSX,
  onCleanup,
  Resource,
  useContext,
} from 'solid-js';
import { SWRStore, createSWRStore, MutationResult } from 'swr-store';
import { UseSWRStoreOptions } from 'solid-swr-store';
import {
  LoadResult,
  useRouter,
} from '../router';
import assert from '../assert';

function useSWRStoreSuspenseless<T, P extends any[] = []>(
  store: SWRStore<T, P>,
  args: () => P,
  options: UseSWRStoreOptions<T>,
): () => MutationResult<T> {
  const [result, setResult] = createSignal(store.get(args(), {
    shouldRevalidate: options.shouldRevalidate,
    initialData: options.initialData,
    hydrate: options.hydrate,
  }));

  createEffect(() => {
    const currentArgs = args();
    onCleanup(store.subscribe(currentArgs, () => {
      setResult(() => store.get(currentArgs, {
        shouldRevalidate: false,
      }));
    }));
  });

  return result;
}

function useSWRStore<T, P extends any[] = []>(
  store: SWRStore<T, P>,
  args: () => P,
  options: UseSWRStoreOptions<T>,
): Resource<T | undefined> {
  const suspenseless = useSWRStoreSuspenseless(store, args, options);
  const [resource] = createResource(
    suspenseless,
    async (result): Promise<T> => {
      assert(result.status !== 'failure', result.data);
      const dat = await result.data;
      return dat;
    },
    options ? {
      initialValue: options.initialData,
      ssrLoadFrom: 'initial',
    } : {},
  );
  return resource as Resource<T | undefined>;
}

const CacheContext = createContext<SWRStore<any, string[]>>();

interface CacheProps {
  children: JSX.Element;
}

export function CacheBoundary(props: CacheProps) {
  const store = createSWRStore<LoadResult<any>, string[]>({
    key: (pathname, search) => `${pathname}?${search}`,
    get: async (pathname, search) => {
      const params = new URLSearchParams(search);
      params.set('.get', '');
      const response = await fetch(`${pathname}?${params.toString()}`);
      const result = (await response.json()) as LoadResult<any>;
      return result;
    },
    revalidateOnFocus: true,
    revalidateOnNetwork: true,
  });

  return (
    <CacheContext.Provider value={store}>
      {props.children}
    </CacheContext.Provider>
  );
}

export function useCache<T>(
  path: () => string,
  options: UseSWRStoreOptions<LoadResult<T>>,
): Resource<LoadResult<T>> {
  const ctx = useContext(CacheContext)!;
  const router = useRouter();
  const result = useSWRStore(
    ctx,
    () => [path(), new URLSearchParams(router.search).toString()],
    options,
  );
  return result as Resource<LoadResult<T>>;
}
