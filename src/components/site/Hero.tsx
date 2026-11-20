import { lazy, Suspense, useEffect, useRef } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { ArrowDownRight } from "lucide-react";
import { person } from "@/content/portfolio";
import { scrollToSection } from "@/lib/motion";

const HeroSculpture = lazy(() => import("./HeroSculpture"));

const WORDS = ["Think.", "Build.", "Explore."];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let revert = () => {};
    let cancelled = false;
    const introShown = sessionStorage.getItem("mar-intro");

    void (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ delay: introShown ? 0.15 : 1.75, defaults: { ease: "expo.out" } });
        tl.from(root.querySelectorAll("[data-hero-word]"), { yPercent: 105, duration: 1.4, stagger: 0.1 })
          .from(root.querySelector("[data-hero-portrait]"), { clipPath: "inset(100% 0 0 0)", duration: 1.5, ease: "expo.inOut" }, 0.1)
          .from(root.querySelector("[data-hero-sculpture]"), { scale: 0.6, opacity: 0, duration: 1.6 }, 0.5)
          .from(root.querySelectorAll("[data-hero-fade]"), { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.7);

        // Subtle cursor parallax on the type block
        const words = wordsRef.current;
        if (!words) return;
        const xTo = gsap.quickTo(words, "x", { duration: 1.2, ease: "power3.out" });
        const yTo = gsap.quickTo(words, "y", { duration: 1.2, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          xTo((e.clientX / window.innerWidth - 0.5) * -24);
          yTo((e.clientY / window.innerHeight - 0.5) * -14);
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });
      revert = () => mm.revert();
    })();

    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      aria-labelledby="hero-title"
      className="grain bg-hero relative isolate min-h-[100svh] overflow-hidden text-ink"
    >
      {/* Giant type — sits behind the portrait */}
      <div
        ref={wordsRef}
        aria-hidden
        className="pointer-events-none relative z-0 px-4 pt-28 md:absolute md:inset-x-0 md:top-0 md:px-6 md:pt-[13vh]"
      >
        {WORDS.map((w, i) => (
          <div key={w} className="overflow-hidden">
            <div
              data-hero-word
              className={`display text-[25vw] leading-[0.84] md:text-[15.5vw] ${i === 1 ? "md:pl-[9vw]" : ""} ${i === 2 ? "text-outline-ink md:pl-[3vw]" : ""}`}
            >
              {w}
            </div>
          </div>
        ))}
      </div>

      {/* Status label */}
      <p data-hero-fade className="ui-label absolute left-5 top-20 z-30 flex items-center gap-2 md:left-6 md:top-[8.5vh]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
        </span>
        {person.status}
      </p>

      {/* Portrait — the hero image */}
      <figure
        data-hero-portrait
        className="relative z-10 mx-4 -mt-[3vw] aspect-[4/5] bg-ink md:absolute md:right-[5vw] md:top-[12vh] md:mx-0 md:mt-0 md:aspect-auto md:h-[68vh] md:w-[min(36vw,560px)]"
      >
        <img
          src={person.portrait}
          alt={`Portrait of ${person.name}`}
          className="h-full w-full object-cover object-[50%_30%]"
          fetchPriority="high"
          decoding="async"
        />
        <figcaption className="ui-label absolute inset-x-0 -bottom-7 flex justify-between text-[0.62rem]">
          <span>Fig. 01 — {person.shortName}</span>
          <span className="hidden md:inline">17.38°N 78.48°E</span>
        </figcaption>
        <span className="ui-label absolute left-3 top-3 bg-vermilion px-2 py-1 text-[0.6rem] text-ink">Engineer / Researcher</span>
      </figure>

      {/* Interactive 3D sculpture overlapping the portrait edge */}
      <div
        data-hero-sculpture
        className="absolute right-[38vw] top-[34vh] z-20 hidden h-[44vh] w-[44vh] md:block lg:right-[33vw]"
      >
        <ClientOnly fallback={null}>
          <Suspense fallback={null}>
            <HeroSculpture />
          </Suspense>
        </ClientOnly>
        <span className="ui-label pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.6rem]">
          [ Hold & drag ]
        </span>
      </div>

      {/* Mobile sculpture */}
      <div className="relative z-20 -mt-44 ml-auto mr-1 h-48 w-48 md:hidden" aria-hidden>
        <ClientOnly fallback={null}>
          <Suspense fallback={null}>
            <HeroSculpture />
          </Suspense>
        </ClientOnly>
      </div>

      {/* Bottom bar */}
      <div className="relative z-30 grid gap-8 px-5 pb-10 pt-6 md:absolute md:inset-x-0 md:bottom-0 md:grid-cols-12 md:items-end md:px-6 md:pb-8">
        <div data-hero-fade className="md:col-span-5">
          <h1 id="hero-title">
            <span className="display block text-[11vw] leading-[0.9] md:text-[3.6vw]">{person.name}</span>
            <span className="serif-accent mt-2 block text-2xl md:text-[1.9vw]">
              Building ideas. Engineering possibilities.
            </span>
          </h1>
        </div>
        <p data-hero-fade className="font-ui text-base leading-snug md:col-span-4 md:col-start-6 md:text-[1.05rem]">
          {person.intro}
        </p>
        <a
          data-hero-fade
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("about");
          }}
          className="ui-label group flex items-center gap-3 md:col-span-3 md:justify-self-end"
        >
          <span className="relative block h-10 w-px overflow-hidden bg-ink/25">
            <span className="animate-scroll-cue absolute inset-0 bg-ink" />
          </span>
          Scroll to explore
          <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
        </a>
      </div>
    </section>
  );
}
