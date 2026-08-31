/**
 * Tiny class joiner — avoids pulling clsx in for a one-line job.
 * Accepts anything so `cond && "class"` guards type-check regardless of what
 * `cond` is, and keeps only the non-empty strings.
 */
export function cn(...parts: unknown[]): string {
  return parts.filter((p): p is string => typeof p === "string" && p.length > 0)
    .join(" ");
}
