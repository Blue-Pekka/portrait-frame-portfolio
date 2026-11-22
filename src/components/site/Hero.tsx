import { academicStats, person } from "@/content/portfolio";
import { LinkButtons } from "./LinkButtons";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <p data-reveal className="ui-label text-muted-foreground">
            {person.role} · {person.location}
          </p>
          <h1 id="hero-title" data-reveal className="display mt-5 text-5xl md:text-7xl">
            {person.name}
          </h1>
          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
            {person.intro}
          </p>
          <div data-reveal>
            <LinkButtons className="mt-8" />
          </div>
        </div>

        <figure data-reveal className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden rounded-md bg-ink">
            <img
              src={person.portrait}
              alt={`Portrait of ${person.name}`}
              className="h-full w-full object-cover object-[50%_30%]"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </figure>
      </div>

      <dl className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-4">
        {academicStats.map((s) => (
          <div key={s.label} className="bg-card p-5 md:p-6">
            <dt className="sr-only">{s.label}</dt>
            <dd className="display text-4xl text-primary md:text-5xl">{s.value}</dd>
            <dd className="mt-2 text-sm text-muted-foreground">{s.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
