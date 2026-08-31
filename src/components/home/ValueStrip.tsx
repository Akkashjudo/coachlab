import { Marquee } from "@/components/ui/Marquee";
import { valueStrip } from "@/data/site";

export function ValueStrip() {
  return (
    <section
      aria-label="What CoachLab teaches"
      className="relative border-y border-hairline bg-ink-2"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(227,173,40,0.05), transparent 30%, transparent 70%, rgba(227,173,40,0.05))",
        }}
      />
      <Marquee items={valueStrip} duration={52} />
    </section>
  );
}
