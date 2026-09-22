import type { Metadata } from "next";
import { CalendarClock, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TechBackdrop, CornerFrame } from "@/components/ui/TechBackdrop";
import { PageHero } from "@/components/layout/PageHero";
import { FinalCTA } from "@/components/home/FinalCTA";
import { workshopTopics } from "@/data/workshops";
import { SITE_URL, OG_IMAGE } from "@/lib/site-url";
import { siteConfig } from "@/data/site";
import { whatsappEnquiry } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Fitness Workshops in Chennai | Continuing Education for Coaches",
  description:
    "CoachLab Professional Workshops in Chennai — strength and conditioning, functional training, sports nutrition, corrective exercise, physique coaching, fitness business and guest masterclasses.",
  alternates: { canonical: "/workshops" },
  openGraph: {
    title: "CoachLab Professional Workshops | Chennai",
    description:
      "Focused continuing-education sessions for working fitness professionals.",
    url: `${SITE_URL}/workshops`,

      images: [OG_IMAGE],
  },
};

export default function WorkshopsPage() {
  return (
    <>
      <PageHero
        eyebrow="Professional Workshops"
        lines={[
          "Professional development",
          "doesn't end with",
          "one certification.",
        ]}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Workshops", href: "/workshops" },
        ]}
        intro={
          <p>
            Short, single-subject sessions for coaches who are already working
            and want to go deeper on one thing at a time — taught by working
            professionals, including invited guests.
          </p>
        }
        meta={[
          { label: "Format", value: "Standalone Sessions" },
          { label: "Subjects", value: String(workshopTopics.length) },
          { label: "Schedule", value: "On enquiry" },
          { label: "Location", value: siteConfig.location.city },
        ]}
        actions={
          <>
            <ButtonLink href={whatsappEnquiry("upcoming workshops")} size="lg" arrow>
              Ask About Upcoming Workshops
            </ButtonLink>
            <ButtonLink href="/courses" variant="secondary" size="lg">
              See Certifications
            </ButtonLink>
          </>
        }
      />

      {/* ---------------------------------------------- schedule notice */}
      <section className="section-y-sm relative isolate bg-ink-2">
        <TechBackdrop grid="sm" glow={false} />
        <Container>
          <Reveal y={20}>
            <div className="panel relative flex flex-col gap-5 overflow-hidden p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <CornerFrame size={14} />
              <div className="relative flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center border border-hairline bg-gold/[0.06] text-gold">
                  <CalendarClock
                    aria-hidden
                    className="size-5"
                    strokeWidth={1.5}
                  />
                </span>
                <div>
                  <h2 className="display-wide-sm text-[1rem] leading-snug font-bold text-bone uppercase">
                    Upcoming workshop dates
                  </h2>
                  <p className="mt-2 max-w-xl text-[0.925rem] leading-relaxed text-muted">
                    Workshop schedules vary by subject and by guest availability.
                    Contact us for upcoming workshop schedules.
                  </p>
                </div>
              </div>

              <div className="relative shrink-0">
                <ButtonLink
                  href={whatsappEnquiry("upcoming workshops")}
                  variant="secondary"
                  size="md"
                  arrow
                >
                  Ask About Dates
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------- subjects */}
      <section className="section-y relative isolate">
        <TechBackdrop grid="lg" glow="top" />

        <Container>
          <SectionHeader
            index="01"
            eyebrow="Subjects"
            title="What workshops cover"
            subtitle="Subjects rotate through the year. Each session stands on its own — no prior CoachLab program is required."
          />

          {/* One dense grid rather than a section per group — several groups
              hold a single subject and stranded them in a three-column row.
              The group now rides on the card, and a closing enquiry tile keeps
              the grid square at both two and three columns. */}
          <RevealGroup className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {workshopTopics.map((topic) => (
              <RevealItem key={topic.index} className="flex">
                <article className="group panel relative w-full overflow-hidden p-6 transition-[border-color,transform] duration-500 ease-[var(--ease-expo)] hover:-translate-y-1 hover:border-hairline-strong">
                  <CornerFrame
                    size={12}
                    className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  {/* the index, again, at architectural scale */}
                  <span
                    aria-hidden
                    className="ghost-numeral pointer-events-none absolute -right-2 -bottom-5 text-[5rem] transition-opacity duration-500 group-hover:opacity-70 sm:-bottom-6 sm:text-[7rem]"
                  >
                    {topic.index}
                  </span>

                  <div className="relative flex items-center justify-between gap-4">
                    <span className="micro text-gold-muted tabular-nums transition-colors duration-500 group-hover:text-gold">
                      {topic.index}
                    </span>
                    <span className="micro border border-hairline-soft px-2 py-1.5 text-[0.55rem] text-dim">
                      {topic.group}
                    </span>
                  </div>
                  <h3 className="display-wide-sm relative mt-6 text-[1.05rem] leading-snug font-bold text-bone uppercase">
                    {topic.title}
                  </h3>
                  <p className="relative mt-3.5 text-[0.9rem] leading-relaxed text-muted">
                    {topic.copy}
                  </p>
                </article>
              </RevealItem>
            ))}

            <RevealItem className="flex">
              <a
                href={whatsappEnquiry("workshop subjects")}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex w-full flex-col justify-between overflow-hidden rounded-[4px] border border-dashed border-hairline p-6 transition-colors duration-500 hover:border-gold hover:bg-gold/[0.04]"
              >
                <span className="micro text-gold">Something else?</span>
                <span className="display-wide-sm mt-6 text-[1.05rem] leading-snug font-bold text-bone uppercase">
                  Ask about a subject
                </span>
                <span className="mt-3.5 text-[0.9rem] leading-relaxed text-muted">
                  Tell us what you want to go deeper on and we&apos;ll let you
                  know when it next runs.
                </span>
                <span
                  aria-hidden
                  className="mt-6 flex items-center gap-2 font-display text-[0.7rem] font-bold tracking-[0.14em] text-gold uppercase"
                >
                  Message CoachLab
                  <ArrowRight
                    className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5"
                    strokeWidth={2.25}
                  />
                </span>
              </a>
            </RevealItem>
          </RevealGroup>

          <Reveal y={16} delay={0.1}>
            <p className="mt-14 max-w-2xl text-[0.85rem] leading-relaxed text-dim">
              Workshop subjects listed here indicate the areas CoachLab teaches.
              Availability, format and fees vary by session — contact CoachLab
              for current details.
            </p>
          </Reveal>
        </Container>
      </section>

      <FinalCTA
        index="—"
        eyebrow="Workshops"
        headline={["Tell us what", "you want to", "go deeper on."]}
        copy="Message CoachLab with the subject you're interested in and we'll let you know when the next session on it runs."
      />
    </>
  );
}
