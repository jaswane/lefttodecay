import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[760px] px-6 sm:px-10 pt-44 pb-32 text-center">
      <p className="eyebrow mb-6">404</p>
      <h1 className="font-display font-semibold tracking-[-0.035em] leading-[0.95] text-[2.75rem] sm:text-6xl">
        This page has decayed.
      </h1>
      <p className="font-serif text-xl sm:text-2xl text-foreground/85 mt-6 leading-[1.4]">
        The page you were looking for is no longer here.
      </p>
      <Link
        href="/"
        className="inline-block mt-12 eyebrow-muted hover:text-foreground transition-colors"
      >
        ← Back to the archive
      </Link>
    </section>
  );
}
