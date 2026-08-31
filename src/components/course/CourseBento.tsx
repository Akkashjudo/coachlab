"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CourseIcon } from "@/components/course/CourseIcon";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { CornerFrame } from "@/components/ui/TechBackdrop";
import type { Course } from "@/data/courses";
import { currentBatch } from "@/data/site";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Asymmetric course grid. Six identical rectangles said every program carries
 * equal weight; CPT is the foundation course and the one with an open intake,
 * so it gets the largest cell and the only batch flag.
 *
 * Placement is declared per slug rather than by index, so reordering the data
 * file cannot silently break the composition.
 */
const SPAN: Record<string, string> = {
  "certified-personal-trainer":
    "sm:col-span-2 lg:col-span-7 lg:row-span-2",
  "advanced-certified-personal-trainer": "lg:col-span-5",
  "fitness-nutrition-coach": "lg:col-span-5",
  "group-fitness-instructor": "lg:col-span-4",
  "ace-exam-prep": "lg:col-span-4",
  "professional-workshops": "sm:col-span-2 lg:col-span-4",
};

/** Data order differs from visual order — the bento needs CFNC in row two. */
const ORDER = [
  "certified-personal-trainer",
  "advanced-certified-personal-trainer",
  "fitness-nutrition-coach",
  "group-fitness-instructor",
  "ace-exam-prep",
  "professional-workshops",
];

export function CourseBento({ courses }: { courses: Course[] }) {
  const laid = ORDER.map((slug) => courses.find((c) => c.slug === slug)).filter(
    (c): c is Course => Boolean(c),
  );
  /* Anything new in the data file still shows up, just in the default cell. */
  const rest = courses.filter((c) => !ORDER.includes(c.slug));

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12"
    >
      {[...laid, ...rest].map((course) => (
        <BentoCard
          key={course.slug}
          course={course}
          featured={course.slug === "certified-personal-trainer"}
          className={SPAN[course.slug] ?? "lg:col-span-4"}
        />
      ))}
    </motion.div>
  );
}

function BentoCard({
  course,
  featured,
  className,
}: {
  course: Course;
  featured?: boolean;
  className?: string;
}) {
  const label = course.ctaLabel ?? course.shortName ?? "Program";
  const hasBatch =
    featured && course.slug === currentBatch.courseSlug && currentBatch.isOpen;
  const theory = currentBatch.theorySessions;
  const practical = currentBatch.practicalSessions;

  return (
    <motion.div
      data-reveal=""
      variants={{
        hidden: { opacity: 0, y: 26 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: EASE_EXPO },
        },
      }}
      className={cn("flex", className)}
    >
      <SpotlightCard
        radius={featured ? 620 : 420}
        intensity={featured ? 0.1 : 0.07}
        className="group panel w-full overflow-hidden transition-[border-color,transform] duration-500 ease-[var(--ease-expo)] hover:-translate-y-1 hover:border-hairline-strong"
      >
        <Link
          href={`/courses/${course.slug}`}
          className={cn(
            "flex h-full flex-col p-6 focus-visible:outline-none sm:p-7",
            featured && "lg:p-9",
          )}
        >
          <CornerFrame
            size={featured ? 16 : 12}
            className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {featured && (
            <span
              aria-hidden
              className="ghost-numeral pointer-events-none absolute -right-4 -bottom-8 text-[5.5rem] transition-opacity duration-700 group-hover:opacity-70 sm:-bottom-10 sm:text-[10rem] lg:text-[13rem]"
            >
              {course.index}
            </span>
          )}

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="micro text-gold-muted tabular-nums transition-colors duration-500 group-hover:text-gold">
                {course.index}
              </span>
              {hasBatch && (
                <span className="micro flex items-center gap-2 border border-hairline px-2.5 py-1.5 text-[0.55rem] text-gold">
                  <span
                    aria-hidden
                    className="animate-pulse-dot size-1 rounded-full bg-gold-bright"
                  />
                  Intake open
                </span>
              )}
            </div>
            <span
              className={cn(
                "flex shrink-0 items-center justify-center border border-hairline-soft bg-white/[0.02] text-gold transition-[background-color,border-color,transform] duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-0.5 group-hover:border-hairline-strong group-hover:bg-gold/[0.08]",
                featured ? "size-12" : "size-10",
              )}
            >
              <CourseIcon
                name={course.icon}
                className={featured ? "size-6" : "size-5"}
              />
            </span>
          </div>

          <h3
            className={cn(
              "display-wide-sm mt-7 leading-[1.12] font-extrabold text-bone uppercase transition-colors duration-500 group-hover:text-gold-bright",
              featured
                ? "text-[1.5rem] sm:text-[1.9rem] lg:text-[2.4rem]"
                : "text-[1.15rem] sm:text-[1.3rem]",
            )}
          >
            {course.title}
          </h3>

          {course.shortName && (
            <p className="micro mt-3 text-gold-muted">{course.shortName}</p>
          )}

          <p
            className={cn(
              "mt-4 leading-relaxed text-muted",
              featured ? "max-w-lg text-[0.95rem] sm:text-[1.03rem]" : "text-[0.9rem]",
            )}
          >
            {featured ? (course.overview[0] ?? course.summary) : course.summary}
          </p>

          <div className={cn("mt-6", !featured && "flex-1")}>
            <ul className="flex flex-wrap gap-1.5">
              {course.topics.slice(0, featured ? 6 : 4).map((topic) => (
                <li
                  key={topic}
                  className="border border-hairline-soft px-2.5 py-1.5 text-[0.6875rem] leading-none text-dim transition-colors duration-500 group-hover:border-hairline group-hover:text-muted"
                >
                  {topic}
                </li>
              ))}
              {course.topics.length > (featured ? 6 : 4) && (
                <li className="px-2.5 py-1.5 text-[0.6875rem] leading-none text-gold-muted">
                  +{course.topics.length - (featured ? 6 : 4)} more
                </li>
              )}
            </ul>
          </div>

          {/* The flagship cell is tall enough to leave a void under the tags.
              A proportion bar of the real session split fills it with the
              detail that actually distinguishes this program. */}
          {featured && (
            <div className="mt-8">
              <div className="flex items-baseline justify-between gap-4">
                <span className="micro text-[0.55rem] text-dim">
                  Programme structure
                </span>
                <span className="micro text-[0.55rem] text-gold-muted tabular-nums">
                  {theory + practical} sessions
                </span>
              </div>

              <div
                aria-hidden
                className="mt-3 flex h-1.5 overflow-hidden bg-hairline-soft"
              >
                <span
                  className="bg-gold-muted"
                  style={{ width: `${(theory / (theory + practical)) * 100}%` }}
                />
                <span
                  className="bg-gold"
                  style={{ width: `${(practical / (theory + practical)) * 100}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-[0.75rem] text-muted">
                  <span aria-hidden className="size-2 bg-gold-muted" />
                  {theory} Theory
                </span>
                <span className="flex items-center gap-2 text-[0.75rem] text-muted">
                  <span aria-hidden className="size-2 bg-gold" />
                  {practical} Practical
                </span>
              </div>
            </div>
          )}

          {/* Featured card carries the batch facts inline — they are the
              strongest conversion detail on the page. */}
          {hasBatch && (
            <dl className="mt-7 mb-7 hidden gap-px overflow-hidden border border-hairline-soft bg-hairline-soft sm:grid sm:grid-cols-3">
              {[
                { k: "Starts", v: currentBatch.startDate },
                { k: "Duration", v: currentBatch.duration },
                { k: "Schedule", v: currentBatch.schedule },
              ].map((f) => (
                <div key={f.k} className="bg-surface-2 px-4 py-3.5">
                  <dt className="micro text-[0.55rem] text-dim">{f.k}</dt>
                  <dd className="mt-1.5 font-display text-[0.9rem] font-bold text-bone">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <span
            aria-hidden
            className="mt-auto flex items-center justify-between gap-3 border-t border-hairline-soft pt-5 font-display text-[0.7rem] font-bold tracking-[0.14em] text-muted uppercase transition-colors duration-500 group-hover:text-gold"
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
    </motion.div>
  );
}
