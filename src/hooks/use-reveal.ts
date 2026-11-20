import { useEffect, type RefObject } from "react";

/**
 * Scroll-triggered motion inside a container:
 *  [data-reveal]           fade + rise
 *  [data-reveal-lines] > * masked line slide-up (wrap each line's text in a span)
 *  [data-img-reveal]       clip-path wipe
 *  [data-parallax="0.2"]   vertical parallax
 *  [data-draw]             line that draws with scroll
 * Content stays visible without JS and for reduced-motion visitors.
 */
export function useReveal(ref: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let revert = () => {};
    let cancelled = false;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 48,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: Number(el.dataset["delay"] ?? 0),
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });
        root.querySelectorAll<HTMLElement>("[data-reveal-lines]").forEach((el) => {
          const lines = el.querySelectorAll<HTMLElement>("[data-line]");
          gsap.from(lines, {
            yPercent: 110,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });
        root.querySelectorAll<HTMLElement>("[data-img-reveal]").forEach((el) => {
          gsap.from(el, {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 1.4,
            ease: "expo.inOut",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });
        root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = Number(el.dataset["parallax"] ?? 0.15);
          gsap.fromTo(
            el,
            { yPercent: -speed * 50 },
            {
              yPercent: speed * 50,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
        root.querySelectorAll<HTMLElement>("[data-draw]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleY: 0 },
            { scaleY: 1, ease: "none", transformOrigin: "top", scrollTrigger: { trigger: el.parentElement ?? el, start: "top 70%", end: "bottom 60%", scrub: true } },
          );
        });
      });
      ScrollTrigger.refresh();
      revert = () => mm.revert();
    })();

    return () => {
      cancelled = true;
      revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
