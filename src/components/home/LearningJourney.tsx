"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { learningJourney } from "@/data/site";
import { EASE_EXPO } from "@/lib/motion";

/**
 * Five stages of the CoachLab learning experience, connected by a gold line
 * that fills as the section scrolls — horizontal on desktop, vertical on
 * phones so nothing is squeezed.
 */
export function LearningJourney({ index = "08" }: { index?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 60%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="seam-top section-y relative isolate">
      <TechBackdrop grid="lg" glow="top" />

      <Container>
        <SectionHeader
          index={index}
          eyebrow="Learning Experience"
          title="How you learn at CoachLab"
          subtitle="Every program moves through the same five stages."
        />

        <div ref={ref} className="relative mt-14 sm:mt-16">
          {/* connector — horizontal on lg, vertical below */}
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-[1.4375rem] w-px bg-hairline-soft lg:top-[1.4375rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-full"
          />
          <motion.span
            aria-hidden
            data-reveal=""
            style={{ scaleY: fill, transformOrigin: "top" }}
            className="absolute top-0 bottom-0 left-[1.4375rem] w-px bg-gradient-to-b from-gold-bright to-gold-muted lg:hidden"
          />
          <motion.span
            aria-hidden
            data-reveal=""
            style={{ scaleX: fill, transformOrigin: "left" }}
            className="absolute top-[1.4375rem] right-0 left-0 hidden h-px bg-gradient-to-r from-gold-bright to-gold-muted lg:block"
          />

          <ol className="grid gap-8 lg:grid-cols-5 lg:gap-6">
            {learningJourney.map((stage, i) => (
              <motion.li
                key={stage.step}
                data-reveal=""
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.65, ease: EASE_EXPO, delay: i * 0.1 }}
                className="relative flex gap-5 lg:block"
              >
                <span
                  aria-hidden
                  className="relative z-10 flex size-[2.875rem] shrink-0 items-center justify-center rounded-full border border-hairline bg-ink"
                >
                  <span className="micro text-[0.625rem] text-gold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>

                <div className="min-w-0 flex-1 pt-2 lg:pt-7">
                  <h3 className="display-wide font-display text-[1.15rem] leading-none font-extrabold text-bone uppercase sm:text-[1.3rem]">
                    {stage.step}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">
                    {stage.copy}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
