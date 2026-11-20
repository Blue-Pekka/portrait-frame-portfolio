import { ArrowUp } from "lucide-react";
import { Marquee } from "./Marquee";
import { scrollToSection } from "@/lib/motion";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-20 text-paper">
      <Marquee
        className="display border-y border-border py-6 text-[12vw] leading-none md:text-[7vw]"
        items={["Designed around curiosity", "Built through experimentation"]}
      />
      <div className="grid gap-8 px-5 py-10 md:grid-cols-3 md:items-end md:px-8">
        <p className="ui-label">Mohammad Abdul Raqeeb © 2026</p>
        <p className="serif-accent text-2xl text-silver md:text-center">Designed around curiosity. Built through experimentation.</p>
        <button
          type="button"
          onClick={() => (document.getElementById("home") ? scrollToSection("home") : window.scrollTo({ top: 0, behavior: "smooth" }))}
          className="ui-label inline-flex items-center gap-2 justify-self-start hover:text-vermilion md:justify-self-end"
        >
          Back to top <ArrowUp className="h-4 w-4" />
        </button>
      </div>
      <p aria-hidden className="display pointer-events-none select-none px-2 text-center text-[21vw] leading-[0.78] text-vermilion">
        Raqeeb
      </p>
    </footer>
  );
}
