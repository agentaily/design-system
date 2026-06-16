import { describe, it, expect, beforeEach, vi } from "vitest";
import { createStorage, persistentState } from "../src/runtime/index.js";

/* The persistence layer (createStorage + persistentState) is pure logic with a
   security-adjacent contract: it must NEVER throw (SSR, private mode, disabled
   storage all degrade silently to a default / in-memory) and must apply keyPrefix
   consistently. jsdom here runs as http://localhost, so the cross-subdomain
   `.agentaily.com` cookie path is inert (host mismatch) and `auto` resolves to
   localStorage (installed by tests/setup.js). Ported from @agentaily/web-kit. */

/** A minimal in-memory PreferenceStorage to drive persistentState in isolation. */
function fakeStore() {
  const m = new Map();
  return {
    get: (k) => (m.has(k) ? m.get(k) : null),
    set: (k, v) => m.set(k, v),
    remove: (k) => m.delete(k),
    _raw: m,
  };
}

function clearCookies() {
  for (const entry of document.cookie ? document.cookie.split(";") : []) {
    const name = entry.split("=")[0].trim();
    if (name) document.cookie = `${name}=; path=/; max-age=0`;
  }
}

beforeEach(() => {
  window.localStorage.clear();
  clearCookies();
  vi.restoreAllMocks();
});

describe("persistentState — typed value with default", () => {
  it("returns the default when nothing is stored", () => {
    const ps = persistentState({ key: "k", defaultValue: "fallback", storage: fakeStore() });
    expect(ps.get()).toBe("fallback");
  });

  it("round-trips a set value", () => {
    const ps = persistentState({ key: "k", defaultValue: "x", storage: fakeStore() });
    ps.set("y");
    expect(ps.get()).toBe("y");
  });

  it("falls back to default when decode rejects an unknown stored value", () => {
    const store = fakeStore();
    store.set("k", "bogus");
    const ps = persistentState({
      key: "k",
      defaultValue: "a",
      storage: store,
      decode: (raw) => (["a", "b"].includes(raw) ? raw : undefined),
    });
    expect(ps.get()).toBe("a"); // bogus → undefined → default
    store.set("k", "b");
    expect(ps.get()).toBe("b");
  });

  it("applies encode/decode round-trip for non-string values", () => {
    const store = fakeStore();
    const ps = persistentState({
      key: "n",
      defaultValue: 0,
      storage: store,
      encode: (v) => `#${v}`,
      decode: (raw) => Number(raw.replace(/^#/, "")),
    });
    ps.set(5);
    expect(store._raw.get("n")).toBe("#5"); // stored encoded
    expect(ps.get()).toBe(5); // read decoded
  });

  it("remove() reverts to the default", () => {
    const store = fakeStore();
    const ps = persistentState({ key: "k", defaultValue: "d", storage: store });
    ps.set("v");
    ps.remove();
    expect(ps.get()).toBe("d");
  });
});

describe("createStorage — backend resolution + keyPrefix", () => {
  it("auto round-trips and applies the default keyPrefix (localStorage on localhost)", () => {
    const s = createStorage();
    s.set("foo", "bar");
    expect(s.get("foo")).toBe("bar");
    expect(window.localStorage.getItem("agentaily:foo")).toBe("bar");
  });

  it("honors a custom keyPrefix", () => {
    const s = createStorage({ keyPrefix: "p:" });
    s.set("k", "v");
    expect(window.localStorage.getItem("p:k")).toBe("v");
    s.remove("k");
    expect(s.get("k")).toBeNull();
  });

  it("backend:'cookie' round-trips via document.cookie (domain-less on localhost)", () => {
    const s = createStorage({ backend: "cookie", keyPrefix: "c:" });
    s.set("k", "v");
    expect(s.get("k")).toBe("v");
    expect(document.cookie).toContain("c%3Ak="); // encodeURIComponent("c:k")
  });

  it("never throws and degrades to in-memory when localStorage is unavailable", () => {
    vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
      throw new Error("storage disabled");
    });
    const s = createStorage({ backend: "local", keyPrefix: "g:" });
    expect(() => s.set("k", "v")).not.toThrow();
    expect(s.get("k")).toBe("v"); // memory fallback still round-trips for the session
  });
});
