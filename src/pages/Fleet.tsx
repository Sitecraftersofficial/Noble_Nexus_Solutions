/**
 * Car Rental — fleet browsing with filters, per-car detail, policies,
 * FAQ, and booking form. All vehicle data comes from src/data/cars.json.
 */
import { useMemo, useState } from "react";
import { Link } from "@/lib/Link";
import {
  Check,
  ShieldCheck,
  UserRound,
  Users,
  DoorOpen,
  Briefcase,
  Gauge,
  Settings2,
  Fuel,
  ChevronDown,
  MapPin as MapPinIcon,
} from "lucide-react";
import heroImg from "/images/cars/hero-fleet.jpg";
import { policies } from "@/config/settings";
import { cars, categories, locations, formatPrice, type Car, type CarCategory } from "@/data/cars";
import { Tilt } from "@/lib/nx-motion";

const CATEGORIES: Array<CarCategory | "All"> = ["All", ...categories];

export function FleetPage() {
  const [category, setCategory] = useState<CarCategory | "All">("All");
  const [location, setLocation] = useState<string>("Any");
  const [maxPrice, setMaxPrice] = useState<number>(600000);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return cars.filter((c) => {
      if (category !== "All" && c.category !== category) return false;
      if (location !== "Any" && c.location !== location) return false;
      if (c.daily > maxPrice) return false;
      if (query && !`${c.name} ${c.make} ${c.model}`.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });
  }, [category, location, maxPrice, query]);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy text-cream py-32 overflow-hidden">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={800}
          className="absolute inset-0 w-full h-full object-cover opacity-25 nx-kenburns"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/60 to-navy/40" />
        <div className="relative container-page max-w-3xl vg-reveal">
          <p className="eyebrow text-gold mb-6">Car Rental</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
            Drive in <span className="italic text-gold">comfort</span>.
          </h1>
          <p className="text-cream/70 text-lg max-w-xl">
            {cars.length} vehicles across {categories.length} categories — transparent pricing,
            optional chauffeur and comprehensive insurance.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container-page py-16">
        <p className="eyebrow text-gold mb-4">Browse the Fleet</p>
        <div className="grid md:grid-cols-4 gap-4 mb-8 bg-secondary border border-navy/10 p-6">
          <label className="block">
            <span className="block eyebrow text-xs text-navy mb-2">Search</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Mercedes, Tesla…"
              className="w-full border border-navy/20 bg-background p-3 text-sm"
            />
          </label>
          <label className="block">
            <span className="block eyebrow text-xs text-navy mb-2">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CarCategory | "All")}
              className="w-full border border-navy/20 bg-background p-3 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="block eyebrow text-xs text-navy mb-2">Pickup Location</span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-navy/20 bg-background p-3 text-sm"
            >
              <option>Any</option>
              {locations.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="block eyebrow text-xs text-navy mb-2">
              Max daily rate — RWF {maxPrice.toLocaleString("en-US")}
            </span>
            <input
              type="range"
              min={50000}
              max={600000}
              step={10000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#0A1F44] mt-3"
            />
          </label>
        </div>
        <p className="eyebrow text-xs text-navy/50 mb-8">
          {filtered.length} vehicle{filtered.length === 1 ? "" : "s"} available
        </p>

        {/* Vehicle cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((v, i) => (
            <Tilt key={v.id} className="nx-reveal" max={6}>
              <VehicleCard
                car={v}
                expanded={expanded === v.id}
                onToggle={() => setExpanded(expanded === v.id ? null : v.id)}
                delay={(i % 3) + 1}
              />
            </Tilt>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 border border-navy/10 bg-secondary">
            <p className="font-serif text-3xl text-navy mb-3">No vehicles match those filters.</p>
            <button
              type="button"
              onClick={() => {
                setCategory("All");
                setLocation("Any");
                setMaxPrice(600000);
                setQuery("");
              }}
              className="eyebrow text-xs text-navy border-b border-navy pb-1 hover:text-gold hover:border-gold transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Policy strip */}
      <section className="bg-secondary py-20">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {policies.map((p) => {
            const Icon =
              p.icon === "UserRound"
                ? UserRound
                : p.icon === "CalendarCheck"
                  ? Check
                  : p.icon === "MapPin"
                    ? MapPinIcon
                    : ShieldCheck;
            return (
              <div key={p.title} className="bg-background p-8 border border-navy/10">
                <Icon className="size-8 text-gold mb-4" />
                <h3 className="font-serif text-xl text-navy mb-2">{p.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{p.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chauffeur & insurance detail */}
      <section className="container-page py-24">
        <div className="grid md:grid-cols-2 gap-10">
          <Feature
            icon={UserRound}
            title="Optional Chauffeur"
            desc="Add a vetted, Kinyarwanda–English–French speaking driver for RWF 90,000/day. Available on all categories."
          >
            <li>Background-checked, RSSB-registered professionals</li>
            <li>Up to 12-hour daily window</li>
            <li>Overnight accommodation on long journeys (e.g. Rubavu, Nyungwe)</li>
          </Feature>
          <Feature
            icon={ShieldCheck}
            title="Insurance Coverage"
            desc="Comprehensive cover included on every rental — third-party, collision and theft."
          >
            <li>RWF 2 billion third-party liability</li>
            <li>Zero deductible on Premium tier</li>
            <li>24/7 roadside assistance across Rwanda</li>
          </Feature>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-24">
        <div className="container-page max-w-3xl">
          <p className="eyebrow text-gold mb-4 text-center">FAQ</p>
          <h2 className="font-serif text-4xl md:text-5xl text-navy text-center mb-12">
            Rental questions, answered.
          </h2>
          <div className="divide-y divide-navy/10 border-y border-navy/10">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-serif text-xl text-navy pr-4">{f.q}</span>
                  <ChevronDown className="size-5 text-gold shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="text-navy/60 text-sm leading-relaxed mt-4 max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA — full booking flow lives on /book with MTN MoMo payment */}
      <section className="bg-secondary py-24">
        <div className="container-page text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-navy mb-6">
            Found your car? <span className="italic text-gold">Reserve it in minutes.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Pick a vehicle, choose your dates, and pay securely with MTN Mobile Money. Free
            cancellation up to 48 hours before pickup.
          </p>
          <Link
            to="/book"
            className="inline-block bg-navy text-cream px-10 py-4 eyebrow hover:bg-gold hover:text-navy transition-colors"
          >
            Book a Vehicle
          </Link>
        </div>
      </section>
    </>
  );
}

/* ─── Vehicle card with expandable spec sheet ─── */

function VehicleCard({
  car,
  expanded,
  onToggle,
  delay = 1,
}: {
  car: Car;
  expanded: boolean;
  onToggle: () => void;
  delay?: number;
}) {
  return (
    <article
      className={`nx-reveal nx-delay-${delay} bg-cream border border-navy/10 group flex flex-col h-full`}
    >
      <div className="overflow-hidden aspect-4/3 relative">
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {car.featured && (
          <span className="absolute top-4 left-4 bg-navy text-gold eyebrow text-[10px] px-3 py-1">
            Featured
          </span>
        )}
        {!car.available && (
          <span className="absolute top-4 right-4 bg-gold text-navy eyebrow text-[10px] px-3 py-1">
            On rent
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="eyebrow text-gold text-xs mb-2">
          {car.category} · {car.year} · {car.location}
        </p>
        <h3 className="font-serif text-2xl text-navy mb-4">{car.name}</h3>
        <div className="flex gap-4 text-xs text-navy/60 mb-5">
          <span className="flex items-center gap-1">
            <Users className="size-4 text-gold" />
            {car.seats} seats
          </span>
          <span className="flex items-center gap-1">
            <Settings2 className="size-4 text-gold" />
            {car.transmission}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="size-4 text-gold" />
            {car.fuel}
          </span>
        </div>
        <dl className="grid grid-cols-3 gap-2 mb-5 border-y border-navy/10 py-4">
          <Price label="Daily" value={car.daily} />
          <Price label="Weekly" value={car.weekly} />
          <Price label="Monthly" value={car.monthly} />
        </dl>
        <div className="mt-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onToggle}
            className="eyebrow text-xs text-navy border-b border-navy/30 pb-1 hover:text-gold hover:border-gold transition-colors"
          >
            {expanded ? "Hide details" : "View details"}
          </button>
          <Link
            to={`/book?car=${car.id}`}
            className="eyebrow text-xs bg-navy text-cream px-5 py-2 hover:bg-gold hover:text-navy transition-colors"
          >
            Reserve
          </Link>
        </div>
        {expanded && (
          <div className="mt-6 pt-6 border-t border-navy/10 text-sm space-y-3">
            <p className="text-navy/70 leading-relaxed italic">{car.description}</p>
            <ul className="grid grid-cols-2 gap-2 text-navy/70">
              <SpecRow icon={Users} text={`${car.seats} seats`} />
              <SpecRow icon={DoorOpen} text={`${car.doors} doors`} />
              <SpecRow icon={Briefcase} text={`${car.bags} bags`} />
              <SpecRow
                icon={Gauge}
                text={
                  car.unlimitedMileage ? "Unlimited mileage" : `${car.mileageLimitPerDay} km/day`
                }
              />
            </ul>
            <div>
              <p className="eyebrow text-[10px] text-navy/50 mb-2">Features</p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-navy/70 text-xs">
                {car.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="size-3.5 text-gold shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-navy/60">
              Security deposit:{" "}
              <span className="text-navy font-medium">{formatPrice(car.deposit)}</span>
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

function SpecRow({ icon: Icon, text }: { icon: typeof Users; text: string }) {
  return (
    <li className="flex items-center gap-2">
      <Icon className="size-4 text-gold" />
      {text}
    </li>
  );
}

function Price({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <dt className="eyebrow text-[10px] text-navy/50 mb-1">{label}</dt>
      <dd className="font-serif text-lg text-navy">{formatPrice(value)}</dd>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: typeof Check;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-secondary p-8 border border-navy/10">
      <Icon className="size-8 text-gold mb-4" />
      <h3 className="font-serif text-2xl text-navy mb-3">{title}</h3>
      <p className="text-navy/60 text-sm mb-5">{desc}</p>
      <ul className="space-y-2 text-sm text-navy/70">
        {(Array.isArray(children) ? children : [children]).map((c, i) => (
          <li key={i} className="flex gap-2">
            <Check className="size-4 text-gold shrink-0 mt-0.5" />
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

const FAQS = [
  {
    q: "What documents do I need to rent?",
    a: "A valid driving licence held for at least 12 months (Rwandan or an International Driving Permit), plus a passport or national ID and payment for the refundable security deposit.",
  },
  {
    q: "Is there a minimum age?",
    a: "Drivers must be 21 or older. Drivers under 25 can rent Economy and Sedan categories with a small young-driver supplement.",
  },
  {
    q: "What is included in the price?",
    a: "Comprehensive insurance, 24/7 roadside assistance across Rwanda, and all taxes. Mileage is unlimited on Sedan, Luxury, Van, Bus and Electric categories; Economy and SUV include 200–250 km/day — enough for Kigali and day trips to Musanze or Rubavu.",
  },
  {
    q: "Can I take the car outside Kigali?",
    a: "Yes — every vehicle may travel to any district in Rwanda (Musanze, Rubavu, Huye, Nyungwe, Akagera and beyond). Cross-border trips to Uganda, Tanzania or DRC require prior written approval and an additional cross-border fee.",
  },
  {
    q: "Can I add a driver?",
    a: "Yes — up to two additional drivers can be registered per rental. Each must present a valid licence at pickup; the second additional driver is free. Prefer to be driven? Add a professional chauffeur for RWF 90,000/day.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Free cancellation or amendment up to 48 hours before pickup. Within 48 hours, one day's rental is charged.",
  },
  {
    q: "How do I pay?",
    a: "We accept MTN Mobile Money, Airtel Money, Visa/Mastercard, bank transfer to our BK account, and cash in RWF at any of our Kigali branches.",
  },
  {
    q: "Do you deliver to Kigali International Airport?",
    a: "Yes. Free meet-and-greet at KIA arrivals for every booking — your car waits curbside with the keys, regardless of flight delays.",
  },
  {
    q: "Do you offer long-term rentals?",
    a: "Monthly rates already carry a significant discount, and rentals over three months receive further corporate pricing — popular with NGOs, projects and expatriates based in Kigali. Contact our team for a tailored quote.",
  },
];
