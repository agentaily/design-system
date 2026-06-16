import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../src/runtime/index.js";

/* ThemeProvider has no rendered UI — its contract is a side effect: resolve the
   theme (light | dark, resolving `system` via matchMedia) and apply it to <html>,
   persisting the user's choice. jsdom has no matchMedia, so the system path is
   stubbed per-test. Ported from @agentaily/web-kit. */

function clearCookies() {
  for (const entry of document.cookie ? document.cookie.split(";") : []) {
    const name = entry.split("=")[0].trim();
    if (name) document.cookie = `${name}=; path=/; max-age=0`;
  }
}

function stubMatchMedia(matches) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

beforeEach(() => {
  window.localStorage.clear();
  clearCookies();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-mode");
});

afterEach(() => {
  delete window.matchMedia;
  vi.restoreAllMocks();
});

function Controls() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme("dark")}>set-dark</button>
      <button onClick={() => setTheme("light")}>set-light</button>
    </div>
  );
}

describe("useTheme", () => {
  it("throws when used outside a <ThemeProvider>", () => {
    function Bare() {
      useTheme();
      return null;
    }
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Bare />)).toThrow(/ThemeProvider/);
    spy.mockRestore();
  });
});

describe("ThemeProvider — applies resolved theme to <html>", () => {
  it("applies an explicit light theme", () => {
    render(
      <ThemeProvider defaultTheme="light">
        <Controls />
      </ThemeProvider>,
    );
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("resolves `system` to dark via matchMedia", () => {
    stubMatchMedia(true);
    const { getByTestId } = render(
      <ThemeProvider defaultTheme="system">
        <Controls />
      </ThemeProvider>,
    );
    expect(getByTestId("theme").textContent).toBe("system");
    expect(getByTestId("resolved").textContent).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("honors a custom attribute name", () => {
    render(
      <ThemeProvider defaultTheme="light" attribute="data-mode">
        <Controls />
      </ThemeProvider>,
    );
    expect(document.documentElement.getAttribute("data-mode")).toBe("light");
  });

  it("setTheme updates the attribute and persists across remounts", () => {
    const { getByText, unmount } = render(
      <ThemeProvider defaultTheme="light">
        <Controls />
      </ThemeProvider>,
    );
    fireEvent.click(getByText("set-dark"));
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(window.localStorage.getItem("agentaily:theme")).toBe("dark");

    unmount();
    document.documentElement.removeAttribute("data-theme");

    // A fresh provider reads the persisted choice, not its own default.
    render(
      <ThemeProvider defaultTheme="light">
        <Controls />
      </ThemeProvider>,
    );
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
