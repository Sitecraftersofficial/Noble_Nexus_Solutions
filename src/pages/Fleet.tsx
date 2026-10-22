/**
 * Car Rental — fleet browsing with filters, per-car detail, policies,
 * and booking form. All vehicle data comes from src/data/cars.json.
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
  MapPin as MapPinIcon,
} from "lucide-react";
const heroImg = "/images/cars/toyotaLcPrado-2.jpg";
import { policies } from "@/config/settings";
import { cars, categories, type Car, type CarCategory } from "@/data/cars";
import { Tilt } from "@/lib/nx-motion";

const CATEGORIES: Array<CarCategory | "All"> = ["All", ...categories];
export function FleetPage() {
  const [category, setCategory] = useState<CarCategory | "All">("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return cars.filter((c) => {
      if (category !== "All" && c.category !== category) return false;
      if (query && !`${c.name} ${c.make} ${c.model}`.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });
  }, [category, query]);
  // Temporary display limit; remove the slice to show all vehicles matching the filters.
  const visibleVehicles = filtered.slice(0, 3);

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
            {cars.length} vehicles across {categories.length} categories — tailored quotes on
            WhatsApp, optional chauffeur and comprehensive insurance.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container-page py-16">
        <p className="eyebrow text-gold mb-4">Browse the Fleet</p>
        <div className="grid md:grid-cols-3 gap-4 mb-8 bg-secondary border border-navy/10 p-6">
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
        </div>
        <p className="eyebrow text-xs text-navy/50 mb-8">
          Showing {visibleVehicles.length} of {filtered.length} matching vehicles ({cars.length} in
          inventory)
        </p>

        {/* Vehicle cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleVehicles.map((v, i) => (
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
            desc="Add a vetted, Kinyarwanda–English–French speaking driver. Ask us on WhatsApp for availability."
          >
            <li>Background-checked professional drivers</li>
            <li>Up to 12-hour daily window</li>
            <li>Overnight accommodation on long journeys (e.g. Rubavu, Nyungwe)</li>
          </Feature>
          <Feature
            icon={ShieldCheck}
            title="Insurance Coverage"
            desc="Every rental is insured. Contact our team for details."
          >
            <li>Insurance included with every rental</li>
          </Feature>
        </div>
      </section>

      {/* Booking CTA — rental details are confirmed directly on WhatsApp */}
      <section className="bg-secondary py-24">
        <div className="container-page text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-navy mb-6">
            Found your car? <span className="italic text-gold">Reserve it in minutes.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Pick a vehicle and choose your dates. Our team will confirm availability and all
            arrangements directly on WhatsApp.
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
  displayName,
  displayImage,
  expanded,
  onToggle,
  delay = 1,
}: {
  car: Car;
  displayName?: string;
  displayImage?: string;
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
          src={displayImage ?? car.image}
          alt={displayName ?? car.name}
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
          {car.category} · {car.year}
        </p>
        <h3 className="font-serif text-2xl text-navy mb-4">{displayName ?? car.name}</h3>
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
        <p className="border-y border-navy/10 py-4 mb-5 text-sm text-navy/60">
          Message us on WhatsApp for availability and a tailored quote.
        </p>
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
