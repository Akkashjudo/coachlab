"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Menu } from "lucide-react";
import { LogoLink } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { navLinks, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-sm focus:bg-gold focus:px-4 focus:py-2.5 focus:font-display focus:text-xs focus:font-bold focus:tracking-widest focus:text-black focus:uppercase"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-[var(--ease-expo)]",
          scrolled
            ? "border-b border-hairline bg-ink/82 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-gradient-to-b from-ink/85 to-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "shell flex items-center justify-between transition-[height] duration-500 ease-[var(--ease-expo)]",
            scrolled ? "h-16 lg:h-[4.25rem]" : "h-[4.5rem] lg:h-[5.5rem]",
          )}
        >
          <LogoLink markWidth={scrolled ? 34 : 38} />

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative block px-4 py-2.5 font-display text-[0.7rem] font-bold tracking-[0.16em] uppercase transition-colors duration-300",
                      active ? "text-gold" : "text-muted hover:text-bone",
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-4 bottom-1 h-px origin-left bg-gold transition-transform duration-400 ease-[var(--ease-expo)]",
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {/* Wrapped rather than given `hidden` directly: the button's base
                classes carry `inline-flex`, and Tailwind's display utilities
                sort so that would win over `hidden` regardless of class order. */}
            <div className="hidden sm:block">
              <ButtonLink href="/contact" size="sm" arrow>
                {siteConfig.cta.nav}
              </ButtonLink>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex size-11 items-center justify-center rounded-[3px] border border-hairline-soft text-bone transition-colors duration-300 hover:border-hairline-strong hover:text-gold lg:hidden"
            >
              <Menu className="size-5" strokeWidth={1.75} />
            </button>
          </div>
        </nav>

        {/* Scroll progress — a single gold hairline across the top */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="h-px w-full origin-left bg-gradient-to-r from-gold-muted via-gold-bright to-gold"
        />
      </header>

      <MobileNavigation
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
