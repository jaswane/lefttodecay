import type { Story, ImageSource } from "@/lib/types";
import { carcemetery } from "./stories/carcemetery";
import { chernobyl2017 } from "./stories/chernobyl-2017";
import { paperMillSweden } from "./stories/paper-mill-sweden";
import { forestHouse } from "./stories/forest-house";
import { militaryTunnel } from "./stories/military-tunnel";

/**
 * Global homepage hero. Decoupled from STORIES[0] so the cover image
 * can be curated independently of the lead story — exactly like a
 * magazine cover photograph that doesn't have to come from the lead
 * feature inside.
 */
export const HOMEPAGE_HERO: ImageSource = {
  id: "homepage-hero",
  // Literal spaces — `next/image` will URL-encode once when passing
  // the src through the optimizer. Pre-encoding here would double-
  // encode into `%2520` and 404 against R2.
  src: "https://images.lefttodecay.com/chateau congo hero.jpg",
  width: 4000,
  height: 1992,
  alt: {
    en: "Chateau Congo — a quiet, dust-lit interior at the heart of the archive",
  },
  featured: true,
};

export const STORIES: Story[] = [
  carcemetery,
  chernobyl2017,
  paperMillSweden,
  militaryTunnel,
  forestHouse,
];

export function getStory(slug: string): Story | undefined {
  return STORIES.find((s) => s.slug === slug);
}

export function getStoriesByTag(slug: string): Story[] {
  return STORIES.filter(
    (s) => s.tags.includes(slug) || s.images.some((img) => img.tags?.includes(slug)),
  );
}

export function getFeaturedImagesByTag(slug: string): Array<{
  image: ImageSource;
  story: Story;
}> {
  const out: Array<{ image: ImageSource; story: Story }> = [];
  for (const story of STORIES) {
    if (story.hero.featured && (story.tags.includes(slug) || story.hero.tags?.includes(slug))) {
      out.push({ image: story.hero, story });
    }
    for (const img of story.images) {
      if (img.featured && img.tags?.includes(slug)) {
        out.push({ image: img, story });
      }
    }
  }
  return out;
}

export function getRelatedStories(current: Story, limit = 3): Story[] {
  const tagSet = new Set(current.tags);
  return STORIES.filter((s) => s.slug !== current.slug)
    .map((s) => ({
      story: s,
      score: s.tags.filter((t) => tagSet.has(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.story);
}

export function findImageInStory(story: Story, imageId: string): ImageSource | undefined {
  if (story.hero.id === imageId) return story.hero;
  return story.images.find((i) => i.id === imageId);
}
