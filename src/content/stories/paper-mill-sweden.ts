import type { Story } from "@/lib/types";

const seed = (n: string) => `https://picsum.photos/seed/ltd-papermill-${n}`;

export const paperMillSweden: Story = {
  slug: "paper-mill-sweden",
  title: { en: "Paper Mill", no: "Papirfabrikken" },
  subtitle: {
    en: "A century of pulp, suspended mid-shift",
    no: "Et århundre med papirmasse, stoppet midt i skiftet",
  },
  intro: {
    en: "Closed in 2008. The control rooms still hold their punch cards and dial gauges; the rollers, the size of cars, still carry the last fibres of pine.",
    no: "Stengt i 2008. Kontrollrommene har fortsatt sine hullkort og urskiver; valsene, på størrelse med biler, bærer fortsatt de siste furufiberne.",
  },
  location: { en: "Värmland, Sweden", no: "Värmland, Sverige" },
  country: "Sweden",
  year: 2018,
  documentedRange: "September 2018",
  tags: ["factories", "sweden"],
  hero: {
    id: "pm-hero",
    src: `${seed("hero")}/2400/1400`,
    width: 2400,
    height: 1400,
    alt: { en: "Main hall of the paper mill with overhead cranes" },
    featured: true,
  },
  images: [
    {
      id: "pm-01",
      src: `${seed("01")}/2000/1333`,
      width: 2000,
      height: 1333,
      alt: { en: "Control room with analog dials" },
      caption: {
        en: "Control room B — last shift's notes still on the desk.",
      },
      featured: true,
      tags: ["factories"],
    },
    {
      id: "pm-02",
      src: `${seed("02")}/2000/3000`,
      width: 2000,
      height: 3000,
      alt: { en: "Spiral staircase down to the basement" },
    },
    {
      id: "pm-03",
      src: `${seed("03")}/2000/1333`,
      width: 2000,
      height: 1333,
      alt: { en: "Pulp roller mechanism" },
      featured: true,
      tags: ["factories", "sweden"],
    },
    {
      id: "pm-04",
      src: `${seed("04")}/4800/1600`,
      width: 4800,
      height: 1600,
      alt: { en: "Panoramic view across the production hall" },
      panorama: true,
      tags: ["panorama", "factories"],
    },
  ],
  blocks: [
    {
      kind: "paragraph",
      body: {
        en: "The mill closed in a Friday afternoon meeting. Two hundred and forty workers, one shareholder vote, and a small notice on the noticeboard by the canteen.",
      },
    },
    { kind: "image", imageId: "pm-01" },
    {
      kind: "paragraph",
      body: {
        en: "We arrived ten years later. A maintenance contract had kept the heat on through the winters — just enough to stop the pipes splitting. The smell of grease and pine resin had not faded.",
      },
    },
    { kind: "pair", imageIds: ["pm-02", "pm-03"] },
    { kind: "panorama", imageId: "pm-04" },
  ],
};
