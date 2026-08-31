"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { MaskedHeading, Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { TechBackdrop, MonogramWatermark } from "@/components/ui/TechBackdrop";
import { batchFacts, currentBatch } from "@/data/site";
import { featuredCourse } from "@/data/courses";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The flagship program told as a scroll narrative: the title holds still on the
 * left while its six stages pass on the right, a gold rail filling behind them.
 *
 * One `useScroll` drives the rail. Each stage owns a cheap `useInView` with a
 * centred margin so "active" means "the stage you are actually reading",
 * rather than six competing scroll listeners.
 */
export function FeaturedCPT() {
  const ref = useRef<HTMLDivElement>(null);
  const story = featuredCourse.story ?? [];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 75%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="cpt" className="relative isolate overflow-hidden section-y">
      <TechBackdrop grid="sm" glow="center" />
      <MonogramWatermark
        className="-top-24 -left-32 hidden xl:block"
        size={560}
        opacity={0.035}
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* ---------------------------------------------- sticky column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal y={14}>
              <div className="flex items-center gap-4">
                <span className="micro text-gold-muted tabular-nums">04</span>
                <span aria-hidden className="h-px w-8 bg-hairline-strong" />
                <Eyebrow>Featured Program</Eyebrow>
              </div>
            </Reveal>

            <MaskedHeading
              className="display-wide mt-6 text-d2 text-bone uppercase"
              lines={["Certified", "Personal", "Trainer"]}
            />

            <Reveal y={16} delay={0.1}>
              <p className="micro mt-5 text-gold">CPT</p>
            </Reveal>

            <Reveal y={18} delay={0.16}>
              <p className="mt-7 max-w-md text-[0.975rem] leading-relaxed text-muted sm:text-[1.05rem]">
                A structured foundation for aspiring personal trainers. Four
                theory sessions build the science; six practical sessions turn
                it into coaching you can do on the floor.
              </p>
            </Reveal>

            {currentBatch.isOpen && (
              <Reveal y={18} delay={0.2}>
                <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-hairline-soft bg-hairline-soft">
                  {batchFacts.map((fact) => (
                    <div key={fact.label} className="bg-surface px-4 py-3.5">
                      <dt className="micro text-[0.55rem] text-dim">
                        {fact.label}
                      </dt>
                      <dd className="mt-1.5 font-display text-[0.9rem] leading-tight font-bold text-bone">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}

            <Reveal y={18} delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <ButtonLink
                  href={`/courses/${featuredCourse.slug}`}
                  size="lg"
                  arrow
                  magnetic
                >
                  Full CPT Curriculum
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary" size="lg">
                  Enquire
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* ---------------------------------------------- scrolling arc */}
          <div ref={ref} className="relative lg:col-span-7 xl:col-start-7 xl:col-end-13">
            <span
              aria-hidden
              className="absolute top-2 bottom-2 left-[1.0625rem] w-px bg-hairline-soft sm:left-[1.3125rem]"
            />
            <motion.span
              aria-hidden
              data-reveal=""
              style={{ scaleY: fill, transformOrigin: "top" }}
              className="absolute top-2 bottom-2 left-[1.0625rem] w-px bg-gradient-to-b from-gold-bright via-gold to-gold-muted sm:left-[1.3125rem]"
            />

            <ol className="space-y-10 sm:space-y-14">
              {story.map((stage) => (
                <Stage key={stage.index} stage={stage} />
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stage({
  stage,
}: {
  stage: { index: string; title: string; copy: string; tags?: string[] };
}) {
  const ref = useRef<HTMLLIElement>(null);
  /* "Active" = sitting in the middle band of the viewport, i.e. being read. */
  const active = useInView(ref, { margin: "-42% 0px -42% 0px" });

  return (
    <motion.li
      ref={ref}
      data-reveal=""
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE_EXPO }}
      className="relative flex gap-5 sm:gap-7"
    >
      <span
        aria-hidden
        className={cn(
          "relative z-10 mt-1 flex size-[2.125rem] shrink-0 items-center justify-center rounded-full border bg-ink transition-[border-color,background-color,transform] duration-500 ease-[var(--ease-expo)] sm:size-[2.75rem]",
          active
            ? "scale-105 border-gold bg-gold/[0.08]"
            : "border-hairline-soft",
        )}
      >
        <span
          className={cn(
            "micro text-[0.55rem] tabular-nums transition-colors duration-500 sm:text-[0.625rem]",
            active ? "text-gold" : "text-dim",
          )}
        >
          {stage.index}
        </span>
      </span>

      <div className="min-w-0 flex-1 pb-1">
        <h3
          className={cn(
            "display-wide font-display text-[1.25rem] leading-none font-extrabold uppercase transition-colors duration-500 sm:text-[1.6rem]",
            active ? "text-bone" : "text-muted",
          )}
        >
          {stage.title}
        </h3>

        <p
          className={cn(
            "mt-4 max-w-xl text-[0.925rem] leading-relaxed transition-colors duration-500 sm:text-[0.975rem]",
            active ? "text-muted" : "text-dim",
          )}
        >
          {stage.copy}
        </p>

        {stage.tags && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {stage.tags.map((tag) => (
              <li
                key={tag}
                className={cn(
                  "border px-2.5 py-1.5 text-[0.6875rem] leading-none transition-colors duration-500",
                  active
                    ? "border-hairline text-muted"
                    : "border-hairline-soft text-dim",
                )}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.li>
  );
}
