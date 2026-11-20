import { SectionHeading } from "./SectionHeading";
import { initiatives } from "@/content/portfolio";

export function Initiatives() {
  return (
    <section
      id="initiatives"
      aria-labelledby="initiatives-title"
      className="grain bg-violet-field relative overflow-hidden px-5 py-28 text-paper md:px-8 md:py-40"
    >
      <div className="halftone pointer-events-none absolute -right-20 top-10 h-[60vh] w-[60vh] rounded-full text-electric/40" aria-hidden />

      <SectionHeading
        index="04"
        label="Initiatives"
        id="initiatives-title"
        lines={[
          { text: "Technology" },
          {
            text: (
              <>
                with a <span className="serif-accent text-vermilion-glow">purpose.</span>
              </>
            ),
          },
        ]}
      />

      <p data-reveal className="mt-10 max-w-2xl font-ui text-lg text-paper/75">
        Two emerging initiatives in accessibility. Both are early-stage — shared here as directions I'm actively
        exploring, not finished products.
      </p>

      <div className="mt-24 grid gap-6 md:grid-cols-2">
        {initiatives.map((it, i) => (
          <article
            key={it.id}
            className={`group relative flex flex-col overflow-hidden border border-paper/20 bg-violet-deep/50 backdrop-blur-sm ${i === 1 ? "md:mt-32" : ""}`}
          >
            <div data-img-reveal className="relative aspect-square overflow-hidden">
              <img
                src={it.image}
                alt={it.imageAlt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <span className="serif-accent absolute left-5 top-3 text-7xl text-paper mix-blend-difference">{it.index}</span>
              <span className="ui-label absolute right-4 top-4 border border-paper/60 bg-ink/40 px-2.5 py-1.5 text-[0.62rem] backdrop-blur">
                Concept · In development
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-10">
              <p className="ui-label text-vermilion-glow">{it.category}</p>
              <h3 className="display mt-4 text-6xl md:text-7xl">{it.name}</h3>
              <p className="mt-6 text-base leading-relaxed text-paper/80 md:text-lg">{it.concept}</p>
              <ul className="mt-8 grid grid-cols-2 gap-px border border-paper/15 bg-paper/15">
                {it.pillars.map((pl) => (
                  <li key={pl} className="bg-violet-deep px-4 py-3 font-ui text-sm">
                    {pl}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
