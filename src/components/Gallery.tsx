"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Photo } from "./Photo";
import { Lightbox } from "./Lightbox";
import type { ImageSource, Locale } from "@/lib/types";

type Props = {
  images: ImageSource[];
  locale?: Locale;
  /**
   * A render prop that lets pages use their own layout (pair, fullbleed, etc.)
   * while still wiring up the lightbox. If omitted, falls back to a simple
   * stacked layout.
   */
  children?: (open: (id: string) => void) => React.ReactNode;
  sizes?: string;
};

export function Gallery({ images, locale, children, sizes }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = (id: string) => {
    const i = images.findIndex((img) => img.id === id);
    if (i >= 0) setOpenIndex(i);
  };

  return (
    <>
      {children ? (
        children(open)
      ) : (
        <div className="space-y-16">
          {images.map((img, i) => (
            <Photo
              key={img.id}
              image={img}
              sizes={sizes ?? "100vw"}
              onClick={() => setOpenIndex(i)}
            />
          ))}
        </div>
      )}
      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            images={images}
            index={openIndex}
            locale={locale}
            onClose={() => setOpenIndex(null)}
            onIndexChange={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
