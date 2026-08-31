import type { Variants, Transition } from "motion/react";

export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SOFT = [0.33, 1, 0.68, 1] as const;

export const springy: Transition = {
  duration: 0.72,
  ease: EASE_EXPO,
};

/** Standard entrance: a short lift with a fade. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: springy },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE_SOFT } },
};

/** Wrap a group of children to stagger their entrance. */
export const stagger = (delayChildren = 0, staggerChildren = 0.07): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

/** Headline lines that rise out from behind a mask. */
export const maskLine: Variants = {
  hidden: { y: "108%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: EASE_EXPO },
  },
};

/** A gold rule that draws itself out from the left. */
export const drawX: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 1.05, ease: EASE_EXPO },
  },
};

/** Shared viewport config so every section reveals at the same trigger point. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
export const viewportEarly = { once: true, amount: 0.1 } as const;
