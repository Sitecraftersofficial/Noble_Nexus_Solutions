/**
 * SiteFooter — global footer with divisions, corporate links, copyright.
 * Edit company copy via src/config/settings.ts.
 */
import { Link } from "@/lib/Link";
import { contact, credit, site } from "@/config/settings";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream/70 pt-20 pb-10 mt-24">
      <div className="container-page grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/images/logo.jpeg"
              alt="Noble Nexus Transportation Services logo"
              className="h-32 w-32 shrink-0 object-contain mix-blend-screen"
            />
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-sm tracking-[0.2em] uppercase text-cream">
                NOBLE NEXUS SOLUTIONS
              </span>
              <span className="text-[9px] tracking-[0.28em] text-gold uppercase">Car Rental</span>
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream/50">{site.description}</p>
        </div>

        <div>
          <h4 className="text-cream eyebrow mb-6">Rentals</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <Link to="/car-rental" className="hover:text-gold transition-colors">
                Browse Fleet
              </Link>
            </li>
            <li>
              <Link
                to="/book"
                className="hover:text-gold transition-colors"
                aria-label="Reserve a vehicle"
              >
                Reserve a Vehicle
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream eyebrow mb-6">Corporate</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <Link to="/about" className="hover:text-gold transition-colors">
                Our Legacy
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-gold transition-colors">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/*
        FOOTER BOTTOM BAR
        -----------------
        Left:  copyright
        Center: "Made in Rwanda by the Sitecrafters Team" credit
        Right: intentionally empty for floating quick-access buttons
      */}
      <div className="container-page pt-8 border-t border-cream/10 grid md:grid-cols-[1fr_auto_1fr] items-center gap-4 text-xs text-cream/40">
        <p className="md:justify-self-start">
          &copy; {year} {site.legalName}. All rights reserved.
        </p>
        <p className="text-center">
          Made in Rwanda by the{" "}
          <a
            href={credit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-gold/60 underline-offset-4 text-gold hover:text-cream transition-colors duration-500"
          >
            Sitecrafters Team
          </a>
        </p>
      </div>
    </footer>
  );
}
