import type { Story } from "@/lib/types";

/**
 * Båstnäs / Töcksfors car cemetery, Värmland — drone documentation.
 *
 * Image filenames are the originals as uploaded to R2 (Flickr-style
 * stable IDs). We'll migrate to clean slugs in a later pass; the data
 * shape doesn't change.
 */
const base = "https://images.lefttodecay.com/carcemetery";

export const carcemetery: Story = {
  slug: "carcemetery",
  title: { en: "Car Cemetery", no: "Bilkirkegården" },
  subtitle: {
    en: "Båstnäs, Värmland — the forest taking back the road",
    no: "Båstnäs, Värmland — skogen som tar tilbake veien",
  },
  intro: {
    en: "A clearing of pines, deep in the border country between Sweden and Norway, where roughly a thousand cars were parked and forgotten in the decades after the war. Photographed from above, in late spring light.",
    no: "En lysning i furuskogen, dypt inne i grenselandet mellom Sverige og Norge, der omtrent tusen biler ble satt fra seg og glemt i tiårene etter krigen. Fotografert ovenfra, i sent vårlys.",
  },
  location: { en: "Båstnäs, Sweden", no: "Båstnäs, Sverige" },
  country: "Sweden",
  year: 2018,
  documentedRange: "May 2018",
  tags: ["drone", "sweden"],
  // Hero — full DJI 5.4K aerial. Chosen for the high resolution and
  // wide establishing read.
  hero: {
    id: "cc-hero",
    src: `${base}/40955870075_b25eb5281a_o.jpg`,
    width: 5472,
    height: 3648,
    alt: {
      en: "Aerial view of the Båstnäs car cemetery, abandoned cars scattered through pine forest",
    },
    featured: true,
    tags: ["drone", "sweden"],
  },
  images: [
    {
      id: "cc-01",
      src: `${base}/41892309251_4b53c36b4e_o.jpg`,
      width: 5472,
      height: 3648,
      alt: { en: "Wide aerial — pine canopy parting around rusted bodywork" },
      caption: {
        en: "The clearing was a working car business until the early 1980s. The forest has been working since.",
      },
      featured: true,
      tags: ["drone", "sweden"],
    },
    {
      id: "cc-02",
      src: `${base}/39871715930_1aa1843cbd_o.jpg`,
      width: 3593,
      height: 2394,
      alt: { en: "Cars half-overtaken by saplings and undergrowth, top-down" },
    },
    {
      id: "cc-03",
      src: `${base}/40735969425_e5091827a9_o.jpg`,
      width: 3992,
      height: 2992,
      alt: { en: "A row of saloon cars, hoods open, photographed from directly above" },
      featured: true,
      tags: ["drone"],
    },
    {
      id: "cc-04",
      src: `${base}/40763196365_be3719728d_o.jpg`,
      width: 3593,
      height: 2394,
      alt: { en: "Birch trees rising through the roof of a sedan" },
    },
    {
      id: "cc-05",
      src: `${base}/40825747425_024e8a11da_o.jpg`,
      width: 3593,
      height: 2394,
      alt: { en: "A second clearing, smaller, with three cars set apart" },
    },
    {
      id: "cc-06",
      src: `${base}/41614673192_34bd5539ab_o.jpg`,
      width: 3992,
      height: 2693,
      alt: { en: "Aerial detail — the geometry of windscreens, doors and moss" },
      featured: true,
      tags: ["drone", "sweden"],
    },
    {
      id: "cc-07",
      src: `${base}/41070521644_3a737e09b1_o.jpg`,
      width: 3593,
      height: 2394,
      alt: { en: "A track through the woods, two cars facing each other across it" },
    },
    {
      id: "cc-08",
      src: `${base}/44450468922_810aa67088_o.jpg`,
      width: 3992,
      height: 2624,
      alt: { en: "Closing wide — the edge of the clearing returning to forest" },
    },
  ],
  // Pacing: wide establishing → quiet paragraph → asymmetric pair →
  // observation → solo wide → pullquote → closing wide. No panorama
  // (none in this set). The aim is a quiet documentary cadence, not
  // an urbex tour.
  blocks: [
    {
      kind: "paragraph",
      body: {
        en: "The clearing belonged to two brothers who ran a vehicle wrecking business from the end of the war until the early 1980s. Customers would walk in along the track, find a car of the right make and year, take what they needed, and walk back out.",
        no: "Lysningen tilhørte to brødre som drev et bilopphuggeri fra slutten av krigen og fram til tidlig på 1980-tallet. Kunder gikk inn langs traktorveien, fant en bil av riktig merke og årgang, tok det de trengte, og gikk ut igjen.",
      },
    },
    { kind: "image", imageId: "cc-01", fullBleed: true },
    {
      kind: "paragraph",
      body: {
        en: "When the brothers retired, the remaining vehicles — perhaps a thousand of them — were simply left where they stood. The forest was slow to move at first. Birch and rowan came in through the chassis. Pines pushed up through the floor pans. The clearing began to disappear, very gradually, into the woods around it.",
      },
    },
    { kind: "pair", imageIds: ["cc-02", "cc-03"] },
    {
      kind: "paragraph",
      body: {
        en: "Seen from a hundred metres up, the place reads less as a junkyard than as a slow, patient experiment. The grid of metal is the only straight line in any of these pictures. Everything else — trees, light, weather — is doing what it does.",
      },
    },
    { kind: "image", imageId: "cc-04" },
    { kind: "pair", imageIds: ["cc-05", "cc-07"] },
    {
      kind: "pullquote",
      body: {
        en: "The grid of metal is the only straight line left.",
      },
    },
    { kind: "image", imageId: "cc-06", fullBleed: true },
    { kind: "image", imageId: "cc-08" },
  ],
};
