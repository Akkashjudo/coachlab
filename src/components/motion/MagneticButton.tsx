"use client";

import { useCallback, useRef } from "react";
import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useDesktopPointer } from "@/lib/hooks";

/**
 * Wraps a control so it leans a few pixels toward the cursor.
 *
 * Position lives in MotionValues, so tracking never touches React state. The
 * pull is capped at `strength` px — enough to feel responsive, far short of the
 * rubber-band effect that reads as a gimmick. Disabled entirely on touch and
 * under prefers-reduced-motion, where it renders as a plain wrapper.
 */
export function MagneticButton({
  children,
  strength = 6,
  className,
}: {
  children: ReactNode;
  /** Maximum travel in px. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const enabled = useDesktopPointer();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 260, damping: 22, mass: 0.4 });
  const y = useSpring(py, { stiffness: 260, damping: 22, mass: 0.4 });

  /* The inner content trails slightly less than the shell — a bit of depth. */
  const innerX = useTransform(x, (v) => v * 0.45);
  const innerY = useTransform(y, (v) => v * 0.45);

  const onMove = useCallback(
    (event: React.PointerEvent<HTMLSpanElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const clamp = (v: number, max: number) =>
        Math.max(-max, Math.min(max, v));
      px.set(clamp((dx / (rect.width / 2)) * strength, strength));
      py.set(clamp((dy / (rect.height / 2)) * strength, strength));
    },
    [px, py, strength],
  );

  const reset = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  if (!enabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={className ? `inline-block ${className}` : "inline-block"}
    >
      <motion.span style={{ x: innerX, y: innerY }} className="block">
        {children}
      </motion.span>
    </motion.span>
  );
}
