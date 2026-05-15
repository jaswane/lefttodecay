# Left to Decay

A premium documentary archive of urban exploration photography.

Built as a quiet, editorial reading experience — closer to a coffee-table photobook than a photo gallery.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19
- TypeScript
- Tailwind CSS v4 (CSS-based theme)
- Framer Motion
- `next/font` for Inter Tight (display) + Cormorant Garamond (serif)
- `next/image` with `remotePatterns` for Cloudflare R2
- Fully static (SSG) — no database, no CMS, no auth

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open <http://localhost:3000>.

## Project layout

```
src/
  app/                    # Next.js App Router
    layout.tsx            # Root layout, fonts, metadata
    page.tsx              # Home: hero, stories, archives
    about/                # About the archive
    story/[slug]/         # Editorial story page
    tag/[slug]/           # Tag-filtered featured archive
    sitemap.ts            # SEO sitemap
    robots.ts             # robots.txt (blocks AI scrapers)
    not-found.tsx         # Custom 404
    globals.css           # Theme tokens, type, grain effect
  components/
    SiteHeader.tsx        # Fixed mix-blend-difference header
    SiteFooter.tsx        # Minimal credit + copyright
    Hero.tsx              # Parallax fullscreen hero
    Photo.tsx             # Image with fade-in
    Gallery.tsx           # Image + lightbox wiring
    Lightbox.tsx          # Minimal lightbox, pinch-zoom, swipe-to-close
    Panorama.tsx          # Horizontal-scroll pannable strip
    StoryCard.tsx         # Home card
    StoryView.tsx         # Full editorial story
    TagView.tsx           # Featured-image grid
  content/
    stories.ts            # Story index + helpers
    stories/*.ts          # One file per story
    tags.ts               # Tag catalog
  lib/
    types.ts              # Story / Image / Tag types
    image.ts              # R2 / local resolver + sizes presets
    i18n.ts               # NO / EN text helper
```

## Content model

Stories are TypeScript modules. Each story exports a `Story` object with:

- `slug`, `title`, `subtitle`, `intro` (all localized `{ en, no? }`)
- `location`, `country`, `year`, `documentedRange`
- `tags: string[]`
- `hero: ImageSource`
- `images: ImageSource[]`
- `blocks: StoryBlock[]` — editorial flow: paragraph, image, pair, panorama, pullquote

Each `ImageSource` has `id`, `src`, `width`, `height`, `alt`, optional
`caption`, `panorama`, `featured`, and `tags[]`.

Mark images `featured: true` to surface them in tag/archive grids. Bulk
images stay inside the story view only — by design.

## Images and Cloudflare R2

Image sources are resolved through `resolveImageSrc()` (`src/lib/image.ts`):

- Absolute `https://…` URLs pass through unchanged.
- Bare paths get prefixed with `NEXT_PUBLIC_IMAGE_BASE` if set, otherwise
  served from `/public`.

To deploy with R2:

```bash
NEXT_PUBLIC_IMAGE_BASE=https://images.lefttodecay.com
```

`images.lefttodecay.com` is already configured in `next.config.ts`
`remotePatterns`. Demo content uses `picsum.photos` — replace with real
URLs once R2 is wired up.

## Localization

Architecture supports `no` + `en` through `LocalizedText` and the `t()`
helper. The current UI defaults to English; a language switch can be
added later without touching content.

## SEO

- Editorial `metadata` per page (no keyword stuffing)
- OpenGraph + Twitter cards per story
- `sitemap.xml` lists home, about, every story and every tag
- `robots.txt` allows search engines, disallows known AI scrapers
- Per-image `alt` text required by the type system

## Deployment

Push to GitHub, import into Vercel, set `NEXT_PUBLIC_SITE_URL` and
`NEXT_PUBLIC_IMAGE_BASE` as environment variables. Build is fully static.

## Credits

A project by [Swane Creative](https://www.swanecreative.no/).

Unauthorized use, reproduction or AI training of these images is
prohibited.
