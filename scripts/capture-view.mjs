import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const route = process.argv[2] || "/";
const width = Number(process.argv[3] || 1440);
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width, height: width < 600 ? 844 : 900 },
    deviceScaleFactor: 1,
  });
  await page.goto(`http://localhost:3000${route}`, {
    waitUntil: "networkidle",
  });
  if (process.argv[4])
    await page.locator(process.argv[4]).scrollIntoViewIfNeeded();
  await mkdir("qa-screenshots", { recursive: true });
  const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
  await page.screenshot({
    path: `qa-screenshots/${name}-viewport-${width}.png`,
  });
} finally {
  await browser.close();
}
