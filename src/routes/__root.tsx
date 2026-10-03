import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";
import { observeReveals } from "../lib/nx-motion";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingQuickAccess } from "@/components/FloatingQuickAccess";
import { site } from "@/config/settings";

function NotFoundComponent() {
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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow text-gold mb-4">Unexpected error</p>
        <h1 className="font-serif text-4xl text-navy mb-4">This page didn't load</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Something went wrong. You can try again or return home.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-6 py-3 bg-navy text-cream eyebrow hover:bg-gold hover:text-navy transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-navy text-navy eyebrow hover:bg-navy hover:text-cream transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${site.name} — ${site.tagline}` },
      { name: "description", content: site.description },
      { property: "og:title", content: `${site.name} — ${site.tagline}` },
      { property: "og:description", content: site.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  // Re-run the reveal observer whenever the active route changes.
  const pathname = router.state.location.pathname;
  useEffect(() => {
    return observeReveals();
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-dvh flex flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <FloatingQuickAccess />
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
