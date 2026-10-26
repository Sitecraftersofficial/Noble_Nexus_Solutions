/**
 * Home page for the car rental business.
 * Sections: Hero, Trust bar, Featured fleet (from cars.json),
 * Why-rent-with-us (policies), How it works, Contact CTA.
 */
import { Link } from "@/lib/Link";
import { ShieldCheck, UserRound, CalendarCheck, MapPin, ArrowRight } from "lucide-react";
import { site, stats, policies } from "@/config/settings";
import { cars } from "@/data/cars";
import { Tilt } from "@/lib/nx-motion";

const heroImg = "/images/cars/toyotaLcPrado-2.jpg";

const POLICY_ICONS = { ShieldCheck, UserRound, CalendarCheck, MapPin } as const;
export function HomePage() {
  const featured = cars.filter((c) => c.featured);

  return (
    <>
      {/* 1. Hero */}
      <section className="relative h-[85vh] min-h-150 bg-navy overflow-hidden">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-40 nx-kenburns"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/40 to-navy/30" />
        <div
          className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-gold/10 blur-3xl nx-float"
          aria-hidden
        />
        <div
          className="absolute bottom-1/4 right-16 w-56 h-56 rounded-full bg-gold/5 blur-3xl nx-float"
          aria-hidden
          style={{ animationDelay: "-3s" }}
        />
        <div className="relative h-full flex flex-col justify-center items-center text-center px-6 vg-reveal">
          <p className="eyebrow text-gold mb-6">
            Daily · Weekly · Monthly Rentals · Kigali, Rwanda
          </p>
          <h1 className="font-serif text-5xl md:text-8xl text-cream mb-6 max-w-5xl leading-[0.95] text-balance">
            Your journey. <span className="italic text-gold">Our wheels.</span>
          </h1>
          <p className="text-cream/70 max-w-xl text-lg font-light leading-relaxed mb-10 text-pretty">
            {site.tagline} Economy to luxury, self-drive or chauffeured — with arrangements tailored
            to your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/car-rental"
              className="bg-gold text-navy px-10 py-4 eyebrow hover:bg-cream transition-colors nx-shine"
            >
              Browse the Fleet
            </Link>
            <Link
              to="/book"
              className="border border-cream/30 text-cream px-10 py-4 eyebrow hover:bg-cream/10 transition-colors"
            >
              Reserve Now
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Trust bar */}
      <section className="bg-navy py-16 overflow-hidden">
        <div className="container-page border-y border-gold/20 py-10 grid grid-cols-2 md:grid-cols-3 gap-10">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`nx-reveal nx-delay-${i + 1} text-center ${
                i === stats.length - 1 ? "col-span-2 md:col-span-1 justify-self-center" : ""
              }`}
            >
              <p className="text-gold text-4xl md:text-5xl font-serif mb-2 flex items-baseline justify-center gap-1">
                {s.value === "5★" ? (
                  <>
                    5<span className="text-2xl md:text-3xl">★</span>
                  </>
                ) : (
                  s.value
                )}
              </p>
              <p className="text-cream/40 eyebrow">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured vehicles */}
      <section className="container-page py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow text-gold mb-4">Featured Fleet</p>
            <h2 className="font-serif text-4xl md:text-5xl text-navy leading-tight">
              Find your perfect ride. <span className="italic">Enjoy personal service.</span>
            </h2>
          </div>
          <Link
            to="/car-rental"
            className="eyebrow text-navy border-b border-navy pb-1 hover:text-gold hover:border-gold transition-colors w-fit"
          >
            See all vehicles →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Featured cards are data-driven; remove slice to restore all featured vehicles. */}
          {featured.slice(0, 3).map((car, i) => (
            <Tilt key={car.id} className={`nx-reveal nx-delay-${(i % 3) + 1}`}>
              <Link
                to={`/book?car=${car.id}`}
                className="group block bg-cream border border-navy/10 hover:border-gold transition-colors nx-lift"
              >
                <div className="overflow-hidden aspect-4/3">
                  <img
                    src={car.image}
                    alt={car.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex justify-between items-center nx-tilt-layer">
                  <div>
                    <p className="eyebrow text-gold text-xs mb-1">{car.category}</p>
                    <h3 className="font-serif text-xl text-navy">{car.name}</h3>
                  </div>
                  <span className="text-sm text-navy/60">Talk with us</span>
                </div>
              </Link>
            </Tilt>
          ))}
        </div>
      </section>

      {/* 4. Why rent with us */}
      <section className="bg-secondary py-24">
        <div className="container-page">
          <div className="text-center mb-16">
            <p className="eyebrow text-gold mb-4">The Noble Nexus Standard</p>
            <h2 className="font-serif text-4xl md:text-5xl text-navy">Why rent with us.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {policies.map((p, i) => {
              const Icon = POLICY_ICONS[p.icon as keyof typeof POLICY_ICONS] ?? ShieldCheck;
              return (
                <div
                  key={p.title}
                  className={`nx-reveal nx-delay-${i + 1} bg-background border border-navy/10 p-8 nx-lift hover:border-gold`}
                >
                  <Icon className="size-8 text-gold mb-4" />
                  <h3 className="font-serif text-xl text-navy mb-3">{p.title}</h3>
                  <p className="text-navy/60 text-sm leading-relaxed">{p.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. How it works */}
      <section className="container-page py-24">
        <div className="text-center mb-16 nx-reveal">
          <p className="eyebrow text-gold mb-4">How It Works</p>
          <h2 className="font-serif text-4xl md:text-5xl text-navy">On the road in three steps.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border border border-navy/10">
          {[
            {
              n: "01",
              title: "Choose your vehicle",
              text: "Browse the fleet by category and vehicle type, then message us on WhatsApp for a tailored quote.",
            },
            {
              n: "02",
              title: "Reserve online",
              text: "Pick your dates and driver option. Our team confirms availability and arrangements on WhatsApp.",
            },
            {
              n: "03",
              title: "Get on the road",
              text: "We confirm the arrangements with you, then hand over the keys for your journey.",
            },
          ].map((step, i) => (
            <div key={step.n} className={`nx-reveal nx-delay-${i + 1} bg-background p-10 nx-lift`}>
              <p className="text-gold font-serif text-5xl mb-6">{step.n}</p>
              <h3 className="font-serif text-2xl text-navy mb-3">{step.title}</h3>
              <p className="text-navy/60 text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Contact CTA */}
      <section className="bg-secondary py-24">
        <div className="container-page text-center nx-reveal">
          <h2 className="font-serif text-4xl md:text-6xl text-navy mb-6 text-balance">
            Ready when <span className="italic text-gold">you are</span>.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Our Kigali rental team responds within one business hour — quotes, long-term rates and
            chauffeur arrangements included.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/book"
              className="inline-block bg-navy text-cream px-10 py-4 eyebrow hover:bg-gold hover:text-navy transition-colors"
            >
              Reserve a Vehicle
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-navy text-navy px-10 py-4 eyebrow hover:bg-navy hover:text-cream transition-colors"
            >
              Contact Us <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
