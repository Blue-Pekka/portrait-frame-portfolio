import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Marquee } from "./Marquee";
import { projects } from "@/content/portfolio";

const themeRing: Record<string, string> = {
  vermilion: "bg-vermilion",
  violet: "bg-violet",
  electric: "bg-electric",
};

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative bg-ink py-28 text-paper md:py-40">
      <div className="px-5 md:px-8">
        <SectionHeading
          index="03"
          label="Selected work"
          id="work-title"
          lines={[{ text: "Ideas into" }, { text: "reality.", className: "text-vermilion md:pl-[18vw]" }]}
        />
        <p data-reveal className="mt-10 max-w-xl font-ui text-lg text-muted-foreground md:ml-[18vw]">
          Three builds that move from circuit boards to computer vision to energy research — each one a question
          turned into a working answer.
        </p>
      </div>

      <div className="mt-24 space-y-28 md:space-y-40">
        {projects.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={p.slug} className="grid gap-8 px-5 md:grid-cols-12 md:gap-8 md:px-8">
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                data-cursor="View"
                aria-label={`View case study: ${p.title}`}
                className={`group relative block overflow-hidden md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}
              >
                <div data-img-reveal className={`relative aspect-[4/3] overflow-hidden ${themeRing[p.theme]}`}>
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    loading="lazy"
                    className="h-full w-full scale-105 object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100"
                  />
                  <span className="display absolute -bottom-[0.12em] right-3 text-[22vw] leading-none text-paper/90 mix-blend-difference md:text-[12vw]">
                    {p.index}
                  </span>
                </div>
              </Link>

              <div className={`flex flex-col justify-between md:col-span-5 ${flip ? "md:order-1 md:col-start-1 md:pr-10" : "md:pl-6"}`}>
                <div>
                  <p data-reveal className="ui-label text-vermilion">
                    Project {p.index} — {p.category}
                  </p>
                  <h3 data-reveal className="display mt-5 text-5xl md:text-[4.6vw]">
                    {p.title}
                  </h3>
                  {p.role && (
                    <p data-reveal className="serif-accent mt-4 text-2xl text-silver">
                      {p.role}
                    </p>
                  )}
                  <p data-reveal className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                    {p.description}
                  </p>
                </div>
                <div data-reveal className="mt-10">
                  <ul className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <li key={t} className="ui-label border border-border px-2.5 py-1.5 text-[0.62rem]">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/work/$slug"
                    params={{ slug: p.slug }}
                    className="ui-label group mt-8 inline-flex items-center gap-3 border-b border-paper pb-1 hover:text-vermilion hover:border-vermilion"
                  >
                    Read the case study
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <Marquee
        className="display mt-32 border-y border-border py-6 text-6xl text-paper/90 md:text-8xl"
        items={["ESP32", "OpenCV", "MediaPipe", "Python", "BLE", "TB6612FNG", "HC-SR04", "Energy systems", "Prototyping"]}
      />
    </section>
  );
}
