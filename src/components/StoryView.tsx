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
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/30 pointer-events-none" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 sm:pb-24">
          <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-10 lg:px-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-display text-[11px] uppercase tracking-[0.22em] opacity-80 mb-5"
            >
              {t(story.location)} · {story.year}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-medium tracking-[-0.03em] leading-[0.95] text-5xl sm:text-7xl lg:text-8xl max-w-4xl"
            >
              {t(story.title)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="font-serif text-lg sm:text-xl lg:text-2xl mt-6 max-w-2xl opacity-90 leading-relaxed"
            >
              {t(story.subtitle)}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Metadata + intro */}
      <section className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
          <aside className="lg:col-span-3 space-y-6">
            <div>
              <p className="eyebrow mb-2">Location</p>
              <p className="font-serif text-lg">{t(story.location)}</p>
            </div>
            <div>
              <p className="eyebrow mb-2">Documented</p>
              <p className="font-serif text-lg">{story.documentedRange ?? story.year}</p>
            </div>
            <div>
              <p className="eyebrow mb-2">Tags</p>
              <ul className="flex flex-wrap gap-x-3 gap-y-1">
                {story.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/tag/${tag}`}
                      className="font-serif text-lg underline-offset-4 hover:underline"
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="lg:col-span-8">
            <p className="font-serif text-2xl sm:text-3xl leading-[1.4] tracking-[-0.005em]">
              {t(story.intro)}
            </p>
          </div>
        </div>
      </section>

      {/* Editorial blocks */}
      <article className="space-y-24 sm:space-y-32">
        {story.blocks.map((block, i) => {
          if (block.kind === "paragraph") {
            return (
              <div
                key={i}
                className="mx-auto max-w-[760px] px-6 sm:px-10"
              >
                <p className="font-serif text-xl sm:text-2xl leading-[1.55] text-foreground">
                  {t(block.body)}
                </p>
              </div>
            );
          }
          if (block.kind === "pullquote") {
            return (
              <div
                key={i}
                className="mx-auto max-w-[1100px] px-6 sm:px-10 text-center"
              >
                <p className="font-serif italic text-3xl sm:text-4xl lg:text-5xl leading-[1.2] tracking-[-0.01em] text-foreground">
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
                  <p className="font-serif text-sm text-muted mt-4 max-w-prose mx-auto px-6 italic">
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
        <section className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 mt-32 sm:mt-48">
          <div className="flex items-baseline justify-between mb-12">
            <p className="eyebrow">Related stories</p>
            <Link
              href="/#stories"
              className="font-display text-[11px] uppercase tracking-[0.22em] text-muted hover:text-foreground transition-colors"
            >
              All stories →
            </Link>
          </div>
          <div className="grid gap-16 sm:gap-20 sm:grid-cols-2 lg:grid-cols-3">
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
                <h3 className="font-display text-xl sm:text-2xl font-medium tracking-[-0.02em] mt-5">
                  {t(r.title)}
                </h3>
                <p className="font-serif text-base text-muted mt-1">
                  {t(r.location)} · {r.year}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to archive */}
      <section className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 mt-24 sm:mt-32 mb-12">
        <Link
          href="/#stories"
          className="font-display text-[11px] uppercase tracking-[0.22em] hover:text-muted transition-colors"
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
