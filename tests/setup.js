// Adds jest-dom matchers (toBeInTheDocument, toHaveAttribute, toHaveClass, …)
// to vitest's expect, and registers @testing-library/react's automatic DOM
// cleanup between tests (via the global afterEach that `globals: true` provides).
import "@testing-library/jest-dom/vitest";

// vitest's jsdom environment does not expose a working `window.localStorage`
// (the property reads as undefined). Real browsers have it, so install a minimal
// in-memory Storage to model "a browser that has localStorage" — the runtime's
// persistence layer (src/runtime/persistence) needs it to exercise the `local`
// backend. Tests that simulate private mode / disabled storage spy on these
// methods to throw. Harmless to existing component tests (they don't touch it).
if (typeof window !== "undefined" && !window.localStorage) {
  class MemoryStorage {
    #store = new Map();
    get length() {
      return this.#store.size;
    }
    clear() {
      this.#store.clear();
    }
    getItem(key) {
      return this.#store.has(key) ? this.#store.get(key) : null;
    }
    setItem(key, value) {
      this.#store.set(key, String(value));
    }
    removeItem(key) {
      this.#store.delete(key);
    }
    key(index) {
      return Array.from(this.#store.keys())[index] ?? null;
    }
  }
  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: new MemoryStorage(),
  });
}
