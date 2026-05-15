import Link from "next/link";
import { Hero } from "@/components/Hero";
import { StoryCard } from "@/components/StoryCard";
import { STORIES } from "@/content/stories";
import { TAGS } from "@/content/tags";
import { t } from "@/lib/i18n";

export default function Home() {
  const featuredStory = STORIES[0];

  return (
    <>
      <Hero image={featuredStory.hero} />

      {/* Intro */}
      <section className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 py-24 sm:py-32 lg:py-40">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
          <div className="lg:col-span-3">
            <p className="eyebrow">The archive</p>
          </div>
          <div className="lg:col-span-8">
            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-[1.3] tracking-[-0.01em] text-foreground">
              Left to Decay is a quiet, ongoing record of the places we leave
              behind. Each story is photographed on location, in available light,
              and presented here in full — without compression, without commentary,
              without rush.
            </p>
          </div>
        </div>
      </section>

      {/* Stories */}
      <section id="stories" className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16">
        <div className="flex items-baseline justify-between mb-12 lg:mb-20">
          <p className="eyebrow">Stories</p>
          <p className="eyebrow">{String(STORIES.length).padStart(2, "0")} documented</p>
        </div>
        <div className="grid gap-20 sm:gap-24 lg:gap-32 lg:grid-cols-2">
          {STORIES.map((story, i) => (
            <StoryCard key={story.slug} story={story} index={i} />
          ))}
        </div>
      </section>

      {/* Archives / tags */}
      <section
        id="archives"
        className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 py-32 lg:py-48"
      >
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 mb-12">
          <div className="lg:col-span-3">
            <p className="eyebrow">Featured archives</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.05]">
              Browse by theme,
              <br />
              place, or method.
            </h2>
          </div>
        </div>
        <ul className="border-t hairline">
          {TAGS.map((tag) => (
            <li key={tag.slug} className="border-b hairline">
              <Link
                href={`/tag/${tag.slug}`}
                className="group flex items-baseline justify-between gap-6 py-6 sm:py-8"
              >
                <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium tracking-[-0.02em] group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  {t(tag.title)}
                </span>
                <span className="font-display text-[11px] uppercase tracking-[0.22em] text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  View →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
