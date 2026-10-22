/**
 * /book — collect rental details before continuing the conversation on WhatsApp.
 * Vehicle preselect comes from ?car=<id> when arriving from a fleet card.
 */
import { useState } from "react";
import { Link } from "@/lib/Link";
import { Gauge, Fuel, Users, Settings2 } from "lucide-react";
import { contact } from "@/config/settings";
import { cars, locations, getCarById, type Car } from "@/data/cars";

function readCarParam(): string | undefined {
  return new URLSearchParams(window.location.search).get("car") ?? undefined;
}

export function BookPage() {
  const [carId, setCarId] = useState(getCarById(readCarParam() ?? "")?.id ?? "");
  const car = getCarById(carId);
  const [sent, setSent] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [driverOption, setDriverOption] = useState<"self" | "chauffeur">("self");
  const [notes, setNotes] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = [
      "Hello Noble Nexus, I would like to enquire about a rental.",
      car ? `Vehicle: ${car.name}` : "",
      `Dates: ${pickupDate} to ${returnDate}`,
      `Pickup: ${pickupLocation}`,
      `Driver: ${driverOption === "chauffeur" ? "With chauffeur" : "Self-drive"}`,
      notes ? `Notes: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  return (
    <>
      <section className="bg-navy text-cream py-24 relative overflow-hidden">
        <div className="container-page max-w-3xl vg-reveal relative">
          <p className="eyebrow text-gold mb-6">Reservations</p>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] mb-6">
            Start your rental <span className="italic text-gold">conversation.</span>
          </h1>
          <p className="text-cream/70 text-lg max-w-xl">
            Share your vehicle and trip details. Our team will discuss availability and all rental
            arrangements with you directly on WhatsApp.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        {sent ? (
          <div className="max-w-2xl mx-auto border border-gold bg-secondary p-10 text-center">
            <p className="eyebrow text-gold mb-4">WhatsApp opened</p>
            <h2 className="font-serif text-4xl text-navy mb-4">We’ll take it from here.</h2>
            <p className="text-navy/70 mb-8">
              Send the prepared message in WhatsApp to continue your rental enquiry.
            </p>
            <Link
              to="/car-rental"
              className="bg-navy text-cream px-8 py-3 eyebrow hover:bg-gold hover:text-navy transition-colors"
            >
              Browse More Vehicles
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <Step n="1" title="Choose your vehicle">
                {car ? (
                  <SelectedCarCard car={car} onChange={() => setCarId("")} />
                ) : (
                  <label className="block">
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
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </Step>

              <Step n="2" title="Rental details">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field
                    label="Pickup date"
                    type="date"
                    required
                    value={pickupDate}
                    onChange={setPickupDate}
                  />
                  <Field
                    label="Return date"
                    type="date"
                    required
                    value={returnDate}
                    onChange={setReturnDate}
                    min={pickupDate}
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
                      {locations.map((location) => (
                        <option key={location}>{location}</option>
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
                      <option value="chauffeur">With chauffeur</option>
                    </select>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="block eyebrow text-xs text-navy mb-2">Notes (optional)</span>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tell us about your trip or any requirements."
                      className="w-full border border-navy/20 bg-background p-3 text-sm"
                    />
                  </label>
                </div>
              </Step>

              <Step n="3" title="Your details">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Full name" type="text" required />
                  <Field label="Email" type="email" required />
                  <Field label="Phone" type="tel" required placeholder="+250 7…" />
                  <label className="sm:col-span-2 flex items-start gap-3 text-sm text-navy/70">
                    <input type="checkbox" required className="mt-1 accent-[#0A1F44]" />
                    <span>
                      I have a valid driving licence and accept the{" "}
                      <Link to="/about" className="text-gold hover:underline">
                        rental terms
                      </Link>
                      .
                    </span>
                  </label>
                </div>
              </Step>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 bg-cream border border-navy/10 p-8">
                <h3 className="font-serif text-2xl text-navy mb-4">Continue on WhatsApp</h3>
                <p className="text-sm text-navy/60 leading-relaxed mb-6">
                  No financial details are collected here. Our team will discuss the quote and
                  rental arrangements with you directly on WhatsApp.
                </p>
                <button
                  type="submit"
                  className="w-full bg-navy text-cream py-4 eyebrow hover:bg-gold hover:text-navy transition-colors"
                >
                  Message us on WhatsApp
                </button>
              </div>
            </aside>
          </form>
        )}
      </section>
    </>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="border border-navy/10 bg-secondary/50 p-8">
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
        <div className="flex flex-wrap gap-3 text-xs text-navy/60">
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

function Field({
  label,
  type,
  required,
  value,
  onChange,
  min,
  placeholder,
}: {
  label: string;
  type: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  min?: string;
  placeholder?: string;
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
    </label>
  );
}
