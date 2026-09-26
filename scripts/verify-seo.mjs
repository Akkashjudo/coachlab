/**
 * Asserts that the built sitemap, robots.txt and page metadata all advertise
 * the production domain.
 *
 * This exists because the domain was previously supplied by Vercel's
 * VERCEL_PROJECT_PRODUCTION_URL at build time, so the repository looked
 * correct while production served canonical tags and sitemap <loc> entries
 * pointing at coachlab-seven.vercel.app. Nothing in the source could be
 * grepped for it. This check reads the actual build output instead.
 *
 * Run after `next build`:  npm run verify:seo
 */
import fs from "node:fs";
import path from "node:path";

const EXPECTED_ORIGIN = "https://www.coachlab.in";
const BUILD = ".next/server/app";

let failures = 0;
const fail = (msg) => {
  failures += 1;
  console.error(`  FAIL  ${msg}`);
};
const pass = (msg) => console.log(`  ok    ${msg}`);

/** Next writes route-handler output next to the route, with a .body suffix. */
function readBuilt(name) {
  const candidates = [
    path.join(BUILD, `${name}.body`),
    path.join(BUILD, name),
  ];
  for (const file of candidates) {
    if (fs.existsSync(file)) return fs.readFileSync(file, "utf8");
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  sitemap.xml                                                        */
/* ------------------------------------------------------------------ */

const sitemap = readBuilt("sitemap.xml");
if (!sitemap) {
  fail("sitemap.xml was not found in the build output — did `next build` run?");
} else {
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  if (locs.length === 0) {
    fail("sitemap.xml contains no <loc> entries");
  } else {
    const wrong = locs.filter((u) => !u.startsWith(`${EXPECTED_ORIGIN}/`));
    if (wrong.length) {
      fail(`${wrong.length} sitemap URL(s) do not use ${EXPECTED_ORIGIN}:`);
      wrong.slice(0, 5).forEach((u) => console.error(`          ${u}`));
    } else {
      pass(`all ${locs.length} sitemap URLs use ${EXPECTED_ORIGIN}`);
    }

    // Coverage: every public route must be listed exactly once.
    const expected = [
      "/",
      "/courses",
      "/about",
      "/workshops",
      "/contact",
      "/courses/certified-personal-trainer",
      "/courses/advanced-certified-personal-trainer",
      "/courses/group-fitness-instructor",
      "/courses/fitness-nutrition-coach",
      "/courses/ace-exam-prep",
      "/courses/professional-workshops",
    ];
    const paths = locs.map((u) => new URL(u).pathname);
    const missing = expected.filter((r) => !paths.includes(r));
    const dupes = paths.filter((p, i) => paths.indexOf(p) !== i);

    if (missing.length) fail(`sitemap is missing: ${missing.join(", ")}`);
    else pass(`all ${expected.length} public routes present`);
    if (dupes.length) fail(`duplicate sitemap entries: ${[...new Set(dupes)].join(", ")}`);
  }
}

/* ------------------------------------------------------------------ */
/*  robots.txt                                                         */
/* ------------------------------------------------------------------ */

const robots = readBuilt("robots.txt");
if (!robots) {
  fail("robots.txt was not found in the build output");
} else {
  const wanted = `Sitemap: ${EXPECTED_ORIGIN}/sitemap.xml`;
  if (robots.includes(wanted)) pass(`robots.txt declares "${wanted}"`);
  else fail(`robots.txt does not contain "${wanted}"\n${robots}`);

  if (robots.includes(`Host: ${EXPECTED_ORIGIN}`)) pass("robots.txt host is correct");
  else fail("robots.txt Host does not use the production origin");
}

/* ------------------------------------------------------------------ */
/*  Rendered pages: canonical, og:url, JSON-LD                         */
/* ------------------------------------------------------------------ */

const pages = [
  ["index.html", "/"],
  ["about.html", "/about"],
  ["courses.html", "/courses"],
];

for (const [file, label] of pages) {
  const html = readBuilt(file);
  if (!html) continue; // not all routes emit static HTML in every Next version
  const urls = [...html.matchAll(/https?:\/\/[^"'<\s\\]+/g)].map((m) => m[0]);
  const offenders = urls.filter((u) => /vercel\.app|localhost:3000/.test(u));
  if (offenders.length) {
    fail(`${label} references a non-production origin:`);
    [...new Set(offenders)].slice(0, 3).forEach((u) => console.error(`          ${u}`));
  } else {
    pass(`${label} references no vercel.app or localhost origins`);
  }
}

/* ------------------------------------------------------------------ */
/*  Favicons                                                           */
/* ------------------------------------------------------------------ */

// Google looks for /favicon.ico first and documents a preference for squares
// that are a multiple of 48px. Shipping only a 180x180 PNG and no .ico is what
// left the search result showing a generic globe.
const iconFiles = [
  "public/favicon.ico",
  "public/icons/favicon-16x16.png",
  "public/icons/favicon-32x32.png",
  "public/icons/icon-48.png",
  "public/icons/icon-96.png",
  "public/icons/icon-192.png",
  "public/icons/icon-512.png",
  "public/icons/apple-touch-icon.png",
  "public/icons/icon-maskable-512.png",
  "public/site.webmanifest",
];
const missingIcons = iconFiles.filter((f) => !fs.existsSync(f));
if (missingIcons.length) fail(`missing icon asset(s): ${missingIcons.join(", ")}`);
else pass(`all ${iconFiles.length} icon assets present`);

// The .ico must really be a multi-resolution icon, not a renamed PNG.
if (fs.existsSync("public/favicon.ico")) {
  const ico = fs.readFileSync("public/favicon.ico");
  const isIco = ico.length > 6 && ico.readUInt16LE(0) === 0 && ico.readUInt16LE(2) === 1;
  const count = isIco ? ico.readUInt16LE(4) : 0;
  if (!isIco) fail("favicon.ico is not a valid ICO container");
  else if (count < 3) fail(`favicon.ico holds only ${count} resolution(s); expected 16/32/48`);
  else pass(`favicon.ico is a valid ICO with ${count} resolutions`);
}

// The head must reference the .ico and must not reference the old
// query-stringed app/icon.png convention.
const home = readBuilt("index.html");
if (home) {
  if (home.includes('href="/favicon.ico"')) pass("homepage head links /favicon.ico");
  else fail("homepage head does not link /favicon.ico");

  if (home.includes('href="/site.webmanifest"')) pass("homepage head links the web manifest");
  else fail("homepage head does not link the web manifest");

  if (/icon\.png\?/.test(home)) fail("homepage still emits a query-stringed /icon.png reference");
  else pass("no stale query-stringed icon references");
}

/* ------------------------------------------------------------------ */

console.log("");
if (failures) {
  console.error(`SEO verification FAILED — ${failures} problem(s)`);
  process.exit(1);
}
console.log(`SEO verification passed — everything points at ${EXPECTED_ORIGIN}`);
