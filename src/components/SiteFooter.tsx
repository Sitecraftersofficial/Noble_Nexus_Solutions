/**
 * SiteFooter — global footer with divisions, corporate links, copyright.
 * Edit company copy via src/config/settings.ts.
 */
import { Link } from "@tanstack/react-router";
import { contact, credit, site } from "@/config/settings";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream/70 pt-20 pb-10 mt-24">
      <div className="container-page grid md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="w-6 h-6 border border-gold flex items-center justify-center font-serif italic text-gold text-xs"
              aria-hidden
            >
              N
            </span>
            <span className="font-serif text-sm tracking-[0.2em] uppercase text-cream leading-tight">
              {site.name}
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
                search={{ car: undefined }}
                className="hover:text-gold transition-colors"
              >
                Reserve a Vehicle
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gold transition-colors">
                Rental Policies
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
        Right: "Made in Rwanda by the Sitecrafters Team" credit
      */}
      <div className="container-page pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/40">
        <p className="order-2 md:order-1">
          &copy; {year} {site.legalName}. All rights reserved.
        </p>
        <p className="order-1 md:order-2">
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
