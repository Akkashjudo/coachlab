"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { MaskedHeading, Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { TechBackdrop, CornerFrame } from "@/components/ui/TechBackdrop";
import { siteConfig } from "@/data/site";
import { whatsappEnquiry } from "@/lib/whatsapp";

/**
 * Closing section. An oversized COACHLAB wordmark drifts slowly behind the
 * content as the section passes — stroked rather than filled so it reads as
 * architecture instead of a second headline competing with the real one.
 */
export function FinalCTA({
  headline = ["Your journey into", "professional coaching", "starts here."],
  copy = "Talk to CoachLab about the right course for your goals and upcoming batch availability.",
  index = "14",
  eyebrow = "Get Started",
}: {
  headline?: string[];
  copy?: string;
  index?: string;
  eyebrow?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001,
  });
  const wordmarkX = useTransform(smooth, [0, 1], ["12%", "-12%"]);
  const wordmarkFade = useTransform(smooth, [0, 0.4, 1], [0, 1, 0.3]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden border-t border-hairline"
    >
      <TechBackdrop grid="sm" glow="center" />

      <motion.span
        aria-hidden
        data-reveal=""
        style={{ x: wordmarkX, opacity: wordmarkFade }}
        className="ghost-numeral pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-[clamp(6rem,20vw,17rem)] whitespace-nowrap"
      >
        COACHLAB
      </motion.span>

      <Container>
        <div className="relative py-20 sm:py-24 lg:py-32">
          <CornerFrame size={22} className="hidden sm:block" />

          <div className="mx-auto max-w-4xl text-center">
            <Reveal y={14}>
              <div className="flex items-center justify-center gap-4">
                <span className="micro text-gold-muted tabular-nums">
                  {index}
                </span>
                <span aria-hidden className="h-px w-8 bg-hairline-strong" />
                <Eyebrow>{eyebrow}</Eyebrow>
              </div>
            </Reveal>

            <MaskedHeading
              as="h2"
              className="display-wide mt-8 text-d2 text-bone uppercase"
              lines={headline.map((line, i) =>
                i === headline.length - 1 ? (
                  <span key={line} className="text-metal">
                    {line}
                  </span>
                ) : (
                  line
                ),
              )}
            />

            <Reveal y={18} delay={0.14}>
              <p className="mx-auto mt-8 max-w-xl text-[0.975rem] leading-relaxed text-muted sm:text-[1.075rem]">
                {copy}
              </p>
            </Reveal>

            <Reveal y={18} delay={0.2}>
              <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
                <ButtonLink
                  href={whatsappEnquiry()}
                  size="lg"
                  magnetic
                  icon={<MessageCircle className="size-4" strokeWidth={2} />}
                >
                  Enquire on WhatsApp
                </ButtonLink>
                <ButtonLink
                  href={siteConfig.phoneHref}
                  variant="secondary"
                  size="lg"
                  icon={<Phone className="size-4" strokeWidth={2} />}
                >
                  Call CoachLab
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal y={14} delay={0.28}>
              <p className="micro mt-9 text-[0.6rem] text-dim">
                {siteConfig.location.short}
                <span aria-hidden className="mx-3 text-gold-muted">
                  ◆
                </span>
                {siteConfig.phoneDisplay}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
