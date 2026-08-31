import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { CourseBento } from "@/components/course/CourseBento";
import { courses } from "@/data/courses";
import { audiences } from "@/data/site";

/**
 * Programs, with "who this is for" folded in.
 *
 * The audience blocks used to be a full section of their own, four cards
 * repeating the layout of the four sections around them. They belong next to
 * the programs — that is the moment a visitor is asking "which of these is
 * me?" — so they run as a compact strip underneath instead.
 */
export function CoursesSection() {
  return (
    <section id="courses" className="seam-top section-y relative isolate bg-ink-2">
      <TechBackdrop grid="lg" glow="top" />

      <Container>
        <SectionHeader
          index="02"
          eyebrow="Our Programs"
          title="Six ways in"
          subtitle="From a first certification to continuing education for working coaches."
          action={
            <ButtonLink href="/courses" variant="secondary" size="md" arrow>
              All Programs
            </ButtonLink>
          }
        />

        <div className="mt-12 sm:mt-14">
          <CourseBento courses={courses} />
        </div>

        {/* who each pathway is built for */}
        <Reveal y={20} className="mt-14 sm:mt-16">
          <div className="border-t border-hairline-soft pt-10">
            <h3 className="micro text-gold">Who these are for</h3>
            <ul className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {audiences.map((item) => (
                <li key={item.index} className="flex gap-4">
                  <span className="micro shrink-0 pt-0.5 text-gold-muted tabular-nums">
                    {item.index}
                  </span>
                  <div className="min-w-0">
                    <p className="display-wide-sm text-[0.95rem] leading-snug font-bold text-bone uppercase">
                      {item.title}
                    </p>
                    <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
                      {item.copy}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
