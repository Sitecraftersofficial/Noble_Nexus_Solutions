/**
 * nx-motion — tiny motion utilities for the Noble Nexus design system.
 * - RevealObserver: adds `.in` to `.nx-reveal` elements as they scroll in.
 * - <Tilt>: pointer-tracked 3D tilt wrapper (pure CSS transforms, no deps).
 * - <Marquee>: infinite horizontal strip (pauses on hover).
 * All effects respect prefers-reduced-motion via styles.css.
 */
import { useEffect, useRef, type ReactNode } from "react";

let observer: IntersectionObserver | undefined;

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
  }
  return observer;
}

/** Observes all `.nx-reveal` elements under `root` (defaults to document). */
export function observeReveals(root?: HTMLElement | null) {
  if (typeof window === "undefined") return () => {};
  const els = (root ?? document).querySelectorAll<HTMLElement>(".nx-reveal:not(.in)");
  const io = getObserver();
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/** Pointer-tracked 3D tilt. Children sit on a raised layer via .nx-tilt-layer. */
export function Tilt({
  children,
  className = "",
  max = 8,
  scale = 1.02,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `rotateY(${px * max}deg) rotateX(${-py * max}deg) scale(${scale})`;
    });
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transform = "";
  }

  return (
    <div className={`nx-3d ${className}`}>
      <div ref={ref} className="nx-tilt h-full" onPointerMove={onMove} onPointerLeave={onLeave}>
        {children}
      </div>
    </div>
  );
}

/** Infinite marquee — render children twice for a seamless loop. */
export function Marquee({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`nx-marquee ${className}`}>
      <div className="nx-marquee-track">
        {children}
        {children}
      </div>
    </div>
  );
}
