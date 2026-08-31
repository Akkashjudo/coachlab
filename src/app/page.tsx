import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ValueStrip } from "@/components/home/ValueStrip";
import { ProofStrip } from "@/components/home/ProofStrip";
import { CoursesSection } from "@/components/home/CoursesSection";
import { FeaturedCPT } from "@/components/home/FeaturedCPT";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyCoachLab } from "@/components/home/WhyCoachLab";
import { Philosophy } from "@/components/home/Philosophy";
import { FounderSection } from "@/components/home/FounderSection";
import { WorkshopsTeaser } from "@/components/home/WorkshopsTeaser";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** FAQ rich result — mirrors exactly what is rendered on the page. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

/**
 * Homepage running order.
 *
 * Built as a decision path — see it, understand it, trust it, explore it,
 * decide, act — rather than as a catalogue of everything CoachLab could say.
 *
 * Four sections were cut because they all argued the same point (that the
 * teaching is half theory, half practice): Intro, the standalone Theory &
 * Practical grid, the Learning Journey timeline, and Philosophy's prose. The
 * argument now lives once, in the CPT scroll narrative, where it is attached
 * to the actual curriculum. The full Theory/Practical module grid still exists
 * in full on the CPT course page, where someone weighing up enrolment will
 * look for it.
 *
 * Two sections were added because visitors had no answer to them: proof of a
 * real institute (moved up from position eleven), and how enrolment works.
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* see + understand */}
      <Hero />
      <ValueStrip />

      {/* trust */}
      <ProofStrip />

      {/* explore */}
      <CoursesSection />
      <FeaturedCPT />

      {/* decide */}
      <HowItWorks />
      <WhyCoachLab />
      <Philosophy compact />
      <FounderSection />
      <WorkshopsTeaser />

      {/* act */}
      <FaqSection />
      <FinalCTA />
    </>
  );
}
