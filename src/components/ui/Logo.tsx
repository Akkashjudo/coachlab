import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The supplied logo, unmodified. The gold artwork has been cut out of its
 * original black field into a transparent PNG so it can sit on any dark
 * surface without a visible box. Aspect ratios are never altered.
 */

type LogoProps = {
  /** "lockup" = monogram + wordmark + tagline. "mark" = monogram only. */
  variant?: "lockup" | "mark";
  className?: string;
  priority?: boolean;
  /** Rendered width in px — height follows the artwork's own ratio. */
  width?: number;
};

const ART = {
  lockup: { src: "/images/brand/coachlab-logo.png", w: 900, h: 569 },
  mark: { src: "/images/brand/coachlab-mark.png", w: 420, h: 403 },
} as const;

export function Logo({
  variant = "lockup",
  className,
  priority = false,
  width,
}: LogoProps) {
  const art = ART[variant];
  const w = width ?? (variant === "lockup" ? 200 : 44);
  const h = Math.round((art.h / art.w) * w);

  return (
    <Image
      src={art.src}
      alt={`${siteConfig.name} — ${siteConfig.tagline}`}
      width={w}
      height={h}
      priority={priority}
      sizes={`${w}px`}
      className={cn("h-auto w-auto select-none", className)}
      style={{ width: w, height: h }}
    />
  );
}

/** Navbar / footer lock-up: the mark beside a typeset name. */
export function LogoLink({
  className,
  markWidth = 38,
  onClick,
}: {
  className?: string;
  markWidth?: number;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "group flex shrink-0 items-center gap-2.5 rounded-sm sm:gap-3",
        className,
      )}
    >
      <Logo variant="mark" width={markWidth} priority />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-display text-[0.95rem] leading-none font-extrabold tracking-[0.14em] text-bone sm:text-[1.05rem]">
          COACHLAB
        </span>
        <span className="micro mt-1.5 hidden text-[0.5rem] tracking-[0.2em] text-gold-muted sm:block">
          Fitness Education &amp; Science
        </span>
      </span>
    </Link>
  );
}
