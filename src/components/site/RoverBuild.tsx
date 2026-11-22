import { roverBuild } from "@/content/portfolio";

/** Design-to-build gallery for the rover case study: the CAD cover that became the printed shell. */
export function RoverBuild() {
  return (
    <section className="border-t border-border bg-background px-5 py-24 text-ink md:px-8 md:py-32">
      <p className="ui-label text-primary" data-reveal>
        Design &amp; build
      </p>
      <h2 data-reveal className="display mt-4 mb-6 text-4xl md:text-5xl">
        Model to machine
      </h2>
      <p data-reveal className="max-w-2xl text-lg leading-relaxed opacity-80">
        {roverBuild.intro}
      </p>

      <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-10">
        {roverBuild.shots.map((s, i) => (
          <figure key={s.src} data-img-reveal>
            <div className="overflow-hidden border border-border bg-paper">
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="h-full w-full object-contain"
                style={{ aspectRatio: "16 / 10" }}
              />
            </div>
            <figcaption className="mt-4 flex flex-col gap-2">
              <span className="ui-label text-primary">
                {String(i + 1).padStart(2, "0")} — {s.label}
              </span>
              <span className="max-w-md text-sm leading-relaxed text-muted-foreground">{s.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
