import type { Metadata } from "next";
import { Target, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TechBackdrop, CornerFrame } from "@/components/ui/TechBackdrop";
import { PageHero } from "@/components/layout/PageHero";
import { Philosophy } from "@/components/home/Philosophy";
import { FounderSection } from "@/components/home/FounderSection";
import { GallerySection } from "@/components/home/GallerySection";
import { LearningJourney } from "@/components/home/LearningJourney";
import { FinalCTA } from "@/components/home/FinalCTA";
import { siteConfig } from "@/data/site";
import { SITE_URL, OG_IMAGE } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "About CoachLab | Fitness Education Institute in Chennai",
  description:
    "CoachLab Institute of Fitness Education & Science is a fitness education institute in Iyappanthangal, Porur, Chennai, founded and led by Aditya V.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About CoachLab | Fitness Education Institute in Chennai",
    description: "Why CoachLab exists, how it teaches, and who leads it.",
    url: `${SITE_URL}/about`,

      images: [OG_IMAGE],
  },
};

const purpose = [
  {
    icon: Target,
    label: "Mission",
    copy: "To make fitness education practical, understandable and applicable, helping aspiring professionals develop the knowledge and coaching ability required to serve clients responsibly.",
  },
  {
    icon: Compass,
    label: "Vision",
    copy: "To contribute to a more knowledgeable, capable and professional fitness coaching community.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About CoachLab"
        lines={["An institute", "for coaches."]}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        intro={
          <p>
            {siteConfig.fullName} is a fitness education institute in{" "}
            {siteConfig.location.short}. It runs certification programs, exam
            preparation and professional workshops for people building a career
            in fitness coaching.
          </p>
        }
        meta={[
          { label: "Type", value: "Education Institute" },
          { label: "Founder", value: siteConfig.founder.name },
          { label: "Location", value: siteConfig.location.city },
          { label: "Focus", value: "Coaching Practice" },
        ]}
        actions={
          <>
            <ButtonLink href="/courses" size="lg" arrow>
              Explore Courses
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">
              {siteConfig.cta.secondary}
            </ButtonLink>
          </>
        }
      />

      {/* ---------------------------------------------- why it exists */}
      <section className="section-y relative isolate bg-ink-2">
        <TechBackdrop grid="lg" glow="left" />

        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHeader
                index="01"
                eyebrow="Why We Exist"
                title="Fitness advice is everywhere. Fitness education isn't."
              />
            </div>

            <div className="lg:col-span-7 xl:col-start-7 xl:col-end-13">
              <div className="space-y-6 text-[0.975rem] leading-relaxed text-muted sm:text-[1.05rem]">
                <Reveal y={18}>
                  <p>
                    Anyone can find an exercise on a phone. Far fewer can
                    explain why that exercise suits the person in front of
                    them, what it asks of their joints, or what to change when
                    it does not work.
                  </p>
                </Reveal>
                <Reveal y={18} delay={0.07}>
                  <p>
                    CoachLab exists to close that gap. It is not a gym — it is a
                    classroom and a training floor, where the science is taught
                    properly and then practised until it becomes coaching.
                  </p>
                </Reveal>
                <Reveal y={18} delay={0.14}>
                  <p>
                    Every program is built the same way: understand the body,
                    learn to assess it, learn to program for it, then learn to
                    stand in front of a client and coach with confidence.
                  </p>
                </Reveal>
              </div>

              <Reveal y={20} delay={0.2}>
                <blockquote className="mt-11 border-l-2 border-gold pl-6 sm:pl-8">
                  <p className="display-wide-sm font-display text-[1.15rem] leading-[1.3] font-extrabold text-bone uppercase sm:text-[1.4rem]">
                    An institute, not a gym.
                    <br />
                    <span className="text-metal">
                      Education, not entertainment.
                    </span>
                  </p>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------- mission & vision */}
      <section className="section-y relative isolate">
        <TechBackdrop grid="sm" glow="right" />

        <Container>
          <SectionHeader
            index="02"
            eyebrow="Purpose"
            title="Mission & vision"
            subtitle="What CoachLab is working towards."
          />

          <RevealGroup className="mt-12 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-2">
            {purpose.map((item) => (
              <RevealItem key={item.label} className="flex">
                <article className="group panel relative w-full overflow-hidden p-7 transition-colors duration-500 hover:border-hairline-strong sm:p-9">
                  <CornerFrame
                    size={14}
                    className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <span className="flex size-11 items-center justify-center border border-hairline-soft bg-white/[0.02] text-gold transition-colors duration-500 group-hover:border-hairline group-hover:bg-gold/[0.07]">
                    <item.icon
                      aria-hidden
                      className="size-5"
                      strokeWidth={1.5}
                    />
                  </span>

                  <h3 className="display-wide mt-7 font-display text-[1.25rem] leading-none font-extrabold text-bone uppercase">
                    {item.label}
                  </h3>
                  <p className="mt-5 text-[0.975rem] leading-relaxed text-muted">
                    {item.copy}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <Philosophy index="03" />
      <LearningJourney index="04" />
      <FounderSection index="05" />
      <GallerySection index="06" />

      <FinalCTA
        index="—"
        eyebrow="Visit"
        headline={["Come and see", "how we teach."]}
        copy={`CoachLab runs from ${siteConfig.location.short}. Message us to talk through the programs, or to ask when the next batch begins.`}
      />
    </>
  );
}
