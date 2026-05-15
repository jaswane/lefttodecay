"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";
import { resolveImageSrc } from "@/lib/image";
import { t } from "@/lib/i18n";
import type { ImageSource, Locale } from "@/lib/types";

type Props = {
  images: ImageSource[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  locale?: Locale;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export function Lightbox({ images, index, onClose, onIndexChange, locale = "en" }: Props) {
  const current = images[index];
  const containerRef = useRef<HTMLDivElement>(null);
  const [uiVisible, setUiVisible] = useState(true);

  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const dragY = useMotionValue(0);
  // Soft fade-out as you swipe down to close (mobile)
  const overlayOpacity = useTransform(dragY, [0, 220], [1, 0.2]);

  const lastTapRef = useRef(0);
  const pinchStartRef = useRef<{ dist: number; scale: number } | null>(null);

  const resetTransforms = useCallback(() => {
    animate(scale, 1, { duration: 0.3 });
    animate(x, 0, { duration: 0.3 });
    animate(y, 0, { duration: 0.3 });
  }, [scale, x, y]);

  const goPrev = useCallback(() => {
    resetTransforms();
    setUiVisible(true);
    onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange, resetTransforms]);

  const goNext = useCallback(() => {
    resetTransforms();
    setUiVisible(true);
    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange, resetTransforms]);

  useEffect(() => {
    document.body.classList.add("scroll-locked");
    return () => {
      document.body.classList.remove("scroll-locked");
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  // Auto-hide UI whenever it becomes visible. Caller sites that want the UI
  // briefly shown (index change, tap, etc.) call setUiVisible(true).
  useEffect(() => {
    if (!uiVisible) return;
    const handle = setTimeout(() => setUiVisible(false), 2400);
    return () => clearTimeout(handle);
  }, [uiVisible]);

  const dist = (a: React.Touch, b: React.Touch) =>
    Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);

  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      pinchStartRef.current = {
        dist: dist(e.touches[0], e.touches[1]),
        scale: scale.get(),
      };
    } else if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTapRef.current < 280) {
        // Double tap to toggle zoom
        if (scale.get() > 1.05) resetTransforms();
        else animate(scale, 2, { duration: 0.3 });
      }
      lastTapRef.current = now;
    }
  }

  function onTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && pinchStartRef.current) {
      const d = dist(e.touches[0], e.touches[1]);
      const next = Math.max(
        MIN_SCALE,
        Math.min(MAX_SCALE, (d / pinchStartRef.current.dist) * pinchStartRef.current.scale),
      );
      scale.set(next);
    }
  }

  function onTouchEnd() {
    pinchStartRef.current = null;
    if (scale.get() < 1.05) resetTransforms();
  }

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity: overlayOpacity }}
      className="fixed inset-0 z-50 bg-[#0a0a0a] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={() => setUiVisible((v) => !v)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        drag={current.panorama || scale.get() > 1.05 ? "x" : "y"}
        style={{ x, y }}
        dragConstraints={
          current.panorama
            ? { left: -2000, right: 2000, top: 0, bottom: 0 }
            : { left: -1200, right: 1200, top: -1200, bottom: 1200 }
        }
        dragElastic={0.2}
        onDrag={(_, info) => {
          if (scale.get() < 1.05 && !current.panorama) dragY.set(Math.max(0, info.offset.y));
        }}
        onDragEnd={(_, info) => {
          if (scale.get() < 1.05 && !current.panorama) {
            if (info.offset.y > 150 || info.velocity.y > 700) {
              onClose();
            } else {
              animate(dragY, 0, { duration: 0.3 });
              animate(y, 0, { duration: 0.3 });
            }
          }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            style={{ scale }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <Image
              src={resolveImageSrc(current.src)}
              alt={t(current.alt, locale)}
              width={current.width}
              height={current.height}
              sizes="100vw"
              quality={90}
              priority
              style={{
                maxWidth: current.panorama ? "none" : "100vw",
                maxHeight: "100vh",
                width: "auto",
                height: "auto",
                userSelect: "none",
                touchAction: "none",
              }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {uiVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="pointer-events-auto absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-5 text-[11px] uppercase tracking-[0.22em] font-medium">
              <span className="opacity-70">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="opacity-80 hover:opacity-100 transition-opacity"
                aria-label="Close"
              >
                Close
              </button>
            </div>
            <div className="pointer-events-auto absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 py-6 gap-6">
              <p className="font-serif text-sm max-w-md opacity-80">
                {t(current.caption ?? current.alt, locale)}
              </p>
              <div className="hidden sm:flex gap-6 text-[11px] uppercase tracking-[0.22em]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="opacity-80 hover:opacity-100"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="opacity-80 hover:opacity-100"
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
