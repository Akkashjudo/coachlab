"use client";

import { useCallback, useRef } from "react";
import type { ElementType, ReactNode } from "react";
import { useDesktopPointer } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * A surface that warms very slightly under the cursor.
 *
 * The pointer position is written straight to CSS custom properties inside a
 * rAF callback — no React state, so moving the mouse never re-renders. Listeners
 * are only attached on precise-pointer devices that have not asked for reduced
 * motion, so phones do no pointer work at all.
 *
 * Kept deliberately dim (8% gold at the centre): this is depth, not a glow.
 */
export function SpotlightCard({
  children,
  className,
  as: Tag = "div",
  radius = 460,
  intensity = 0.08,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Size of the highlight in px. */
  radius?: number;
  /** Peak alpha of the gold at the cursor. Keep it under ~0.12. */
  intensity?: number;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);
  const enabled = useDesktopPointer();

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!enabled) return;
      const el = ref.current;
      if (!el) return;

      const { clientX, clientY } = event;
      if (frame.current) return; // coalesce to one write per frame

      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${clientX - rect.left}px`);
        el.style.setProperty("--spot-y", `${clientY - rect.top}px`);
      });
    },
    [enabled],
  );

  const onPointerLeave = useCallback(() => {
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    ref.current?.style.setProperty("--spot-opacity", "0");
  }, []);

  const onPointerEnter = useCallback(() => {
    if (!enabled) return;
    ref.current?.style.setProperty("--spot-opacity", "1");
  }, [enabled]);

  return (
    <Tag
      ref={ref}
      onPointerMove={enabled ? onPointerMove : undefined}
      onPointerEnter={enabled ? onPointerEnter : undefined}
      onPointerLeave={enabled ? onPointerLeave : undefined}
      className={cn("spotlight", className)}
      style={
        {
          "--spot-radius": `${radius}px`,
          "--spot-alpha": intensity,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
