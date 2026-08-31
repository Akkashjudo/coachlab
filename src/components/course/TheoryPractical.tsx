"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { BookOpen, Dumbbell, ArrowDown } from "lucide-react";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { CornerFrame } from "@/components/ui/TechBackdrop";
import type { CurriculumModule } from "@/data/courses";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Theory and practical as one composition rather than two cards.
 *
 * A central axis runs from KNOWLEDGE down to APPLICATION, filling with scroll;
 * the classroom modules arrive from the left and the floor modules from the
 * right, so the layout itself states the relationship the course is built on.
 *
 * The horizontal offset is deliberately small (18px) and the section clips its
 * x-overflow, so the entrance can never push a phone sideways. On mobile the
 * three tracks stack and the axis simply runs down the page.
 */
export function TheoryPractical({
  theory,
  practical,
}: {
  theory: CurriculumModule[];
  practical: CurriculumModule[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 70%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });
  const nodeGlow = useTransform(fill, [0, 0.5, 1], [0.25, 0.7, 1]);

  return (
    <div
      ref={ref}
      className="relative grid gap-8 overflow-x-clip lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-6 xl:gap-10"
    >
      {/* ------------------------------------------------------- theory */}
      <Track
        side="left"
        kind="Theory"
        caption="Classroom sessions"
        icon={<BookOpen aria-hidden className="size-4" strokeWidth={1.75} />}
      >
        {theory.map((module, i) => (
          <Row key={module.index} side="left" delay={i * 0.07}>
            <div className="flex gap-4 sm:gap-5">
              <span className="micro shrink-0 pt-1 text-gold tabular-nums">
                {module.index}
              </span>
              <div className="min-w-0 flex-1">
                <h4 className="display-wide-sm text-[1rem] leading-snug font-bold text-bone uppercase sm:text-[1.075rem]">
                  {module.title}
                </h4>
                {module.points && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {module.points.map((point) => (
                      <li
                        key={point}
                        className="border border-hairline-soft px-2.5 py-1.5 text-[0.6875rem] leading-none text-dim"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
                {module.note && (
                  <p className="mt-3 text-[0.78rem] leading-relaxed text-dim">
                    {module.note}
                  </p>
                )}
              </div>
            </div>
          </Row>
        ))}
      </Track>

      {/* --------------------------------------------------------- axis */}
      <div className="relative flex shrink-0 items-stretch lg:w-[8.5rem] xl:w-[11rem]">
        <div className="flex w-full flex-col items-center py-2 lg:py-6">
          <motion.span
            data-reveal=""
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE_EXPO }}
            className="micro text-center text-[0.575rem] text-gold"
          >
            Knowledge
          </motion.span>

          <div className="relative my-4 w-px flex-1 self-center overflow-hidden bg-hairline-soft max-lg:h-16 lg:my-6 lg:min-h-[26rem]">
            <motion.span
              aria-hidden
              data-reveal=""
              style={{ scaleY: fill, transformOrigin: "top" }}
              className="absolute inset-0 block bg-gradient-to-b from-gold-bright via-gold to-gold-muted"
            />
          </div>

          <motion.span
            aria-hidden
            data-reveal=""
            style={{ opacity: nodeGlow }}
            className="flex size-8 items-center justify-center rounded-full border border-hairline bg-ink text-gold"
          >
            <ArrowDown className="size-3.5" strokeWidth={2} />
          </motion.span>

          <motion.span
            data-reveal=""
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.15 }}
            className="micro mt-4 text-center text-[0.575rem] text-gold"
          >
            Application
          </motion.span>
        </div>
      </div>

      {/* ---------------------------------------------------- practical */}
      <Track
        side="right"
        kind="Practical"
        caption="Floor sessions"
        icon={<Dumbbell aria-hidden className="size-4" strokeWidth={1.75} />}
      >
        <ul className="divide-y divide-hairline-soft border-t border-hairline-soft">
          {practical.map((module, i) => (
            <Row key={module.index} side="right" delay={i * 0.045} as="li">
              <div className="flex items-start gap-4 py-3.5 sm:gap-5">
                <span className="micro shrink-0 pt-1 text-gold-muted tabular-nums">
                  {module.index}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.925rem] leading-snug text-bone">
                    {module.title}
                  </p>
                  {module.note && (
                    <p className="mt-1.5 text-[0.75rem] leading-relaxed text-dim">
                      {module.note}
                    </p>
                  )}
                </div>
              </div>
            </Row>
          ))}
        </ul>
      </Track>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Track({
  side,
  kind,
  caption,
  icon,
  children,
}: {
  side: "left" | "right";
  kind: string;
  caption: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      data-reveal=""
      initial={{ opacity: 0, x: side === "left" ? -18 : 18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
      className="flex min-w-0"
    >
      <SpotlightCard
        radius={520}
        intensity={0.06}
        className="panel w-full overflow-hidden p-6 sm:p-8"
      >
        <CornerFrame size={14} />

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center border border-hairline bg-gold/[0.06] text-gold">
              {icon}
            </span>
            <h3 className="display-wide font-display text-[1.05rem] font-extrabold tracking-[0.06em] text-bone uppercase">
              {kind}
            </h3>
          </div>
          <span className="micro text-[0.575rem] text-dim">{caption}</span>
        </div>

        <div className="mt-8 space-y-7">{children}</div>
      </SpotlightCard>
    </motion.div>
  );
}

function Row({
  side,
  delay,
  children,
  as: Tag = "div",
  className,
}: {
  side: "left" | "right";
  delay: number;
  children: React.ReactNode;
  as?: "div" | "li";
  className?: string;
}) {
  const MotionTag = Tag === "li" ? motion.li : motion.div;
  return (
    <MotionTag
      data-reveal=""
      initial={{ opacity: 0, x: side === "left" ? -12 : 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE_EXPO, delay }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
