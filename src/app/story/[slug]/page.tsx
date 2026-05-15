import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { STORIES, getStory, getRelatedStories } from "@/content/stories";
import { StoryView } from "@/components/StoryView";
import { resolveImageSrc } from "@/lib/image";
import { t } from "@/lib/i18n";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  const title = t(story.title);
  const description = t(story.intro);
  const heroUrl = resolveImageSrc(story.hero.src);
  return {
    title,
    description,
    keywords: story.tags,
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: heroUrl,
          width: story.hero.width,
          height: story.hero.height,
          alt: t(story.hero.alt),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [heroUrl],
    },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const related = getRelatedStories(story);
  return <StoryView story={story} related={related} />;
}
