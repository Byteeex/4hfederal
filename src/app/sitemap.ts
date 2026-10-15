import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services", "/who-we-support", "/about", "/contact"].map(
    (path) => ({
      url: new URL(path || "/", site.url).toString(),
      changeFrequency: "monthly" as const,
      priority: path ? 0.7 : 1,
    }),
  );
}
