import sharp from "sharp";

const logo = "public/brand/4h-logo.png";

await sharp(logo)
  .flatten({ background: "#ffffff" })
  .jpeg({ quality: 96, chromaSubsampling: "4:4:4" })
  .toFile("public/brand/4h-logo.jpeg");

await sharp(logo)
  .resize(192, 192, { fit: "contain" })
  .png({ compressionLevel: 9 })
  .toFile("public/icon.png");

await sharp(logo)
  .resize(180, 180, { fit: "contain" })
  .png({ compressionLevel: 9 })
  .toFile("public/apple-icon.png");

const card = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#F8F8F4"/>
    <rect width="18" height="630" fill="#DB0F1A"/>
    <text x="520" y="245" font-family="Arial, sans-serif" font-size="76" font-weight="700" letter-spacing="-3" fill="#17201B">4H Federal</text>
    <text x="522" y="312" font-family="Arial, sans-serif" font-size="27" fill="#496058">Government Contracting Engine</text>
    <line x1="522" y1="365" x2="1090" y2="365" stroke="#CFD8D1"/>
    <text x="522" y="418" font-family="Arial, sans-serif" font-size="20" letter-spacing="2" fill="#016133">CAPTURE  /  SOURCING  /  PROPOSALS  /  ADMINISTRATION</text>
  </svg>
`);

const socialLogo = await sharp(logo)
  .resize(360, 360, { fit: "contain" })
  .png()
  .toBuffer();

await sharp(card)
  .composite([{ input: socialLogo, top: 135, left: 90 }])
  .png({ compressionLevel: 9 })
  .toFile("public/og-image.png");

console.log(
  "Generated legacy logo JPEG, icon.png, apple-icon.png, and og-image.png",
);
