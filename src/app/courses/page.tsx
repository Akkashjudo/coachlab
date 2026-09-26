import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { PageHero } from "@/components/layout/PageHero";
import { CourseFilterGrid } from "@/components/course/CourseFilterGrid";
import { FinalCTA } from "@/components/home/FinalCTA";
import { courses } from "@/data/courses";
import { SITE_URL, OG_IMAGE } from "@/lib/site-url";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: "Fitness Courses in Chennai | CoachLab" },
  description:
    "Six fitness programs in Chennai — Certified Personal Trainer, Advanced CPT, Group Fitness Instructor, Nutrition Coach, ACE prep and workshops.",
  alternates: { canonical: "/courses" },
  openGraph: {
    title: "Fitness Courses in Chennai | CoachLab",
    description:
      "Six professional programs covering exercise science, practical coaching, nutrition and continuing education.",
    url: `${SITE_URL}/courses`,

      images: [OG_IMAGE],
  },
};

/** ItemList of the programs offered — only names and descriptions, no prices. */
const coursesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "CoachLab Professional Programs",
  itemListElement: courses.map((course, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Course",
      name: course.title,
      description: course.summary,
      url: `${SITE_URL}/courses/${course.slug}`,
      provider: {
        "@type": "EducationalOrganization",
        name: siteConfig.fullName,
        url: SITE_URL,
      },
    },
  })),
};

export default function CoursesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesSchema) }}
      />

      <PageHero
        eyebrow="Programs"
        lines={["Find your path in", "fitness education."]}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
        ]}
        intro={
          <p>
            Six programs, from a first certification to continuing education for
            working coaches. Every one of them is built around the same idea —
            understand the science, then learn to coach it.
          </p>
        }
        meta={[
          { label: "Programs", value: String(courses.length) },
          { label: "Format", value: "Theory + Practical" },
          { label: "Location", value: siteConfig.location.city },
          { label: "Enquiries", value: "WhatsApp / Call" },
        ]}
        actions={
          <>
            <ButtonLink href="/contact" size="lg" arrow>
              {siteConfig.cta.primary}
            </ButtonLink>
            <ButtonLink href="#programs" variant="secondary" size="lg">
              Browse Programs
            </ButtonLink>
          </>
        }
      />

      <section id="programs" className="section-y relative isolate bg-ink-2">
        <TechBackdrop grid="lg" glow="top" />
        <Container>
          {/* Keeps the heading order h1 -> h2 -> h3; the design has no visible
              heading here, but the card titles are h3. */}
          <h2 className="sr-only">All programs</h2>
          <CourseFilterGrid courses={courses} />

          <p className="mt-10 max-w-2xl text-[0.85rem] leading-relaxed text-dim">
            Course fees, batch sizes and start dates are confirmed directly.
            Contact CoachLab for current details on any program.
          </p>
        </Container>
      </section>

      <FinalCTA
        index="—"
        eyebrow="Next Step"
        headline={["Not sure which", "program fits?", "Ask us."]}
        copy="Tell us where you are in your fitness career and we'll point you to the right starting point."
      />
    </>
  );
}
