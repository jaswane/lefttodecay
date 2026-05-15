import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TAGS, getTag } from "@/content/tags";
import { getFeaturedImagesByTag, getStoriesByTag } from "@/content/stories";
import { TagView } from "@/components/TagView";
import { t } from "@/lib/i18n";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return TAGS.map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTag(slug);
  if (!tag) return {};
  const title = `${t(tag.title)} — archive`;
  const description = tag.description
    ? t(tag.description)
    : `Documentary photographs filed under ${t(tag.title)}.`;
  return { title, description };
}

export default async function TagPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const tag = getTag(slug);
  if (!tag) notFound();

  const images = getFeaturedImagesByTag(tag.slug);
  const stories = getStoriesByTag(tag.slug);

  const tagIndex = TAGS.findIndex((t) => t.slug === tag.slug);

  return (
    <>
      <section className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 pt-32 sm:pt-40 pb-14 sm:pb-20">
        <div className="flex items-baseline justify-between border-b hairline pb-5 mb-10 sm:mb-14">
          <p className="eyebrow">
            <span className="opacity-50 mr-2">Chapter</span>
            {String(tagIndex + 1).padStart(2, "0")} of{" "}
            {String(TAGS.length).padStart(2, "0")}
          </p>
          <p className="eyebrow-muted">Archive</p>
        </div>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-baseline">
          <h1 className="lg:col-span-7 font-display font-semibold tracking-[-0.035em] leading-[0.9] text-[3.5rem] sm:text-7xl lg:text-[6rem]">
            {t(tag.title)}
          </h1>
          <div className="lg:col-span-5 space-y-5">
            {tag.description && (
              <p className="font-serif text-xl sm:text-[1.375rem] text-foreground/85 leading-[1.45]">
                {t(tag.description)}
              </p>
            )}
            <p className="eyebrow-muted">
              {String(images.length).padStart(2, "0")} featured ·{" "}
              {String(stories.length).padStart(2, "0")} stories
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16">
        {images.length > 0 ? (
          <TagView images={images} />
        ) : (
          <p className="font-serif text-xl text-muted italic">
            No featured photographs filed under this chapter yet.
          </p>
        )}
      </section>

      {stories.length > 0 && (
        <section className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 mt-24 sm:mt-32">
          <p className="eyebrow mb-6">Stories filed here</p>
          <ul className="border-t hairline">
            {stories.map((story) => (
              <li key={story.slug} className="border-b hairline">
                <Link
                  href={`/story/${story.slug}`}
                  className="group flex items-baseline justify-between gap-6 py-5 sm:py-7"
                >
                  <span className="font-display text-2xl sm:text-3xl lg:text-[2rem] font-semibold tracking-[-0.025em] group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    {t(story.title)}
                  </span>
                  <span className="eyebrow-muted text-right">
                    {t(story.location)} · {story.year}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 mt-20 sm:mt-24 mb-14">
        <Link
          href="/#archives"
          className="eyebrow-muted hover:text-foreground transition-colors"
        >
          ← All chapters
        </Link>
      </section>
    </>
  );
}
