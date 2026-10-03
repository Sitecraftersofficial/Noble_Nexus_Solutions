/**
 * About — the car rental story, values, milestones and stats.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { site, stats } from "@/config/settings";
import heroImg from "/images/cars/hero-fleet.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Noble Nexus Car Rentals" },
      {
        name: "description",
        content:
          "Noble Nexus Car Rentals has put discerning drivers behind the wheel since 1984 — economy to luxury, self-drive or chauffeured.",
      },
      { property: "og:title", content: "About — Noble Nexus Car Rentals" },
      { property: "og:description", content: "Premium car rentals, quietly perfected since 1984." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: AboutPage,
});

const TIMELINE = [
  {
    year: "1984",
    text: "Founded in Kiyovu, Kigali with six chauffeured saloons serving diplomats and the hotel circuit.",
  },
  {
    year: "1996",
    text: "Self-drive rentals added to the fleet as Kigali's roads and private car ownership grew.",
  },
  {
    year: "2008",
    text: "Launched the luxury division — Maybach, Porsche and executive coaches for weddings and delegations.",
  },
  {
    year: "2017",
    text: "Opened the Rubavu lakeside branch; airport meet-and-greet introduced at KIA.",
  },
  {
    year: "2024",
    text: "120+ vehicles, three Kigali branches and electric rentals added to every category.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="container-page py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="nx-reveal nx-left">
          <p className="eyebrow text-gold mb-6">Est. {site.foundedYear}</p>
          <h1 className="font-serif text-5xl md:text-7xl text-navy leading-[1.05] mb-8">
            The road, <span className="italic text-gold">quietly perfected</span>.
          </h1>
          <p className="text-navy/70 leading-relaxed mb-4">
            Noble Nexus began with six chauffeured saloons in Kiyovu and a single conviction: that
            renting a car should feel like being handed the keys to something better than your own.
          </p>
          <p className="text-navy/70 leading-relaxed">
            Four decades on, that conviction governs 120+ vehicles across three Kigali branches and
            our Rubavu lakeside desk — from city compacts to Maybachs, each one inspected, insured
            and detailed before every handover.
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
              body: "From quote to handover in hours, not days — with every cost disclosed up front.",
            },
            {
              label: "Vision",
              title: "One trusted fleet.",
              body: "Whatever the journey demands — a Corolla for the week or a coach for forty — one account covers it.",
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

      {/* Timeline */}
      <section className="container-page py-24">
        <div className="max-w-2xl mb-16 nx-reveal">
          <p className="eyebrow text-gold mb-4">A brief history</p>
          <h2 className="font-serif text-4xl md:text-5xl text-navy leading-tight">
            Forty-two years, in five lines.
          </h2>
        </div>
        <ol className="border-l border-gold/40">
          {TIMELINE.map((t, i) => (
            <li
              key={t.year}
              className={`nx-reveal nx-delay-${(i % 5) + 1} pl-8 pb-10 last:pb-0 relative`}
            >
              <span
                className="absolute -left-1.75 top-2 w-3 h-3 bg-gold rounded-full"
                aria-hidden
              />
              <p className="font-serif text-3xl text-navy mb-2">{t.year}</p>
              <p className="text-navy/60 max-w-lg">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Stats */}
      <section className="bg-secondary py-20">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <div key={s.label} className={`nx-reveal nx-delay-${i + 1}`}>
              <p className="text-navy text-4xl md:text-5xl font-serif mb-2">{s.value}</p>
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
          search={{ car: undefined }}
          className="inline-block bg-navy text-cream px-10 py-4 eyebrow hover:bg-gold hover:text-navy transition-colors"
        >
          Reserve a Vehicle
        </Link>
      </section>
    </>
  );
}
