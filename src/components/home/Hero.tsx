"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { MaskedHeading } from "@/components/ui/Reveal";
import { TechBackdrop, MonogramWatermark } from "@/components/ui/TechBackdrop";
import { PointerLayer, usePointerField } from "@/components/motion/Parallax";
import { HeroPlate } from "@/components/home/HeroPlate";
import { siteConfig, trustFacts } from "@/data/site";
import { EASE_EXPO } from "@/lib/motion";
import { useDesktopPointer } from "@/lib/hooks";

/**
 * The hero has one job: make a stranger understand what CoachLab is, who it is
 * for and what to do next — inside about five seconds.
 *
 * It previously opened on the brand slogan ("Build the knowledge…"), which
 * reads well but never says what the business actually is. The headline now
 * names the outcome, the sub-line names the institute, the city and the
 * format, and the strip underneath carries only facts that can be checked
 * against the data files.
 */

const T = {
  eyebrow: 0,
  headline: 0.12,
  rule: 0.5,
  plate: 0.46,
  copy: 0.58,
  actions: 0.68,
  trust: 0.82,
  strip: 0.95,
} as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const pointerOk = useDesktopPointer();
  const { mx, my, onPointerMove, onPointerLeave } = usePointerField(
    ref,
    pointerOk,
  );

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const driftY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const driftFade = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);
  const copyLift = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={ref}
      onPointerMove={pointerOk ? onPointerMove : undefined}
      onPointerLeave={pointerOk ? onPointerLeave : undefined}
      className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-40"
    >
      <TechBackdrop glow="right" />

      <motion.div style={{ y: driftY, opacity: driftFade }} aria-hidden>
        <PointerLayer mx={mx} my={my} depth={4}>
          <MonogramWatermark
            className="top-[4%] -right-[16%] hidden lg:block"
            size={720}
            opacity={0.05}
          />
        </PointerLayer>
      </motion.div>

      <Container className="relative">
        {/* 01 — what this is, and where */}
        <motion.div
          data-reveal=""
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_EXPO, delay: T.eyebrow }}
          className="flex flex-wrap items-center gap-x-3 gap-y-2"
        >
          <span aria-hidden className="size-[5px] rotate-45 bg-gold" />
          <span className="micro text-gold">
            Institute of Fitness Education &amp; Science
          </span>
          <motion.span
            aria-hidden
            data-reveal=""
            className="h-px w-6 origin-left bg-hairline-strong"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.25 }}
          />
          <span className="micro text-dim">{siteConfig.location.city}</span>
        </motion.div>

        {/* 02 — the outcome, named plainly */}
        <MaskedHeading
          as="h1"
          className="mt-7 font-display text-hero font-extrabold tracking-[-0.024em] text-bone uppercase sm:mt-9"
          lines={[
            "Train to become a",
            <span key="cert" className="text-metal">
              certified fitness coach.
            </span>,
          ]}
          delay={T.headline}
          trigger="mount"
        />

        <motion.div
          aria-hidden
          data-reveal=""
          className="rule-fade mt-10 origin-left sm:mt-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: EASE_EXPO, delay: T.rule }}
        />

        <div className="grid gap-10 pt-10 pb-10 sm:pt-12 lg:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-16">
          <motion.div style={{ y: copyLift }} className="lg:col-span-6">
            {/* 03 — the institute, the offer, the format, in one sentence */}
            <motion.p
              data-reveal=""
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_EXPO, delay: T.copy }}
              className="max-w-xl text-[1.0625rem] leading-relaxed text-muted sm:text-[1.15rem]"
            >
              CoachLab is a fitness education institute in{" "}
              <span className="text-bone">{siteConfig.location.short}</span>.
              Six professional programs in exercise science, coaching and
              nutrition — taught{" "}
              <span className="text-bone">
                half in the classroom, half on the training floor
              </span>
              .
            </motion.p>

            {/* 04 — what to do next */}
            <motion.div
              data-reveal=""
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_EXPO, delay: T.actions }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <ButtonLink href="/courses" size="lg" arrow magnetic>
                Explore Courses
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Talk to CoachLab
              </ButtonLink>
            </motion.div>
          </motion.div>

          <motion.div
            data-reveal=""
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: EASE_EXPO, delay: T.plate }}
            className="lg:col-span-6 xl:col-start-8 xl:col-end-13"
          >
            <HeroPlate mx={mx} my={my} />
          </motion.div>
        </div>

        {/* 05 — credibility, checkable against the data files */}
        <motion.dl
          data-reveal=""
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_EXPO, delay: T.trust }}
          className="grid gap-px overflow-hidden border-y border-hairline-soft bg-hairline-soft sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustFacts.map((fact) => (
            <div key={fact.label} className="bg-ink px-5 py-5 sm:px-6">
              <dt className="display-wide-sm font-display text-[1.05rem] leading-tight font-bold text-bone sm:text-[1.15rem]">
                {fact.value}
              </dt>
              <dd className="micro mt-2.5 text-[0.575rem] text-dim">
                {fact.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>

      <motion.div
        data-reveal=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_EXPO, delay: T.strip }}
        className="relative mt-10 border-t border-hairline-soft sm:mt-14"
      >
        <Container>
          <div className="flex items-center justify-between gap-6 py-4">
            <div className="flex items-center gap-3">
              <motion.span
                aria-hidden
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 2.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-gold"
              >
                <ArrowDown className="size-3.5" strokeWidth={2} />
              </motion.span>
              <span className="micro text-[0.6rem] text-dim">Scroll</span>
            </div>

            <div
              aria-hidden
              className="ticks-x hidden h-2.5 flex-1 opacity-45 sm:block"
            />

            <span className="micro text-[0.6rem] text-dim">
              Educate · Empower · Elevate
            </span>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
