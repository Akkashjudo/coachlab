import type { ReactNode } from "react";
import { DrawRule, Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Small gold-diamond eyebrow used above headings and in panels. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "micro inline-flex items-center gap-2.5 text-gold",
        className,
      )}
    >
      <span
        aria-hidden
        className="size-[5px] shrink-0 rotate-45 bg-gold"
      />
      {children}
    </span>
  );
}

type SectionHeaderProps = {
  /** Section index, e.g. "04" — rendered as a margin note. */
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Optional right-hand slot, usually a link or button. */
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
};

export function SectionHeader({
  index,
  eyebrow,
  title,
  subtitle,
  action,
  align = "left",
  className,
  titleClassName,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={cn("relative", className)}>
      {(index || eyebrow) && (
        <Reveal y={14}>
          <div
            className={cn(
              "flex items-center gap-4",
              centered && "justify-center",
            )}
          >
            {index && (
              <span className="micro text-gold-muted tabular-nums">
                {index}
              </span>
            )}
            {index && eyebrow && (
              <span aria-hidden className="h-px w-8 bg-hairline-strong" />
            )}
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          </div>
        </Reveal>
      )}

      <div
        className={cn(
          "mt-5 flex flex-col gap-6 sm:mt-6",
          !centered && action && "lg:flex-row lg:items-end lg:justify-between",
        )}
      >
        <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
          <Reveal y={20} delay={0.05}>
            <h2
              className={cn(
                "display-wide text-d2 text-bone uppercase",
                titleClassName,
              )}
            >
              {title}
            </h2>
          </Reveal>

          {subtitle && (
            <Reveal y={16} delay={0.12}>
              <p
                className={cn(
                  "mt-5 max-w-2xl text-[0.975rem] leading-relaxed text-muted sm:text-[1.0625rem]",
                  centered && "mx-auto",
                )}
              >
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>

        {action && (
          <Reveal y={16} delay={0.18} className={cn(centered && "mx-auto")}>
            {action}
          </Reveal>
        )}
      </div>

      <DrawRule className="mt-9 sm:mt-11" delay={0.15} />
    </div>
  );
}
