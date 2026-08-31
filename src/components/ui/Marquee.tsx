import { cn } from "@/lib/utils";

/**
 * CSS-only infinite marquee — no JS, no layout thrash.
 * The track holds two identical runs and slides by exactly -50%, so the loop
 * is seamless. The duplicate run is hidden from assistive technology, and the
 * whole thing stops moving under prefers-reduced-motion.
 */

function Run({
  items,
  separator,
  duplicate,
}: {
  items: readonly string[];
  separator: string;
  /** The second run is decorative — screen readers must not read it twice. */
  duplicate?: boolean;
}) {
  return (
    <ul aria-hidden={duplicate || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="font-display px-6 text-[0.8rem] font-bold tracking-[0.2em] whitespace-nowrap text-bone/85 uppercase sm:px-9 sm:text-[0.95rem]">
            {item}
          </span>
          <span aria-hidden className="text-[0.55rem] text-gold">
            {separator}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Marquee({
  items,
  duration = 46,
  className,
  separator = "◆",
}: {
  items: readonly string[];
  duration?: number;
  className?: string;
  separator?: string;
}) {
  return (
    <div
      className={cn("group relative flex overflow-hidden py-5 sm:py-6", className)}
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div
        className="animate-marquee flex w-max will-change-transform group-hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <Run items={items} separator={separator} />
        <Run items={items} separator={separator} duplicate />
      </div>
    </div>
  );
}
