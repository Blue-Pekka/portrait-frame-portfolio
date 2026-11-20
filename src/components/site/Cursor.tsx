import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: a small dot plus a lagging ring. Elements with data-cursor="Label"
 * expand the ring and show the label. Only on fine pointers.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest("a, button, input, textarea, select, [role='button']");
      setLabel(labelled?.dataset["cursor"] ?? null);
      setHovering(Boolean(interactive) && !labelled);
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  const size = label ? 112 : hovering ? 56 : 34;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-paper mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{ width: size, height: size }}
        className={`pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-paper mix-blend-difference transition-[width,height,background-color] duration-300 ease-out ${label ? "bg-paper" : ""}`}
      >
        {label && <span className="ui-label text-[0.6rem] text-ink">{label}</span>}
      </div>
    </>
  );
}
