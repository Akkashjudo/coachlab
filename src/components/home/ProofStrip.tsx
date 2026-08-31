import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CornerFrame } from "@/components/ui/TechBackdrop";
import { galleryItems } from "@/data/gallery";

/**
 * Proof, placed early.
 *
 * CoachLab's strongest credibility asset is its own certificate-presentation
 * photography — real students, real event, shot against the CoachLab backdrop.
 * It used to sit at section eleven, well past the point where a sceptical
 * visitor decides whether to keep reading. It now runs directly under the
 * hero.
 *
 * No counts, no ratings, no testimonials: none of those are confirmed. The
 * photographs are left to do the work on their own.
 */
export function ProofStrip() {
  const rail = galleryItems.slice(0, 8);

  return (
    <section
      aria-labelledby="proof-heading"
      className="seam-top relative isolate overflow-hidden bg-ink-2 py-14 sm:py-16"
    >
      <Container>
        <Reveal y={16}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Certification Day</Eyebrow>
              <h2
                id="proof-heading"
                className="display-wide mt-4 font-display text-[1.35rem] leading-tight font-extrabold text-bone uppercase sm:text-[1.75rem]"
              >
                Real students. Real certificates.
              </h2>
            </div>
            <p className="max-w-sm text-[0.9rem] leading-relaxed text-muted sm:text-right">
              Photographs from CoachLab certificate presentations — not stock
              imagery.
            </p>
          </div>
        </Reveal>
      </Container>

      <Reveal y={22} className="mt-9">
        <ul
          className="no-scrollbar gutter-x flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:gap-4"
          aria-label="Photographs from CoachLab certificate presentations"
          tabIndex={0}
        >
          {rail.map((item, i) => (
            <li
              key={item.src}
              className="group relative shrink-0 snap-start overflow-hidden border border-hairline-soft bg-surface transition-colors duration-500 hover:border-hairline-strong"
            >
              <CornerFrame
                size={10}
                className="z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div
                className={`relative ${
                  item.wide
                    ? "aspect-[4/3] w-[70vw] sm:w-[24rem]"
                    : "aspect-[3/4] w-[46vw] sm:w-[13.5rem]"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes={
                    item.wide
                      ? "(max-width: 640px) 70vw, 24rem"
                      : "(max-width: 640px) 46vw, 13.5rem"
                  }
                  className="object-cover transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(5,5,5,0) 55%, rgba(5,5,5,0.5) 100%)",
                  }}
                />
              </div>
            </li>
          ))}
          <li aria-hidden className="w-2 shrink-0 sm:w-8" />
        </ul>
      </Reveal>
    </section>
  );
}
