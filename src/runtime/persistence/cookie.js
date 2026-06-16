export const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/** Read a cookie by name. Returns null when absent or when there is no document. */
export function readRawCookie(name) {
  if (typeof document === "undefined") return null;
  const prefix = `${encodeURIComponent(name)}=`;
  const entries = document.cookie ? document.cookie.split("; ") : [];
  for (const entry of entries) {
    if (entry.startsWith(prefix)) return decodeURIComponent(entry.slice(prefix.length));
  }
  return null;
}

/**
 * Write a cookie as `name=value; path=/; max-age=…; SameSite=Lax` (+ `domain` when
 * given, + `Secure` on https). Only non-sensitive preferences go here — no HttpOnly
 * (the frontend reads it), SameSite=Lax, domain-restricted.
 */
export function writeRawCookie(name, value, opts) {
  if (typeof document === "undefined") return;
  const segments = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    "path=/",
    `max-age=${opts.maxAge}`,
    "SameSite=Lax",
  ];
  if (opts.domain) segments.push(`domain=${opts.domain}`);
  if (typeof location !== "undefined" && location.protocol === "https:") segments.push("Secure");
  document.cookie = segments.join("; ");
}

export function deleteRawCookie(name, domain) {
  if (typeof document === "undefined") return;
  const segments = [`${encodeURIComponent(name)}=`, "path=/", "max-age=0", "SameSite=Lax"];
  if (domain) segments.push(`domain=${domain}`);
  document.cookie = segments.join("; ");
}

export function cookieStore(domain, maxAge) {
  return {
    get: (key) => readRawCookie(key),
    set: (key, value) => writeRawCookie(key, value, { domain, maxAge }),
    remove: (key) => deleteRawCookie(key, domain),
  };
}
