import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TechBackdrop, CornerFrame } from "@/components/ui/TechBackdrop";
import { PageHero } from "@/components/layout/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FaqSection } from "@/components/home/FaqSection";
import { siteConfig } from "@/data/site";
import { SITE_URL, OG_IMAGE } from "@/lib/site-url";
import { whatsappEnquiry } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: "Contact CoachLab | Fitness Courses in Chennai" },
  description:
    "Talk to CoachLab about course options and upcoming batch dates. Call, WhatsApp or enquire — the institute is in Iyappanthangal, Porur, Chennai.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact CoachLab | Fitness Courses in Chennai",
    description:
      "Enquire about CoachLab's fitness education programs and upcoming batches.",
    url: `${SITE_URL}/contact`,

      images: [OG_IMAGE],
  },
};

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.phoneDisplay,
    href: whatsappEnquiry(),
    note: "Fastest way to reach us",
    external: true,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phoneDisplay,
    href: siteConfig.phoneHref,
    note: "Call during working hours",
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: siteConfig.emailHref,
    note: "For detailed enquiries",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        lines={["Let's talk about", "your fitness career."]}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
        intro={
          <p>
            Tell us where you are now and what you want to do next. We&apos;ll
            point you to the right program and confirm the current batch
            details.
          </p>
        }
      />

      <section className="relative isolate pb-16 sm:pb-20 lg:pb-24">
        <TechBackdrop grid="lg" glow="left" />

        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* ------------------------------------------- details */}
            <div className="min-w-0 lg:col-span-5">
              <Reveal y={22} className="h-full">
                <div className="panel relative flex h-full flex-col overflow-hidden p-6 sm:p-8">
                  <CornerFrame size={16} />

                  <div className="relative flex flex-1 flex-col">
                    <h2 className="display-wide font-display text-[1.15rem] leading-none font-extrabold text-bone uppercase">
                      {siteConfig.name}
                    </h2>
                    <p className="micro mt-3 text-gold-muted">
                      {siteConfig.tagline}
                    </p>

                    <address className="mt-8 not-italic">
                      <div className="flex items-start gap-4">
                        <span className="flex size-9 shrink-0 items-center justify-center border border-hairline bg-gold/[0.06] text-gold">
                          <MapPin
                            aria-hidden
                            className="size-4"
                            strokeWidth={1.75}
                          />
                        </span>
                        <div>
                          <p className="micro text-[0.6rem] text-dim">
                            Location
                          </p>
                          <p className="mt-2 text-[0.95rem] leading-relaxed text-bone">
                            {siteConfig.location.lines.join(", ")}
                          </p>
                          <p className="mt-2 text-[0.8rem] leading-relaxed text-dim">
                            The exact venue for your batch is shared on enquiry.
                          </p>
                        </div>
                      </div>
                    </address>

                    <ul className="mt-8 divide-y divide-hairline-soft border-y border-hairline-soft">
                      {channels.map((channel) => (
                        <li key={channel.label}>
                          <a
                            href={channel.href}
                            {...(channel.external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="group flex min-h-11 items-center gap-4 py-4"
                          >
                            <span className="flex size-9 shrink-0 items-center justify-center border border-hairline-soft text-gold transition-colors duration-300 group-hover:border-hairline group-hover:bg-gold/[0.07]">
                              <channel.icon
                                aria-hidden
                                className="size-4"
                                strokeWidth={1.75}
                              />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="micro block text-[0.575rem] text-dim">
                                {channel.label}
                              </span>
                              <span className="mt-1.5 block break-all text-[0.925rem] text-bone transition-colors duration-300 group-hover:text-gold">
                                {channel.value}
                              </span>
                            </span>
                            <ArrowUpRight
                              aria-hidden
                              className="size-4 shrink-0 text-dim transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                              strokeWidth={2}
                            />
                          </a>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 pt-2 sm:mt-auto">
                      <p className="micro text-[0.6rem] text-dim">Founder</p>
                      <p className="display-wide-sm mt-2.5 font-display text-[1.05rem] font-bold text-bone uppercase">
                        {siteConfig.founder.name}
                      </p>
                      <p className="mt-2 text-[0.8rem] leading-relaxed text-dim">
                        {siteConfig.founder.roles.join(" · ")}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ------------------------------------------- form */}
            <div className="min-w-0 lg:col-span-7">
              <Reveal y={26} delay={0.08}>
                <EnquiryForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <FaqSection index="—" />
    </>
  );
}
