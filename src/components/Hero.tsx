"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Photo } from "./Photo";
import type { ImageSource } from "@/lib/types";

export function Hero({ image }: { image: ImageSource }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-[#0a0a0a] text-white grain"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Photo
          image={image}
          sizes="100vw"
          priority
          fill
          className="h-full w-full"
        />
        {/* Single soft bottom vignette — the image breathes everywhere else.
         * No mid/top tint, no heavy gradient. Only a quiet veil under
         * the title so the metadata stays legible. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-24 sm:pb-28 lg:pb-32"
      >
        <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-10 lg:px-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4 }}
            className="font-display text-[10.5px] sm:text-[11px] uppercase tracking-[0.36em] font-medium opacity-70 mb-5"
          >
            Documented on location · 2012 — 2019
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-medium tracking-[-0.02em] leading-[0.95] text-[10.5vw] sm:text-[8vw] lg:text-[108px] xl:text-[136px]"
          >
            Left to Decay
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 1.0 }}
            className="font-serif italic text-[15px] sm:text-base lg:text-lg max-w-[26ch] mt-6 sm:mt-7 opacity-80 leading-[1.55] text-balance"
          >
            Urban exploration and documentary photography archive.
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.8 }}
        className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-10 font-display text-[10px] uppercase tracking-[0.34em] font-medium opacity-45"
      >
        Scroll
      </motion.div>
    </section>
  );
}
