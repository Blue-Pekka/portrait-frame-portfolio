import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { activityGroups, projects, researchPaper } from "@/content/portfolio";

const builds = projects.filter((p) => p.slug !== "suspension-energy");

export function Activities() {
  return (
    <section id="activities" aria-labelledby="activities-title" className="border-t border-border px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02" label="Extracurriculars" title="Research, projects & activities" id="activities-title" />

        {/* Research paper */}
        <article data-reveal className="mt-12 rounded-md border border-border bg-card p-6 md:p-10">
          <p className="ui-label text-primary">Research paper · {researchPaper.venue}</p>
          <h3 className="display mt-4 max-w-3xl text-3xl md:text-4xl">{researchPaper.title}</h3>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{researchPaper.summary}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            <a
              href={researchPaper.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-ui text-sm text-primary-foreground transition-opacity hover:opacity-90"
            >
              Read the paper <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <Link
              to="/work/$slug"
              params={{ slug: "suspension-energy" }}
              className="inline-flex items-center gap-2 py-2.5 font-ui text-sm underline-offset-4 hover:text-primary hover:underline"
            >
              Short summary
            </Link>
          </div>
        </article>

        {/* Projects */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {builds.map((p) => (
            <Link
              key={p.slug}
              to="/work/$slug"
              params={{ slug: p.slug }}
              data-reveal
              className="group flex flex-col rounded-md border border-border bg-card p-6 transition-colors hover:border-primary md:p-8"
            >
              <p className="ui-label text-muted-foreground">Project{p.role ? ` · ${p.role}` : ""}</p>
              <h3 className="display mt-3 text-2xl md:text-3xl">{p.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{p.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-ui text-sm text-primary">
                See the project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>

        {/* Activities */}
        <div className="mt-16 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {activityGroups.map((g) => (
            <div key={g.title} data-reveal className="border-t border-border pt-5">
              <h3 className="ui-label text-primary">{g.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
