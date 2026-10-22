/** About — the car rental story, values and stats. */
import { Link } from "@/lib/Link";
import { stats } from "@/config/settings";
const heroImg = "/images/cars/toyotaLcPrado-2.jpg";

export function AboutPage() {
  return (
    <>
      <section className="container-page py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="nx-reveal nx-left">
          <h1 className="font-serif text-5xl md:text-7xl text-navy leading-[1.05] mb-8">
            The road, <span className="italic text-gold">quietly perfected</span>.
          </h1>
          <p className="text-navy/70 leading-relaxed mb-4">
            Noble Nexus makes renting a car feel straightforward, comfortable and dependable. We
            bring together a carefully selected range of vehicles for everyday travel, business
            trips and special occasions, with a service designed around your needs.
          </p>
          <p className="text-navy/70 leading-relaxed">
            Whether you need a practical vehicle for a short journey or something suited to a
            special occasion, our team helps you choose with confidence. Every rental is insured,
            and each vehicle is prepared with care before your journey.
          </p>
        </div>
        <img
          src={heroImg}
          alt="Noble Nexus rental fleet"
          loading="lazy"
          width={800}
          height={1000}
          className="nx-reveal nx-right w-full aspect-4/5 object-cover"
        />
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-navy text-cream py-24">
        <div className="container-page grid md:grid-cols-3 gap-12">
          {[
            {
              label: "Mission",
              title: "Keys without friction.",
              body: "From enquiry to handover in hours, not days — with clear rental arrangements agreed directly with our team.",
            },
            {
              label: "Vision",
              title: "One trusted fleet.",
              body: "Whatever the journey demands, one trusted account makes the rental process simple.",
            },
            {
              label: "Values",
              title: "Discretion. Care. Precision.",
              body: "Every vehicle detailed, every driver vetted, every promise on paper.",
            },
          ].map((v, i) => (
            <div key={v.label} className={`nx-reveal nx-delay-${i + 1}`}>
              <p className="eyebrow text-gold mb-6">{v.label}</p>
              <h3 className="font-serif text-3xl mb-4">{v.title}</h3>
              <p className="text-cream/60 leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary py-20">
        <div className="container-page grid grid-cols-2 md:grid-cols-3 gap-10">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`nx-reveal nx-delay-${i + 1} text-center ${
                i === stats.length - 1 ? "col-span-2 md:col-span-1 justify-self-center" : ""
              }`}
            >
              <p className="text-navy text-4xl md:text-5xl font-serif mb-2 flex items-baseline justify-center gap-1">
                {s.value === "5★" ? (
                  <>
                    5<span className="text-2xl md:text-3xl">★</span>
                  </>
                ) : (
                  s.value
                )}
              </p>
              <p className="text-navy/50 eyebrow">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-24 text-center nx-reveal nx-zoom">
        <h2 className="font-serif text-4xl md:text-5xl text-navy mb-6">
          Put the keys in your hand.
        </h2>
        <Link
          to="/book"
          className="inline-block bg-navy text-cream px-10 py-4 eyebrow hover:bg-gold hover:text-navy transition-colors"
        >
          Reserve a Vehicle
        </Link>
      </section>
    </>
  );
}
