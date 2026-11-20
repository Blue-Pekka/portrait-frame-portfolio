import { SectionHeading } from "./SectionHeading";
import { achievementGroups, achievementStats } from "@/content/portfolio";

export function Achievements() {
  return (
    <section aria-labelledby="achievements-title" className="grain bg-hero relative overflow-hidden px-5 py-28 text-ink md:px-8 md:py-40">
      <SectionHeading
        index="06"
        label="Achievements & leadership"
        id="achievements-title"
        lines={[{ text: "Beyond" }, { text: "the build.", className: "text-outline-ink md:pl-[22vw]" }]}
      />

      <dl className="mt-20 grid grid-cols-2 gap-px bg-ink/80 md:grid-cols-4">
        {achievementStats.map((s, i) => (
          <div key={s.label} data-reveal data-delay={i * 0.06} className="bg-vermilion p-5 md:p-8">
            <dt className="sr-only">{s.label}</dt>
            <dd className="display text-[20vw] leading-[0.85] md:text-[8vw]">{s.value}</dd>
            <dd className="ui-label mt-4 max-w-[18ch]">{s.label}</dd>
          </div>
        ))}
      </dl>

      <div className="relative mt-28 md:mt-36">
        <span className="absolute left-[0.4rem] top-0 h-full w-px bg-ink/25 md:left-[calc(33.333%-1px)]" aria-hidden />
        <span data-draw className="absolute left-[0.4rem] top-0 h-full w-px origin-top bg-ink md:left-[calc(33.333%-1px)]" aria-hidden />
        <ol className="space-y-16 md:space-y-24">
          {achievementGroups.map((g, i) => (
            <li key={g.title} className="relative grid gap-4 pl-10 md:grid-cols-3 md:gap-0 md:pl-0">
              <span className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-ink bg-vermilion md:left-[calc(33.333%-0.45rem)]" aria-hidden />
              <div data-reveal className="md:pr-12 md:text-right">
                <p className="ui-label">0{i + 1}</p>
                <h3 className="display mt-2 text-4xl md:text-5xl">{g.title}</h3>
              </div>
              <ul data-reveal className="space-y-3 md:col-span-2 md:pl-14">
                {g.items.map((item) => (
                  <li key={item} className="border-b border-ink/25 pb-3 font-ui text-lg md:text-2xl">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
