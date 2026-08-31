"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { MotionValue } from "motion/react";
import { ArrowRight } from "lucide-react";
import { PointerLayer } from "@/components/motion/Parallax";
import { MonogramWatermark, CornerFrame } from "@/components/ui/TechBackdrop";
import { batchFacts, currentBatch } from "@/data/site";
import { EASE_EXPO } from "@/lib/motion";

/**
 * The hero's right-hand composition: a technical "instrument plate".
 *
 * Three depth layers drift with the pointer (grid 3px, plate 6px, monogram
 * 11px) driven by MotionValues shared from the hero, so the whole composition
 * costs one listener. Behind the data sits a movement-trajectory drawing —
 * the visual language of the exercise science being taught, rather than
 * decoration for its own sake.
 */
export function HeroPlate({
  mx,
  my,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  return (
    <div className="relative">
      {/* deepest layer — monogram */}
      <PointerLayer mx={mx} my={my} depth={11} className="pointer-events-none">
        <MonogramWatermark
          className="-top-10 -right-6 hidden sm:block"
          size={260}
          opacity={0.06}
        />
      </PointerLayer>

      <PointerLayer mx={mx} my={my} depth={6}>
        <div className="panel relative overflow-hidden p-6 sm:p-8">
          <CornerFrame size={16} />

          {/* coordinate labels — quietest layer */}
          <PointerLayer
            mx={mx}
            my={my}
            depth={3}
            className="pointer-events-none absolute inset-0"
          >
            <TrajectoryPlot />
          </PointerLayer>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 60% at 80% 0%, rgba(227,173,40,0.1), transparent 65%)",
            }}
          />

          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <span className="micro flex items-center gap-2.5 text-gold">
                {currentBatch.isOpen && (
                  <span
                    aria-hidden
                    className="animate-pulse-dot size-1.5 rounded-full bg-gold-bright"
                  />
                )}
                {currentBatch.isOpen ? "Current Intake" : "Next Intake"}
              </span>
              <span className="micro text-[0.6rem] text-dim">CPT.01</span>
            </div>

            <h2 className="display-wide-sm mt-5 font-display text-[1.65rem] leading-[1.05] font-extrabold tracking-tight text-bone uppercase sm:text-[1.9rem]">
              {currentBatch.course}
            </h2>
            <p className="micro mt-3 text-gold-muted">CPT</p>

            {currentBatch.isOpen ? (
              <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden border border-hairline-soft bg-hairline-soft">
                {batchFacts.map((fact, i) => (
                  <motion.div
                    key={fact.label}
                    data-reveal=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: EASE_EXPO,
                      delay: 0.72 + i * 0.07,
                    }}
                    className="bg-surface-2 px-4 py-4"
                  >
                    <dt className="micro text-[0.575rem] text-dim">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 font-display text-[0.95rem] leading-tight font-bold text-bone">
                      {fact.value}
                    </dd>
                  </motion.div>
                ))}
              </dl>
            ) : (
              <p className="mt-7 border border-hairline-soft bg-surface-2 px-4 py-5 text-sm leading-relaxed text-muted">
                Contact CoachLab for upcoming batch dates.
              </p>
            )}

            <Link
              href={`/courses/${currentBatch.courseSlug}`}
              className="group mt-6 inline-flex min-h-11 items-center gap-2 font-display text-[0.72rem] font-bold tracking-[0.14em] text-gold uppercase transition-colors hover:text-gold-bright"
            >
              View full CPT curriculum
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 ease-[var(--ease-expo)] group-hover:translate-x-1"
                strokeWidth={2.25}
              />
            </Link>
          </div>
        </div>
      </PointerLayer>

      <div className="mt-4 flex items-center justify-between gap-4 px-1">
        <p className="micro text-[0.575rem] leading-relaxed text-dim">
          Batch details confirmed at enquiry
        </p>
        <span aria-hidden className="ticks-x h-2 w-16 opacity-40" />
      </div>
    </div>
  );
}

/**
 * A movement trajectory — the arc a loaded barbell traces through a squat,
 * with its measurement baseline. Drawn once on entry, then still.
 */
function TrajectoryPlot() {
  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: {
      pathLength: { duration: 1.5, ease: EASE_EXPO, delay },
      opacity: { duration: 0.35, delay },
    },
  });

  return (
    <svg
      aria-hidden
      viewBox="0 0 320 320"
      fill="none"
      className="absolute -right-10 -bottom-12 h-[19rem] w-[19rem] opacity-[0.5]"
    >
      {/* measurement baseline */}
      <motion.line
        x1="20"
        y1="250"
        x2="300"
        y2="250"
        stroke="rgba(227,173,40,0.32)"
        strokeWidth="1"
        {...draw(0.85)}
      />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <motion.line
          key={i}
          x1={40 + i * 40}
          y1="250"
          x2={40 + i * 40}
          y2="242"
          stroke="rgba(227,173,40,0.3)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.1 + i * 0.04 }}
        />
      ))}

      {/* the descent / ascent path */}
      <motion.path
        d="M60 90 C 92 150, 108 210, 152 214 C 196 218, 212 150, 250 92"
        stroke="rgba(227,173,40,0.5)"
        strokeWidth="1.25"
        strokeLinecap="round"
        {...draw(0.95)}
      />

      {/* joint-angle guide */}
      <motion.path
        d="M152 214 L 152 250 M152 214 L 214 176"
        stroke="rgba(227,173,40,0.26)"
        strokeWidth="1"
        strokeDasharray="3 4"
        {...draw(1.25)}
      />

      {/* bottom-position node */}
      <motion.circle
        cx="152"
        cy="214"
        r="4"
        fill="rgba(227,173,40,0.55)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_EXPO, delay: 1.5 }}
        style={{ transformOrigin: "152px 214px" }}
      />
      <motion.circle
        cx="152"
        cy="214"
        r="11"
        stroke="rgba(227,173,40,0.3)"
        strokeWidth="1"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_EXPO, delay: 1.55 }}
        style={{ transformOrigin: "152px 214px" }}
      />
    </svg>
  );
}
