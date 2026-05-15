"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { resolveImageSrc } from "@/lib/image";
import { t } from "@/lib/i18n";
import type { ImageSource, Locale } from "@/lib/types";

type Props = {
  image: ImageSource;
  sizes?: string;
  priority?: boolean;
  className?: string;
  locale?: Locale;
  onClick?: () => void;
  fill?: boolean;
};

export function Photo({
  image,
  sizes = "100vw",
  priority,
  className,
  locale = "en",
  onClick,
  fill,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const src = resolveImageSrc(image.src);
  const alt = t(image.alt, locale);

  return (
    <motion.div
      className={`relative overflow-hidden bg-rule/40 ${onClick ? "cursor-zoom-in" : ""} ${className ?? ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0.4 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
    >
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={85}
          onLoad={() => setLoaded(true)}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          quality={85}
          onLoad={() => setLoaded(true)}
        />
      )}
    </motion.div>
  );
}
