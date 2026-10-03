/**
 * /book — per-vehicle reservation page.
 * Flow: select vehicle → rental details → price summary → MTN MoMo payment.
 * The MoMo collection (CSTalk-to-Operator) gateway is integrated later; the
 * payment step is wired with a placeholder submit that clearly states MoMo.
 * Vehicle preselect comes from ?car=<id> when arriving from a fleet card.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Smartphone, Gauge, Fuel, Users, Settings2 } from "lucide-react";
import { contact } from "@/config/settings";
import { cars, locations, formatPrice, getCarById, type Car } from "@/data/cars";

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>) => ({
    car: typeof search.car === "string" ? search.car : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book a Vehicle — Noble Nexus Car Rentals" },
      {
        name: "description",
        content:
          "Reserve your rental in minutes and pay with MTN Mobile Money. Daily, weekly and monthly rates with optional chauffeur.",
      },
      { property: "og:title", content: "Book a Vehicle — Noble Nexus Car Rentals" },
      {
        property: "og:description",
        content: "Reserve your rental in minutes and pay with MTN Mobile Money.",
      },
    ],
  }),
  component: BookPage,
});

type PaymentState = "form" | "processing" | "done";

function BookPage() {
  const { car: carParam } = Route.useSearch() as { car?: string };
  const preselected = getCarById(carParam ?? "") ?? null;

  const [carId, setCarId] = useState<string>(preselected?.id ?? "");
  const car = getCarById(carId);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const [driverOption, setDriverOption] = useState<"self" | "chauffeur">("self");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState<PaymentState>("form");

  const CHAUFFEUR_DAILY = 90000;

  /** Estimate = days × (car rate + optional chauffeur). Uses daily rate. */
  const estimate = useMemo(() => {
    if (!car || !pickupDate || !returnDate) return null;
    const days = Math.max(
      1,
      Math.round((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / 86_400_000),
    );
    if (Number.isNaN(days)) return null;
    return {
      days,
      car: car.daily * days,
      chauffeur: driverOption === "chauffeur" ? CHAUFFEUR_DAILY * days : 0,
      deposit: car.deposit,
      total: car.daily * days + (driverOption === "chauffeur" ? CHAUFFEUR_DAILY * days : 0),
    };
  }, [car, pickupDate, returnDate, driverOption]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPayment("processing");
    // TODO: MTN MoMo Collections API — create payment request with the
    // renter's MoMo number, then confirm callback before marking "done".
    window.setTimeout(() => setPayment("done"), 1800);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-cream py-24 relative overflow-hidden">
        <div
          className="absolute top-8 right-12 w-48 h-48 rounded-full bg-gold/10 blur-3xl nx-float"
          aria-hidden
        />
        <div className="container-page max-w-3xl vg-reveal relative">
          <p className="eyebrow text-gold mb-6">Reservations</p>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] mb-6">
            Book your vehicle. <span className="italic text-gold">Pay with MoMo.</span>
          </h1>
          <p className="text-cream/70 text-lg max-w-xl">
            Reserve in minutes — confirm the details, see the price, then pay securely with MTN
            Mobile Money from your phone.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        {payment === "done" ? (
          <Confirmation car={car ?? null} estimate={estimate} />
        ) : (
          <form onSubmit={onSubmit} className="grid lg:grid-cols-3 gap-10">
            {/* Left: steps */}
            <div className="lg:col-span-2 space-y-10">
              {/* 1 — Vehicle */}
              <Step n="1" title="Choose your vehicle" delay={1}>
                {car ? (
                  <SelectedCarCard car={car} onChange={() => setCarId("")} />
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block sm:col-span-2">
                      <span className="block eyebrow text-xs text-navy mb-2">Vehicle</span>
                      <select
                        required
                        value={carId}
                        onChange={(e) => setCarId(e.target.value)}
                        className="w-full border border-navy/20 bg-background p-3 text-sm"
                      >
                        <option value="">— Select a vehicle —</option>
                        {cars.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} — {formatPrice(c.daily)}/day
                          </option>
                        ))}
                      </select>
                    </label>
                    <p className="sm:col-span-2 text-sm text-navy/60">
                      Or browse the{" "}
                      <Link to="/car-rental" className="text-gold hover:underline">
                        full fleet
                      </Link>{" "}
                      and press “Reserve” on any vehicle.
                    </p>
                  </div>
                )}
              </Step>

              {/* 2 — Rental details */}
              <Step n="2" title="Rental details" delay={2}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field
                    label="Pickup date"
                    type="date"
                    required
                    value={pickupDate}
                    onChange={setPickupDate}
                    min={new Date().toISOString().slice(0, 10)}
                  />
                  <Field
                    label="Return date"
                    type="date"
                    required
                    value={returnDate}
                    onChange={setReturnDate}
                    min={pickupDate || new Date().toISOString().slice(0, 10)}
                  />
                  <label className="block">
                    <span className="block eyebrow text-xs text-navy mb-2">Pickup location</span>
                    <select
                      required
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full border border-navy/20 bg-background p-3 text-sm"
                    >
                      <option value="">— Select location —</option>
                      {locations.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                      <option>Kigali International Airport (KIA)</option>
                      <option>My hotel / residence in Kigali</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="block eyebrow text-xs text-navy mb-2">Driver option</span>
                    <select
                      value={driverOption}
                      onChange={(e) => setDriverOption(e.target.value as "self" | "chauffeur")}
                      className="w-full border border-navy/20 bg-background p-3 text-sm"
                    >
                      <option value="self">Self-drive</option>
                      <option value="chauffeur">
                        With chauffeur (+{formatPrice(CHAUFFEUR_DAILY)}/day)
                      </option>
                    </select>
                  </label>
                  <div className="sm:col-span-2">
                    <label className="block eyebrow text-xs text-navy mb-2">Notes (optional)</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Gorilla trekking in Musanze for 3 days, then drop-off at KIA."
                      className="w-full border border-navy/20 bg-background p-3 text-sm"
                    />
                  </div>
                </div>
              </Step>

              {/* 3 — Renter details */}
              <Step n="3" title="Your details" delay={3}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Full name" type="text" required />
                  <Field label="Email" type="email" required />
                  <Field label="Phone" type="tel" required placeholder="+250 7…" />
                  <Field
                    label="MTN MoMo number (for payment)"
                    type="tel"
                    required
                    placeholder="078… / 079…"
                    hint="You'll receive a MoMo prompt on this number to approve the payment."
                  />
                  <label className="sm:col-span-2 flex items-start gap-3 text-sm text-navy/70">
                    <input type="checkbox" required className="mt-1 accent-[#0A1F44]" />
                    <span>
                      I have a valid driving licence (held 12+ months) and accept the{" "}
                      <Link to="/about" className="text-gold hover:underline">
                        rental terms
                      </Link>
                      : free cancellation up to 48h before pickup.
                    </span>
                  </label>
                </div>
              </Step>
            </div>

            {/* Right: price summary + payment */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-cream border border-navy/10 p-8">
                <h3 className="font-serif text-2xl text-navy mb-6">Price summary</h3>
                {estimate && car ? (
                  <div className="space-y-3 text-sm">
                    <Row
                      label={`${car.name} × ${estimate.days} day${estimate.days === 1 ? "" : "s"}`}
                      value={formatPrice(estimate.car)}
                    />
                    {estimate.chauffeur > 0 && (
                      <Row
                        label={`Chauffeur × ${estimate.days} day${estimate.days === 1 ? "" : "s"}`}
                        value={formatPrice(estimate.chauffeur)}
                      />
                    )}
                    <Row label="Insurance & roadside cover" value="Included" muted />
                    <div className="border-t border-navy/10 pt-3 flex justify-between">
                      <span className="eyebrow text-navy">Rental total</span>
                      <span className="font-serif text-xl text-navy">
                        {formatPrice(estimate.total)}
                      </span>
                    </div>
                    <div className="flex justify-between text-navy/60">
                      <span>Refundable deposit (pay at pickup)</span>
                      <span>{formatPrice(estimate.deposit)}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-navy/50 mb-6">
                    Select a vehicle and dates to see your price.
                  </p>
                )}

                <div className="mt-8 border-t border-navy/10 pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Smartphone className="size-5 text-gold" />
                    <span className="eyebrow text-navy">Pay with MTN MoMo</span>
                  </div>
                  <p className="text-xs text-navy/60 leading-relaxed mb-5">
                    On submit you'll get an MTN prompt on your phone to approve the rental payment.
                    Card, Airtel Money and bank transfer are accepted at the branch.
                  </p>
                  <button
                    type="submit"
                    disabled={!estimate || payment === "processing"}
                    className="w-full bg-navy text-cream py-4 eyebrow hover:bg-gold hover:text-navy transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {payment === "processing"
                      ? "Waiting for MoMo approval…"
                      : "Pay & Confirm Booking"}
                  </button>
                  <p className="mt-4 text-[11px] text-navy/40 text-center">
                    Secured by MTN Mobile Money · Free cancellation up to 48h
                  </p>
                </div>
              </div>
            </aside>
          </form>
        )}
      </section>
    </>
  );
}

/* ─── Local components ─── */

function Step({
  n,
  title,
  children,
  delay = 1,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div className={`nx-reveal nx-delay-${delay} border border-navy/10 bg-secondary/50 p-8`}>
      <div className="flex items-center gap-4 mb-6">
        <span className="w-9 h-9 bg-navy text-gold eyebrow flex items-center justify-center">
          {n}
        </span>
        <h2 className="font-serif text-2xl text-navy">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function SelectedCarCard({ car, onChange }: { car: Car; onChange: () => void }) {
  return (
    <div className="flex flex-col sm:flex-row gap-5 bg-background border border-navy/10 p-5">
      <img
        src={car.image}
        alt={car.name}
        className="w-full sm:w-48 aspect-4/3 object-cover shrink-0"
      />
      <div className="flex-1">
        <p className="eyebrow text-gold text-xs mb-1">
          {car.category} · {car.year} · {car.location}
        </p>
        <h3 className="font-serif text-xl text-navy mb-2">{car.name}</h3>
        <div className="flex flex-wrap gap-3 text-xs text-navy/60 mb-2">
          <span className="flex items-center gap-1">
            <Users className="size-3.5 text-gold" />
            {car.seats} seats
          </span>
          <span className="flex items-center gap-1">
            <Settings2 className="size-3.5 text-gold" />
            {car.transmission}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="size-3.5 text-gold" />
            {car.fuel}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="size-3.5 text-gold" />
            {car.unlimitedMileage ? "Unlimited km" : `${car.mileageLimitPerDay} km/day`}
          </span>
        </div>
        <p className="font-serif text-lg text-navy">
          {formatPrice(car.daily)}
          <span className="text-sm text-navy/50"> /day</span>
        </p>
        <button
          type="button"
          onClick={onChange}
          className="mt-3 eyebrow text-xs text-navy border-b border-navy/30 pb-0.5 hover:text-gold hover:border-gold transition-colors"
        >
          Change vehicle
        </button>
      </div>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className={muted ? "text-navy/50" : "text-navy/70"}>{label}</span>
      <span className={muted ? "text-navy/50" : "text-navy"}>{value}</span>
    </div>
  );
}

type Estimate = null | { days: number; total: number };

function Confirmation({ car, estimate }: { car: Car | null; estimate: Estimate }) {
  return (
    <div className="max-w-2xl mx-auto border border-gold bg-secondary p-10 text-center">
      <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center mx-auto mb-6">
        <Check className="size-7 text-navy" />
      </div>
      <p className="eyebrow text-gold mb-4">Booking received</p>
      <h2 className="font-serif text-4xl text-navy mb-4">Murakoze — you're booked.</h2>
      <p className="text-navy/70 mb-2">
        Your MoMo payment was approved and your reservation is confirmed.
      </p>
      {car && (
        <p className="text-navy mb-6">
          <span className="font-serif text-xl text-navy">{car.name}</span>
          {estimate && (
            <>
              {" "}
              · {estimate.days} day{estimate.days === 1 ? "" : "s"} · {formatPrice(estimate.total)}
            </>
          )}
        </p>
      )}
      <div className="text-sm text-navy/60 space-y-1 mb-8">
        <p>A confirmation has been sent to your email and phone.</p>
        <p>Pickup: bring your licence and ID — the refundable deposit is settled at the branch.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/car-rental"
          className="bg-navy text-cream px-8 py-3 eyebrow hover:bg-gold hover:text-navy transition-colors"
        >
          Browse More Vehicles
        </Link>
        <a
          href={`tel:${contact.phone.replace(/\s/g, "")}`}
          className="border border-navy text-navy px-8 py-3 eyebrow hover:bg-navy hover:text-cream transition-colors"
        >
          Call {contact.phone}
        </a>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  required,
  value,
  onChange,
  min,
  placeholder,
  hint,
}: {
  label: string;
  type: string;
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
  min?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="block eyebrow text-xs text-navy mb-2">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        min={min}
        placeholder={placeholder}
        className="w-full border border-navy/20 bg-background p-3 text-sm"
      />
      {hint && <span className="block text-[11px] text-navy/50 mt-1">{hint}</span>}
    </label>
  );
}
