import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { MonogramWatermark } from "@/components/ui/TechBackdrop";
import { courses } from "@/data/courses";
import { navLinks, siteConfig } from "@/data/site";
import { whatsappEnquiry } from "@/lib/whatsapp";

const actionClass =
  "group flex min-h-11 items-center justify-between gap-3 border border-hairline-soft bg-white/[0.02] px-4 py-3 text-[0.8rem] text-muted transition-colors duration-300 hover:border-hairline-strong hover:bg-gold/[0.06] hover:text-bone";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-ink-2">
      <div
        aria-hidden
        className="bg-tech-grid pointer-events-none absolute inset-0 opacity-40"
      />
      <MonogramWatermark
        className="top-1/2 right-[-6rem] -translate-y-1/2"
        size={480}
        opacity={0.035}
      />

      <Container className="relative">
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo variant="lockup" width={188} />
            <p className="micro mt-7 text-gold">
              Educate. Empower. Elevate.
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-dim">
              Building competent coaches. Transforming lives.
            </p>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="micro text-dim">Navigate</h2>
            <ul className="mt-3 space-y-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-muted transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Programs */}
          <nav aria-label="Programs" className="lg:col-span-3">
            <h2 className="micro text-dim">Programs</h2>
            <ul className="mt-3 space-y-0.5">
              {courses.map((course) => (
                <li key={course.slug}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex min-h-11 items-center text-sm text-muted transition-colors duration-300 hover:text-gold"
                  >
                    {course.ctaLabel ?? course.shortName ?? course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="micro text-dim">Contact</h2>
            <address className="mt-5 space-y-4 text-sm not-italic">
              <div className="flex items-start gap-3">
                <MapPin
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-gold-muted"
                  strokeWidth={1.75}
                />
                <span className="text-muted">
                  {siteConfig.location.lines.join(", ")}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-gold-muted"
                  strokeWidth={1.75}
                />
                <a
                  href={siteConfig.phoneHref}
                  className="-my-3 inline-flex min-h-11 items-center py-3 text-muted transition-colors hover:text-gold"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-gold-muted"
                  strokeWidth={1.75}
                />
                <a
                  href={siteConfig.emailHref}
                  className="-my-3 inline-flex min-h-11 items-center py-3 break-all text-muted transition-colors hover:text-gold"
                >
                  {siteConfig.email}
                </a>
              </div>
            </address>

            <div className="mt-6 grid gap-2">
              <a
                href={whatsappEnquiry()}
                target="_blank"
                rel="noopener noreferrer"
                className={actionClass}
              >
                <span className="flex items-center gap-2.5">
                  <MessageCircle
                    aria-hidden
                    className="size-4 text-gold"
                    strokeWidth={2}
                  />
                  WhatsApp
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </a>
              <a href={siteConfig.phoneHref} className={actionClass}>
                <span className="flex items-center gap-2.5">
                  <Phone aria-hidden className="size-4 text-gold" strokeWidth={2} />
                  Call CoachLab
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </a>
              <a href={siteConfig.emailHref} className={actionClass}>
                <span className="flex items-center gap-2.5">
                  <Mail aria-hidden className="size-4 text-gold" strokeWidth={2} />
                  Email
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="rule-fade" />

        <div className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-dim">
            © {year} {siteConfig.fullName}. All rights reserved.
          </p>
          <p className="micro text-dim">
            {siteConfig.location.city} · India
          </p>
        </div>
      </Container>
    </footer>
  );
}
