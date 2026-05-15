import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 mix-blend-difference text-white">
      <div className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 py-5 sm:py-6 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Left to Decay — the archive"
          className="font-display flex flex-col leading-[1] -my-1"
        >
          <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.32em] font-semibold">
            Left to Decay
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.34em] font-medium mt-1.5 opacity-70">
            The archive
          </span>
        </Link>
        <nav className="font-display text-[11px] sm:text-[12px] uppercase tracking-[0.24em] font-semibold flex gap-6 sm:gap-8">
          <Link href="/#stories" className="opacity-90 hover:opacity-100 transition-opacity">
            Stories
          </Link>
          <Link href="/#archives" className="opacity-90 hover:opacity-100 transition-opacity">
            Archives
          </Link>
          <Link href="/about" className="opacity-90 hover:opacity-100 transition-opacity">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
