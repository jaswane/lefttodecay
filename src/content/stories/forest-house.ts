import type { Story } from "@/lib/types";

const seed = (n: string) => `https://picsum.photos/seed/ltd-forest-${n}`;

export const forestHouse: Story = {
  slug: "forest-house",
  title: { en: "Forest House", no: "Skogshuset" },
  subtitle: {
    en: "A timber farmhouse, half a kilometre from the nearest road",
    no: "Et tømmerhus, en halv kilometer fra nærmeste vei",
  },
  intro: {
    en: "Found by chance, walking off-trail in late autumn. Inside: a wood stove, a cot, four matching teacups, and a 1974 calendar still open at September.",
    no: "Funnet ved en tilfeldighet, på tur utenfor stien sent på høsten. Innenfor: en vedovn, en feltseng, fire matchende tekopper, og en kalender fra 1974 fortsatt åpen på september.",
  },
  location: { en: "Hedmark, Norway", no: "Hedmark, Norge" },
  country: "Norway",
  year: 2019,
  documentedRange: "October 2019",
  tags: ["norway"],
  hero: {
    id: "fh-hero",
    src: `${seed("hero")}/2400/1400`,
    width: 2400,
    height: 1400,
    alt: { en: "Timber farmhouse in autumn forest" },
    featured: true,
  },
  images: [
    {
      id: "fh-01",
      src: `${seed("01")}/2000/1333`,
      width: 2000,
      height: 1333,
      alt: { en: "Wood stove with kindling stacked beside" },
      caption: { en: "The stove still drew clean. Someone had cleaned the flue, perhaps a decade ago." },
      featured: true,
      tags: ["norway"],
    },
    {
      id: "fh-02",
      src: `${seed("02")}/2000/1333`,
      width: 2000,
      height: 1333,
      alt: { en: "Kitchen table with four teacups" },
    },
    {
      id: "fh-03",
      src: `${seed("03")}/2000/1333`,
      width: 2000,
      height: 1333,
      alt: { en: "View through window to the forest" },
      featured: true,
      tags: ["norway"],
    },
  ],
  blocks: [
    {
      kind: "paragraph",
      body: {
        en: "We did not stay long. The house felt watched-over rather than abandoned — the way some places do, when whoever left them last did so expecting to return.",
      },
    },
    { kind: "image", imageId: "fh-01", fullBleed: true },
    { kind: "pair", imageIds: ["fh-02", "fh-03"] },
  ],
};
