"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { resolveImageSrc } from "@/lib/image";
import { t } from "@/lib/i18n";
import type { ImageSource, Locale } from "@/lib/types";

type Props = {
  image: ImageSource;
  locale?: Locale;
  onClick?: () => void;
  /** Display height in px on desktop. */
  height?: number;
};

/**
 * Panorama strip: a wide image rendered at a fixed display height so it
 * exceeds the viewport horizontally, with a subtle scroll hint and
 * native horizontal pan support.
 */
export function Panorama({ image, locale = "en", onClick, height = 520 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hintVisible, setHintVisible] = useState(true);

  const displayWidth = (image.width / image.height) * height;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => setHintVisible(el.scrollLeft < 40);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      <div
        ref={ref}
        className="panorama-scroll relative overflow-x-auto overflow-y-hidden"
        style={{ scrollbarGutter: "stable" }}
      >
        <div
          className={`relative ${onClick ? "cursor-zoom-in" : ""}`}
          style={{
            width: `${displayWidth}px`,
            height: `${height}px`,
          }}
          onClick={onClick}
        >
          <Image
            src={resolveImageSrc(image.src)}
            alt={t(image.alt, locale)}
            fill
            sizes={`${Math.round(displayWidth)}px`}
            quality={85}
            style={{ objectFit: "cover" }}
            draggable={false}
          />
        </div>
      </div>
      {hintVisible && (
        <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[10px] uppercase tracking-[0.22em] font-medium text-white/80 mix-blend-difference">
          Scroll →
        </div>
      )}
    </div>
  );
}
