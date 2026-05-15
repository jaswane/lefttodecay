import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[760px] px-6 sm:px-10 pt-44 pb-32 text-center">
      <p className="eyebrow mb-6">404</p>
      <h1 className="font-display font-medium tracking-[-0.03em] leading-[0.95] text-5xl sm:text-6xl">
        This page has decayed.
      </h1>
      <p className="font-serif text-xl text-muted mt-6">
        The page you were looking for is no longer here.
      </p>
      <Link
        href="/"
        className="inline-block mt-12 font-display text-[11px] uppercase tracking-[0.22em] hover:text-muted transition-colors"
      >
        ← Back to the archive
      </Link>
    </section>
  );
}
