type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  id?: string;
  intro?: string;
};

/** Quiet section heading: small numbered label, serif title, optional one-line intro. */
export function SectionHeading({ index, label, title, id, intro }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="ui-label flex items-center gap-3 text-primary" data-reveal>
        <span>{index}</span>
        <span className="h-px w-8 bg-current" />
        <span>{label}</span>
      </p>
      <h2 id={id} data-reveal className="display mt-4 text-4xl md:text-6xl">
        {title}
      </h2>
      {intro && (
        <p data-reveal className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {intro}
        </p>
      )}
    </div>
  );
}
