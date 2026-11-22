import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects, researchPaper, roverComponents, type Project } from "@/content/portfolio";
import { caseStudies } from "@/content/case-studies";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { RoverDiagram } from "@/components/site/RoverDiagram";
import { RoverBuild } from "@/components/site/RoverBuild";
import { GesturePipeline } from "@/components/site/GesturePipeline";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { slug: project.slug };
  },
  head: ({ loaderData }) => {
    const project = projects.find((p) => p.slug === loaderData?.slug);
    if (!project) return { meta: [{ title: "Project not found — Mohammad Abdul Raqeeb" }, { name: "robots", content: "noindex" }] };
    const title = `${project.title} — Mohammad Abdul Raqeeb`;
    return {
      meta: [
        { title },
        { name: "description", content: project.description },
        { property: "og:title", content: title },
        { property: "og:description", content: project.tagline },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectPage,
});

const themes: Record<Project["theme"], { hero: string; accent: string; body: string }> = {
  vermilion: { hero: "bg-secondary text-foreground", accent: "text-primary", body: "bg-background text-foreground" },
  violet: { hero: "bg-secondary text-foreground", accent: "text-primary", body: "bg-background text-foreground" },
  electric: { hero: "bg-secondary text-foreground", accent: "text-primary", body: "bg-background text-foreground" },
};

function ProjectPage() {
  const { slug } = Route.useLoaderData();
  const project = projects.find((p) => p.slug === slug)!;
  const study = caseStudies[project.slug];
  const theme = themes[project.theme];
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length]!;
  const mainRef = useRef<HTMLElement>(null);
  useReveal(mainRef, [slug]);

  return (
    <>
      <Nav variant="page" />
      <main id="main" ref={mainRef} key={slug}>
        {/* Hero */}
        <section className={`grain relative overflow-hidden px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40 ${theme.hero}`}>
          <Link to="/" hash="activities" className="ui-label inline-flex items-center gap-2 hover:opacity-70">
            <ArrowLeft className="h-4 w-4" /> Back to portfolio
          </Link>
          <div className="mt-12 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p data-reveal className="ui-label">
                Project {project.index} — {project.category}
              </p>
              <h1 data-reveal-lines className="display mt-6 text-5xl md:text-7xl">
                {project.title.split(" ").reduce<string[][]>((acc, w, i) => {
                  if (i % 2 === 0) acc.push([w]);
                  else acc[acc.length - 1]!.push(w);
                  return acc;
                }, []).map((pair, i) => (
                  <span key={i} className="block overflow-hidden pb-[0.04em]">
                    <span data-line className="block">{pair.join(" ")}</span>
                  </span>
                ))}
              </h1>
              <p data-reveal className="serif-accent mt-6 max-w-xl text-2xl leading-tight text-muted-foreground md:text-3xl">
                {project.tagline}
              </p>
              {project.slug === "suspension-energy" && (
                <a
                  href={researchPaper.href}
                  target="_blank"
                  rel="noreferrer"
                  data-reveal
                  className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-ui text-sm text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Read the full paper <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              )}
            </div>
            <div className="md:col-span-5">
              <div
                data-img-reveal
                className="overflow-hidden"
                style={{ aspectRatio: project.heroImage?.aspect ?? "4 / 5" }}
              >
                <img
                  src={project.heroImage?.src ?? project.image}
                  alt={project.heroImage?.alt ?? project.imageAlt}
                  className="h-full w-full object-cover"
                  data-parallax="0.1"
                />
              </div>
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 border-t border-current md:grid-cols-5">
            <div className="border-b border-current py-5 pr-4 md:border-b-0">
              <dt className="ui-label opacity-70">Status</dt>
              <dd className="mt-2 font-ui text-lg">{study.status}</dd>
            </div>
            {study.facts.map((f) => (
              <div key={f.label} className="border-b border-current py-5 pr-4 md:border-b-0">
                <dt className="ui-label opacity-70">{f.label}</dt>
                <dd className="mt-2 font-ui text-lg">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Overview */}
        <section className={`px-5 py-24 md:px-8 md:py-32 ${theme.body}`}>
          <div className="grid gap-10 md:grid-cols-12">
            <p className="ui-label md:col-span-3" data-reveal>Overview</p>
            <p data-reveal className="font-ui text-xl leading-snug md:col-span-8 md:text-2xl">
              {project.description}
            </p>
          </div>
          {study.note && (
            <p data-reveal className="ui-label mt-12 border-l-4 border-electric pl-4 md:ml-[25%]">
              {study.note}
            </p>
          )}
        </section>

        {/* Design & build (rover) */}
        {project.slug === "esp32-rover" && <RoverBuild />}

        {/* Interactive module */}
        {project.slug === "esp32-rover" && (
          <section className="border-t border-border bg-secondary px-5 py-24 md:px-8 md:py-32">
            <p className="ui-label" data-reveal>Hardware architecture</p>
            <h2 data-reveal className="display mt-4 mb-12 text-4xl md:text-5xl">System map</h2>
            <RoverDiagram />
          </section>
        )}
        {project.slug === "gesture-controller" && (
          <section className="bg-ink px-5 py-24 text-paper md:px-8 md:py-32">
            <p className="ui-label text-primary-foreground/70" data-reveal>Visual pipeline</p>
            <h2 data-reveal className="display mt-4 mb-12 text-4xl md:text-5xl">Hand → robot</h2>
            <GesturePipeline />
          </section>
        )}

        {/* Narrative sections */}
        <section className={`px-5 py-24 md:px-8 md:py-32 ${theme.body}`}>
          <div className="space-y-24 md:space-y-32">
            {study.sections.map((s) => (
              <article key={s.heading} className="grid gap-6 md:grid-cols-12">
                <p data-reveal className={`ui-label md:col-span-3 ${theme.accent}`}>
                  {s.kicker}
                </p>
                <div className="md:col-span-8">
                  <h2 data-reveal className="display text-3xl md:text-5xl">{s.heading}</h2>
                  <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed opacity-85">
                    {s.paragraphs.map((p) => (
                      <p key={p} data-reveal>{p}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Component breakdown (rover) */}
        {project.slug === "esp32-rover" && (
          <section className="border-t border-border bg-secondary px-5 py-24 md:px-8 md:py-32">
            <p className="ui-label text-primary" data-reveal>Bill of materials</p>
            <h2 data-reveal className="display mt-4 mb-12 text-4xl md:text-5xl">Component breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] border-t border-border text-left">
                <thead>
                  <tr className="ui-label text-muted-foreground">
                    <th className="py-4 pr-4 font-medium">#</th>
                    <th className="py-4 pr-4 font-medium">Component</th>
                    <th className="py-4 pr-4 font-medium">Role</th>
                    <th className="py-4 font-medium">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {roverComponents.map((c, i) => (
                    <tr key={c.id} className="group border-t border-border transition-colors hover:bg-card">
                      <td className="ui-label py-5 pr-4">{String(i + 1).padStart(2, "0")}</td>
                      <td className="display py-5 pr-4 text-2xl md:text-3xl">{c.name}</td>
                      <td className="py-5 pr-4 font-ui">{c.role}</td>
                      <td className="py-5 text-sm opacity-80 md:text-base">{c.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Tech */}
        <section className="border-t border-border px-5 py-16 md:px-8">
          <p className="ui-label text-muted-foreground">Technology</p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {project.tech.map((t) => (
              <li key={t} className="display text-2xl md:text-3xl">
                {t}
                <span className="text-primary"> /</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Next */}
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
         
          className="group block border-t border-border bg-secondary px-5 py-16 md:px-8 md:py-20"
        >
          <p className="ui-label">Next project — {next.index}</p>
          <p className="display mt-4 flex items-end justify-between gap-6 text-4xl md:text-6xl">
            {next.title}
            <ArrowUpRight className="h-10 w-10 shrink-0 text-primary transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </p>
        </Link>
      </main>
      <Footer />
    </>
  );
}
