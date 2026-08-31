import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ValueStrip } from "@/components/home/ValueStrip";
import { Intro } from "@/components/home/Intro";
import { CoursesSection } from "@/components/home/CoursesSection";
import { FeaturedCPT } from "@/components/home/FeaturedCPT";
import { CurriculumSection } from "@/components/home/CurriculumSection";
import { WhyCoachLab } from "@/components/home/WhyCoachLab";
import { Philosophy } from "@/components/home/Philosophy";
import { LearningJourney } from "@/components/home/LearningJourney";
import { FounderSection } from "@/components/home/FounderSection";
import { GallerySection } from "@/components/home/GallerySection";
import { AudienceSection } from "@/components/home/AudienceSection";
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <ValueStrip />
      <Intro />
      <CoursesSection />
      <FeaturedCPT />
      <CurriculumSection />
      <WhyCoachLab />
      <Philosophy />
      <LearningJourney />
      <FounderSection />
      <GallerySection />
      <AudienceSection />
      <WorkshopsTeaser />
      <FaqSection />
      <FinalCTA />
    </>
  );
}
