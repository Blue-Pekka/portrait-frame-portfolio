type MarqueeProps = { items: string[]; className?: string; fast?: boolean; separator?: string };

export function Marquee({ items, className = "", fast = false, separator = "✳" }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
          {item}
          <span className="text-[0.5em]">{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`flex overflow-hidden ${className}`}>
      <div className={`flex w-max ${fast ? "animate-marquee-fast" : "animate-marquee"}`}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
