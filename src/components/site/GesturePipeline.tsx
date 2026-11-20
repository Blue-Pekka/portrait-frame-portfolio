import { useEffect, useState } from "react";
import { gesturePipeline } from "@/content/portfolio";
import { prefersReducedMotion } from "@/lib/motion";

export function GesturePipeline() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % gesturePipeline.length), 1700);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <ol
      className="grid border-l border-t border-paper/25 md:grid-cols-6"
      onMouseLeave={() => setPaused(false)}
      aria-label="Gesture control pipeline"
    >
      {gesturePipeline.map((s, i) => {
        const on = i === active;
        const done = i < active;
        return (
          <li key={s.step} className="border-b border-r border-paper/25">
            <button
              type="button"
              onMouseEnter={() => {
                setPaused(true);
                setActive(i);
              }}
              onFocus={() => {
                setPaused(true);
                setActive(i);
              }}
              aria-current={on ? "step" : undefined}
              className={`flex h-full w-full flex-col justify-between gap-10 p-5 text-left transition-colors duration-500 md:min-h-72 ${on ? "bg-vermilion text-ink" : done ? "bg-paper/10" : "bg-transparent"}`}
            >
              <span className="ui-label flex w-full justify-between">
                <span>0{i + 1}</span>
                <span aria-hidden>{i < gesturePipeline.length - 1 ? "→" : "●"}</span>
              </span>
              <span>
                <span className="display block text-3xl leading-[0.95] md:text-[2rem]">{s.step}</span>
                <span className={`mt-3 block font-ui text-sm ${on ? "text-ink/80" : "text-paper/65"}`}>{s.detail}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
