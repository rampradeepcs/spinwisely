import type { MetadataRoute } from "next";

const SITE = "https://www.spinwisely.com";

export const dynamic = "force-static";

/** XML sitemap for search engines (served at /sitemap.xml). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
