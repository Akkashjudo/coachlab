import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { MaskedHeading, Reveal, DrawRule } from "@/components/ui/Reveal";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { CoachingFramework } from "@/components/home/CoachingFramework";

export function Intro() {
  return (
    <section id="approach" className="seam-top section-y relative isolate">
      <TechBackdrop grid="lg" glow="left" grain={false} />

      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          <div className="lg:col-span-7">
            <Reveal y={14}>
              <div className="flex items-center gap-4">
                <span className="micro text-gold-muted tabular-nums">02</span>
                <span aria-hidden className="h-px w-8 bg-hairline-strong" />
                <Eyebrow>The CoachLab Difference</Eyebrow>
              </div>
            </Reveal>

            <MaskedHeading
              className="display-wide mt-6 text-d2 text-bone uppercase"
              lines={["More than", "a certification."]}
            />

            <DrawRule className="mt-9" />

            <div className="mt-9 space-y-6 text-[0.975rem] leading-relaxed text-muted sm:text-[1.05rem]">
              <Reveal y={18}>
                <p>
                  CoachLab is built around one principle: knowing fitness is
                  not enough — a professional coach must know how to assess,
                  communicate, program and apply that knowledge in real-world
                  environments.
                </p>
              </Reveal>
              <Reveal y={18} delay={0.08}>
                <p>
                  Our programs combine theoretical education with practical
                  coaching to help students develop both knowledge and
                  competence.
                </p>
              </Reveal>
            </div>

            <Reveal y={22} delay={0.14}>
              <blockquote className="relative mt-11 border-l-2 border-gold pl-6 sm:pl-8">
                <p
                  className="display-wide-sm font-display text-[1.25rem] leading-[1.25] font-extrabold text-bone uppercase sm:text-[1.6rem]"
                >
                  Theory gives you knowledge.
                  <br />
                  <span className="text-metal">
                    Practice teaches you how to coach.
                  </span>
                </p>
              </blockquote>
            </Reveal>
          </div>

          <div className="lg:col-span-5 xl:col-start-8 xl:col-end-13">
            <Reveal y={26} delay={0.1}>
              <CoachingFramework />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
