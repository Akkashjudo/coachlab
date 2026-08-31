import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TechBackdrop, CornerFrame } from "@/components/ui/TechBackdrop";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { TheoryPractical } from "@/components/course/TheoryPractical";
import { CourseCard } from "@/components/course/CourseCard";
import { CoachingFramework } from "@/components/home/CoachingFramework";
import type { Course } from "@/data/courses";
import { currentBatch, batchFacts, siteConfig } from "@/data/site";

/* ------------------------------------------------------------------ */

export function CourseOverview({ course }: { course: Course }) {
  const isFeatured = course.slug === currentBatch.courseSlug;

  return (
    <section className="section-y relative isolate bg-ink-2">
      <TechBackdrop grid="lg" glow="left" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeader
              index="01"
              eyebrow="Overview"
              title="About this program"
            />

            <div className="mt-10 space-y-6 text-[0.975rem] leading-relaxed text-muted sm:text-[1.05rem]">
              {course.overview.map((para, i) => (
                <Reveal key={i} y={18} delay={i * 0.06}>
                  <p>{para}</p>
                </Reveal>
              ))}
            </div>

            <Reveal y={18} delay={0.2}>
              <div className="mt-10">
                <h3 className="micro text-gold">Learning areas</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {course.topics.map((topic) => (
                    <li
                      key={topic}
                      className="border border-hairline-soft px-3 py-2 text-[0.8rem] leading-none text-muted"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 xl:col-start-8 xl:col-end-13">
            <Reveal y={24}>
              {isFeatured ? <BatchPanel /> : <CoachingFramework />}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function BatchPanel() {
  return (
    <div className="panel relative overflow-hidden p-6 sm:p-8">
      <CornerFrame size={16} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 80% 0%, rgba(227,173,40,0.1), transparent 65%)",
        }}
      />

      <div className="relative flex items-center justify-between gap-4">
        <span className="micro flex items-center gap-2.5 text-gold">
          {currentBatch.isOpen && (
            <span
              aria-hidden
              className="animate-pulse-dot size-1.5 rounded-full bg-gold-bright"
            />
          )}
          {currentBatch.isOpen ? "Current Intake" : "Next Intake"}
        </span>
        <span aria-hidden className="ticks-x h-2 w-14 opacity-50" />
      </div>

      {currentBatch.isOpen ? (
        <dl className="relative mt-7 divide-y divide-hairline-soft border-y border-hairline-soft">
          {batchFacts.map((fact) => (
            <div
              key={fact.label}
              className="flex items-baseline justify-between gap-6 py-4"
            >
              <dt className="micro text-[0.6rem] text-dim">{fact.label}</dt>
              <dd className="display-wide-sm text-right font-display text-[0.95rem] font-bold text-bone sm:text-[1.05rem]">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="relative mt-7 border-y border-hairline-soft py-5 text-sm leading-relaxed text-muted">
          Contact CoachLab for upcoming batch dates.
        </p>
      )}

      <p className="relative mt-6 text-[0.8rem] leading-relaxed text-dim">
        Batch structure can change between intakes. Contact CoachLab to confirm
        the details of the intake you are considering.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function CourseAudience({ course }: { course: Course }) {
  return (
    <section className="section-y relative isolate">
      <TechBackdrop grid="lg" glow="right" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeader
              index="02"
              eyebrow="Who It's For"
              title="Is this for you?"
              subtitle="This program is built with these people in mind."
            />
          </div>

          <div className="lg:col-span-7 xl:col-start-7 xl:col-end-13">
            <RevealGroup className="divide-y divide-hairline-soft border-y border-hairline-soft">
              {course.forWhom.map((item, i) => (
                <RevealItem key={item} y={14}>
                  <div className="flex items-start gap-5 py-5">
                    <span className="micro shrink-0 pt-1 text-gold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[0.95rem] leading-relaxed text-bone sm:text-[1rem]">
                      {item}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function CourseOutcomes({ course }: { course: Course }) {
  return (
    <section className="section-y relative isolate bg-ink-2">
      <TechBackdrop grid="sm" glow="top" />

      <Container>
        <SectionHeader
          index="03"
          eyebrow="Outcomes"
          title="What you'll be able to do"
          subtitle="By the end of the program you should be able to:"
        />

        <RevealGroup className="mt-12 grid gap-px overflow-hidden border border-hairline-soft bg-hairline-soft sm:mt-14 sm:grid-cols-2">
          {course.outcomes.map((outcome) => (
            <RevealItem key={outcome} y={16}>
              <div className="flex h-full items-start gap-4 bg-ink px-6 py-6 sm:px-7">
                <span
                  aria-hidden
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center border border-hairline bg-gold/[0.07] text-gold"
                >
                  <Check className="size-3.5" strokeWidth={2.5} />
                </span>
                <p className="text-[0.925rem] leading-relaxed text-muted">
                  {outcome}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function CourseCurriculum({ course }: { course: Course }) {
  const { theory, practical, modules } = course.curriculum;
  const hasSplit = Boolean(theory?.length && practical?.length);
  if (!hasSplit && !modules?.length) return null;

  return (
    <section className="section-y relative isolate">
      <TechBackdrop grid="lg" glow="center" />

      <Container>
        <SectionHeader
          index="04"
          eyebrow="Curriculum"
          title={hasSplit ? "Theory & practical" : "Course curriculum"}
          subtitle={
            hasSplit
              ? "What you study in the classroom, and what you coach on the floor."
              : "The subject areas covered across the program."
          }
        />

        <div className="mt-12 sm:mt-14">
          {hasSplit ? (
            <TheoryPractical theory={theory!} practical={practical!} />
          ) : (
            <RevealGroup className="grid gap-px overflow-hidden border border-hairline-soft bg-hairline-soft sm:grid-cols-2 lg:grid-cols-3">
              {modules!.map((module) => (
                <RevealItem key={module.index} y={16}>
                  <div className="group flex h-full flex-col bg-ink px-6 py-7 transition-colors duration-500 hover:bg-surface">
                    <div className="flex items-center gap-4">
                      <span className="micro text-gold tabular-nums">
                        {module.index}
                      </span>
                      <span
                        aria-hidden
                        className="h-px w-6 bg-hairline-strong transition-[width] duration-500 ease-[var(--ease-expo)] group-hover:w-12"
                      />
                    </div>
                    <h3 className="display-wide-sm mt-5 text-[1rem] leading-snug font-bold text-bone uppercase">
                      {module.title}
                    </h3>
                    {module.points && (
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {module.points.map((point) => (
                          <li
                            key={point}
                            className="border border-hairline-soft px-2.5 py-1.5 text-[0.6875rem] leading-none text-dim"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                    {module.note && (
                      <p className="mt-4 text-[0.78rem] leading-relaxed text-dim">
                        {module.note}
                      </p>
                    )}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function CourseFormat({ course }: { course: Course }) {
  const isFeatured = course.slug === currentBatch.courseSlug;

  const rows =
    course.format ??
    (isFeatured && currentBatch.isOpen
      ? batchFacts.map((f) => ({ label: f.label, value: f.value }))
      : null);

  return (
    <section className="section-y-sm relative isolate bg-ink-2">
      <TechBackdrop grid="sm" glow={false} />

      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeader index="05" eyebrow="Format" title="Schedule" />
          </div>

          <div className="lg:col-span-7 xl:col-start-7 xl:col-end-13">
            <Reveal y={20}>
              {rows ? (
                <dl className="grid gap-px overflow-hidden border border-hairline-soft bg-hairline-soft sm:grid-cols-2">
                  {rows.map((row) => (
                    <div key={row.label} className="bg-ink px-6 py-5">
                      <dt className="micro text-[0.6rem] text-dim">
                        {row.label}
                      </dt>
                      <dd className="display-wide-sm mt-2.5 font-display text-[1rem] font-bold text-bone">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <div className="panel p-6 sm:p-8">
                  <p className="text-[0.975rem] leading-relaxed text-muted">
                    Schedules for this program vary by intake.{" "}
                    <Link
                      href="/contact"
                      className="text-gold underline-offset-4 transition-colors hover:text-gold-bright hover:underline"
                    >
                      Contact CoachLab
                    </Link>{" "}
                    for current details.
                  </p>
                </div>
              )}
            </Reveal>

            <Reveal y={16} delay={0.1}>
              <p className="mt-6 text-[0.85rem] leading-relaxed text-dim">
                Classes are conducted in {siteConfig.location.short}. Fees,
                batch size and enrolment steps are confirmed directly — contact
                CoachLab for current details.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function CourseFaq({ course }: { course: Course }) {
  if (!course.faqs?.length) return null;

  return (
    <section className="section-y relative isolate">
      <TechBackdrop grid="lg" glow="left" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeader
              index="06"
              eyebrow="Questions"
              title="About this program"
              subtitle="Anything else, just ask — we answer on WhatsApp."
            />
          </div>
          <div className="lg:col-span-7 xl:col-start-7 xl:col-end-13">
            <Reveal y={22}>
              <FAQAccordion items={course.faqs} defaultOpen={0} />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function RelatedCourses({
  course,
  all,
}: {
  course: Course;
  all: Course[];
}) {
  const related = all.filter((c) => c.slug !== course.slug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="section-y relative isolate bg-ink-2">
      <TechBackdrop grid="lg" glow="top" />

      <Container>
        <SectionHeader
          index="07"
          eyebrow="Other Programs"
          title="Continue exploring"
          action={
            <Link
              href="/courses"
              className="group inline-flex min-h-11 items-center gap-2 font-display text-[0.72rem] font-bold tracking-[0.14em] text-gold uppercase transition-colors hover:text-gold-bright"
            >
              All programs
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 ease-[var(--ease-expo)] group-hover:translate-x-1"
                strokeWidth={2.25}
              />
            </Link>
          }
        />

        <RevealGroup className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {related.map((item) => (
            <RevealItem key={item.slug} className="flex">
              <CourseCard course={item} className="w-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
