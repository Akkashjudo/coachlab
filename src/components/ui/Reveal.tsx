"use client";

import { motion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { EASE_EXPO, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Every element here starts hidden and is revealed by Motion, so two safety
 * nets matter:
 *
 * 1. `data-reveal` — globals.css force-resets these to their visible state
 *    under `prefers-reduced-motion: reduce` and inside <noscript>. Motion's
 *    own `reducedMotion="user"` stops transform animations but leaves the
 *    element parked on its `initial` opacity, which would hide the content
 *    outright from exactly the people who need it most.
 *
 * 2. No `useReducedMotion()` branching. That hook returns `false` during SSR
 *    and the real preference after mount, which desynchronises the markup.
 */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Travel distance in px. 0 gives a pure fade. */
  y?: number;
  as?: ElementType;
  amount?: number;
};

/** The site's single entrance animation. Everything reveals the same way. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
  amount,
}: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={amount ? { once: true, amount } : viewportOnce}
      transition={{ duration: 0.75, ease: EASE_EXPO, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggers direct children of a list/grid. */
export function RevealGroup({
  children,
  className,
  delay = 0,
  step = 0.08,
  as = "div",
}: Omit<RevealProps, "y"> & { step?: number }) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { delayChildren: delay, staggerChildren: step } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  y = 26,
  as = "div",
}: Omit<RevealProps, "delay" | "amount">) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      data-reveal=""
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_EXPO } },
      }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Line-by-line mask reveal for display headings.
 * Each line is a block clipped by its own overflow-hidden wrapper.
 *
 * `trigger="mount"` is for headings that are already on screen when the page
 * loads — the hero — so they animate immediately instead of waiting for a
 * scroll that may never come.
 */
export function MaskedHeading({
  lines,
  className,
  lineClassName,
  as: Tag = "h2",
  delay = 0,
  once = true,
  trigger = "view",
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  as?: ElementType;
  delay?: number;
  once?: boolean;
  trigger?: "view" | "mount";
}) {
  const reveal = { y: "0%" };

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={cn("block overflow-hidden pb-[0.08em]", lineClassName)}
        >
          <motion.span
            data-reveal=""
            className="block will-change-transform"
            initial={{ y: "110%" }}
            {...(trigger === "mount"
              ? { animate: reveal }
              : {
                  whileInView: reveal,
                  viewport: { once, amount: 0.35 },
                })}
            transition={{
              duration: 0.85,
              ease: EASE_EXPO,
              delay: delay + i * 0.09,
            }}
          >
            {line}
          </motion.span>
          {/*
            Each line is its own block, so a text extractor reads them with no
            separator: the homepage H1 came out as "Train to become acertified
            fitness coach". This trailing space sits at the end of a block and
            collapses to nothing visually, but restores the word boundary for
            Google and for screen readers.
          */}
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

/** A gold hairline that draws itself out when scrolled into view. */
export function DrawRule({
  className,
  delay = 0,
  origin = "left",
}: {
  className?: string;
  delay?: number;
  origin?: "left" | "center";
}) {
  return (
    <motion.div
      aria-hidden
      data-reveal=""
      className={cn("rule-fade w-full", className)}
      style={{ transformOrigin: origin }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, ease: EASE_EXPO, delay }}
    />
  );
}
