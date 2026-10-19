import type { Metadata } from "next";
import { site } from "@/content/site";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${title} | ${site.name}`,
      description,
      siteName: site.name,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "4H Morocco Government Contracting Engine",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: ["/og-image.png"],
    },
  };
}
