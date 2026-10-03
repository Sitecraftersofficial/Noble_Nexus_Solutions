/**
 * SiteHeader — global navigation bar.
 * Reads brand + nav items from src/config/settings.ts.
 * Renders as a sticky navy bar with gold accents.
 */
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@/lib/Link";
import { nav, site } from "@/config/settings";

export function SiteHeader({ path }: { path: string }) {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [path]);

  function isActive(to: string) {
    return to === "/" ? path === "/" : path.startsWith(to);
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-navy text-cream border-b border-gold/20">
      <div className="container-page flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <span
            className="w-8 h-8 border border-gold flex items-center justify-center font-serif italic text-gold text-lg"
            aria-hidden
          >
            N
          </span>
          <span className="font-serif text-sm md:text-base tracking-[0.2em] uppercase leading-tight max-w-[16rem]">
            {site.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden lg:flex gap-6 xl:gap-8 eyebrow text-xs text-cream/80"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`hover:text-gold transition-colors ${isActive(item.to) ? "text-gold" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/book"
          className="hidden lg:inline-flex px-5 py-2 border border-gold text-gold eyebrow text-xs hover:bg-gold hover:text-navy transition-all"
        >
          Reserve
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden p-2 text-cream"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <nav className="lg:hidden border-t border-gold/20 bg-navy" aria-label="Mobile">
          <ul className="container-page py-6 flex flex-col gap-5 eyebrow text-cream/80">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`block hover:text-gold transition-colors ${isActive(item.to) ? "text-gold" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/book"
                onClick={() => setOpen(false)}
                className="inline-block mt-2 px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-navy transition-all"
              >
                Reserve
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
