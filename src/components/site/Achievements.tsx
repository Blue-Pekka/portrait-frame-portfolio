import { SectionHeading } from "./SectionHeading";
import { achievementGroups, achievementStats, skillGroups } from "@/content/portfolio";

/** Recognition and skills on one screen — the short version for an admissions read. */
export function Achievements() {
  return (
    <section aria-labelledby="achievements-title" className="grain bg-hero relative overflow-hidden px-5 py-28 text-ink md:px-8 md:py-40">
      <SectionHeading
        index="05"
        label="Achievements & skills"
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

      {/* Recognition */}
      <div className="mt-24 grid gap-x-10 gap-y-12 md:grid-cols-2">
        {achievementGroups.map((g, i) => (
          <div key={g.title} data-reveal data-delay={i * 0.06} className="border-t-2 border-ink pt-5">
            <p className="ui-label">
              0{i + 1} — {g.title}
            </p>
            <ul className="mt-4 space-y-2">
              {g.items.map((item) => (
                <li key={item} className="font-ui text-lg leading-snug md:text-xl">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Skills, all at once */}
      <div className="mt-24">
        <p data-reveal className="ui-label mb-6">
          Skills &amp; tools
        </p>
        <div className="grid gap-px bg-ink/25 md:grid-cols-2">
          {skillGroups.map((g, i) => (
            <div
              key={g.code}
              data-reveal
              className={`bg-hero p-5 md:p-6 ${i === skillGroups.length - 1 && skillGroups.length % 2 === 1 ? "md:col-span-2" : ""}`}
            >
              <p className="ui-label text-ink/60">
                {g.code} — {g.title}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-ui text-base">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="ui-label mt-4 text-ink/60">No percentages, no ratings — only what I've actually used and built with.</p>
      </div>
    </section>
  );
}
