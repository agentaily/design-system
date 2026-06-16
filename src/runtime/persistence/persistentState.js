/**
 * Bind a single key in a PreferenceStorage to a typed value with a default.
 * Reads that miss (or decode to `undefined`) yield the default — so SSR, private
 * mode, and unknown stored values all degrade to the default without throwing.
 */
export function persistentState(options) {
  const { key, defaultValue, storage } = options;
  const encode = options.encode ?? ((value) => String(value));
  const decode = options.decode ?? ((raw) => raw);
  return {
    get: () => {
      const raw = storage.get(key);
      if (raw === null) return defaultValue;
      const decoded = decode(raw);
      return decoded === undefined ? defaultValue : decoded;
    },
    set: (value) => storage.set(key, encode(value)),
    remove: () => storage.remove(key),
  };
}
