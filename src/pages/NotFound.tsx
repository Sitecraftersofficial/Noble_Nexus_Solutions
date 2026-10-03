import { Link } from "@/lib/Link";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow text-gold mb-4">Error 404</p>
        <h1 className="font-serif text-6xl text-navy mb-4">Page not found</h1>
        <p className="text-sm text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex px-8 py-3 bg-navy text-cream eyebrow hover:bg-gold hover:text-navy transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
