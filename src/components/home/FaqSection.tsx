import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ButtonLink } from "@/components/ui/Button";
import { faqs } from "@/data/faqs";
import { siteConfig } from "@/data/site";

export function FaqSection({ index = "13" }: { index?: string }) {
  return (
    <section id="faq" className="seam-top section-y relative isolate bg-ink-2">
      <TechBackdrop grid="lg" glow="top" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeader
              index={index}
              eyebrow="Questions"
              title="Frequently asked"
              subtitle="If your question isn't here, ask us directly — we answer on WhatsApp."
            />

            <Reveal y={18} delay={0.1} className="mt-9">
              <ButtonLink href="/contact" variant="secondary" size="md" arrow>
                {siteConfig.cta.secondary}
              </ButtonLink>
            </Reveal>
          </div>

          <div className="lg:col-span-7 xl:col-start-7 xl:col-end-13">
            <Reveal y={22}>
              <FAQAccordion items={faqs} />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
