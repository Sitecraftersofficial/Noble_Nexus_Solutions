/**
 * GLOBAL SITE CONFIGURATION
 * -------------------------
 * Single source of truth for business information across the entire site.
 * Edit ONLY this file to update company name, contact info, social links,
 * navigation, or address — every page reads from these exports.
 *
 * Edit ONLY this file to update company name, contact info, navigation, etc.
 * Car inventory lives separately in src/data/cars.json.
 */

export const site = {
  /** Brand name shown in header, footer, meta tags, emails, invoices, etc. */
  name: "Noble Nexus Car Rentals",
  /** Short brand used in compact UI (header logo wordmark) */
  shortName: "Noble Nexus",
  /** Optional sub-line (e.g. legal entity) */
  legalName: "Noble Nexus Solutions — Car Rentals",
  /** Short tagline for hero / SEO */
  tagline: "Premium car rentals for every journey.",
  /** Long description for meta tags */
  description:
    "Noble Nexus Car Rentals — Rwanda's premium car rental. Kigali airport delivery, self-drive or chauffeured, from economy to luxury.",
  /** Founded year (for footer copyright) */
  foundedYear: 1984,
} as const;

/**
 * SITE CREDIT
 * -----------
 * Shown in the footer bottom-left on every page.
 * Edit the label or URL here to update the credit site-wide.
 */
export const credit = {
  prefix: "Made in Rwanda by the",
  label: "Sitecrafters Team",
  url: "https://www.sitecraftersltd.com/",
} as const;

export const contact = {
  phone: "+250 788 000 000",
  whatsapp: "+250 788 000 000",
  email: "rentals@noblenexus.rw",
  address: {
    line1: "KG 7 Ave, Kiyovu",
    line2: "Nyarugenge District",
    country: "Kigali, Rwanda",
  },
  /** Branch / pickup locations shown in footer / contact page */
  offices: ["Kigali — KG 7 Ave", "Kigali — Remera", "Kigali — Nyarutarama", "Rubavu — Lake Kivu"],
} as const;

export const social = {
  linkedin: "#",
  instagram: "#",
  twitter: "#",
} as const;

/** Primary navigation (used by header + footer) */
export const nav = [
  { label: "Home", to: "/" as const },
  { label: "Fleet", to: "/car-rental" as const },
  { label: "Book", to: "/book" as const },
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

/** Quick-access floating buttons (homepage + sticky) */
export const quickAccess = [
  { label: "Browse Fleet", to: "/car-rental" as const, icon: "Car" },
  { label: "Reserve Now", to: "/book" as const, icon: "Calendar" },
  { label: "Contact Us", to: "/contact" as const, icon: "Phone" },
];

/** Headline statistics on the home Trust Bar — edit values here */
export const stats = [
  { value: "120+", label: "Vehicles in Fleet" },
  { value: "30", label: "Districts Served" },
  { value: "24/7", label: "Roadside Assistance" },
  { value: "98%", label: "Five-Star Reviews" },
];

/** Rental policy highlights shown on home + fleet pages */
export const policies = [
  {
    icon: "ShieldCheck",
    title: "Full Insurance Included",
    text: "Comprehensive cover — third-party, collision and theft — on every rental.",
  },
  {
    icon: "UserRound",
    title: "Optional Chauffeur",
    text: "Add a vetted, Kinyarwanda–English–French speaking driver to any booking for RWF 90,000/day.",
  },
  {
    icon: "CalendarCheck",
    title: "Free Cancellation",
    text: "Cancel or amend free of charge up to 48 hours before pickup.",
  },
  {
    icon: "MapPin",
    title: "Airport Delivery",
    text: "Free meet-and-greet delivery at Kigali International Airport and city hotels.",
  },
] as const;
