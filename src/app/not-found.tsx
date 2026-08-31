import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { TechBackdrop, MonogramWatermark } from "@/components/ui/TechBackdrop";
import { navLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[78svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32">
      <TechBackdrop grid="lg" glow="center" />
      <MonogramWatermark
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        size={560}
        opacity={0.045}
      />

      <Container className="relative">
        <div className="max-w-2xl">
          <Eyebrow>Error 404</Eyebrow>

          <h1 className="display-wide mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.02em] text-bone uppercase">
            This page
            <br />
            <span className="text-metal">isn&apos;t here.</span>
          </h1>

          <p className="mt-7 text-[1rem] leading-relaxed text-muted">
            The link may be out of date, or the page may have moved. Everything
            CoachLab offers is one of the pages below.
          </p>

          <nav aria-label="Site" className="mt-9">
            <ul className="flex flex-wrap gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <ButtonLink href={link.href} variant="ghost" size="sm">
                    {link.label}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-9">
            <ButtonLink href="/courses" size="lg" arrow>
              Explore Courses
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
