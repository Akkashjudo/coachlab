"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { CourseIcon } from "@/components/course/CourseIcon";
import { pillars } from "@/data/site";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Five reasons as an editorial disclosure list rather than five identical
 * boxes — the most template-shaped part of the old layout.
 *
 * Expansion is click/keyboard driven, not hover: hover-to-expand shifts the
 * page under the cursor and leaves touch users with no way in. One row is open
 * at a time, the first by default, so the section never reads as an empty
 * stack of headings.
 */
export function WhyCoachLab({ index = "06" }: { index?: string }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const next =
      e.key === "ArrowDown"
        ? (i + 1) % pillars.length
        : e.key === "ArrowUp"
          ? (i - 1 + pillars.length) % pillars.length
          : e.key === "Home"
            ? 0
            : pillars.length - 1;
    document.getElementById(`${baseId}-${next}`)?.focus();
  };

  return (
    <section id="why" className="seam-top section-y relative isolate">
      <TechBackdrop grid="lg" glow="left" />

      <Container>
        <SectionHeader
          index={index}
          eyebrow="Why CoachLab"
          title="Why learn at CoachLab?"
          subtitle="Five things that shape how every CoachLab program is taught."
        />

        <ul className="mt-12 border-t border-hairline-soft sm:mt-14">
          {pillars.map((pillar, i) => {
            const expanded = open === i;
            return (
              <li
                key={pillar.index}
                className={cn(
                  "group border-b border-hairline-soft transition-colors duration-500",
                  expanded && "bg-white/[0.015]",
                )}
              >
                <h3>
                  <button
                    id={`${baseId}-${i}`}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`${baseId}-panel-${i}`}
                    onClick={() => setOpen(expanded ? -1 : i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className="flex w-full items-center gap-5 py-6 text-left sm:gap-8 sm:py-8"
                  >
                    <span
                      className={cn(
                        "micro shrink-0 tabular-nums transition-colors duration-500",
                        expanded ? "text-gold" : "text-gold-muted",
                      )}
                    >
                      {pillar.index}
                    </span>

                    <span
                      aria-hidden
                      className={cn(
                        "hidden h-px shrink-0 bg-hairline-strong transition-[width] duration-500 ease-[var(--ease-expo)] sm:block",
                        expanded ? "w-16" : "w-6 group-hover:w-12",
                      )}
                    />

                    <span
                      className={cn(
                        "display-wide min-w-0 flex-1 font-display text-[1.25rem] leading-tight font-extrabold uppercase transition-colors duration-500 sm:text-[1.75rem] lg:text-[2.125rem]",
                        expanded
                          ? "text-gold-bright"
                          : "text-bone group-hover:text-gold",
                      )}
                    >
                      {pillar.title}
                    </span>

                    <span
                      aria-hidden
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center border transition-[background-color,border-color,color,transform] duration-500 ease-[var(--ease-expo)] sm:size-12",
                        expanded
                          ? "border-gold bg-gold/[0.08] text-gold"
                          : "border-hairline-soft text-muted group-hover:border-hairline group-hover:text-gold",
                      )}
                    >
                      <CourseIcon name={pillar.icon} className="size-5" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      key="panel"
                      id={`${baseId}-panel-${i}`}
                      role="region"
                      aria-labelledby={`${baseId}-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE_EXPO }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-[0.95rem] leading-relaxed text-muted sm:pb-9 sm:pl-[7.5rem] sm:text-[1.05rem]">
                        {pillar.copy}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
