import type { StorageConfig } from "../persistence/types";

export interface CreateI18nConfig<TCatalogs extends Record<string, unknown>> {
  /** Per-product message catalogs, keyed by locale. The mechanism is shared;
   * the catalogs are injected by each product. */
  catalogs: TCatalogs;
  /** Fallback locale when nothing is persisted and detection fails. */
  defaultLocale: keyof TCatalogs & string;
  /** Persistence configuration (shared cross-subdomain cookie by default). */
  storage?: StorageConfig;
  /** Apply `<html lang>` on locale change. Default `true`. */
  setHtmlLang?: boolean;
}

export interface LocaleContextValue<TLocale extends string, TMessages> {
  locale: TLocale;
  setLocale(locale: TLocale): void;
  locales: TLocale[];
  messages: TMessages;
}

export interface LocaleProviderProps<TLocale extends string> {
  children: React.ReactNode;
  /** Override the fallback locale for this subtree. */
  defaultLocale?: TLocale;
}

export interface I18nApi<TCatalogs extends Record<string, unknown>> {
  LocaleProvider: (props: LocaleProviderProps<keyof TCatalogs & string>) => React.ReactElement;
  useLocale: () => {
    locale: keyof TCatalogs & string;
    setLocale: (locale: keyof TCatalogs & string) => void;
    locales: (keyof TCatalogs & string)[];
  };
  /** Messages for the active locale, typed to the injected catalog shape. */
  useMessages: () => TCatalogs[keyof TCatalogs];
}

/**
 * Factory: the i18n *mechanism* is shared; each product injects its own catalogs.
 * Returns a `LocaleProvider` plus `useLocale` / `useMessages` hooks bound to the
 * catalog's types (compile-time safety — `useMessages()` matches the catalog shape).
 */
export declare function createI18n<TCatalogs extends Record<string, unknown>>(
  config: CreateI18nConfig<TCatalogs>,
): I18nApi<TCatalogs>;
