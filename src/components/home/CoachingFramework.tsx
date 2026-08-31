"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { CornerFrame } from "@/components/ui/TechBackdrop";
import { coachingFramework } from "@/data/site";
import { EASE_EXPO } from "@/lib/motion";

/**
 * The CoachLab coaching framework — the site's signature motif.
 * A vertical rail whose gold spine draws itself as the section scrolls,
 * with each stage lighting up as the line passes it.
 */
export function CoachingFramework() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 65%"],
  });
  const spine = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="panel relative overflow-hidden p-6 sm:p-8">
      <CornerFrame size={14} />

      <div className="flex items-center justify-between gap-4">
        <span className="micro text-gold">The CoachLab Framework</span>
        <span className="micro text-[0.6rem] text-dim">05 Stages</span>
      </div>

      <ol className="relative mt-8">
        {/* the rail */}
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-hairline-soft"
        />
        <motion.span
          aria-hidden
          data-reveal=""
          style={{ scaleY: spine, transformOrigin: "top" }}
          className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-gradient-to-b from-gold-bright via-gold to-gold-muted"
        />

        {coachingFramework.map((stage, i) => (
          <motion.li
            key={stage.index}
            data-reveal=""
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE_EXPO, delay: i * 0.08 }}
            className="relative flex gap-5 pb-7 pl-0 last:pb-0"
          >
            <span
              aria-hidden
              className="relative z-10 mt-1 flex size-[1.375rem] shrink-0 items-center justify-center rounded-full border border-hairline bg-ink"
            >
              <span className="size-[5px] rounded-full bg-gold" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-3">
                <span className="micro text-[0.6rem] text-gold-muted tabular-nums">
                  {stage.index}
                </span>
                <h3
                  className="display-wide-sm font-display text-[0.95rem] font-bold tracking-[0.08em] text-bone uppercase"
                >
                  {stage.title}
                </h3>
              </div>
              <p className="mt-2 text-[0.825rem] leading-relaxed text-dim">
                {stage.note}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
