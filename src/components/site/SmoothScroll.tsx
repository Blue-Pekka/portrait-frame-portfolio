import { useEffect } from "react";
import { setLenis, prefersReducedMotion } from "@/lib/motion";

/** Lenis smooth scrolling synced with GSAP ScrollTrigger. Disabled for reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cleanup = () => {};
    let cancelled = false;

    void (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
