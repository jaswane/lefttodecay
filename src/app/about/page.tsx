import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Left to Decay — a documentary archive of abandoned places by Swane Creative.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-[900px] px-6 sm:px-10 pt-36 sm:pt-44 pb-32">
      <p className="eyebrow mb-8">About the archive</p>
      <h1 className="font-display font-medium tracking-[-0.03em] leading-[0.95] text-5xl sm:text-6xl lg:text-7xl">
        A quiet record of the places we leave behind.
      </h1>

      <div className="font-serif text-xl sm:text-2xl leading-[1.55] space-y-8 mt-16">
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

      <div className="border-t hairline mt-20 pt-10 grid sm:grid-cols-2 gap-10">
        <div>
          <p className="eyebrow mb-3">Credits</p>
          <p className="font-serif text-lg">
            Photography and writing by Swane Creative. All work is the
            photographer&rsquo;s own; nothing in this archive is licensed,
            synthesised or generated.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">Rights</p>
          <p className="font-serif text-lg">
            Unauthorized use, reproduction or AI training of these images is
            prohibited. For editorial enquiries, please contact{" "}
            <a
              href="https://www.swanecreative.no/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Swane Creative
            </a>
            .
          </p>
        </div>
      </div>

      <div className="mt-20">
        <Link
          href="/"
          className="font-display text-[11px] uppercase tracking-[0.22em] hover:text-muted transition-colors"
        >
          ← Back to the archive
        </Link>
      </div>
    </article>
  );
}
