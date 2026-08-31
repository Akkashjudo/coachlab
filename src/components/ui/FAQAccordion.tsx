"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import type { Faq } from "@/data/faqs";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Accessible accordion: a real button per row carrying `aria-expanded` and
 * `aria-controls`, and a labelled region for the answer. Arrow keys move
 * between headers, Home/End jump to the ends.
 */
export function FAQAccordion({
  items,
  className,
  /** Index opened on first render. Pass -1 to start fully collapsed. */
  defaultOpen = 0,
}: {
  items: Faq[];
  className?: string;
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();

    const next =
      e.key === "ArrowDown"
        ? (i + 1) % items.length
        : e.key === "ArrowUp"
          ? (i - 1 + items.length) % items.length
          : e.key === "Home"
            ? 0
            : items.length - 1;

    document.getElementById(`${baseId}-btn-${next}`)?.focus();
  };

  return (
    <div className={cn("border-t border-hairline-soft", className)}>
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.q} className="border-b border-hairline-soft">
            <h3>
              <button
                id={`${baseId}-btn-${i}`}
                type="button"
                aria-expanded={expanded}
                aria-controls={`${baseId}-panel-${i}`}
                onClick={() => setOpen(expanded ? -1 : i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="group flex w-full items-start justify-between gap-5 py-5 text-left sm:gap-8 sm:py-6"
              >
                <span className="flex min-w-0 flex-1 items-start gap-4 sm:gap-6">
                  <span className="micro shrink-0 pt-1 text-gold-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-[1rem] leading-snug font-medium transition-colors duration-300 sm:text-[1.075rem]",
                      expanded
                        ? "text-gold"
                        : "text-bone group-hover:text-gold-bright",
                    )}
                  >
                    {item.q}
                  </span>
                </span>

                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 flex size-7 shrink-0 items-center justify-center border transition-[transform,border-color,background-color,color] duration-400 ease-[var(--ease-expo)]",
                    expanded
                      ? "rotate-45 border-gold bg-gold/10 text-gold"
                      : "border-hairline-soft text-muted group-hover:border-hairline group-hover:text-gold",
                  )}
                >
                  <Plus className="size-3.5" strokeWidth={2} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="panel"
                  id={`${baseId}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${baseId}-btn-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: EASE_EXPO }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-[0.925rem] leading-relaxed text-muted sm:pr-16 sm:pb-8 sm:pl-[3.25rem] sm:text-[0.975rem]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
