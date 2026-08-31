/**
 * One-off asset pipeline for CoachLab.
 * - Converts the supplied gold-on-black logo into a true transparent PNG
 *   (alpha derived from luminance, RGB un-premultiplied so the gold stays saturated).
 * - Derives a standalone monogram (mark) by profiling the alpha channel.
 * - Optimises the founder portrait and the certification-day photographs.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const DL = "C:/Users/AKKASH RAJ/Downloads";
const SCRATCH =
  "C:/Users/AKKASH~1/AppData/Local/Temp/claude/C--Users-AKKASH-RAJ-Desktop-coach-lab/0382a63a-c679-450a-99bb-b7494a1eeede/scratchpad";
const OUT = "public/images";

const LOGO_SRC = path.join(DL, "7c805087-8b7c-43e8-ba61-61d2499992c6.jpg");
const FOUNDER_SRC = path.join(DL, "founder-main.avif");
const GALLERY_SRC = path.join(SCRATCH, "students");

const ensure = (d) => fs.mkdirSync(d, { recursive: true });

/** Black background -> alpha. Gold pixels keep their colour, black becomes transparent. */
async function blackToAlpha(src) {
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);
  const FLOOR = 12; // lift JPEG noise in the black field to a clean zero

  for (let i = 0, o = 0; i < data.length; i += channels, o += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const peak = Math.max(r, g, b);
    let a = ((peak - FLOOR) / (255 - FLOOR)) * 255;
    a = a < 0 ? 0 : a > 255 ? 255 : a;

    if (a <= 0) {
      out[o] = out[o + 1] = out[o + 2] = out[o + 3] = 0;
    } else {
      const k = 255 / peak; // un-premultiply against black
      out[o] = Math.min(255, Math.round(r * k));
      out[o + 1] = Math.min(255, Math.round(g * k));
      out[o + 2] = Math.min(255, Math.round(b * k));
      out[o + 3] = Math.round(a);
    }
  }
  return { buffer: out, width, height };
}

/** Row-wise alpha coverage, used to find the gap between monogram and wordmark. */
function rowProfile(buf, width, height) {
  const rows = new Float64Array(height);
  for (let y = 0; y < height; y++) {
    let sum = 0;
    for (let x = 0; x < width; x++) sum += buf[(y * width + x) * 4 + 3];
    rows[y] = sum / width / 255;
  }
  return rows;
}

async function run() {
  ensure(`${OUT}/brand`);
  ensure(`${OUT}/founder`);
  ensure(`${OUT}/gallery`);

  /* ---------------- Logo ---------------- */
  const { buffer, width, height } = await blackToAlpha(LOGO_SRC);
  const raw = { raw: { width, height, channels: 4 } };

  // Full transparent lockup, auto-trimmed to the artwork.
  await sharp(buffer, raw)
    .trim({ threshold: 2 })
    .png({ compressionLevel: 9 })
    .toFile(`${OUT}/brand/coachlab-logo.png`);

  // Locate the horizontal band that separates the monogram from the wordmark.
  const rows = rowProfile(buffer, width, height);
  let firstInk = rows.findIndex((v) => v > 0.002);
  let gapStart = -1;
  for (let y = firstInk + 40; y < height; y++) {
    if (rows[y] <= 0.002) {
      let run = 0;
      while (y + run < height && rows[y + run] <= 0.002) run++;
      if (run > 12) { gapStart = y; break; }
      y += run;
    }
  }
  const markBottom = gapStart > 0 ? gapStart : Math.round(height * 0.63);
  console.log(`logo ${width}x${height} · ink starts ${firstInk} · mark ends ${markBottom}`);

  const markSlice = await sharp(buffer, raw)
    .extract({ left: 0, top: 0, width, height: markBottom })
    .png()
    .toBuffer();
  await sharp(markSlice)
    .trim({ threshold: 2 })
    .png({ compressionLevel: 9 })
    .toFile(`${OUT}/brand/coachlab-mark.png`);

  // Square, padded mark for favicons / social avatars.
  const markMeta = await sharp(`${OUT}/brand/coachlab-mark.png`).metadata();
  const side = Math.max(markMeta.width, markMeta.height);
  await sharp({
    create: { width: side, height: side, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: `${OUT}/brand/coachlab-mark.png`, gravity: "center" }])
    .png()
    .toFile(`${OUT}/brand/coachlab-mark-square.png`);

  // Original lockup on its native black, kept for OG images.
  await sharp(LOGO_SRC).resize(1200, 800, { fit: "cover" }).jpeg({ quality: 88 })
    .toFile(`${OUT}/brand/coachlab-logo-black.jpg`);

  /* ---------------- Founder ---------------- */
  const f = await sharp(FOUNDER_SRC).metadata();
  console.log(`founder ${f.width}x${f.height}`);
  await sharp(FOUNDER_SRC).jpeg({ quality: 92, mozjpeg: true })
    .toFile(`${OUT}/founder/aditya-v.jpg`);

  /* ---------------- Certification day photographs ---------------- */
  const files = fs.readdirSync(GALLERY_SRC).filter((n) => /\.jpe?g$/i.test(n)).sort();
  let n = 0;
  for (const file of files) {
    n += 1;
    const meta = await sharp(path.join(GALLERY_SRC, file)).metadata();
    await sharp(path.join(GALLERY_SRC, file))
      .resize({ width: 1100, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(`${OUT}/gallery/certification-${String(n).padStart(2, "0")}.jpg`);
    if (n <= 2) console.log(`  gallery ${n}: ${meta.width}x${meta.height}`);
  }
  console.log(`gallery: ${n} images written`);
}

run().catch((e) => { console.error(e); process.exit(1); });
