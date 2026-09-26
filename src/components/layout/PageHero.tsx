import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { MaskedHeading, Reveal } from "@/components/ui/Reveal";
import { TechBackdrop, MonogramWatermark } from "@/components/ui/TechBackdrop";
import { SITE_URL } from "@/lib/site-url";
import { cn } from "@/lib/utils";

/**
 * Shared hero for every page below the homepage. Keeps the type scale, the
 * backdrop and the breadcrumb behaviour identical across the site.
 */
export function PageHero({
  eyebrow,
  lines,
  intro,
  meta,
  actions,
  breadcrumb,
  className,
}: {
  eyebrow: string;
  /** Headline split into masked lines. The last line is set in gold. */
  lines: string[];
  intro?: ReactNode;
  /** Small key/value strip under the intro. */
  meta?: { label: string; value: string }[];
  actions?: ReactNode;
  breadcrumb?: { label: string; href: string }[];
  className?: string;
}) {
  /*
   * BreadcrumbList is emitted from the same prop that renders the visible
   * trail, so the structured data cannot drift from what is on the page —
   * which is exactly what Google checks for.
   */
  const breadcrumbSchema =
    breadcrumb && breadcrumb.length > 1
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumb.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: crumb.label,
            item: `${SITE_URL}${crumb.href === "/" ? "" : crumb.href}`,
          })),
        }
      : null;

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20",
        className,
      )}
    >
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <TechBackdrop glow="right" />
      <MonogramWatermark
        className="top-[-4rem] right-[-8rem] hidden lg:block"
        size={560}
        opacity={0.04}
      />

      <Container className="relative">
        {breadcrumb && breadcrumb.length > 0 && (
          <Reveal y={10}>
            <nav aria-label="Breadcrumb" className="-mt-2 mb-5">
              <ol className="flex flex-wrap items-center gap-2">
                {breadcrumb.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {i > 0 && (
                      <span aria-hidden className="micro text-gold-muted">
                        /
                      </span>
                    )}
                    <Link
                      href={crumb.href}
                      className="micro inline-flex min-h-9 items-center text-[0.625rem] text-dim transition-colors hover:text-gold"
                    >
                      {crumb.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        <Reveal y={12}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <MaskedHeading
          as="h1"
          trigger="mount"
          delay={0.1}
          className="display-wide mt-6 font-display text-[clamp(2rem,5.4vw,4.5rem)] leading-[0.98] font-extrabold tracking-[-0.02em] text-bone uppercase sm:mt-7"
          lines={lines.map((line, i) =>
            i === lines.length - 1 && lines.length > 1 ? (
              <span key={line} className="text-metal">
                {line}
              </span>
            ) : (
              line
            ),
          )}
        />

        {intro && (
          <Reveal y={18} delay={0.28}>
            <div className="mt-8 max-w-2xl text-[1rem] leading-relaxed text-muted sm:text-[1.075rem]">
              {intro}
            </div>
          </Reveal>
        )}

        {meta && meta.length > 0 && (
          <Reveal y={18} delay={0.34}>
            <dl className="mt-10 grid gap-px overflow-hidden border border-hairline-soft bg-hairline-soft sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-4">
              {meta.map((item) => (
                <div key={item.label} className="bg-surface px-5 py-4">
                  <dt className="micro text-[0.575rem] text-dim">
                    {item.label}
                  </dt>
                  <dd className="display-wide-sm mt-2 font-display text-[0.95rem] leading-tight font-bold text-bone">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}

        {actions && (
          <Reveal y={18} delay={0.4}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              {actions}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
