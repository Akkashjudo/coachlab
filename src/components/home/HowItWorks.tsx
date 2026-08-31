"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { enrolmentSteps, siteConfig } from "@/data/site";
import { whatsappEnquiry } from "@/lib/whatsapp";
import { EASE_EXPO } from "@/lib/motion";

/**
 * "What happens after I contact them?" — the question the site never answered.
 *
 * Four steps, each one restating something already documented in the FAQ. The
 * connecting rail fills with scroll, so the sequence reads as a path rather
 * than four more cards.
 */
export function HowItWorks({ index = "04" }: { index?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="enrol" className="seam-top section-y relative isolate">
      <TechBackdrop grid="lg" glow="right" />

      <Container>
        <SectionHeader
          index={index}
          eyebrow="Enrolling"
          title="How you join"
          subtitle="Four steps from first message to first session."
          action={
            <ButtonLink
              href={whatsappEnquiry()}
              variant="secondary"
              size="md"
              icon={<MessageCircle className="size-4" strokeWidth={2} />}
            >
              Start on WhatsApp
            </ButtonLink>
          }
        />

        <ol
          ref={ref}
          className="relative mt-14 grid gap-10 sm:mt-16 lg:grid-cols-4 lg:gap-8"
        >
          {/* the path — vertical on phones, horizontal from lg */}
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-[1.4375rem] w-px bg-hairline-soft lg:top-[1.4375rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-full"
          />
          <motion.span
            aria-hidden
            data-reveal=""
            style={{ scaleY: fill, transformOrigin: "top" }}
            className="absolute top-0 bottom-0 left-[1.4375rem] w-px bg-gradient-to-b from-gold-bright to-gold-muted lg:hidden"
          />
          <motion.span
            aria-hidden
            data-reveal=""
            style={{ scaleX: fill, transformOrigin: "left" }}
            className="absolute top-[1.4375rem] right-0 left-0 hidden h-px bg-gradient-to-r from-gold-bright to-gold-muted lg:block"
          />

          {enrolmentSteps.map((step, i) => (
            <motion.li
              key={step.index}
              data-reveal=""
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65, ease: EASE_EXPO, delay: i * 0.1 }}
              className="relative flex gap-5 lg:block"
            >
              <span
                aria-hidden
                className="relative z-10 flex size-[2.875rem] shrink-0 items-center justify-center rounded-full border border-hairline bg-ink"
              >
                <span className="micro text-[0.625rem] text-gold tabular-nums">
                  {step.index}
                </span>
              </span>

              <div className="min-w-0 flex-1 pt-2 lg:pt-7 lg:pr-6">
                <h3 className="display-wide font-display text-[1.15rem] leading-none font-extrabold text-bone uppercase sm:text-[1.3rem]">
                  {step.title}
                </h3>
                <p className="mt-3.5 text-[0.9rem] leading-relaxed text-muted">
                  {step.copy}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        <Reveal y={16} delay={0.1}>
          <div className="mt-14 flex flex-col gap-4 border-t border-hairline-soft pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.9rem] leading-relaxed text-muted">
              No entrance test and no prior qualification is assumed — the
              foundation program starts from first principles.
            </p>
            <ButtonLink
              href={siteConfig.phoneHref}
              variant="ghost"
              size="md"
              icon={<Phone className="size-4" strokeWidth={2} />}
              className="shrink-0"
            >
              {siteConfig.phoneDisplay}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
