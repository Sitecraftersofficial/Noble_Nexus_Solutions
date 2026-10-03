/**
 * App — application shell plus a minimal client-side router.
 * Routes are plain React components switched on the URL path
 * (History API based, no external router dependency).
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingQuickAccess } from "@/components/FloatingQuickAccess";
import { observeReveals } from "@/lib/nx-motion";
import { NotFoundPage } from "@/pages/NotFound";
import { HomePage } from "@/pages/Home";
import { FleetPage } from "@/pages/Fleet";
import { BookPage } from "@/pages/Book";
import { AboutPage } from "@/pages/About";
import { ContactPage } from "@/pages/Contact";

function currentPath(): string {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

export default function App() {
  const [path, setPath] = useState(currentPath);

  // Navigate via <a data-link href> or pushState anywhere in the app.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-link]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || anchor.target === "_blank" || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      window.history.pushState(null, "", href);
      window.scrollTo({ top: 0 });
      setPath(currentPath());
    }
    function onPop() {
      setPath(currentPath());
    }
    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  // Re-arm scroll-reveal animations whenever the route changes.
  useEffect(() => {
    return observeReveals();
  }, [path]);

  // Programmatic navigation helper used by pages (kept for parity).
  const navigate = useCallback((to: string) => {
    window.history.pushState(null, "", to);
    window.scrollTo({ top: 0 });
    setPath(currentPath());
  }, []);

  const page = useMemo(() => {
    if (path === "/") return <HomePage />;
    if (path === "/car-rental") return <FleetPage />;
    if (path === "/book") return <BookPage />;
    if (path === "/about") return <AboutPage />;
    if (path === "/contact") return <ContactPage />;
    return <NotFoundPage />;
  }, [path]);

  return (
    <div className="min-h-dvh flex flex-col">
      <SiteHeader path={path} />
      <main id="main" className="flex-1">
        {page}
      </main>
      <FloatingQuickAccess path={path} />
      <SiteFooter />
    </div>
  );
}
