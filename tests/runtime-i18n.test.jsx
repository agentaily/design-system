import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { createI18n } from "../src/runtime/index.js";

/* createI18n is a factory: the mechanism is shared, products inject catalogs. Its
   contract is locale resolution (persisted → navigator.language → fallback),
   reactive message lookup, and applying <html lang>. jsdom's navigator.language
   is "en-US" by default. Ported from @agentaily/web-kit. */

const catalogs = { en: { hello: "Hello" }, zh: { hello: "你好" } };

function clearCookies() {
  for (const entry of document.cookie ? document.cookie.split(";") : []) {
    const name = entry.split("=")[0].trim();
    if (name) document.cookie = `${name}=; path=/; max-age=0`;
  }
}

/** Override navigator.language (jsdom defines it on the prototype as a getter).
 * Returns a restore fn that reverts to the real value. */
function setNavLang(value) {
  const own = Object.getOwnPropertyDescriptor(navigator, "language");
  Object.defineProperty(navigator, "language", { configurable: true, get: () => value });
  return () => {
    if (own) Object.defineProperty(navigator, "language", own);
    else delete navigator.language;
  };
}

function makeConsumer(i18n) {
  return function Consumer() {
    const { locale, setLocale, locales } = i18n.useLocale();
    const msgs = i18n.useMessages();
    return (
      <div>
        <span data-testid="locale">{locale}</span>
        <span data-testid="msg">{msgs.hello}</span>
        <span data-testid="locales">{locales.join(",")}</span>
        <button onClick={() => setLocale("zh")}>to-zh</button>
      </div>
    );
  };
}

beforeEach(() => {
  window.localStorage.clear();
  clearCookies();
  document.documentElement.removeAttribute("lang");
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("createI18n — locale resolution + messages", () => {
  it("detects the default locale from navigator.language (en-US → en)", () => {
    const i18n = createI18n({ catalogs, defaultLocale: "en" });
    const Consumer = makeConsumer(i18n);
    const { getByTestId } = render(
      <i18n.LocaleProvider>
        <Consumer />
      </i18n.LocaleProvider>,
    );
    expect(getByTestId("locale").textContent).toBe("en");
    expect(getByTestId("msg").textContent).toBe("Hello");
    expect(getByTestId("locales").textContent).toBe("en,zh");
    expect(document.documentElement.getAttribute("lang")).toBe("en");
  });

  it("setLocale switches messages, applies <html lang>, and persists across remounts", () => {
    const i18n = createI18n({ catalogs, defaultLocale: "en" });
    const Consumer = makeConsumer(i18n);
    const { getByText, getByTestId, unmount } = render(
      <i18n.LocaleProvider>
        <Consumer />
      </i18n.LocaleProvider>,
    );
    fireEvent.click(getByText("to-zh"));
    expect(getByTestId("msg").textContent).toBe("你好");
    expect(document.documentElement.getAttribute("lang")).toBe("zh");
    expect(window.localStorage.getItem("agentaily:locale")).toBe("zh");

    unmount();
    // Fresh mount reads the persisted locale over navigator detection.
    const { getByTestId: get2 } = render(
      <i18n.LocaleProvider>
        <Consumer />
      </i18n.LocaleProvider>,
    );
    expect(get2("locale").textContent).toBe("zh");
  });

  it("falls back to the provider's defaultLocale when navigator does not match", () => {
    const restore = setNavLang("fr-FR");
    try {
      const i18n = createI18n({ catalogs, defaultLocale: "en" });
      const Consumer = makeConsumer(i18n);
      const { getByTestId } = render(
        <i18n.LocaleProvider defaultLocale="zh">
          <Consumer />
        </i18n.LocaleProvider>,
      );
      expect(getByTestId("locale").textContent).toBe("zh");
    } finally {
      restore();
    }
  });

  it("does not apply <html lang> when setHtmlLang is false", () => {
    const i18n = createI18n({ catalogs, defaultLocale: "en", setHtmlLang: false });
    const Consumer = makeConsumer(i18n);
    render(
      <i18n.LocaleProvider>
        <Consumer />
      </i18n.LocaleProvider>,
    );
    expect(document.documentElement.getAttribute("lang")).toBeNull();
  });
});

describe("useLocale / useMessages", () => {
  it("throw when used outside a <LocaleProvider>", () => {
    const i18n = createI18n({ catalogs, defaultLocale: "en" });
    function Bare() {
      i18n.useMessages();
      return null;
    }
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Bare />)).toThrow(/LocaleProvider/);
    spy.mockRestore();
  });
});
