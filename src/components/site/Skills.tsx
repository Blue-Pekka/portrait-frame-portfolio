import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { Marquee } from "./Marquee";
import { skillGroups } from "@/content/portfolio";

export function Skills() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active] ?? skillGroups[0]!;

  return (
    <section aria-labelledby="skills-title" className="relative bg-ink py-28 text-paper md:py-40">
      <div className="px-5 md:px-8">
        <SectionHeading
          index="07"
          label="Skills & expertise"
          id="skills-title"
          lines={[{ text: "Tools of" }, { text: "the trade.", className: "text-vermilion" }]}
        />

        <div data-reveal className="grid-lines mt-20 border border-border md:grid md:grid-cols-12">
          {/* Category selector */}
          <div role="tablist" aria-label="Skill categories" className="flex overflow-x-auto border-b border-border md:col-span-4 md:flex-col md:border-b-0 md:border-r">
            {skillGroups.map((g, i) => {
              const selected = i === active;
              return (
                <button
                  key={g.code}
                  type="button"
                  role="tab"
                  id={`skill-tab-${g.code}`}
                  aria-selected={selected}
                  aria-controls="skill-panel"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex shrink-0 items-center gap-4 border-r border-border bg-ink px-5 py-5 text-left transition-colors md:border-b md:border-r-0 md:px-6 md:py-6 ${selected ? "bg-vermilion text-ink" : "hover:bg-charcoal"}`}
                >
                  <span className="ui-label w-8">{g.code}</span>
                  <span className="font-ui text-base font-medium whitespace-nowrap md:text-lg">{g.title}</span>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            id="skill-panel"
            role="tabpanel"
            aria-labelledby={`skill-tab-${group.code}`}
            className="relative min-h-[26rem] bg-ink/70 p-6 md:col-span-8 md:p-10"
          >
            <div className="ui-label flex justify-between text-muted-foreground">
              <span>/sys/skills/{group.code.toLowerCase()}</span>
              <span>{String(group.items.length).padStart(2, "0")} entries</span>
            </div>
            <ul key={group.code} className="mt-10 space-y-1">
              {group.items.map((item, i) => (
                <li
                  key={item}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className="animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-500 group flex items-baseline gap-4"
                >
                  <span className="ui-label w-8 text-vermilion">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-4xl transition-colors group-hover:text-vermilion md:text-6xl">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="ui-label mt-4 text-muted-foreground">No percentages, no ratings — just what I've actually used and built with.</p>
      </div>

      <Marquee
        fast
        separator="/"
        className="serif-accent mt-24 text-5xl text-silver md:text-7xl"
        items={skillGroups.flatMap((g) => g.items)}
      />
    </section>
  );
}
