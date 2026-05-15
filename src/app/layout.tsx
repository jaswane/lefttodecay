import type { Metadata } from "next";
import { Inter_Tight, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Source Serif 4 — workhorse magazine serif. Reads with more weight
 * than Cormorant at the same nominal weight; stronger at small sizes;
 * better-suited to long captions and intro paragraphs than to bridal
 * display work. */
const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lefttodecay.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Left to Decay — Documentary archive of abandoned places",
    template: "%s · Left to Decay",
  },
  description:
    "Urban exploration and documentary photography archive. Abandoned factories, hospitals and military sites — documented on location between 2012 and 2019.",
  keywords: [
    "urbex",
    "urban exploration",
    "abandoned places",
    "documentary photography",
    "forlatte fabrikker",
    "forlatte sykehus",
    "urbex norge",
    "abandoned places norway",
    "Lier mentalsykehus",
    "Chernobyl",
  ],
  authors: [{ name: "Swane Creative", url: "https://www.swanecreative.no/" }],
  creator: "Swane Creative",
  openGraph: {
    type: "website",
    title: "Left to Decay",
    description:
      "Urban exploration and documentary photography archive. Documented on location between 2012 and 2019.",
    url: siteUrl,
    siteName: "Left to Decay",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Left to Decay",
    description: "Documentary archive of abandoned places.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
