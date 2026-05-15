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
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/30 pointer-events-none" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-20 sm:pb-24"
      >
        <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-10 lg:px-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-display text-[12px] uppercase tracking-[0.28em] font-semibold opacity-90 mb-5"
          >
            Documented on location · 2012 — 2019
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-semibold tracking-[-0.045em] leading-[0.88] text-[16vw] sm:text-[13vw] lg:text-[170px] xl:text-[210px]"
          >
            Left
            <br />
            to Decay
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="font-serif text-xl sm:text-2xl max-w-xl mt-7 opacity-95 leading-[1.4]"
          >
            Urban exploration and documentary photography archive.
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.6 }}
        className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-10 font-display text-[11px] uppercase tracking-[0.32em] font-semibold opacity-80"
      >
        Scroll
      </motion.div>
    </section>
  );
}
