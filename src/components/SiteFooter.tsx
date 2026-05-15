export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t hairline mt-32">
      <div className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 py-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
        <div className="space-y-2">
          <p className="font-display text-[11px] uppercase tracking-[0.22em] text-muted">
            Left to Decay
          </p>
          <p className="font-serif text-base text-muted max-w-md leading-relaxed">
            A documentary archive of abandoned places — photographed on location
            between 2012 and 2019.
          </p>
        </div>
        <div className="space-y-2 sm:text-right">
          <p className="font-serif text-sm text-muted">
            A project by{" "}
            <a
              href="https://www.swanecreative.no/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline text-foreground"
            >
              Swane Creative
            </a>
          </p>
          <p className="font-display text-[10px] uppercase tracking-[0.22em] text-faint">
            © {year} — Unauthorized use, reproduction or AI training of these
            images is prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
}
