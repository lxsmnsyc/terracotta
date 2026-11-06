import { isServer } from '@solidjs/web';
import { createUniqueId, onSettled, createSignal } from 'solid-js';

function createPartID() {
  const generated = createUniqueId();
  if (isServer) return {
    id: () => generated,
    register() {
      onSettled(() => void 0);
    }
  };
  const [source, setSource] = createSignal();
  return {
    id: () => {
      var _a, _b;
      return (_b = (_a = source()) == null ? void 0 : _a()) != null ? _b : generated;
    },
    register(id) {
      onSettled(() => {
        setSource(() => id);
        return () => {
          setSource(void 0);
        };
      });
    }
  };
}

export { createPartID as c };
//# sourceMappingURL=create-part-id-C9i7Veuh-CM2qScam.mjs.map
