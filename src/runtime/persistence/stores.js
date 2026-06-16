/** localStorage-backed store. Accessing window.localStorage can itself throw in
 * Safari private mode — callers wrap this in `guard` / `probe`. */
export function localStore() {
  return {
    get: (key) => window.localStorage.getItem(key),
    set: (key, value) => window.localStorage.setItem(key, value),
    remove: (key) => window.localStorage.removeItem(key),
  };
}

/** In-memory fallback (private mode). Per-instance — values live for the session,
 * never persisted, never shared across requests on the server. */
export function memoryStore() {
  const map = new Map();
  return {
    get: (key) => (map.has(key) ? map.get(key) : null),
    set: (key, value) => {
      map.set(key, value);
    },
    remove: (key) => {
      map.delete(key);
    },
  };
}

/** No-op store for SSR / no-document: reads return null (consumer uses default). */
export const nullStore = {
  get: () => null,
  set: () => {},
  remove: () => {},
};

/** Wrap a store so no operation ever throws (private mode / quota / disabled). */
export function guard(store) {
  return {
    get: (key) => {
      try {
        return store.get(key);
      } catch {
        return null;
      }
    },
    set: (key, value) => {
      try {
        store.set(key, value);
      } catch {
        /* swallow — degrade silently */
      }
    },
    remove: (key) => {
      try {
        store.remove(key);
      } catch {
        /* swallow */
      }
    },
  };
}

/** True when a store can round-trip a probe value (write → read → clean up). */
export function probe(store) {
  const probeKey = "__web_kit_probe__";
  try {
    store.set(probeKey, "1");
    const ok = store.get(probeKey) === "1";
    store.remove(probeKey);
    return ok;
  } catch {
    return false;
  }
}
