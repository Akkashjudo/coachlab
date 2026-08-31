import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  // `max-w-full` matters: a long label with nowrap would otherwise widen the
  // whole layout on narrow screens instead of wrapping inside the button.
  "group/btn relative inline-flex min-h-11 max-w-full items-center justify-center gap-2.5 text-center " +
  "overflow-hidden rounded-[3px] font-display font-bold uppercase tracking-[0.1em] " +
  "transition-[background-color,color,border-color,box-shadow,transform,filter] duration-300 ease-[var(--ease-expo)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-bright " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#c8931b_0%,#e3ad28_38%,#ffd873_58%,#e3ad28_78%,#b7860f_100%)] " +
    "text-[#0a0700] shadow-[0_1px_0_rgba(255,255,255,0.28)_inset,0_10px_30px_-14px_rgba(227,173,40,0.9)] " +
    "hover:-translate-y-px hover:brightness-[1.08] " +
    "hover:shadow-[0_1px_0_rgba(255,255,255,0.34)_inset,0_16px_38px_-16px_rgba(227,173,40,1)] " +
    "active:translate-y-0 active:brightness-95",
  secondary:
    "border border-hairline-strong bg-transparent text-bone " +
    "hover:-translate-y-px hover:border-gold hover:bg-gold/[0.07] hover:text-gold-bright",
  ghost:
    "border border-hairline-soft bg-white/[0.02] text-muted " +
    "hover:border-hairline-strong hover:bg-white/[0.05] hover:text-bone",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-[0.68rem]",
  md: "px-6 py-3.5 text-[0.74rem]",
  lg: "px-7 py-4 text-[0.8rem] sm:px-9",
};

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Adds a right-pointing arrow that nudges forward on hover. */
  arrow?: boolean;
  icon?: ReactNode;
  /** Leans toward the cursor. Desktop pointers only — reserve for hero CTAs. */
  magnetic?: boolean;
};

function Inner({
  children,
  arrow,
  icon,
  variant,
}: Pick<SharedProps, "children" | "arrow" | "icon"> & { variant: Variant }) {
  return (
    <>
      {/* A single light sweep on hover. Gold face only — on the dark variants
          it would read as a smear rather than a sheen. */}
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-18deg] bg-white/30 opacity-0 transition-[transform,opacity] duration-[900ms] ease-[var(--ease-expo)] group-hover/btn:translate-x-[420%] group-hover/btn:opacity-100"
        />
      )}
      {icon ? (
        <span aria-hidden className="relative shrink-0">
          {icon}
        </span>
      ) : null}
      <span className="relative min-w-0">{children}</span>
      {arrow ? (
        <ArrowRight
          aria-hidden
          className="relative size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-expo)] group-hover/btn:translate-x-1"
          strokeWidth={2.25}
        />
      ) : null}
    </>
  );
}

/** Optionally wraps the control so it leans toward the cursor. */
function Magnetise({
  on,
  children,
}: {
  on?: boolean;
  children: ReactNode;
}) {
  if (!on) return <>{children}</>;
  return <MagneticButton strength={5}>{children}</MagneticButton>;
}

type ButtonLinkProps = SharedProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

export function ButtonLink({
  href,
  external,
  children,
  variant = "primary",
  size = "md",
  className,
  arrow,
  icon,
  magnetic,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);

  const inner = (
    <Inner arrow={arrow} icon={icon} variant={variant}>
      {children}
    </Inner>
  );

  if (isExternal) {
    return (
      <Magnetise on={magnetic}>
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...rest}
        >
          {inner}
        </a>
      </Magnetise>
    );
  }

  return (
    <Magnetise on={magnetic}>
      <Link href={href} className={classes} {...rest}>
        {inner}
      </Link>
    </Magnetise>
  );
}

type ButtonProps = SharedProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  arrow,
  icon,
  magnetic,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <Magnetise on={magnetic}>
      <button
        type={type}
        className={cn(base, variants[variant], sizes[size], className)}
        {...rest}
      >
        <Inner arrow={arrow} icon={icon} variant={variant}>
          {children}
        </Inner>
      </button>
    </Magnetise>
  );
}
