import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { researchInterests, initiatives } from "@/content/portfolio";
import liquidChrome from "@/assets/liquid-chrome.webp";

const paperSections = ["Research motivation", "Theoretical framework", "Methodology", "Engineering concepts", "Findings & limitations"];

export function Research() {
  return (
    <section id="research" aria-labelledby="research-title" className="relative overflow-hidden bg-ink py-28 text-paper md:py-40">
      <div className="absolute inset-0 -z-0 opacity-45" aria-hidden>
        <img data-parallax="0.25" src={liquidChrome} alt="" loading="lazy" className="h-[130%] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink" />
      </div>

      <div className="relative z-10 px-5 md:px-8">
        <SectionHeading
          index="04"
          label="Research & exploration"
          id="research-title"
          size="lg"
          lines={[
            { text: "Questions that" },
            {
              text: (
                <>
                  lead to <span className="serif-accent text-silver">discovery.</span>
                </>
              ),
            },
          ]}
        />

        <div className="mt-24 grid gap-16 md:grid-cols-12 md:gap-8">
          {/* Document preview */}
          <div className="md:col-span-5">
            <Link
              to="/work/$slug"
              params={{ slug: "suspension-energy" }}
              data-cursor="Read"
              data-reveal
              className="group block -rotate-2 bg-paper p-7 text-ink shadow-paper transition-transform duration-700 hover:rotate-0 md:p-10"
            >
              <div className="ui-label flex justify-between border-b border-ink pb-3 text-[0.62rem]">
                <span>Independent research</span>
                <span>Working paper · Theoretical</span>
              </div>
              <p className="serif-accent mt-8 text-[2.4rem] leading-[1.02] md:text-5xl">
                Energy recovery in vehicle suspension systems
              </p>
              <p className="mt-4 font-ui text-sm text-ink/60">Mohammad Abdul Raqeeb — Hyderabad, India</p>
              <div className="mt-8 columns-1 text-sm leading-relaxed text-ink/80">
                <p className="first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:leading-none first-letter:text-vermilion">
                  Every bump a vehicle absorbs is mechanical energy turned into heat by its dampers. This study explores,
                  in theory, how part of that energy might be recovered — and what limits such a system.
                </p>
              </div>
              <ol className="mt-8 space-y-1.5 border-t border-ink/20 pt-5 font-ui text-sm">
                {paperSections.map((s, i) => (
                  <li key={s} className="flex justify-between">
                    <span>
                      {i + 1}. {s}
                    </span>
                    <span className="text-ink/30">— — —</span>
                  </li>
                ))}
              </ol>
              <span className="ui-label mt-8 inline-flex items-center gap-2 text-vermilion">
                Open research summary <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <p className="ui-label mt-6 text-muted-foreground">Publication link — to be added when available.</p>
          </div>

          {/* Index of interests */}
          <div className="md:col-span-6 md:col-start-7">
            <p data-reveal className="ui-label mb-6 text-silver">Index of inquiry</p>
            <ul className="border-t border-border">
              {researchInterests.map((r) => (
                <li key={r.no} data-reveal className="group border-b border-border">
                  <div className="grid grid-cols-[4.5rem_1fr] gap-4 py-7 md:grid-cols-[6rem_1fr]">
                    <span className="ui-label pt-2 text-vermilion">{r.no}</span>
                    <div>
                      <h3 className="display text-3xl transition-colors group-hover:text-vermilion md:text-5xl">{r.title}</h3>
                      <p className="mt-2 max-w-md text-muted-foreground">{r.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Initiatives folded in — early-stage directions, not finished products */}
        <div className="mt-24">
          <p data-reveal className="ui-label mb-6 text-silver">
            Initiatives in development
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {initiatives.map((it) => (
              <article key={it.id} data-reveal className="flex gap-5 border border-border bg-charcoal/60 p-5">
                <div className="h-24 w-24 shrink-0 overflow-hidden md:h-28 md:w-28">
                  <img src={it.image} alt={it.imageAlt} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="display text-3xl md:text-4xl">{it.name}</h3>
                    <span className="ui-label border border-paper/40 px-2 py-1 text-[0.58rem]">Concept · In development</span>
                  </div>
                  <p className="ui-label mt-1 text-vermilion-glow">{it.category}</p>
                  <p className="mt-3 text-sm leading-relaxed text-paper/75">{it.concept}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
