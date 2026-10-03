import { useState, type FormEvent } from "react";
import { z } from "zod";
import { contact } from "@/config/settings";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  interest: z.enum(["Reservation", "Long-term rental", "Chauffeur service", "Other"]),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = formSchema.safeParse(data);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        map[issue.path[0] as string] = issue.message;
      }
      setErrors(map);
      return;
    }
    setErrors({});
    setSubmitted(true);
    // TODO: wire to /api/public/contact server route or email service.
  }

  return (
    <>
      <section className="bg-navy text-cream py-24">
        <div className="container-page max-w-3xl">
          <p className="eyebrow text-gold mb-6">Reservations & inquiries</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
            Talk to the <span className="italic text-gold">rental desk</span>.
          </h1>
          <p className="text-cream/70 text-lg max-w-xl">
            Our rental team responds within one business hour, 24/7 for existing bookings.
          </p>
        </div>
      </section>

      <section className="container-page py-24 grid md:grid-cols-5 gap-16">
        {/* Form */}
        <div className="md:col-span-3">
          {submitted ? (
            <div className="border border-gold p-10 text-center">
              <p className="eyebrow text-gold mb-4">Received</p>
              <h2 className="font-serif text-3xl text-navy mb-3">Thank you.</h2>
              <p className="text-navy/60">An advisor will be in touch within one business day.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-6">
              <Field label="Full name" id="name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  required
                  maxLength={100}
                  className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-navy"
                />
              </Field>
              <Field label="Email" id="email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={255}
                  className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-navy"
                />
              </Field>
              <Field label="Area of interest" id="interest" error={errors.interest}>
                <select
                  id="interest"
                  name="interest"
                  defaultValue="Reservation"
                  className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-navy"
                >
                  <option value="Reservation">Make a reservation</option>
                  <option value="Long-term rental">Long-term / corporate rental</option>
                  <option value="Chauffeur service">Chauffeur service</option>
                  <option value="Other">Something else</option>
                </select>
              </Field>
              <Field label="Message" id="message" error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={1000}
                  rows={5}
                  className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-navy resize-none"
                />
              </Field>
              <button
                type="submit"
                className="bg-navy text-cream px-10 py-4 eyebrow hover:bg-gold hover:text-navy transition-colors"
              >
                Send Inquiry
              </button>
            </form>
          )}
        </div>

        {/* Details */}
        <aside className="md:col-span-2 space-y-10">
          <div>
            <p className="eyebrow text-gold mb-4">Main Office</p>
            <address className="not-italic text-navy/80 leading-relaxed">
              {contact.address.line1}
              <br />
              {contact.address.line2}
              <br />
              {contact.address.country}
            </address>
          </div>
          <div>
            <p className="eyebrow text-gold mb-4">Direct</p>
            <p className="text-navy/80">
              <a className="hover:text-gold transition-colors" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>
            <p className="text-navy/80">
              <a
                className="hover:text-gold transition-colors"
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
              >
                {contact.phone}
              </a>
            </p>
            <p className="text-navy/80">
              <a
                className="hover:text-gold transition-colors"
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: {contact.whatsapp}
              </a>
            </p>
            <p className="text-navy/60 text-sm mt-2">
              Payments: MTN MoMo · Airtel Money · Visa/Mastercard · Bank transfer
            </p>
          </div>
          <div>
            <p className="eyebrow text-gold mb-4">Branches & Pickup Points</p>
            <ul className="text-navy/80 space-y-1">
              {contact.offices.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}

function Field(props: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={props.id} className="eyebrow text-navy/60 mb-2 block">
        {props.label}
      </label>
      {props.children}
      {props.error && <p className="text-destructive text-xs mt-2">{props.error}</p>}
    </div>
  );
}
