"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { MaskedHeading, Reveal, DrawRule } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import {
  TechBackdrop,
  CornerFrame,
  MonogramWatermark,
} from "@/components/ui/TechBackdrop";
import { siteConfig } from "@/data/site";
import { EASE_EXPO } from "@/lib/motion";

export function FounderSection({ index = "06" }: { index?: string }) {
  const { founder } = siteConfig;

  return (
    <section id="founder" className="seam-top section-y relative isolate bg-ink-2">
      <TechBackdrop grid="lg" glow="right" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-20">
          <div className="lg:col-span-5">
            <FounderPortrait />
          </div>

          <div className="lg:col-span-7">
            <Reveal y={14}>
              <div className="flex items-center gap-4">
                <span className="micro text-gold-muted tabular-nums">
                  {index}
                </span>
                <span aria-hidden className="h-px w-8 bg-hairline-strong" />
                <Eyebrow>The Educator</Eyebrow>
              </div>
            </Reveal>

            <MaskedHeading
              className="display-wide mt-6 text-d2 text-bone uppercase"
              lines={["The educator", "behind CoachLab."]}
            />

            <DrawRule className="mt-9" />

            <Reveal y={18} delay={0.1}>
              <p className="display-wide mt-9 font-display text-[1.5rem] leading-none font-extrabold text-metal uppercase sm:text-[1.85rem]">
                {founder.name}
              </p>
            </Reveal>

            <Reveal y={16} delay={0.16}>
              <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                {founder.roles.map((role, i) => (
                  <li key={role} className="flex items-center gap-3">
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="size-[4px] rotate-45 bg-gold-muted"
                      />
                    )}
                    <span className="micro text-[0.625rem] text-muted">
                      {role}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal y={18} delay={0.22}>
              <p className="mt-8 max-w-xl text-[0.975rem] leading-relaxed text-muted sm:text-[1.05rem]">
                {founder.bio}
              </p>
            </Reveal>

            <Reveal y={18} delay={0.28}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <ButtonLink href="/about" variant="secondary" size="md" arrow>
                  About CoachLab
                </ButtonLink>
                <ButtonLink href="/contact" variant="ghost" size="md">
                  {siteConfig.cta.secondary}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Framed portrait with a wipe reveal: a solid panel slides off the frame while
 * the photograph settles from a 1.06 scale. The face itself is never animated
 * beyond that single settle — it is a person, not a graphic.
 *
 * Swapping in a new photograph means changing `siteConfig.founder.image`; if
 * that is ever empty the component falls back to a designed monogram plate
 * rather than a broken image or stock photography.
 */
export function FounderPortrait({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  const { founder } = siteConfig;
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.35 });

  /*
   * The wipe covers the photograph until it is revealed, so "never revealed"
   * must be impossible. Two independent triggers clear it: the observer, and a
   * hard timeout for the cases the observer cannot cover (a background tab at
   * load, a throttled renderer). CSS removes the panel outright for
   * reduced-motion and no-JS visitors — see `.reveal-wipe` in globals.css.
   */
  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setTimedOut(true), 1600);
    return () => window.clearTimeout(t);
  }, []);
  const revealed = seen || timedOut;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lift = useTransform(scrollYProgress, [0, 1], [14, -14]);

  return (
    <motion.figure
      ref={ref}
      data-reveal=""
      initial={{ opacity: 0, y: 26 }}
      animate={revealed ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
      className={`panel relative mx-auto w-full max-w-[26rem] overflow-hidden p-3 sm:p-4 ${className}`}
    >
      <CornerFrame size={16} />

      <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-2">
        {founder.image ? (
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.06 }}
            animate={revealed ? { scale: 1 } : undefined}
            transition={{ duration: 1.4, ease: EASE_EXPO, delay: 0.15 }}
          >
            <Image
              src={founder.image}
              alt={`${founder.name}, ${founder.roles.join(", ")} at ${siteConfig.name}`}
              fill
              priority={priority}
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 420px"
              className="object-cover object-top"
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <MonogramWatermark className="relative" size={180} opacity={0.3} />
          </div>
        )}

        {/* the wipe */}
        <motion.span
          aria-hidden
          initial={{ scaleY: 1 }}
          animate={revealed ? { scaleY: 0 } : undefined}
          transition={{ duration: 0.95, ease: EASE_EXPO, delay: 0.1 }}
          style={{ transformOrigin: "bottom" }}
          className="reveal-wipe absolute inset-0 z-10 bg-ink-2"
        />

        {/* scrim so the bright photograph resolves into the dark page */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.28) 0%, rgba(5,5,5,0) 26%, rgba(5,5,5,0.12) 62%, rgba(5,5,5,0.82) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 shadow-[inset_0_0_90px_28px_rgba(5,5,5,0.55)]"
        />

        <motion.figcaption
          style={{ y: lift }}
          className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5"
        >
          <span className="display-wide font-display text-[0.95rem] leading-none font-extrabold tracking-[0.08em] text-bone uppercase">
            {founder.name}
          </span>
          <span className="micro text-[0.55rem] text-gold">Founder</span>
        </motion.figcaption>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 px-1 sm:mt-4">
        <span className="micro text-[0.55rem] text-dim">
          {siteConfig.location.city}
        </span>
        <span aria-hidden className="ticks-x h-2 w-20 opacity-45" />
      </div>
    </motion.figure>
  );
}
