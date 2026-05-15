import type { Story, ImageSource } from "@/lib/types";
import { chernobyl2017 } from "./stories/chernobyl-2017";
import { paperMillSweden } from "./stories/paper-mill-sweden";
import { forestHouse } from "./stories/forest-house";
import { militaryTunnel } from "./stories/military-tunnel";

export const STORIES: Story[] = [
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
