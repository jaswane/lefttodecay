import type { Tag } from "@/lib/types";

export const TAGS: Tag[] = [
  {
    slug: "factories",
    title: { en: "Factories", no: "Fabrikker" },
    description: {
      en: "Industrial structures left behind — paper mills, foundries, refineries.",
      no: "Industrielle strukturer som er forlatt — papirfabrikker, støperier, raffinerier.",
    },
  },
  {
    slug: "hospitals",
    title: { en: "Hospitals", no: "Sykehus" },
    description: {
      en: "Sanatoriums, psychiatric wards and clinics quietly returning to nature.",
      no: "Sanatorier, psykiatriske avdelinger og klinikker som langsomt går tilbake til naturen.",
    },
  },
  {
    slug: "military",
    title: { en: "Military", no: "Militære" },
    description: {
      en: "Bunkers, radar stations and cold-war remnants across northern Europe.",
      no: "Bunkere, radarstasjoner og rester fra den kalde krigen i Nord-Europa.",
    },
  },
  {
    slug: "norway",
    title: { en: "Norway", no: "Norge" },
  },
  {
    slug: "sweden",
    title: { en: "Sweden", no: "Sverige" },
  },
  {
    slug: "drone",
    title: { en: "Drone", no: "Drone" },
    description: {
      en: "Aerial documentation — scale, decay and the surrounding landscape.",
      no: "Dokumentasjon fra lufta — skala, forfall og landskapet rundt.",
    },
  },
  {
    slug: "chernobyl",
    title: { en: "Chernobyl", no: "Tsjernobyl" },
  },
  {
    slug: "panorama",
    title: { en: "Panorama", no: "Panorama" },
  },
];

export function getTag(slug: string): Tag | undefined {
  return TAGS.find((t) => t.slug === slug);
}
