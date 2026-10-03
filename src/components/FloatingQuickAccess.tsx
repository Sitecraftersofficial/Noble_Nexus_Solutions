/**
 * FloatingQuickAccess — sticky right-side rail of one-tap shortcuts
 * to the most-trafficked service endpoints. Edit items in
 * src/config/settings.ts → quickAccess.
 */
import { Link } from "@/lib/Link";
import { Car, Calendar, Phone } from "lucide-react";
import { quickAccess } from "@/config/settings";

const ICONS = { Car, Calendar, Phone } as const;

export function FloatingQuickAccess({ path }: { path: string }) {
  return (
    <aside
      aria-label="Quick access"
      className="fixed right-3 bottom-4 z-40 hidden md:flex flex-col gap-2"
    >
      {quickAccess.map((item) => {
        const Icon = ICONS[item.icon as keyof typeof ICONS] ?? Car;
        const active = path === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`group flex items-center gap-2 pl-3 pr-4 py-2.5 border transition-all shadow-lg ${
              active
                ? "bg-gold text-navy border-gold"
                : "bg-navy text-cream border-gold/30 hover:bg-gold hover:text-navy hover:border-gold"
            }`}
          >
            <Icon
              className={`size-4 transition-colors ${active ? "text-navy" : "text-gold group-hover:text-navy"}`}
            />
            <span className="eyebrow text-xs whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}
    </aside>
  );
}
