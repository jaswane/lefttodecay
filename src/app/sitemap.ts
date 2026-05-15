import type { MetadataRoute } from "next";
import { STORIES } from "@/content/stories";
import { TAGS } from "@/content/tags";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lefttodecay.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];
  const storyRoutes: MetadataRoute.Sitemap = STORIES.map((s) => ({
    url: `${SITE_URL}/story/${s.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.9,
  }));
  const tagRoutes: MetadataRoute.Sitemap = TAGS.map((t) => ({
    url: `${SITE_URL}/tag/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...staticRoutes, ...storyRoutes, ...tagRoutes];
}
