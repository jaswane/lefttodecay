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

  return (
    <>
      <section className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 pt-36 sm:pt-44 pb-20">
        <p className="eyebrow mb-6">Archive</p>
        <h1 className="font-display font-medium tracking-[-0.03em] leading-[0.95] text-6xl sm:text-7xl lg:text-8xl">
          {t(tag.title)}
        </h1>
        {tag.description && (
          <p className="font-serif text-xl sm:text-2xl text-muted mt-8 max-w-2xl leading-relaxed">
            {t(tag.description)}
          </p>
        )}
        <p className="font-display text-[11px] uppercase tracking-[0.22em] text-muted mt-8">
          {String(images.length).padStart(2, "0")} featured ·{" "}
          {String(stories.length).padStart(2, "0")} stories
        </p>
      </section>

      <section className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16">
        {images.length > 0 ? (
          <TagView images={images} />
        ) : (
          <p className="font-serif text-xl text-muted">
            No featured photographs filed under this tag yet.
          </p>
        )}
      </section>

      {stories.length > 0 && (
        <section className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 mt-24 sm:mt-32">
          <p className="eyebrow mb-6">Stories with this tag</p>
          <ul className="border-t hairline">
            {stories.map((story) => (
              <li key={story.slug} className="border-b hairline">
                <Link
                  href={`/story/${story.slug}`}
                  className="group flex items-baseline justify-between gap-6 py-6"
                >
                  <span className="font-display text-2xl sm:text-3xl font-medium tracking-[-0.02em] group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    {t(story.title)}
                  </span>
                  <span className="font-display text-[11px] uppercase tracking-[0.22em] text-muted">
                    {t(story.location)} · {story.year}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 mt-24 sm:mt-32 mb-12">
        <Link
          href="/#archives"
          className="font-display text-[11px] uppercase tracking-[0.22em] hover:text-muted transition-colors"
        >
          ← All archives
        </Link>
      </section>
    </>
  );
}
