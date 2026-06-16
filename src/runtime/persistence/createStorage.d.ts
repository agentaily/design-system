import type { PreferenceStorage, StorageConfig } from "./types";

/**
 * Build a preference store. Resolves the concrete backend once (per the config +
 * runtime environment) and applies `keyPrefix` to every key. The returned store
 * never throws — SSR and private mode degrade silently.
 */
export declare function createStorage(config?: StorageConfig): PreferenceStorage;
