const palettes = {
  spring: [
    { name: "Sakura", dark: ["#10251E", "#375B4A", "#F7A8B8", "#F5D0A9", "#FFF7F5"], light: ["#FFF1F4", "#FBCFE8", "#BE185D", "#0F766E", "#3B1025"] },
    { name: "Fresh Bloom", dark: ["#132B28", "#28665B", "#B7E4C7", "#FFD6A5", "#F4FFF8"], light: ["#F0FDF4", "#BBF7D0", "#166534", "#C2410C", "#123326"] },
    { name: "Pastel Garden", dark: ["#2B1B35", "#60466B", "#F2B5D4", "#CDEAC0", "#FFF7FC"], light: ["#FDF4FF", "#E9D5FF", "#A21CAF", "#4D7C0F", "#35123F"] }
  ],
  summer: [
    { name: "Ocean Pulse", dark: ["#061B36", "#075985", "#22D3EE", "#FDE68A", "#F0FBFF"], light: ["#ECFEFF", "#BAE6FD", "#0E7490", "#B45309", "#082F49"] },
    { name: "Solar Coast", dark: ["#172554", "#0369A1", "#FBBF24", "#67E8F9", "#F8FAFC"], light: ["#EFF6FF", "#BFDBFE", "#1D4ED8", "#B45309", "#172554"] },
    { name: "Tropical", dark: ["#042F2E", "#0F766E", "#5EEAD4", "#FDBA74", "#F0FDFA"], light: ["#F0FDFA", "#99F6E4", "#0F766E", "#C2410C", "#134E4A"] }
  ],
  autumn: [
    { name: "Ember", dark: ["#26140D", "#78350F", "#FB923C", "#FCD34D", "#FFF7ED"], light: ["#FFF7ED", "#FED7AA", "#C2410C", "#92400E", "#431407"] },
    { name: "Harvest", dark: ["#292016", "#57502A", "#DDA15E", "#BC6C25", "#FFFBEB"], light: ["#FFFBEB", "#FDE68A", "#92400E", "#B45309", "#422006"] },
    { name: "Copper Night", dark: ["#251525", "#713F3F", "#FCA5A5", "#FDBA74", "#FFF7F5"], light: ["#FFF1F2", "#FECDD3", "#BE123C", "#C2410C", "#4C0519"] }
  ],
  winter: [
    { name: "Arctic", dark: ["#0B1730", "#243B67", "#7DD3FC", "#C4B5FD", "#F0F9FF"], light: ["#F0F9FF", "#BAE6FD", "#0369A1", "#6D28D9", "#082F49"] },
    { name: "Frost", dark: ["#111827", "#334155", "#BAE6FD", "#E9D5FF", "#F8FAFC"], light: ["#F8FAFC", "#E2E8F0", "#0369A1", "#7E22CE", "#0F172A"] },
    { name: "Aurora", dark: ["#101B36", "#312E81", "#5EEAD4", "#C4B5FD", "#F5F3FF"], light: ["#F5F3FF", "#DDD6FE", "#0F766E", "#6D28D9", "#1E1B4B"] }
  ]
};

// India-friendly seasonal calendar in Asia/Kolkata:
// Spring: Feb-Mar, Summer: Apr-Jun, Monsoon: Jul-Sep (mapped to summer palettes),
// Autumn: Oct-Nov, Winter: Dec-Jan.
function getSeason(date) {
  const month = Number(new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata", month: "numeric"
  }).format(date));
  if (month >= 2 && month <= 3) return "spring";
  if (month >= 4 && month <= 9) return "summer";
  if (month >= 10 && month <= 11) return "autumn";
  return "winter";
}

function escapeXml(value) {
  return String(value).replace(/[<>&'"]/g, (char) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;"
  })[char]);
}

module.exports = (req, res) => {
  const now = new Date();
  const season = getSeason(now);
  const seasonPalettes = palettes[season];
  const palette = seasonPalettes[Math.floor(Math.random() * seasonPalettes.length)];
  const theme = String(req.query.theme || "dark").toLowerCase() === "light" ? "light" : "dark";
  const [bg1, bg2, accent, accent2, text] = palette[theme];
  const user = escapeXml(req.query.user || "SKY-Apocalypse");
  const title = user.toUpperCase();
  const timeLabel = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false
  }).format(now);

  // No-cache headers improve freshness. GitHub's image proxy may still cache.
  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0");
  res.setHeader("CDN-Cache-Control", "no-store");
  res.setHeader("Vercel-CDN-Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Vary", "*");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="330" viewBox="0 0 1200 330" role="img" aria-label="${title} dynamic ${theme} seasonal banner">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg1}"/><stop offset="100%" stop-color="${bg2}"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${accent}"/><stop offset="100%" stop-color="${accent2}"/>
    </linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="34"/></filter>
    <style>
      .title { font: 800 76px Arial,sans-serif; letter-spacing: 7px; fill: ${text}; }
      .sub { font: 600 21px Arial,sans-serif; letter-spacing: 3px; fill: ${accent}; }
      .meta { font: 600 13px Arial,sans-serif; letter-spacing: 2px; fill: ${text}; opacity: .78; }
      .smiley { animation: float 6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
      @keyframes float {
        0% { transform: translate(0px, 0px) rotate(-5deg); }
        25% { transform: translate(20px, -13px) rotate(2deg); }
        50% { transform: translate(0px, -24px) rotate(7deg); }
        75% { transform: translate(-20px, -11px) rotate(1deg); }
        100% { transform: translate(0px, 0px) rotate(-5deg); }
      }
      .pulse { animation: pulse 4s ease-in-out infinite; }
      @keyframes pulse { 0%,100% { opacity:.14; } 50% { opacity:.35; } }
    </style>
  </defs>
  <rect width="1200" height="330" rx="26" fill="url(#bg)"/>
  <circle cx="180" cy="60" r="125" fill="${accent}" filter="url(#blur)" class="pulse"/>
  <circle cx="1030" cy="270" r="160" fill="${accent2}" filter="url(#blur)" class="pulse"/>
  <path d="M0 255 C220 190 340 315 580 245 S970 190 1200 250 L1200 330 L0 330Z" fill="url(#glow)" opacity=".10"/>
  <path d="M0 275 C250 220 410 325 660 260 S1000 225 1200 270" fill="none" stroke="url(#glow)" stroke-width="2" opacity=".55"/>
  <text x="600" y="145" text-anchor="middle" class="title">${title}</text>
  <text x="600" y="190" text-anchor="middle" class="sub">ENGINEERING STUDENT  •  DEVELOPER  •  CURIOUS BUILDER</text>
  <text x="600" y="235" text-anchor="middle" class="meta">${season.toUpperCase()}  •  ${palette.name.toUpperCase()}  •  ${timeLabel} IST  •  ${theme.toUpperCase()} MODE</text>
  <g class="smiley" transform="translate(600 278)">
    <circle r="23" fill="${accent2}" stroke="${text}" stroke-width="2"/>
    <circle cx="-8" cy="-5" r="2.8" fill="${bg1}"/><circle cx="8" cy="-5" r="2.8" fill="${bg1}"/>
    <path d="M-9 6 Q0 16 9 6" fill="none" stroke="${bg1}" stroke-width="2.8" stroke-linecap="round"/>
  </g>
</svg>`;
  res.status(200).send(svg);
};
