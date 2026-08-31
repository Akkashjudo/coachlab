"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { MaskedHeading, Reveal } from "@/components/ui/Reveal";
import { TechBackdrop, MonogramWatermark } from "@/components/ui/TechBackdrop";
import { EASE_EXPO } from "@/lib/motion";

/**
 * The brand's three-word promise, set at statement scale.
 *
 * Each word enters from a different direction and then keeps drifting slightly
 * against the scroll, so the triptych reads as three separate arrivals rather
 * than one block fading in. Only ELEVATE takes gold — the payoff word.
 */
const triptych = [
  { word: "Educate", note: "Learn the science.", from: -1 },
  { word: "Empower", note: "Develop the skill.", from: 1 },
  { word: "Elevate", note: "Apply it professionally.", from: 0 },
] as const;

/**
 * `compact` drops the heading and both paragraphs, leaving only the three
 * words. The homepage already makes the theory-plus-practice argument four
 * other ways; there it runs as a pure brand beat between two dense sections.
 * /about keeps the full statement, where the reader has come for the story.
 */
export function Philosophy({
  index = "07",
  compact = false,
}: {
  index?: string;
  compact?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const drift = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="philosophy"
      ref={ref}
      className={`seam-top relative isolate overflow-hidden bg-ink-2 ${
        compact ? "py-0" : "section-y"
      }`}
    >
      <TechBackdrop grid="sm" glow="center" />
      <MonogramWatermark
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        size={680}
        opacity={0.022}
      />

      {!compact && (
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal y={14}>
            <div className="flex items-center justify-center gap-4">
              <span className="micro text-gold-muted tabular-nums">{index}</span>
              <span aria-hidden className="h-px w-8 bg-hairline-strong" />
              <Eyebrow>Learning Philosophy</Eyebrow>
            </div>
          </Reveal>

          <MaskedHeading
            className="display-wide mt-7 text-d2 text-bone uppercase"
            lines={[
              "Knowledge is the foundation.",
              <span key="app" className="text-metal">
                Coaching is the application.
              </span>,
            ]}
          />

          <div className="mx-auto mt-9 max-w-2xl space-y-5 text-[0.975rem] leading-relaxed text-muted sm:text-[1.05rem]">
            <Reveal y={16}>
              <p>
                Great coaches need more than exercises and workout templates.
                They need to understand how the body moves, how programs are
                designed, how clients are assessed, and how coaching decisions
                are made.
              </p>
            </Reveal>
            <Reveal y={16} delay={0.08}>
              <p>
                CoachLab connects education with application so students can
                develop the confidence to coach with purpose.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
      )}

      {/* --------------------------------------------- the three words */}
      <ol
        className={`relative border-y border-hairline-soft ${
          compact ? "" : "mt-20 sm:mt-28"
        }`}
      >
        {triptych.map((item, i) => (
          <Word
            key={item.word}
            item={item}
            position={i}
            total={triptych.length}
            progress={drift}
          />
        ))}
      </ol>
    </section>
  );
}

function Word({
  item,
  position,
  total,
  progress,
}: {
  item: (typeof triptych)[number];
  position: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const isLast = position === total - 1;
  /* A slow counter-drift so the words never sit perfectly still. */
  const x = useTransform(progress, [0, 1], [item.from * 22, item.from * -22]);

  return (
    <li className="group relative border-b border-hairline-soft last:border-b-0">
      <Container>
        <motion.div
          data-reveal=""
          initial={{
            opacity: 0,
            x: item.from * 42,
            y: item.from === 0 ? 28 : 0,
          }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.95, ease: EASE_EXPO }}
          className="flex flex-col gap-4 py-10 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10 sm:py-14"
        >
          <div className="flex items-baseline gap-5 sm:gap-8">
            <span className="micro shrink-0 text-gold-muted tabular-nums">
              {String(position + 1).padStart(2, "0")}
            </span>

            <motion.h3
              style={{ x }}
              className={`display-wide font-display text-statement font-black tracking-[-0.03em] uppercase transition-colors duration-500 ${
                isLast ? "text-metal" : "text-bone group-hover:text-gold-bright"
              }`}
            >
              {item.word}
            </motion.h3>
          </div>

          <div className="flex items-center gap-5 sm:shrink-0">
            <span
              aria-hidden
              className="hidden h-px w-8 bg-hairline-strong transition-[width] duration-500 ease-[var(--ease-expo)] group-hover:w-16 sm:block"
            />
            <p className="text-[0.95rem] leading-relaxed text-muted sm:text-right sm:text-[1.05rem]">
              {item.note}
            </p>
          </div>
        </motion.div>
      </Container>
    </li>
  );
}
