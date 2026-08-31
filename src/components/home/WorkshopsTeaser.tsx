import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { MaskedHeading, Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { TechBackdrop, MonogramWatermark } from "@/components/ui/TechBackdrop";
import { workshopTopics } from "@/data/workshops";

export function WorkshopsTeaser() {
  return (
    <section id="workshops" className="seam-top section-y relative isolate overflow-hidden bg-ink-2">
      <TechBackdrop grid="sm" glow="right" />
      <MonogramWatermark
        className="-bottom-24 -left-24 hidden lg:block"
        size={460}
        opacity={0.035}
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal y={14}>
              <div className="flex items-center gap-4">
                <span className="micro text-gold-muted tabular-nums">07</span>
                <span aria-hidden className="h-px w-8 bg-hairline-strong" />
                <Eyebrow>Continuing Education</Eyebrow>
              </div>
            </Reveal>

            <MaskedHeading
              className="display-wide mt-6 text-d2 text-bone uppercase"
              lines={[
                "Keep learning.",
                <span key="evolve" className="text-metal">
                  Keep evolving.
                </span>,
              ]}
            />

            <Reveal y={18} delay={0.12}>
              <p className="mt-8 max-w-md text-[0.975rem] leading-relaxed text-muted sm:text-[1.05rem]">
                CoachLab Professional Workshops provide focused learning
                opportunities for coaches who want to expand their knowledge
                beyond foundational certification.
              </p>
            </Reveal>

            <Reveal y={18} delay={0.2}>
              <div className="mt-9">
                <ButtonLink href="/workshops" size="lg" arrow>
                  Explore Workshops
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 xl:col-start-7 xl:col-end-13">
            <RevealGroup
              className="grid gap-px overflow-hidden border border-hairline-soft bg-hairline-soft sm:grid-cols-2"
              step={0.04}
            >
              {workshopTopics.map((topic, i) => (
                <RevealItem
                  key={topic.index}
                  y={14}
                  /* odd count — the last topic spans the row so no cell is left blank */
                  className={
                    i === workshopTopics.length - 1 && workshopTopics.length % 2 === 1
                      ? "sm:col-span-2"
                      : undefined
                  }
                >
                  <div className="group flex h-full items-start gap-4 bg-ink px-5 py-5 transition-colors duration-500 hover:bg-surface">
                    <span className="micro shrink-0 pt-0.5 text-gold-muted tabular-nums transition-colors duration-500 group-hover:text-gold">
                      {topic.index}
                    </span>
                    <p className="text-[0.9rem] leading-snug text-bone">
                      {topic.title}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal y={14} delay={0.1}>
              <p className="mt-5 text-[0.8rem] leading-relaxed text-dim">
                Workshop schedules vary. Contact CoachLab for upcoming dates.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
