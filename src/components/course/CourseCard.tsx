import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CourseIcon } from "@/components/course/CourseIcon";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { CornerFrame } from "@/components/ui/TechBackdrop";
import type { Course } from "@/data/courses";
import { cn } from "@/lib/utils";

/**
 * Dark technical card. The whole card is the link; the visible "Explore"
 * affordance is decorative so screen readers get one target, not two.
 */
export function CourseCard({
  course,
  className,
  /** Caps the tag list so cards in a grid stay the same rough height. */
  maxTopics = 5,
}: {
  course: Course;
  className?: string;
  maxTopics?: number;
}) {
  const shown = course.topics.slice(0, maxTopics);
  const extra = course.topics.length - shown.length;
  const label = course.ctaLabel ?? course.shortName ?? "Program";

  return (
    <SpotlightCard
      radius={420}
      intensity={0.07}
      className={cn(
        "group panel overflow-hidden transition-[border-color,transform,box-shadow] duration-500 ease-[var(--ease-expo)]",
        "hover:-translate-y-1 hover:border-hairline-strong hover:shadow-[0_24px_60px_-32px_rgba(227,173,40,0.45)]",
        className,
      )}
    >
    <Link
      href={`/courses/${course.slug}`}
      className="flex h-full flex-col p-6 sm:p-7"
    >
      <CornerFrame
        size={12}
        className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-4">
        <span className="micro text-gold-muted tabular-nums transition-colors duration-500 group-hover:text-gold">
          {course.index}
        </span>
        <span className="flex size-10 shrink-0 items-center justify-center border border-hairline-soft bg-white/[0.02] text-gold transition-colors duration-500 group-hover:border-hairline-strong group-hover:bg-gold/[0.08]">
          <CourseIcon name={course.icon} />
        </span>
      </div>

      <h3
        className="display-wide-sm mt-7 text-[1.15rem] leading-[1.15] font-extrabold text-bone uppercase transition-colors duration-500 group-hover:text-gold-bright sm:text-[1.3rem]"
      >
        {course.title}
      </h3>

      {course.shortName && (
        <p className="micro mt-3 text-gold-muted">
          {course.shortName}
        </p>
      )}

      <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">
        {course.summary}
      </p>

      <div className="mt-6 flex-1">
        <ul className="flex flex-wrap gap-1.5">
          {shown.map((topic) => (
            <li
              key={topic}
              className="border border-hairline-soft px-2.5 py-1.5 text-[0.6875rem] leading-none text-dim transition-colors duration-500 group-hover:border-hairline group-hover:text-muted"
            >
              {topic}
            </li>
          ))}
          {extra > 0 && (
            <li className="px-2.5 py-1.5 text-[0.6875rem] leading-none text-gold-muted">
              +{extra} more
            </li>
          )}
        </ul>
      </div>

      <span
        aria-hidden
        className="mt-7 flex items-center justify-between gap-3 border-t border-hairline-soft pt-5 font-display text-[0.7rem] font-bold tracking-[0.14em] text-muted uppercase transition-colors duration-500 group-hover:text-gold"
      >
        Explore {label}
        <span className="relative flex size-4 shrink-0 overflow-hidden">
          <ArrowRight
            className="absolute size-4 transition-transform duration-400 ease-[var(--ease-expo)] group-hover:translate-x-5"
            strokeWidth={2.25}
          />
          <ArrowRight
            className="absolute size-4 -translate-x-5 transition-transform duration-400 ease-[var(--ease-expo)] group-hover:translate-x-0"
            strokeWidth={2.25}
          />
        </span>
      </span>
    </Link>
    </SpotlightCard>
  );
}
