"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CourseCard } from "@/components/course/CourseCard";
import { categoryFilters, type Course } from "@/data/courses";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function CourseFilterGrid({ courses }: { courses: Course[] }) {
  const [active, setActive] = useState<string>("all");

  const visible = useMemo(
    () =>
      active === "all"
        ? courses
        : courses.filter((course) => course.category === active),
    [active, courses],
  );

  /* Only offer a filter that actually matches something. */
  const filters = categoryFilters.filter(
    (f) => f.id === "all" || courses.some((c) => c.category === f.id),
  );

  return (
    <div>
      {/* Toggle buttons, not a tablist — there are no tabpanels to control. */}
      <div
        role="group"
        aria-label="Filter programs by type"
        className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
      >
        {filters.map((filter) => {
          const selected = active === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(filter.id)}
              className={cn(
                "min-h-11 shrink-0 rounded-[3px] border px-4 py-2.5 font-display text-[0.68rem] font-bold tracking-[0.12em] uppercase transition-colors duration-300",
                selected
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-hairline-soft text-muted hover:border-hairline hover:text-bone",
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="micro mt-6 text-[0.6rem] text-dim">
        Showing {visible.length} of {courses.length} programs
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((course) => (
            <motion.div
              key={course.slug}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE_EXPO }}
              className="flex"
            >
              <CourseCard course={course} className="w-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
