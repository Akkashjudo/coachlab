/**
 * Resolves the public origin used for canonical URLs, Open Graph tags,
 * `sitemap.xml` and `robots.txt`.
 *
 * Server-only by convention: it reads Vercel's non-public deployment
 * variables, which do not exist in the browser. Import it from server
 * components, route handlers and metadata only — never from a "use client"
 * module, or the env access gets inlined into the client bundle as
 * `undefined`.
 *
 * Every input is treated as untrusted. An environment variable that exists
 * but is blank is the case that broke the first deploy: `??` only falls back
 * on null/undefined, so `""` sailed through to `new URL("")` and threw
 * ERR_INVALID_URL while collecting page data.
 */

const FALLBACK = "http://localhost:3000";

/** First value that is present and not just whitespace. */
function firstUsable(...values: (string | undefined)[]): string | undefined {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }
  return undefined;
}

function resolveSiteUrl(): string {
  const explicit = firstUsable(process.env.NEXT_PUBLIC_SITE_URL);

  // Vercel exposes these without a scheme, e.g. "coachlab.vercel.app".
  // The production alias is preferred so preview builds still advertise the
  // canonical domain rather than their own throwaway URL.
  const vercelHost = firstUsable(
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  );

  const candidate = explicit ?? (vercelHost ? `https://${vercelHost}` : undefined);
  if (!candidate) return FALLBACK;

  // Tolerate a bare domain being pasted into the dashboard.
  const withScheme = /^https?:\/\//i.test(candidate)
    ? candidate
    : `https://${candidate}`;

  try {
    // `.origin` normalises the value and drops any path or trailing slash.
    return new URL(withScheme).origin;
  } catch {
    return FALLBACK;
  }
}

export const SITE_URL = resolveSiteUrl();
