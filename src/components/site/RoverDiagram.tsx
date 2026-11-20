import { useState } from "react";
import { roverComponents } from "@/content/portfolio";

type NodeId = "battery" | "lm2596" | "bt" | "hcsr04" | "esp32" | "oled" | "tb6612" | "motors";

const nodes: { id: NodeId; label: string; sub: string; x: number; y: number }[] = [
  { id: "battery", label: "2× 18650", sub: "Energy", x: 50, y: 50 },
  { id: "lm2596", label: "LM2596", sub: "Regulation", x: 150, y: 50 },
  { id: "bt", label: "Bluetooth", sub: "Link", x: 250, y: 50 },
  { id: "hcsr04", label: "HC-SR04", sub: "Perception", x: 50, y: 150 },
  { id: "esp32", label: "ESP32", sub: "Brain", x: 150, y: 150 },
  { id: "oled", label: "SH1106", sub: "Telemetry", x: 250, y: 150 },
  { id: "tb6612", label: "TB6612FNG", sub: "Motor driver", x: 150, y: 250 },
  { id: "motors", label: "DC Motors", sub: "Motion", x: 250, y: 250 },
];

const links: { from: NodeId; to: NodeId; kind: "power" | "signal"; d: string }[] = [
  { from: "battery", to: "lm2596", kind: "power", d: "M50 50 H150" },
  { from: "lm2596", to: "esp32", kind: "power", d: "M150 50 V150" },
  { from: "battery", to: "tb6612", kind: "power", d: "M50 50 V250 H150" },
  { from: "bt", to: "esp32", kind: "signal", d: "M250 50 L150 150" },
  { from: "hcsr04", to: "esp32", kind: "signal", d: "M50 150 H150" },
  { from: "esp32", to: "oled", kind: "signal", d: "M150 150 H250" },
  { from: "esp32", to: "tb6612", kind: "signal", d: "M150 150 V250" },
  { from: "tb6612", to: "motors", kind: "power", d: "M150 250 H250" },
];

const notes: Record<NodeId, string> = {
  ...Object.fromEntries(roverComponents.map((c) => [c.id, c.note])),
  motors: "Driven bidirectionally by the TB6612FNG to move and steer the rover.",
} as Record<NodeId, string>;

export function RoverDiagram() {
  const [active, setActive] = useState<NodeId>("esp32");
  const activeNode = nodes.find((n) => n.id === active)!;

  return (
    <div className="grid gap-8 md:grid-cols-12">
      <div className="relative aspect-square border border-ink/30 md:col-span-7">
        <div className="halftone absolute inset-0 text-ink/10" aria-hidden />
        <svg viewBox="0 0 300 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          {links.map((l) => {
            const on = l.from === active || l.to === active;
            return (
              <path
                key={l.d}
                d={l.d}
                fill="none"
                vectorEffect="non-scaling-stroke"
                strokeWidth={on ? 3 : 1.5}
                strokeDasharray={l.kind === "power" ? "0" : "6 6"}
                className={`transition-all duration-300 ${on ? "stroke-ink" : "stroke-ink/30"}`}
              />
            );
          })}
        </svg>
        {nodes.map((n) => {
          const on = n.id === active;
          return (
            <button
              key={n.id}
              type="button"
              onMouseEnter={() => setActive(n.id)}
              onFocus={() => setActive(n.id)}
              onClick={() => setActive(n.id)}
              aria-pressed={on}
              style={{ left: `${(n.x / 300) * 100}%`, top: `${(n.y / 300) * 100}%` }}
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center border-2 border-ink px-2 py-2 text-center transition-colors duration-300 md:px-4 md:py-3 ${on ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-ink hover:text-paper"} ${n.id === "esp32" ? "md:px-7 md:py-5" : ""}`}
            >
              <span className={`display leading-none ${n.id === "esp32" ? "text-2xl md:text-4xl" : "text-base md:text-2xl"}`}>{n.label}</span>
              <span className="ui-label mt-1 hidden text-[0.55rem] md:block">{n.sub}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col justify-between md:col-span-5">
        <div aria-live="polite">
          <p className="ui-label">Selected component</p>
          <p className="display mt-4 text-6xl md:text-7xl">{activeNode.label}</p>
          <p className="serif-accent mt-2 text-2xl">{activeNode.sub}</p>
          <p className="mt-6 max-w-md font-ui text-lg leading-snug">{notes[active]}</p>
        </div>
        <div className="ui-label mt-10 flex gap-6">
          <span className="flex items-center gap-2"><span className="h-0.5 w-8 bg-ink" /> Power</span>
          <span className="flex items-center gap-2"><span className="h-0 w-8 border-t-2 border-dashed border-ink" /> Signal</span>
        </div>
      </div>
    </div>
  );
}
