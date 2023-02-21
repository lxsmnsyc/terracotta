import {
  createContext,
  JSX,
  Resource,
  useContext,
} from 'solid-js';
import { SWRStore, createSWRStore } from 'swr-store';
import { useSWRStore, UseSWRStoreOptions } from 'solid-swr-store';
import {
  LoadResult,
  useRouter,
} from '../router';

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
    () => [path(), router.search],
    options,
  );
  return result as Resource<LoadResult<T>>;
}
