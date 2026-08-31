import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { audiences } from "@/data/site";

export function AudienceSection() {
  return (
    <section id="audience" className="seam-top section-y relative isolate">
      <TechBackdrop grid="lg" glow="left" />

      <Container>
        <SectionHeader
          index="11"
          eyebrow="Who It's For"
          title="Who is CoachLab for?"
          subtitle="Four kinds of people walk into a CoachLab classroom."
        />

        <RevealGroup className="mt-12 grid gap-px overflow-hidden border border-hairline-soft bg-hairline-soft sm:mt-14 sm:grid-cols-2">
          {audiences.map((item) => (
            <RevealItem key={item.index} y={18}>
              <article className="group h-full bg-ink px-6 py-9 transition-colors duration-500 hover:bg-surface sm:px-9 sm:py-11">
                <div className="flex items-center gap-4">
                  <span className="micro text-gold tabular-nums">
                    {item.index}
                  </span>
                  <span
                    aria-hidden
                    className="h-px w-6 bg-hairline-strong transition-[width] duration-500 ease-[var(--ease-expo)] group-hover:w-12"
                  />
                </div>

                <h3 className="display-wide-sm mt-6 text-[1.15rem] leading-snug font-bold text-bone uppercase sm:text-[1.35rem]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-md text-[0.925rem] leading-relaxed text-muted">
                  {item.copy}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
