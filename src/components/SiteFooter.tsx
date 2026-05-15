export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t hairline mt-24 sm:mt-32">
      <div className="mx-auto max-w-[1680px] px-6 sm:px-10 lg:px-16 py-12 sm:py-14 grid gap-10 sm:grid-cols-2 sm:items-end">
        <div className="space-y-3">
          <p className="font-display text-[12px] uppercase tracking-[0.32em] font-semibold">
            Left to Decay
          </p>
          <p className="font-serif text-[1.0625rem] text-foreground/85 max-w-md leading-[1.55]">
            A documentary archive of abandoned places — photographed on location
            between 2012 and 2019.
          </p>
        </div>
        <div className="space-y-3 sm:text-right">
          <p className="font-serif text-[1rem] text-foreground/85">
            A project by{" "}
            <a
              href="https://www.swanecreative.no/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline-offset-4 hover:underline text-foreground"
            >
              Swane Creative
            </a>
          </p>
          <p className="font-display text-[11px] uppercase tracking-[0.22em] font-medium text-muted leading-[1.6]">
            © {year} — Unauthorized use, reproduction or AI training of these
            images is prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
}
