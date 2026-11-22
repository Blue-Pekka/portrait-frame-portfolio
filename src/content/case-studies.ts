import type { ProjectSlug } from "./portfolio";

export type CaseSection = { kicker: string; heading: string; paragraphs: string[] };

export type CaseStudy = {
  status: string;
  facts: { label: string; value: string }[];
  sections: CaseSection[];
  note?: string;
};

export const caseStudies: Record<ProjectSlug, CaseStudy> = {
  "esp32-rover": {
    status: "Experimental prototype",
    facts: [
      { label: "Role", value: "Founder & Lead Engineer" },
      { label: "Focus", value: "Disaster inspection · Environmental mapping" },
      { label: "Platform", value: "ESP32 · Bluetooth control" },
      { label: "Power", value: "Dual 18650 Li-ion" },
    ],
    sections: [
      {
        kicker: "Why",
        heading: "Going where people shouldn't have to.",
        paragraphs: [
          "After a disaster, the first look inside a damaged structure is often the most dangerous one. The rover began as a question: could a small, low-cost robot take that first look instead — and map what it finds?",
        ],
      },
      {
        kicker: "How",
        heading: "One controller, many systems.",
        paragraphs: [
          "An ESP32 DevKit sits at the centre, reading the ultrasonic sensor, updating the OLED display and translating Bluetooth commands into motor signals for the TB6612FNG driver.",
          "Power flows from two 18650 cells through an LM2596 buck regulator, separating the higher-current motor supply from the stable voltage the logic needs.",
        ],
      },
      {
        kicker: "Decisions",
        heading: "Engineering trade-offs.",
        paragraphs: [
          "A switching regulator instead of a linear one keeps more battery energy for driving rather than losing it as heat; the TB6612FNG suits the current a small rover draws; an HC-SR04 gives simple, robust distance measurements as a first step toward obstacle awareness.",
          "Development moved through clear stages — defining the mission, prototyping subsystems individually, integrating them on one chassis, then testing and iterating on wiring, power and control behaviour.",
        ],
      },
    ],
  },
  "gesture-controller": {
    status: "Working system",
    facts: [
      { label: "Language", value: "Python" },
      { label: "Vision", value: "OpenCV · MediaPipe" },
      { label: "Link", value: "Bluetooth Low Energy" },
      { label: "Target", value: "ESP32 rover" },
    ],
    sections: [
      {
        kicker: "Idea",
        heading: "A hand becomes a remote.",
        paragraphs: [
          "Instead of a joystick, the rover reads intent from the human hand. A camera watches, a model understands, and the robot responds — turning a natural gesture into motion.",
        ],
      },
      {
        kicker: "Vision",
        heading: "From pixels to landmarks.",
        paragraphs: [
          "OpenCV captures the camera stream; MediaPipe detects the hand and tracks its landmarks, including fingertip positions, frame by frame. Finger states are then classified into a small vocabulary of gestures, each mapped to a rover command.",
          "Raw per-frame predictions flicker, so temporal stability filtering only accepts a gesture once it has held steady across consecutive frames — the rover doesn't twitch on a misread.",
        ],
      },
      {
        kicker: "Link",
        heading: "Closing the loop over BLE.",
        paragraphs: [
          "Stable commands travel over Bluetooth Low Energy to the ESP32, which drives the motors — connecting artificial intelligence on the laptop to physical motion on the ground.",
        ],
      },
    ],
  },
  "suspension-energy": {
    status: "Independent theoretical research",
    facts: [
      { label: "Type", value: "Theoretical study" },
      { label: "Field", value: "Energy systems · Vehicle dynamics" },
      { label: "Validation", value: "Not physically tested" },
      { label: "Published", value: "Zenodo · Oct 2026" },
    ],
    note: "This is a theoretical exploration. It does not claim experimental results or physical validation of any model.",
    sections: [
      {
        kicker: "01 — Motivation",
        heading: "Energy we throw away on every bump.",
        paragraphs: [
          "Conventional shock absorbers convert the kinetic energy of suspension motion into heat. That energy is simply dissipated. The research asks whether part of it could, in principle, be captured and reused instead.",
        ],
      },
      {
        kicker: "02 — Framework",
        heading: "Suspension as an energy converter.",
        paragraphs: [
          "The study frames the suspension as a spring–damper system excited by the road surface. The power dissipated by the damper relates to the damping force and the relative velocity between wheel and body — the quantity a regenerative system would try to harvest.",
        ],
      },
      {
        kicker: "03 — Method & concepts",
        heading: "Reasoning from first principles.",
        paragraphs: [
          "The approach is analytical and literature-based: reviewing suspension dynamics and comparing families of energy-recovery mechanisms — electromagnetic linear generators, rotary generators driven through ball-screw or rack mechanisms, and hydraulic routes through a generator.",
          "Each must balance energy capture against what a suspension exists for in the first place: ride comfort, road holding and safety.",
        ],
      },
      {
        kicker: "04 — Findings & limitations",
        heading: "Promising, with honest caveats.",
        paragraphs: [
          "Suspension motion is a genuine source of recoverable energy, with outcomes strongly dependent on road conditions, vehicle type and mechanism design. Conclusions here are qualitative and theoretical: real efficiency, durability, cost and handling effects would need modelling with real data and physical prototyping to confirm.",
        ],
      },
    ],
  },
};
