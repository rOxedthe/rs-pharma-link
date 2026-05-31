import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rspharmalink.com";
  const now = new Date();

  return [
    { url: base,                  lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/products`,    lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/services`,    lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/careers`,     lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
