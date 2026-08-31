"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_EXPO } from "@/lib/motion";

/**
 * A short fade between routes.
 *
 * Deliberately opacity-only. A translate would leave `transform` on a wrapper
 * that contains the sticky CPT column, and a transformed ancestor becomes the
 * containing block for its descendants — which quietly breaks `position:
 * sticky` and `fixed` inside it. The vertical movement visitors read as a page
 * transition is already supplied by the per-section reveals underneath.
 *
 * Entrance only: an exit animation would hold the old route on screen and make
 * navigation feel slower than it is.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      data-reveal=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32, ease: EASE_EXPO }}
    >
      {children}
    </motion.div>
  );
}
