"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Photo } from "./Photo";
import { Panorama } from "./Panorama";
import { Lightbox } from "./Lightbox";
import { t } from "@/lib/i18n";
import type { Story, ImageSource } from "@/lib/types";
import { SIZES } from "@/lib/image";

type Props = {
  story: Story;
  related: Story[];
};

export function StoryView({ story, related }: Props) {
  // The full image pool for the lightbox: hero + all story images.
  const pool: ImageSource[] = [story.hero, ...story.images];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openById = (id: string) => {
    const i = pool.findIndex((img) => img.id === id);
    if (i >= 0) setOpenIndex(i);
  };

  const lookup = (id: string): ImageSource | undefined =>
    pool.find((img) => img.id === id);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-[#0a0a0a] text-white">
        <Photo
          image={story.hero}
          sizes={SIZES.hero}
          priority
          fill
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 pointer-events-none" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-14 sm:pb-20">
          <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-10 lg:px-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-display text-[12px] uppercase tracking-[0.28em] font-semibold opacity-90 mb-4"
            >
              {t(story.location)} · {story.year}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-semibold tracking-[-0.035em] leading-[0.9] text-[3.5rem] sm:text-7xl lg:text-[7rem] max-w-4xl"
            >
              {t(story.title)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="font-serif text-xl sm:text-2xl lg:text-[1.75rem] mt-5 max-w-2xl opacity-95 leading-[1.35]"
            >
              {t(story.subtitle)}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Metadata + intro */}
      <section className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
          <aside className="lg:col-span-3 space-y-7 border-t-2 hairline pt-7 lg:border-t-0 lg:pt-0">
            <div>
              <p className="eyebrow mb-1.5">Location</p>
              <p className="font-serif text-lg leading-snug">{t(story.location)}</p>
            </div>
            <div>
              <p className="eyebrow mb-1.5">Documented</p>
              <p className="font-serif text-lg leading-snug">
                {story.documentedRange ?? story.year}
              </p>
            </div>
            <div>
              <p className="eyebrow mb-1.5">Tags</p>
              <ul className="flex flex-wrap gap-x-3 gap-y-0.5">
                {story.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/tag/${tag}`}
                      className="font-serif text-lg italic underline-offset-4 hover:underline"
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="lg:col-span-8">
            <p className="font-serif text-[1.6rem] sm:text-3xl lg:text-[2rem] leading-[1.35] tracking-[-0.005em] text-foreground">
              {t(story.intro)}
            </p>
          </div>
        </div>
      </section>

      {/* Editorial blocks */}
      <article className="space-y-20 sm:space-y-24">
        {story.blocks.map((block, i) => {
          if (block.kind === "paragraph") {
            return (
              <div
                key={i}
                className="mx-auto max-w-[680px] px-6 sm:px-10"
              >
                <p className="font-serif text-[1.25rem] sm:text-[1.375rem] leading-[1.6] text-foreground">
                  {t(block.body)}
                </p>
              </div>
            );
          }
          if (block.kind === "pullquote") {
            return (
              <div
                key={i}
                className="mx-auto max-w-[1100px] px-6 sm:px-10"
              >
                <p className="font-serif italic text-[2rem] sm:text-4xl lg:text-[3rem] leading-[1.18] tracking-[-0.015em] text-foreground border-l-2 hairline pl-6 sm:pl-10 max-w-[20ch] sm:max-w-[28ch]">
                  &ldquo;{t(block.body)}&rdquo;
                </p>
              </div>
            );
          }
          if (block.kind === "image") {
            const img = lookup(block.imageId);
            if (!img) return null;
            return (
              <div
                key={i}
                className={
                  block.fullBleed
                    ? "w-full"
                    : "mx-auto max-w-[1280px] px-6 sm:px-10"
                }
              >
                <Photo
                  image={img}
                  sizes={block.fullBleed ? SIZES.fullBleed : SIZES.prose}
                  onClick={() => openById(img.id)}
                />
                {img.caption && (
                  <p className="font-serif text-[15px] sm:text-base text-muted mt-4 max-w-[60ch] mx-auto px-6 italic leading-[1.5]">
                    {t(img.caption)}
                  </p>
                )}
              </div>
            );
          }
          if (block.kind === "pair") {
            const [a, b] = block.imageIds.map(lookup);
            if (!a || !b) return null;
            return (
              <div
                key={i}
                className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 grid sm:grid-cols-2 gap-6 sm:gap-10"
              >
                <Photo image={a} sizes={SIZES.pair} onClick={() => openById(a.id)} />
                <Photo image={b} sizes={SIZES.pair} onClick={() => openById(b.id)} />
              </div>
            );
          }
          if (block.kind === "panorama") {
            const img = lookup(block.imageId);
            if (!img) return null;
            return (
              <div key={i} className="w-full">
                <Panorama image={img} onClick={() => openById(img.id)} />
              </div>
            );
          }
          return null;
        })}
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 mt-28 sm:mt-40 border-t hairline pt-12 sm:pt-16">
          <div className="flex items-baseline justify-between mb-10 sm:mb-14">
            <p className="eyebrow">Related stories</p>
            <Link
              href="/#stories"
              className="eyebrow-muted hover:text-foreground transition-colors"
            >
              All stories →
            </Link>
          </div>
          <div className="grid gap-14 sm:gap-16 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/story/${r.slug}`} className="group block">
                <div className="overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Photo
                      image={r.hero}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[4/3]"
                    />
                  </motion.div>
                </div>
                <p className="eyebrow-muted mt-5 mb-1.5">
                  {t(r.location)} · {r.year}
                </p>
                <h3 className="font-display text-2xl sm:text-[1.75rem] font-semibold tracking-[-0.025em] leading-[1.05]">
                  {t(r.title)}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to archive */}
      <section className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 mt-20 sm:mt-24 mb-14">
        <Link
          href="/#stories"
          className="eyebrow-muted hover:text-foreground transition-colors"
        >
          ← Back to the archive
        </Link>
      </section>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            images={pool}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onIndexChange={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
