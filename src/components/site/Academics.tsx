import { Award } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { academicHonours, timeline } from "@/content/portfolio";

export function Academics() {
  return (
    <section id="academics" aria-labelledby="academics-title" className="border-t border-border bg-secondary px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" label="Academics" title="Academic record" id="academics-title" />

        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-10">
          <ol className="border-t border-border md:col-span-7">
            {timeline.map((t) => (
              <li key={t.years} data-reveal className="grid gap-1 border-b border-border py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <p className="ui-label pt-1 text-muted-foreground">{t.years}</p>
                <div>
                  <p className="display text-2xl md:text-3xl">{t.title}</p>
                  <p className="mt-1 text-muted-foreground">{t.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <div data-reveal className="rounded-md border border-border bg-card p-6 md:col-span-5 md:p-8">
            <p className="ui-label text-primary">Honours</p>
            <ul className="mt-5 space-y-4">
              {academicHonours.map((h) => (
                <li key={h} className="flex gap-3 text-lg leading-snug">
                  <Award className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
