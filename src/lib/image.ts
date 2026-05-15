/**
 * Image source resolver.
 *
 * Strategy:
 *   - Absolute URLs pass through unchanged.
 *   - Bare paths are prefixed with NEXT_PUBLIC_IMAGE_BASE if set,
 *     otherwise served from /public.
 *
 * This keeps local development working with placeholder assets in /public
 * while letting production point at https://images.lefttodecay.com/ on
 * Cloudflare R2 without touching component code.
 */
export function resolveImageSrc(src: string): string {
  if (/^https?:\/\//i.test(src)) return src;
  const base = process.env.NEXT_PUBLIC_IMAGE_BASE?.replace(/\/$/, "");
  if (!base) return src.startsWith("/") ? src : `/${src}`;
  return `${base}${src.startsWith("/") ? src : `/${src}`}`;
}

/** Reasonable `sizes` defaults for editorial layouts. */
export const SIZES = {
  hero: "100vw",
  fullBleed: "100vw",
  prose: "(min-width: 1024px) 720px, 100vw",
  pair: "(min-width: 1024px) 50vw, 100vw",
  card: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  thumb: "(min-width: 640px) 320px, 50vw",
} as const;
