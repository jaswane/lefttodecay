import type { Story } from "@/lib/types";

const seed = (n: string) => `https://picsum.photos/seed/ltd-chernobyl-${n}`;

export const chernobyl2017: Story = {
  slug: "chernobyl-2017",
  title: { en: "Chernobyl", no: "Tsjernobyl" },
  subtitle: {
    en: "Inside the exclusion zone, thirty-one years on",
    no: "Innenfor sperresonen, trettién år etter",
  },
  intro: {
    en: "Five days inside the 2,600 square-kilometre exclusion zone surrounding the failed reactor. Pripyat, Kopachi, the cooling towers — documented in winter light.",
    no: "Fem dager innenfor den 2 600 kvadratkilometer store sperresonen rundt den havarerte reaktoren. Pripyat, Kopachi, kjøletårnene — dokumentert i vinterlys.",
  },
  location: { en: "Pripyat, Ukraine", no: "Pripjat, Ukraina" },
  country: "Ukraine",
  year: 2017,
  documentedRange: "February 2017",
  tags: ["chernobyl", "panorama"],
  hero: {
    id: "ch-hero",
    src: `${seed("hero")}/2400/1400`,
    width: 2400,
    height: 1400,
    alt: { en: "Snow-covered apartment block in Pripyat" },
    featured: true,
  },
  images: [
    {
      id: "ch-01",
      src: `${seed("01")}/2000/1333`,
      width: 2000,
      height: 1333,
      alt: { en: "Frozen window of an abandoned school" },
      caption: {
        en: "School No. 3, Pripyat. Classrooms left exactly as evacuated on 27 April 1986.",
        no: "Skole nr. 3, Pripjat. Klasserommene står slik de ble forlatt 27. april 1986.",
      },
      featured: true,
      tags: ["chernobyl"],
    },
    {
      id: "ch-02",
      src: `${seed("02")}/2000/1333`,
      width: 2000,
      height: 1333,
      alt: { en: "Hallway of the hospital basement" },
    },
    {
      id: "ch-03",
      src: `${seed("03")}/2000/1333`,
      width: 2000,
      height: 1333,
      alt: { en: "Cooling towers seen from below" },
      featured: true,
      tags: ["chernobyl"],
    },
    {
      id: "ch-pano",
      src: `${seed("pano")}/4800/1600`,
      width: 4800,
      height: 1600,
      alt: { en: "Panoramic view of Pripyat from the rooftop" },
      panorama: true,
      tags: ["panorama", "chernobyl"],
    },
    {
      id: "ch-04",
      src: `${seed("04")}/2000/1333`,
      width: 2000,
      height: 1333,
      alt: { en: "Reactor 4 sarcophagus through trees" },
    },
  ],
  blocks: [
    {
      kind: "paragraph",
      body: {
        en: "There is a particular quiet inside the zone. Not the quiet of nature reclaiming a town, though that is happening — birch trees through floorboards, wolves on the road at dusk — but the quiet of a place that was inhabited the day before yesterday.",
        no: "Det er en særegen stillhet inne i sonen. Ikke stillheten av naturen som tar tilbake en by, selv om det skjer — bjørketrær gjennom gulvplankene, ulver på veien i skumringen — men stillheten av et sted som var bebodd i forgårs.",
      },
    },
    { kind: "image", imageId: "ch-01" },
    {
      kind: "paragraph",
      body: {
        en: "We move slowly. Each room is photographed twice — once for record, once for composition. The dosimeter ticks higher in the basement of the hospital where the firefighters' uniforms still lie.",
      },
    },
    { kind: "pair", imageIds: ["ch-02", "ch-03"] },
    {
      kind: "pullquote",
      body: {
        en: "It is not the ruin that is striking. It is the ordinariness underneath.",
      },
    },
    { kind: "panorama", imageId: "ch-pano" },
    { kind: "image", imageId: "ch-04", fullBleed: true },
  ],
};
