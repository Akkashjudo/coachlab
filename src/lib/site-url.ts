/**
 * Resolves the public origin used for canonical URLs, Open Graph tags,
 * `sitemap.xml`, `robots.txt` and the organisation JSON-LD.
 *
 * Server-only by convention. Import it from server components, route handlers
 * and metadata only — never from a "use client" module, or the env access
 * gets inlined into the client bundle.
 *
 * Precedence is deliberate:
 *
 *   1. NEXT_PUBLIC_SITE_URL — the escape hatch, for a staging host or a
 *      future rename. Blank or whitespace counts as unset.
 *   2. PRODUCTION_URL — the real domain, held in code.
 *   3. localhost, for local development only.
 *
 * Vercel's own VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL are deliberately
 * *not* consulted. They used to sit at step 2, which meant every canonical
 * tag and every <loc> in the sitemap advertised the deployment host
 * (coachlab-seven.vercel.app) instead of the real domain — the project's
 * NEXT_PUBLIC_SITE_URL is defined but blank, so resolution fell straight
 * through to Vercel's alias. Search engines were being pointed at a domain
 * nobody links to. The canonical domain belongs in the repository, where it
 * is reviewable, not in a dashboard field that can silently go empty.
 */

/** The canonical production origin. Change it here if the domain ever moves. */
const PRODUCTION_URL = "https://coachlab.in";
const DEVELOPMENT_URL = "http://localhost:3000";

/** Normalises to a bare origin, or returns undefined if unusable. */
function toOrigin(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;

  // Tolerate a bare domain being pasted in, e.g. "coachlab.in".
  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    // `.origin` drops any path, query or trailing slash.
    return new URL(withScheme).origin;
  } catch {
    return undefined;
  }
}

function resolveSiteUrl(): string {
  const override = toOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  if (override) return override;

  // `next build` sets NODE_ENV=production, so a local production build also
  // resolves to the real domain — which is what makes the sitemap verifiable
  // before it ships.
  return process.env.NODE_ENV === "production"
    ? PRODUCTION_URL
    : DEVELOPMENT_URL;
}

export const SITE_URL = resolveSiteUrl();

/** Exported for tests and for the build-time sitemap check. */
export { PRODUCTION_URL };

/**
 * Default social preview card.
 *
 * A page-level `openGraph` block replaces the one inherited from the root
 * layout rather than merging with it, so every page that declared its own
 * title and description silently lost the image too. Spreading this into each
 * block keeps link previews working everywhere. The URL is relative, so it
 * resolves against `metadataBase`.
 */
export const OG_IMAGE = {
  url: "/images/brand/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "CoachLab — Institute of Fitness Education & Science",
} as const;
