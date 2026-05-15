"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { Photo } from "./Photo";
import { Lightbox } from "./Lightbox";
import type { ImageSource, Story } from "@/lib/types";
import { t } from "@/lib/i18n";

type Props = {
  images: Array<{ image: ImageSource; story: Story }>;
};

export function TagView({ images }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const pool = images.map((x) => x.image);

  return (
    <>
      <div className="grid gap-12 sm:gap-16 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((entry, i) => (
          <motion.figure
            key={entry.image.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: (i % 6) * 0.04 }}
          >
            <Photo
              image={entry.image}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              onClick={() => setOpenIndex(i)}
            />
            <figcaption className="mt-4 flex items-baseline justify-between gap-4">
              <Link
                href={`/story/${entry.story.slug}`}
                className="font-display text-lg sm:text-xl font-semibold tracking-[-0.015em] hover:text-foreground/70 transition-colors"
              >
                {t(entry.story.title)}
              </Link>
              <span className="eyebrow-muted shrink-0">{entry.story.year}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

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
