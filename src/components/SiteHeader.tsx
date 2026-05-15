import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 mix-blend-difference text-white">
      <div className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-medium tracking-[0.22em] text-[11px] uppercase"
        >
          Left to Decay
        </Link>
        <nav className="font-display text-[11px] uppercase tracking-[0.22em] flex gap-7">
          <Link href="/#stories" className="opacity-80 hover:opacity-100 transition-opacity">
            Stories
          </Link>
          <Link href="/#archives" className="opacity-80 hover:opacity-100 transition-opacity">
            Archives
          </Link>
          <Link href="/about" className="opacity-80 hover:opacity-100 transition-opacity">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
