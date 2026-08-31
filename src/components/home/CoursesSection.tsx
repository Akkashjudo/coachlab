import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { CourseBento } from "@/components/course/CourseBento";
import { courses } from "@/data/courses";

export function CoursesSection() {
  return (
    <section id="courses" className="seam-top section-y relative isolate bg-ink-2">
      <TechBackdrop grid="lg" glow="top" />

      <Container>
        <SectionHeader
          index="03"
          eyebrow="Our Programs"
          title="Professional courses"
          subtitle="Choose the pathway that matches your career goals."
          action={
            <ButtonLink href="/courses" variant="secondary" size="md" arrow>
              All Programs
            </ButtonLink>
          }
        />

        <div className="mt-12 sm:mt-14">
          <CourseBento courses={courses} />
        </div>
      </Container>
    </section>
  );
}
