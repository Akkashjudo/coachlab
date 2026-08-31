import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The shared background language: a fine technical grid, a soft gold
 * highlight and film grain. Every layer stays between 2% and 10% opacity so
 * nothing competes with the text sitting on top of it.
 */
export function TechBackdrop({
  className,
  grid = "lg",
  glow = "top",
  grain = true,
}: {
  className?: string;
  grid?: "lg" | "sm" | false;
  glow?: "top" | "center" | "left" | "right" | false;
  grain?: boolean;
}) {
  const glowPos: Record<string, string> = {
    top: "at 50% -10%",
    center: "at 50% 45%",
    left: "at 8% 30%",
    right: "at 92% 25%",
  };

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      {grid && (
        <div
          className={cn(
            "absolute inset-0",
            grid === "lg" ? "bg-tech-grid" : "bg-tech-grid-sm",
          )}
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 100%)",
          }}
        />
      )}

      {glow && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 50% ${glowPos[glow]}, rgba(227,173,40,0.085), transparent 70%)`,
          }}
        />
      )}

      {grain && (
        <div className="bg-grain absolute inset-0 opacity-[0.035] mix-blend-overlay" />
      )}
    </div>
  );
}

/**
 * Oversized, very quiet CoachLab monogram used as a section watermark.
 * Decorative only — hidden from assistive tech.
 */
export function MonogramWatermark({
  className,
  size = 620,
  opacity = 0.05,
  priority = false,
}: {
  className?: string;
  size?: number;
  opacity?: number;
  /** Set on the hero watermark only — it is large and above the fold. */
  priority?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute -z-10 select-none", className)}
      style={{ opacity }}
    >
      <Image
        src="/images/brand/coachlab-mark.png"
        alt=""
        width={size}
        height={Math.round((403 / 420) * size)}
        sizes={`${size}px`}
        priority={priority}
        className="h-auto"
        style={{ width: size }}
      />
    </div>
  );
}

/** Thin L-shaped corner brackets — the "technical plate" motif. */
export function CornerFrame({
  className,
  size = 14,
  color = "var(--color-hairline-strong)",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  const arm = `${size}px`;
  const common = "absolute";
  const style = { borderColor: color };

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <span
        className={cn(common, "top-0 left-0 border-t border-l")}
        style={{ ...style, width: arm, height: arm }}
      />
      <span
        className={cn(common, "top-0 right-0 border-t border-r")}
        style={{ ...style, width: arm, height: arm }}
      />
      <span
        className={cn(common, "bottom-0 left-0 border-b border-l")}
        style={{ ...style, width: arm, height: arm }}
      />
      <span
        className={cn(common, "right-0 bottom-0 border-r border-b")}
        style={{ ...style, width: arm, height: arm }}
      />
    </div>
  );
}
