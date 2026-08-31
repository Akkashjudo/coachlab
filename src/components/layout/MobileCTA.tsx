"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { whatsappEnquiry } from "@/lib/whatsapp";
import { EASE_EXPO } from "@/lib/motion";

/**
 * Fixed action bar for phones. It appears once the visitor has scrolled past
 * the hero and steps out of the way as soon as the footer — which carries the
 * same actions — comes into view.
 */
export function MobileCTA() {
  const [visible, setVisible] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setAtFooter(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const show = visible && !atFooter;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "115%" }}
          animate={{ y: 0 }}
          exit={{ y: "115%" }}
          transition={{ duration: 0.45, ease: EASE_EXPO }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-ink/92 backdrop-blur-xl lg:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="grid grid-cols-3 divide-x divide-hairline-soft">
            <a
              href={whatsappEnquiry()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[3.5rem] flex-col items-center justify-center gap-1 text-bone transition-colors active:bg-white/5"
            >
              <MessageCircle
                aria-hidden
                className="size-[1.15rem] text-gold"
                strokeWidth={2}
              />
              <span className="micro text-[0.55rem]">WhatsApp</span>
            </a>

            <a
              href={siteConfig.phoneHref}
              className="flex min-h-[3.5rem] flex-col items-center justify-center gap-1 text-bone transition-colors active:bg-white/5"
            >
              <Phone aria-hidden className="size-[1.15rem] text-gold" strokeWidth={2} />
              <span className="micro text-[0.55rem]">Call</span>
            </a>

            <Link
              href="/contact"
              className="flex min-h-[3.5rem] flex-col items-center justify-center gap-1 bg-[linear-gradient(135deg,#c8931b,#e3ad28_45%,#b7860f)] text-[#0a0700] transition-[filter] active:brightness-95"
            >
              <ArrowRight aria-hidden className="size-[1.15rem]" strokeWidth={2.25} />
              <span className="micro text-[0.55rem] font-semibold">Enquire</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
