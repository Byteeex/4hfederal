import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = process.env.QA_BASE_URL || "http://localhost:3000";
const routes = [
  "/",
  "/services",
  "/who-we-support",
  "/about",
  "/contact",
  "/privacy-policy",
];
const viewports = [
  { width: 1440, height: 900 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
];
const output = process.argv[2] || "before";
const dir = `qa-screenshots/audit-${output}`;
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({
      viewport,
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    for (const route of routes) {
      await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
      const name = route === "/" ? "home" : route.slice(1);
      const stem = `${dir}/${name}-${viewport.width}`;
      await page.screenshot({
        path: `${stem}-full.png`,
        fullPage: true,
        animations: "disabled",
      });
      const height = await page.evaluate(
        () => document.documentElement.scrollHeight,
      );
      const max = Math.max(0, height - viewport.height);
      for (const [label, fraction] of [
        ["top", 0],
        ["mid", 0.45],
        ["end", 1],
      ]) {
        await page.evaluate(
          (y) => window.scrollTo(0, y),
          Math.round(max * fraction),
        );
        await page.waitForTimeout(120);
        await page.screenshot({
          path: `${stem}-${label}.png`,
          animations: "disabled",
        });
      }
      console.log(`${name} ${viewport.width}: ${height}px`);
    }
    await page.close();
  }
} finally {
  await browser.close();
}
