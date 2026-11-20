import { SectionHeading } from "./SectionHeading";
import { academicStats, interests, person, timeline } from "@/content/portfolio";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="grain relative bg-paper px-5 py-28 text-ink md:px-8 md:py-40">
      <SectionHeading
        index="02"
        label="About"
        id="about-title"
        size="lg"
        lines={[
          { text: "Curious by nature." },
          {
            text: (
              <>
                An engineer by <span className="serif-accent text-vermilion">instinct.</span>
              </>
            ),
          },
        ]}
      />

      <div className="mt-20 grid gap-14 md:grid-cols-12 md:gap-8">
        {/* Duotone portrait */}
        <div className="md:col-span-5">
          <div data-img-reveal className="duotone aspect-[4/5] overflow-hidden">
            <img
              data-parallax="0.12"
              src={person.portrait}
              alt={`${person.name}, duotone portrait`}
              loading="lazy"
              className="h-[115%] w-full object-cover object-[50%_25%]"
            />
          </div>
          <div className="ui-label mt-3 flex justify-between">
            <span>{person.role}</span>
            <span>{person.location}</span>
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-6 md:col-start-7">
          <p data-reveal className="font-ui text-2xl leading-tight md:text-[2.1rem]">
            I don't just use technology — I take it apart, question it, and build it back up to solve something real.
          </p>
          <div className="mt-10 space-y-5 text-base leading-relaxed text-ink/80 md:text-lg">
            <p data-reveal>
              My path started in the classroom with mathematics and physics, and quickly spilled into independent
              experimentation: reading datasheets, wiring circuits, writing code and watching it move something in the
              real world.
            </p>
            <p data-reveal>
              I'm drawn to the space where hardware meets software — from an ESP32-powered robotic rover to a
              computer-vision system that steers it with hand gestures, and independent research into recovering
              energy from vehicle suspension.
            </p>
            <p data-reveal>
              Leading technical projects and exhibition teams has taught me that engineering is as much about people
              as parts. I'm especially curious about emerging technologies that make the world more accessible —
              technology that matters to people and communities.
            </p>
          </div>

          <ul data-reveal className="mt-10 flex flex-wrap gap-x-3 gap-y-2 font-ui text-sm uppercase tracking-wide">
            {interests.map((it, i) => (
              <li key={it} className="flex items-center gap-3">
                {it}
                {i < interests.length - 1 && <span className="text-vermilion">/</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Academic trajectory */}
      <div className="mt-28 md:mt-36">
        <p data-reveal className="ui-label mb-8">Academic trajectory</p>
        <ol className="relative grid gap-10 border-t border-ink pt-10 md:grid-cols-3 md:gap-8">
          {timeline.map((t, i) => (
            <li key={t.years} data-reveal data-delay={i * 0.08} className="relative">
              <span className="absolute -top-[2.85rem] left-0 h-3 w-3 rounded-full bg-vermilion ring-4 ring-paper" />
              <p className="ui-label text-ink/60">{t.years}</p>
              <p className="display mt-3 text-4xl md:text-5xl">{t.title}</p>
              <p className="mt-2 font-ui text-ink/70">{t.detail}</p>
            </li>
          ))}
        </ol>

        <dl className="mt-20 grid grid-cols-2 border-l border-t border-ink md:grid-cols-4">
          {academicStats.map((s) => (
            <div key={s.label} data-reveal className="group border-b border-r border-ink p-5 transition-colors duration-500 hover:bg-ink hover:text-paper md:p-8">
              <dt className="sr-only">{s.label}</dt>
              <dd className="display text-[18vw] leading-none md:text-[7vw]">
                {s.value}
                <span className="text-vermilion">{s.unit}</span>
              </dd>
              <dd className="ui-label mt-4 opacity-70">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
