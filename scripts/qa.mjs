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
const widths = [1440, 1280, 1024, 768, 430, 390, 360];
const errors = [];
const browser = await chromium.launch({ channel: "chrome", headless: true });
await mkdir("qa-screenshots", { recursive: true });

try {
  for (const width of widths) {
    const page = await browser.newPage({
      viewport: { width, height: width < 600 ? 844 : 900 },
      deviceScaleFactor: 1,
    });
    page.on("pageerror", (error) => errors.push(`${width}: ${error.message}`));
    for (const route of routes) {
      const response = await page.goto(`${base}${route}`, {
        waitUntil: "networkidle",
      });
      if (response?.status() !== 200)
        errors.push(`${width} ${route}: HTTP ${response?.status()}`);
      if ((await page.locator("h1").count()) !== 1)
        errors.push(`${width} ${route}: expected one h1`);
      if ((await page.locator("main").count()) !== 1)
        errors.push(`${width} ${route}: expected one main landmark`);
      if (await page.locator("img:not([alt])").count())
        errors.push(`${width} ${route}: image missing alt attribute`);
      const unnamedControls = await page.locator("a, button").evaluateAll(
        (items) =>
          items.filter((item) => {
            const label = item.getAttribute("aria-label")?.trim();
            const text = item.textContent?.trim();
            const imageAlt = item
              .querySelector("img")
              ?.getAttribute("alt")
              ?.trim();
            return !label && !text && !imageAlt;
          }).length,
      );
      if (unnamedControls)
        errors.push(`${width} ${route}: ${unnamedControls} unnamed controls`);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      if (overflow > 2)
        errors.push(`${width} ${route}: horizontal overflow ${overflow}px`);
      const slug = route === "/" ? "home" : route.slice(1);
      if ((width === 1440 || width === 390) && route !== "/privacy-policy") {
        if (route === "/")
          await page.screenshot({
            path: `qa-screenshots/home-hero-${width}.png`,
          });
        for (
          let y = 0;
          y < (await page.evaluate(() => document.body.scrollHeight));
          y += 650
        ) {
          await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
          await page.waitForTimeout(25);
        }
        await page.screenshot({
          path: `qa-screenshots/${slug}-${width}.png`,
          fullPage: true,
        });
      }
    }
    if (width === 390) {
      await page.goto(base, { waitUntil: "networkidle" });
      await page.keyboard.press("Tab");
      if (
        !(await page
          .locator(".skip-link")
          .evaluate((item) => item === document.activeElement))
      )
        errors.push("skip link was not the first keyboard target");
      const menu = page.locator(".menu-toggle");
      await menu.click();
      if ((await menu.getAttribute("aria-expanded")) !== "true")
        errors.push("mobile menu did not open");
      await Promise.all([
        page.waitForURL((url) => url.pathname === "/services"),
        page
          .getByRole("navigation", { name: "Mobile navigation" })
          .getByRole("link", { name: /Services/ })
          .click(),
      ]);
      if (new URL(page.url()).pathname !== "/services")
        errors.push("mobile navigation did not reach services");
      await menu.click();
      await page.keyboard.press("Escape");
      if ((await menu.getAttribute("aria-expanded")) !== "false")
        errors.push("mobile menu did not close with Escape");
    }
    await page.close();
  }

  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
  });
  await page.goto(base, { waitUntil: "networkidle" });
  for (const [label, path] of [
    ["Services", "/services"],
    ["Who We Support", "/who-we-support"],
    ["About", "/about"],
    ["Contact", "/contact"],
    ["Home", "/"],
  ]) {
    await Promise.all([
      page.waitForURL((url) => url.pathname === path),
      page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name: label })
        .click(),
    ]);
    if (new URL(page.url()).pathname !== path)
      errors.push(`desktop navigation did not reach ${path}`);
  }
  await page.goto(`${base}/contact`, { waitUntil: "networkidle" });
  await page
    .getByRole("button", { name: "Request an Introductory Call" })
    .click();
  if (!(await page.getByRole("alert").count()))
    errors.push("empty contact form did not show validation");
  await page.locator("#fullName").fill("Jane Example");
  await page.locator("#companyName").fill("Example Company");
  await page.locator("#email").fill("jane@example.com");
  await page.locator("#stage").selectOption("Preparing to bid");
  await page.locator(".interest-options input").first().check();
  await page
    .locator("#message")
    .fill(
      "We are looking for proposal support on an upcoming federal pursuit.",
    );
  await page
    .getByRole("button", { name: "Request an Introductory Call" })
    .click();
  await page.getByRole("alert").first().waitFor();
  const text = await page.locator(".form-error-banner").textContent();
  if (!text?.includes("not configured"))
    errors.push(`unconfigured form response was not truthful: ${text}`);
  if (await page.getByText("Thank you for reaching out.").count())
    errors.push("form showed false success");
  await page.close();
} finally {
  await browser.close();
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `QA passed: ${routes.length} routes at ${widths.length} widths, mobile menu, validation, and email fallback.`,
  );
