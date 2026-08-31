"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` stops Motion from running transform animations when
 * the OS asks for reduced motion. Setting it once here rather than branching
 * on `useReducedMotion()` per component avoids a hydration mismatch — that
 * hook resolves to `false` during SSR and to the real preference after mount.
 *
 * On its own this is not enough: Motion leaves the element sitting on its
 * `initial` opacity, so anything that fades in would stay invisible. The
 * `[data-reveal]` reset in globals.css is what actually guarantees the
 * content is shown.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.75 }}>
      {children}
    </MotionConfig>
  );
}
