import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isBrowser } from "../internal/env.js";
import { createStorage } from "../persistence/createStorage.js";
import { persistentState } from "../persistence/persistentState.js";

const LOCALE_KEY = "locale";

/** Resolve the initial locale: persisted → navigator.language → fallback. */
function detectLocale(stored, locales, fallback) {
  if (stored && locales.includes(stored)) return stored;
  if (isBrowser() && typeof navigator !== "undefined" && navigator.language) {
    const nav = navigator.language.toLowerCase();
    for (const locale of locales) {
      if (locale.toLowerCase() === nav) return locale;
    }
    const primary = nav.split("-")[0] ?? nav;
    for (const locale of locales) {
      if (locale.toLowerCase() === primary) return locale;
    }
  }
  return fallback;
}

/**
 * Factory: the i18n *mechanism* is shared; each product injects its own catalogs.
 * Returns a `LocaleProvider` plus `useLocale` / `useMessages` hooks bound to the
 * catalog's types (compile-time safety — `useMessages()` matches the catalog shape).
 */
export function createI18n(config) {
  const locales = Object.keys(config.catalogs);
  const applyHtmlLang = config.setHtmlLang ?? true;
  const Context = createContext(null);

  function LocaleProvider({ children, defaultLocale }) {
    const state = useMemo(
      () =>
        persistentState({
          key: LOCALE_KEY,
          defaultValue: null,
          storage: createStorage(config.storage),
          decode: (raw) => (locales.includes(raw) ? raw : undefined),
          encode: (value) => String(value),
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    const [locale, setLocaleState] = useState(() =>
      detectLocale(state.get(), locales, defaultLocale ?? config.defaultLocale),
    );

    useEffect(() => {
      if (applyHtmlLang && isBrowser()) document.documentElement.setAttribute("lang", locale);
    }, [locale]);

    const setLocale = useCallback(
      (next) => {
        setLocaleState(next);
        state.set(next);
      },
      [state],
    );

    const messages = config.catalogs[locale];

    const value = useMemo(
      () => ({ locale, setLocale, locales, messages }),
      [locale, setLocale, messages],
    );

    return createElement(Context.Provider, { value }, children);
  }

  function useLocaleContext() {
    const ctx = useContext(Context);
    if (ctx === null) {
      throw new Error("useLocale / useMessages must be used within a <LocaleProvider>");
    }
    return ctx;
  }

  return {
    LocaleProvider,
    useLocale: () => {
      const { locale, setLocale, locales: available } = useLocaleContext();
      return { locale, setLocale, locales: available };
    },
    useMessages: () => useLocaleContext().messages,
  };
}
