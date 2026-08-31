import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TechBackdrop, CornerFrame } from "@/components/ui/TechBackdrop";
import { galleryItems } from "@/data/gallery";

/**
 * CoachLab's own certificate-presentation photographs, shown in a scroll rail.
 * No counts, no claims — just the photographs.
 */
export function GallerySection({ index = "10" }: { index?: string }) {
  return (
    <section id="gallery" className="seam-top section-y relative isolate overflow-hidden">
      <TechBackdrop grid="lg" glow="center" />

      <Container>
        <SectionHeader
          index={index}
          eyebrow="From the Classroom"
          title="Certification day"
          subtitle="Moments from CoachLab certificate presentations."
        />
      </Container>

      <Reveal y={26} className="mt-12 sm:mt-14">
        <div
          className="no-scrollbar gutter-x flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-5"
          role="region"
          aria-label="Photographs from CoachLab certificate presentations"
          tabIndex={0}
        >
          {galleryItems.map((item, i) => (
            <figure
              key={item.src}
              className={`group relative shrink-0 snap-start overflow-hidden border border-hairline-soft bg-surface transition-colors duration-500 hover:border-hairline-strong ${
                item.wide
                  ? "w-[85vw] sm:w-[30rem] lg:w-[36rem]"
                  : "w-[68vw] sm:w-[19rem] lg:w-[22rem]"
              }`}
            >
              <CornerFrame
                size={12}
                className="z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div
                className={`relative ${item.wide ? "aspect-[4/3]" : "aspect-[3/4]"}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading={i < 2 ? "eager" : "lazy"}
                  sizes={
                    item.wide
                      ? "(max-width: 640px) 85vw, (max-width: 1024px) 30rem, 36rem"
                      : "(max-width: 640px) 68vw, (max-width: 1024px) 19rem, 22rem"
                  }
                  className="object-cover transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(5,5,5,0) 55%, rgba(5,5,5,0.55) 100%)",
                  }}
                />
              </div>
            </figure>
          ))}

          {/* trailing spacer so the last card can clear the gutter */}
          <span aria-hidden className="w-2 shrink-0 sm:w-8" />
        </div>
      </Reveal>

      <Container>
        <Reveal y={14} className="mt-6">
          <p className="micro text-[0.575rem] text-dim">
            Scroll to view more &nbsp;→
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
