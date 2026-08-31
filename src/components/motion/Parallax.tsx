"use client";

import { useRef } from "react";
import type { ReactNode, RefObject } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";

/**
 * Scroll-linked vertical drift. `distance` is the total travel in px across the
 * element's pass through the viewport — keep it small (20–90px); anything more
 * reads as the layout being broken rather than as depth.
 *
 * Transform only, so it stays on the compositor.
 */
export function Parallax({
  children,
  distance = 60,
  className,
  /** Share a parent's scroll progress instead of opening another observer. */
  progress,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
  progress?: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const own = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const source = progress ?? own.scrollYProgress;
  const y = useTransform(source, [0, 1], [distance * -0.5, distance * 0.5]);
  const smooth = useSpring(y, { stiffness: 120, damping: 30, mass: 0.5 });

  return (
    <motion.div ref={ref} style={{ y: smooth }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Pointer-driven parallax for hero compositions.
 * Feed it the shared pointer MotionValues so one listener drives every layer
 * rather than each layer attaching its own.
 */
export function PointerLayer({
  children,
  mx,
  my,
  depth = 8,
  className,
}: {
  children: ReactNode;
  /** Normalised -1..1 pointer offset from the container centre. */
  mx: MotionValue<number>;
  my: MotionValue<number>;
  /** Travel in px at full deflection. 2–12 is the useful range. */
  depth?: number;
  className?: string;
}) {
  const x = useTransform(mx, [-1, 1], [-depth, depth]);
  const y = useTransform(my, [-1, 1], [-depth, depth]);

  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * One pointer listener for a whole composition. Returns normalised MotionValues
 * plus the ref to attach to the container.
 */
export function usePointerField(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const smoothX = useSpring(mx, { stiffness: 90, damping: 26, mass: 0.6 });
  const smoothY = useSpring(my, { stiffness: 90, damping: 26, mass: 0.6 });

  const onPointerMove = (event: React.PointerEvent) => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return { mx: smoothX, my: smoothY, onPointerMove, onPointerLeave };
}
