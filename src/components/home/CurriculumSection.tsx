import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { TheoryPractical } from "@/components/course/TheoryPractical";
import { featuredCourse } from "@/data/courses";

export function CurriculumSection() {
  const { theory = [], practical = [] } = featuredCourse.curriculum;
  if (theory.length === 0 && practical.length === 0) return null;

  return (
    <section id="curriculum" className="seam-top section-y relative isolate bg-ink-2">
      <TechBackdrop grid="lg" glow={false} />

      <Container>
        <SectionHeader
          index="05"
          eyebrow="CPT Curriculum"
          title="Theory & practical"
          subtitle="What you study in the classroom, and what you coach on the floor."
        />

        <div className="mt-12 sm:mt-14">
          <TheoryPractical theory={theory} practical={practical} />
        </div>
      </Container>
    </section>
  );
}
