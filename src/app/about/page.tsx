import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Left to Decay — a documentary archive of abandoned places by Swane Creative.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-[860px] px-6 sm:px-10 pt-32 sm:pt-40 pb-28">
      <p className="eyebrow mb-6">About the archive</p>
      <h1 className="font-display font-semibold tracking-[-0.035em] leading-[0.95] text-[2.75rem] sm:text-6xl lg:text-[4.5rem]">
        A quiet record of the places we leave behind.
      </h1>

      <div className="font-serif text-[1.25rem] sm:text-[1.375rem] leading-[1.6] space-y-7 mt-12 sm:mt-14 text-foreground">
        <p>
          Left to Decay began in 2012 as a small notebook of locations and
          contact sheets — places that, for one reason or another, had been
          allowed to come undone. Hospitals on the edges of cities. Factories
          that ran for a hundred years and stopped on a Friday. Houses found
          off-trail, holding their cups exactly where they were last placed.
        </p>
        <p>
          The archive is not interested in trespass for its own sake. The
          photographs here are documentary — straight reportage, on location,
          in available light. The aim is to show these places carefully, while
          they are still here to be shown.
        </p>
        <p>
          The project is ongoing. New stories are added once the work is
          finished — not when it is fresh, but when it has had time to settle.
        </p>
      </div>

      <div className="border-t hairline mt-16 sm:mt-20 pt-9 grid sm:grid-cols-2 gap-8 sm:gap-12">
        <div>
          <p className="eyebrow mb-3">Credits</p>
          <p className="font-serif text-[1.0625rem] leading-[1.55] text-foreground/90">
            Photography and writing by Swane Creative. All work is the
            photographer&rsquo;s own; nothing in this archive is licensed,
            synthesised or generated.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">Rights</p>
          <p className="font-serif text-[1.0625rem] leading-[1.55] text-foreground/90">
            Unauthorized use, reproduction or AI training of these images is
            prohibited. For editorial enquiries, please contact{" "}
            <a
              href="https://www.swanecreative.no/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 font-semibold"
            >
              Swane Creative
            </a>
            .
          </p>
        </div>
      </div>

      <div className="mt-16">
        <Link
          href="/"
          className="eyebrow-muted hover:text-foreground transition-colors"
        >
          ← Back to the archive
        </Link>
      </div>
    </article>
  );
}
