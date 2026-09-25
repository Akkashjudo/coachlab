# CoachLab — Institute of Fitness Education & Science

Marketing site for CoachLab, a fitness education institute in Iyappanthangal,
Porur, Chennai. Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 ·
Motion · Lucide.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
```

## Domain and SEO

Canonical tags, Open Graph URLs, `sitemap.xml`, `robots.txt` and the
organisation JSON-LD all read their origin from `src/lib/site-url.ts`, which
resolves in this order:

1. `NEXT_PUBLIC_SITE_URL` — an override for staging or a domain change.
   Blank counts as unset.
2. `https://coachlab.in` — the canonical production domain, held in code.
3. `http://localhost:3000` — local development only.

Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is deliberately not consulted.
It previously sat at step 2, which published the deployment host
(`coachlab-seven.vercel.app`) into every canonical tag and every sitemap
`<loc>`. The canonical domain belongs in the repository, where a review can
catch it, not in a dashboard field that can silently go empty.

**If the domain ever changes, edit `PRODUCTION_URL` in
`src/lib/site-url.ts`.** Nothing else needs touching — the sitemap, robots
and every page's metadata derive from it.

### Favicons

`npm run build:favicons` regenerates the whole icon set from
`public/images/brand/coachlab-mark.png` — a multi-resolution `favicon.ico`
(16/32/48), PNGs at 48/96/144/192/512, a 180px Apple touch icon and a
safe-zone-padded maskable icon for Android. They are declared explicitly in
`metadata.icons` in the root layout rather than through the `app/icon.*` file
convention, which emitted a single 180x180 PNG behind a cache-busting query
and never produced a `/favicon.ico` for Google to find.

The artwork is never redrawn: the monogram is trimmed to its ink, re-padded
and flattened onto the brand black. Gold on black is roughly 10:1; gold on
white would be about 2:1, which is why the icons are not transparent.

`npm run verify:seo` builds the site and asserts that every sitemap URL, the
robots host and the robots sitemap line all use the production domain.

## Editing content

All copy and course data live in `src/data/` — nothing is hard-coded in
components.

| File | Holds |
| --- | --- |
| `src/data/site.ts` | Brand, contact details, **current batch**, navigation, pillars, audiences |
| `src/data/courses.ts` | All six programs: curriculum, outcomes, FAQs |
| `src/data/faqs.ts` | Site-wide FAQ |
| `src/data/workshops.ts` | Workshop subjects |
| `src/data/gallery.ts` | Certificate-presentation photographs |

### Changing the batch

`currentBatch` in `src/data/site.ts` is the single source for the intake shown
in the hero, the featured-CPT section, the CPT course page and the FAQ:

```ts
export const currentBatch = {
  startDate: "13 September",
  duration: "10 Weeks",
  schedule: "Sundays",
  theorySessions: 4,
  practicalSessions: 6,
  isOpen: true,   // false swaps every batch panel for "contact us for dates"
};
```

### Adding a course

Append an entry to `courses` in `src/data/courses.ts`. It appears automatically
on the homepage grid, `/courses`, its own `/courses/[slug]` page, the footer,
the sitemap and the enquiry-form dropdown.

## Content rules baked into this build

The site deliberately states **no** fees, batch sizes, student counts,
accreditations, placement rates, testimonials or certification-authority
claims, because none were supplied. Where a fact is unknown the UI says
"Contact CoachLab for current details." Keep it that way unless a claim can be
substantiated.

## Brand assets

`scripts/process-assets.mjs` documents how the supplied artwork was prepared.
The gold-on-black logo was converted to a true transparent PNG by deriving
alpha from luminance and un-premultiplying the colour, so it sits on any dark
surface without a visible box. **The logo artwork itself is unmodified** — no
redrawing, no recolouring, no distortion.

| Asset | Path |
| --- | --- |
| Full lockup (transparent) | `public/images/brand/coachlab-logo.png` |
| Monogram (transparent) | `public/images/brand/coachlab-mark.png` |
| Social card | `public/images/brand/og-default.jpg` |
| Founder portrait | `public/images/founder/aditya-v.jpg` |
| Certification photographs | `public/images/gallery/` |

## The enquiry form

`/contact` has no backend. The form validates, then composes a formatted
WhatsApp message and opens `wa.me` — nothing is transmitted until the visitor
presses send. To move to a real endpoint, replace the `window.open` call in
`src/components/forms/EnquiryForm.tsx` with a POST and keep the validation.

## Motion architecture

Reusable primitives live in `src/components/motion/` and `src/components/ui/Reveal.tsx`:

| Component | Use |
| --- | --- |
| `Reveal` / `RevealGroup` / `RevealItem` | The standard entrance — fade + short lift, staggered in groups |
| `MaskedHeading` | Line-by-line mask reveal for display headings (`trigger="mount"` above the fold) |
| `DrawRule` | Gold hairline that draws itself out |
| `SpotlightCard` | Cursor-follow highlight, written to CSS variables inside rAF — never re-renders React |
| `MagneticButton` | Control leans up to 5–6px toward the cursor via MotionValues |
| `Parallax` / `PointerLayer` / `usePointerField` | Scroll and pointer depth; one listener drives a whole composition |

`useDesktopPointer()` (in `src/lib/hooks.ts`) gates every hover/parallax flourish
on `(pointer: fine)` **and** the absence of a reduced-motion request, so phones
do no pointer work at all.

Timing is standardised: micro-interactions 150–250ms, cards 250–400ms, section
reveals 500–800ms, the hero sequence ~1400ms, all on `[0.16, 1, 0.3, 1]`.

## Motion and accessibility notes

- `MotionProvider` sets `reducedMotion="user"`, and `[data-reveal]` elements are
  force-shown under `prefers-reduced-motion` and inside `<noscript>`. Motion on
  its own parks reduced-motion users on the initial `opacity: 0`, which would
  hide the content entirely — the CSS reset is what guarantees it is readable.
- Any element that starts hidden and is revealed by Motion **must** carry
  `data-reveal`.
- A panel that *covers* content (the founder portrait wipe) cannot use
  `data-reveal` — `transform: none` leaves it covering. Those carry
  `.reveal-wipe`, which CSS removes outright for reduced-motion and no-JS
  visitors, and they clear on a timeout as well as on the observer so the
  content can never stay hidden.

## Checks

Three audits live in the scratchpad harness and were run against every page:
no horizontal overflow at 320–1920px, no accessibility defects (heading order,
alt text, labels, tap targets), and all content readable under
`prefers-reduced-motion`. Re-run them after layout changes.
