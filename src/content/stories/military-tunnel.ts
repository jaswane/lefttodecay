import type { Story } from "@/lib/types";

const seed = (n: string) => `https://picsum.photos/seed/ltd-tunnel-${n}`;

export const militaryTunnel: Story = {
  slug: "military-tunnel",
  title: { en: "Military Tunnel", no: "Militærtunnel" },
  subtitle: {
    en: "A decommissioned coastal artillery installation",
    no: "Et nedlagt kystartillerianlegg",
  },
  intro: {
    en: "1.4 kilometres of corridors blasted into granite during the early years of the Cold War. Decommissioned in 2003. The lights still work on a backup circuit.",
    no: "1,4 kilometer med korridorer sprengt ut i granitt tidlig i den kalde krigen. Nedlagt i 2003. Lysene fungerer fortsatt på en reservekrets.",
  },
  location: { en: "Vestland, Norway", no: "Vestland, Norge" },
  country: "Norway",
  year: 2016,
  documentedRange: "May 2016",
  tags: ["military", "norway"],
  hero: {
    id: "mt-hero",
    src: `${seed("hero")}/2400/1400`,
    width: 2400,
    height: 1400,
    alt: { en: "Long fluorescent-lit concrete corridor" },
    featured: true,
  },
  images: [
    {
      id: "mt-01",
      src: `${seed("01")}/2000/1333`,
      width: 2000,
      height: 1333,
      alt: { en: "Heavy blast door, partly open" },
      featured: true,
      tags: ["military"],
    },
    {
      id: "mt-02",
      src: `${seed("02")}/2000/3000`,
      width: 2000,
      height: 3000,
      alt: { en: "Vertical shaft lit from above" },
    },
    {
      id: "mt-03",
      src: `${seed("03")}/4800/1600`,
      width: 4800,
      height: 1600,
      alt: { en: "Panorama of the command room" },
      panorama: true,
      tags: ["panorama", "military"],
    },
    {
      id: "mt-04",
      src: `${seed("04")}/2000/1333`,
      width: 2000,
      height: 1333,
      alt: { en: "Generator hall with twin diesel units" },
      featured: true,
      tags: ["military", "norway"],
    },
  ],
  blocks: [
    {
      kind: "paragraph",
      body: {
        en: "The installation was carved out of the mountain over four years. At its peak it housed three hundred personnel, a kitchen, a small infirmary, and a chapel.",
      },
    },
    { kind: "pair", imageIds: ["mt-01", "mt-02"] },
    {
      kind: "pullquote",
      body: { en: "Built to outlast the war it was built for, which never came." },
    },
    { kind: "panorama", imageId: "mt-03" },
    { kind: "image", imageId: "mt-04" },
  ],
};
