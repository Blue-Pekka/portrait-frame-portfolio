import type { ReactNode } from "react";

type Line = { text: ReactNode; className?: string };

type SectionHeadingProps = {
  index: string;
  label: string;
  lines: Line[];
  id?: string;
  className?: string;
  size?: "xl" | "lg";
};

/** Oversized section heading with masked line reveals and an index label. */
export function SectionHeading({ index, label, lines, id, className = "", size = "xl" }: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="ui-label mb-6 flex items-center gap-3" data-reveal>
        <span>{index}</span>
        <span className="h-px w-10 bg-current" />
        <span>{label}</span>
      </p>
      <h2
        id={id}
        data-reveal-lines
        className={`display ${size === "xl" ? "text-[15vw] md:text-[10.5vw]" : "text-[13vw] md:text-[7.5vw]"}`}
      >
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.04em]">
            <span data-line className={`block ${line.className ?? ""}`}>
              {line.text}
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}
