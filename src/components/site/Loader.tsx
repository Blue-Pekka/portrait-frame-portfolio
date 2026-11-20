import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Minimal intro: a counter and a wipe. Shown once per session. */
export function Loader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "leaving" | "done">("counting");

  useEffect(() => {
    if (sessionStorage.getItem("mar-intro") || prefersReducedMotion()) {
      setPhase("done");
      return;
    }
    const start = performance.now();
    const duration = 1300;
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(step);
      else {
        setPhase("leaving");
        sessionStorage.setItem("mar-intro", "1");
        window.setTimeout(() => setPhase("done"), 900);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[90] flex flex-col justify-between bg-ink p-6 text-paper transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] md:p-10 ${phase === "leaving" ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="flex justify-between ui-label">
        <span>M.A. Raqeeb</span>
        <span>Portfolio — 2026</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="ui-label max-w-[14ch] text-muted-foreground">Calibrating sensors. Loading ideas.</span>
        <span className="display text-[28vw] leading-none text-vermilion md:text-[18vw]">
          {String(count).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}
