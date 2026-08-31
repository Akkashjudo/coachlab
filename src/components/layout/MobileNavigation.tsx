"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { LogoLink } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { MonogramWatermark } from "@/components/ui/TechBackdrop";
import { navLinks, siteConfig } from "@/data/site";
import { whatsappEnquiry } from "@/lib/whatsapp";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function MobileNavigation({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Escape closes, focus moves in, background stops scrolling. */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeRef.current?.focus(), 120);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: EASE_EXPO }}
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-ink lg:hidden"
        >
          <div
            aria-hidden
            className="bg-tech-grid-sm pointer-events-none absolute inset-0 opacity-60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(227,173,40,0.11), transparent 70%)",
            }}
          />
          <MonogramWatermark
            className="right-[-4rem] bottom-[-2rem]"
            size={340}
            opacity={0.04}
          />

          <div className="gutter-x relative flex h-[4.5rem] shrink-0 items-center justify-between">
            <LogoLink markWidth={36} onClick={onClose} />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex size-11 items-center justify-center rounded-[3px] border border-hairline-soft text-bone transition-colors duration-300 hover:border-hairline-strong hover:text-gold"
            >
              <X className="size-5" strokeWidth={1.75} />
            </button>
          </div>

          <div className="rule-fade gutter-mx relative shrink-0" />

          <nav
            aria-label="Mobile"
            className="gutter-x relative flex-1 pt-8 pb-6"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    ease: EASE_EXPO,
                    delay: 0.06 + i * 0.05,
                  }}
                  className="border-b border-hairline-soft"
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="micro w-6 shrink-0 text-gold-muted tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-[1.75rem] leading-none font-extrabold tracking-tight uppercase transition-colors",
                        isActive(link.href) ? "text-gold" : "text-bone",
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_EXPO, delay: 0.34 }}
              className="mt-9 flex flex-col gap-3"
            >
              <ButtonLink href="/contact" size="lg" arrow onClick={onClose}>
                {siteConfig.cta.primary}
              </ButtonLink>
              <div className="grid grid-cols-2 gap-3">
                <ButtonLink
                  href={whatsappEnquiry()}
                  variant="secondary"
                  size="md"
                  icon={<MessageCircle className="size-4" strokeWidth={2} />}
                >
                  WhatsApp
                </ButtonLink>
                <ButtonLink
                  href={siteConfig.phoneHref}
                  variant="secondary"
                  size="md"
                  icon={<Phone className="size-4" strokeWidth={2} />}
                >
                  Call
                </ButtonLink>
              </div>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.42 }}
              className="mt-10 space-y-4 text-sm"
            >
              <div className="flex items-start gap-3">
                <MapPin
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-gold-muted"
                  strokeWidth={1.75}
                />
                <dd className="text-muted">{siteConfig.location.short}</dd>
              </div>
              <div className="flex items-start gap-3">
                <Mail
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-gold-muted"
                  strokeWidth={1.75}
                />
                <dd>
                  <a
                    href={siteConfig.emailHref}
                    className="break-all text-muted transition-colors hover:text-gold"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
            </motion.dl>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
