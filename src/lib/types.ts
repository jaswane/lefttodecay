export type Locale = "en" | "no";

export type LocalizedText = {
  en: string;
  no?: string;
};

export type ImageSource = {
  /** Stable id, used as React key and for lightbox routing. */
  id: string;
  /** Path or URL. Relative paths resolve via the image helper. */
  src: string;
  /** Natural width in pixels — used for next/image and aspect math. */
  width: number;
  /** Natural height in pixels. */
  height: number;
  /** Alt text — required, in English. Norwegian falls back to English. */
  alt: LocalizedText;
  /** Optional caption shown under the image in editorial layouts. */
  caption?: LocalizedText;
  /** A wider crop than the viewport — pannable in the lightbox. */
  panorama?: boolean;
  /** Promoted into archive / tag galleries. */
  featured?: boolean;
  /** Tag slugs this image belongs to. */
  tags?: string[];
};

export type StoryBlock =
  | {
      kind: "paragraph";
      body: LocalizedText;
    }
  | {
      kind: "image";
      imageId: string;
      /** Full-bleed = breaks out of the prose column. */
      fullBleed?: boolean;
    }
  | {
      kind: "pair";
      imageIds: [string, string];
    }
  | {
      kind: "panorama";
      imageId: string;
    }
  | {
      kind: "pullquote";
      body: LocalizedText;
    };

export type Story = {
  slug: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  intro: LocalizedText;
  location: LocalizedText;
  country: string;
  year: number;
  documentedRange?: string;
  tags: string[];
  hero: ImageSource;
  images: ImageSource[];
  blocks: StoryBlock[];
};

export type Tag = {
  slug: string;
  title: LocalizedText;
  description?: LocalizedText;
};
