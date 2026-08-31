import sharp from "sharp";

const W = 1200, H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e3ad28" stop-opacity="0.16"/>
      <stop offset="70%" stop-color="#e3ad28" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#e3ad28" stop-opacity="0"/>
      <stop offset="50%" stop-color="#e3ad28" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#e3ad28" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#050505"/>
  <ellipse cx="600" cy="70" rx="620" ry="330" fill="url(#glow)"/>
  <g stroke="#f7f7f5" stroke-opacity="0.045" stroke-width="1">
    ${Array.from({ length: 17 }, (_, i) => `<line x1="${i * 72}" y1="0" x2="${i * 72}" y2="${H}"/>`).join("")}
    ${Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${i * 72}" x2="${W}" y2="${i * 72}"/>`).join("")}
  </g>
  <rect x="0" y="486" width="${W}" height="1.5" fill="url(#rule)"/>
  <text x="600" y="540" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
        font-size="21" letter-spacing="6.5" fill="#e3ad28" font-weight="700">EDUCATE. EMPOWER. ELEVATE.</text>
  <text x="600" y="578" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
        font-size="17" letter-spacing="2.6" fill="#8f8f8f">Professional Fitness Education · Chennai</text>
  <rect x="26" y="26" width="34" height="1" fill="#e3ad28" fill-opacity="0.5"/>
  <rect x="26" y="26" width="1" height="34" fill="#e3ad28" fill-opacity="0.5"/>
  <rect x="${W - 60}" y="${H - 27}" width="34" height="1" fill="#e3ad28" fill-opacity="0.5"/>
  <rect x="${W - 27}" y="${H - 60}" width="1" height="34" fill="#e3ad28" fill-opacity="0.5"/>
</svg>`;

const logo = await sharp("public/images/brand/coachlab-logo.png")
  .resize({ width: 620 })
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: logo, top: 108, left: Math.round((W - 620) / 2) }])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile("public/images/brand/og-default.jpg");

console.log("og-default.jpg written");
