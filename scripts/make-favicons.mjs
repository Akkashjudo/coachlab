/**
 * Generates the favicon set from the supplied CoachLab monogram.
 *
 * Google looks for /favicon.ico first and wants a square icon whose side is a
 * multiple of 48px. The site previously shipped a single 180x180 PNG and no
 * .ico at all, so the favicon crawler fell back to the generic globe.
 *
 * The artwork is never redrawn — the transparent gold monogram is trimmed to
 * its ink, re-padded to a square with an even margin so it fills the frame at
 * 16px, and flattened onto the brand black. Gold on black is ~10:1; gold on
 * white would be ~2:1, which is why these are not transparent.
 *
 * Run: node scripts/make-favicons.mjs
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SOURCE = "public/images/brand/coachlab-mark.png";
const OUT_DIR = "public/icons";
const BACKGROUND = { r: 5, g: 5, b: 5, alpha: 1 }; // --color-ink
/** Share of the canvas left as breathing room. Kept tight — at 16px every
 *  pixel of glyph counts, and browsers already inset tab icons slightly. */
const MARGIN = 0.045;

const PNG_SIZES = [48, 96, 144, 192, 512];
const APPLE_SIZE = 180; // Apple's own standard, deliberately not a 48 multiple
const ICO_SIZES = [16, 32, 48];

fs.mkdirSync(OUT_DIR, { recursive: true });

/** Trimmed, centred, flattened square of the monogram at `size`. */
async function render(size, margin = MARGIN) {
  const inner = Math.round(size * (1 - margin * 2));

  const glyph = await sharp(SOURCE)
    .trim({ threshold: 2 }) // drop the transparent padding around the ink
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: "lanczos3",
    })
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: BACKGROUND },
  })
    .composite([{ input: glyph, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/**
 * Packs PNGs into a multi-resolution .ico.
 *
 * ICO is a simple container: a 6-byte ICONDIR, then one 16-byte ICONDIRENTRY
 * per image, then the image payloads. PNG payloads are used rather than BMP —
 * every browser and Googlebot reads them, and they avoid the BMP mask fiddle.
 */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = [];

  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // 0 encodes 256
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([
    header,
    ...entries,
    ...images.map((i) => i.data),
  ]);
}

const run = async () => {
  for (const size of PNG_SIZES) {
    const file = path.join(OUT_DIR, `icon-${size}.png`);
    fs.writeFileSync(file, await render(size));
    console.log(`  ${file}  ${size}x${size}`);
  }

  const apple = path.join(OUT_DIR, "apple-touch-icon.png");
  fs.writeFileSync(apple, await render(APPLE_SIZE));
  console.log(`  ${apple}  ${APPLE_SIZE}x${APPLE_SIZE}`);

  // Android masks icons to a circle and crops ~20% off each edge, so the
  // maskable variant needs the glyph inside the safe zone. Reusing the tight
  // icon here would clip the monogram.
  const maskable = path.join(OUT_DIR, "icon-maskable-512.png");
  fs.writeFileSync(maskable, await render(512, 0.2));
  console.log(`  ${maskable}  512x512 (safe-zone padded)`);

  const icoImages = [];
  for (const size of ICO_SIZES) {
    icoImages.push({ size, data: await render(size) });
  }
  fs.writeFileSync("public/favicon.ico", buildIco(icoImages));
  console.log(
    `  public/favicon.ico  ${ICO_SIZES.join(", ")} (${ICO_SIZES.length} resolutions)`,
  );
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
