import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import {
  CourseOverview,
  CourseAudience,
  CourseOutcomes,
  CourseCurriculum,
  CourseFormat,
  CourseFaq,
  RelatedCourses,
} from "@/components/course/CourseDetail";
import { FinalCTA } from "@/components/home/FinalCTA";
import { courses, getCourse } from "@/data/courses";
import { SITE_URL, OG_IMAGE } from "@/lib/site-url";
import { siteConfig, currentBatch } from "@/data/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Course not found" };

  return {
    // `absolute` so the root layout's "| CoachLab" template does not append a
    // second brand to a title that already ends with one.
    title: { absolute: course.seo.title },
    description: course.seo.description,
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: {
      title: course.seo.title,
      description: course.seo.description,
      url: `${SITE_URL}/courses/${course.slug}`,
      type: "article",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: course.seo.title,
      description: course.seo.description,
    },
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const isFeatured = course.slug === currentBatch.courseSlug;

  /* Course schema. No price, no credential claim — neither is confirmed. */
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.summary,
    url: `${SITE_URL}/courses/${course.slug}`,
    inLanguage: "en",
    teaches: course.topics,
    provider: {
      "@type": "EducationalOrganization",
      name: siteConfig.fullName,
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: `${siteConfig.location.area}, ${siteConfig.location.locality}`,
        addressRegion: siteConfig.location.region,
        addressCountry: siteConfig.location.country,
      },
    },
  };

  const meta = [
    { label: "Program", value: course.categoryLabel },
    {
      label: "Format",
      value: course.curriculum.theory ? "Theory + Practical" : "Modular",
    },
    ...(isFeatured && currentBatch.isOpen
      ? [
          { label: "Starts", value: currentBatch.startDate },
          { label: "Duration", value: currentBatch.duration },
        ]
      : [{ label: "Schedule", value: "On enquiry" }]),
    { label: "Location", value: siteConfig.location.city },
  ].slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHero
        eyebrow={course.categoryLabel}
        lines={
          course.shortName
            ? [course.title, course.shortName]
            : [course.title]
        }
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
          { label: course.shortName ?? course.title, href: `/courses/${course.slug}` },
        ]}
        intro={<p>{course.summary}</p>}
        meta={meta}
        actions={
          <>
            <ButtonLink href="/contact" size="lg" arrow>
              {siteConfig.cta.primary}
            </ButtonLink>
            <ButtonLink href="/courses" variant="secondary" size="lg">
              All Programs
            </ButtonLink>
          </>
        }
      />

      <CourseOverview course={course} />
      <CourseAudience course={course} />
      <CourseOutcomes course={course} />
      <CourseCurriculum course={course} />
      <CourseFormat course={course} />
      <CourseFaq course={course} />
      <RelatedCourses course={course} all={courses} />

      <FinalCTA
        index="—"
        eyebrow="Enrol"
        headline={["Ready to start", course.shortName ?? course.title, "with CoachLab?"]}
        copy="Message CoachLab to confirm upcoming batch availability and the enrolment steps for this program."
      />
    </>
  );
}
