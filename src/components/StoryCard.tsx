"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Photo } from "./Photo";
import { t } from "@/lib/i18n";
import type { Story } from "@/lib/types";

export function StoryCard({ story, index }: { story: Story; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/story/${story.slug}`} className="block">
        <div className="overflow-hidden relative aspect-[4/3] lg:aspect-[3/2]">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Photo
              image={story.hero}
              sizes="(min-width: 1024px) 50vw, 100vw"
              fill
              className="absolute inset-0"
            />
          </motion.div>
        </div>
        <div className="pt-7 sm:pt-8">
          <p className="eyebrow mb-3">
            <span className="opacity-50 mr-2">№ {String(index + 1).padStart(2, "0")}</span>
            <span>
              {t(story.location)} · {story.year}
            </span>
          </p>
          <h3 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-[-0.025em] leading-[1.0]">
            {t(story.title)}
          </h3>
          <p className="font-serif text-lg sm:text-xl text-foreground/85 mt-3 max-w-xl leading-[1.45]">
            {t(story.subtitle)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
