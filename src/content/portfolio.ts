import roverArt from "@/assets/rover-art.webp";
import gestureArt from "@/assets/gesture-art.webp";
import suspensionArt from "@/assets/suspension-art.webp";
import vistaArt from "@/assets/vista-art.webp";
import accessmapArt from "@/assets/accessmap-art.webp";
import portraitAsset from "@/assets/raqeeb-portrait.webp.asset.json";

export const person = {
  name: "Mohammad Abdul Raqeeb",
  shortName: "M.A. Raqeeb",
  location: "Hyderabad, India",
  status: "Hyderabad, India — Exploring what's next.",
  role: "Class XII · MPC · MS Junior College",
  intro:
    "An aspiring engineer and researcher exploring robotics, artificial intelligence, computer vision, and technology for meaningful impact.",
  portrait: portraitAsset.url,
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "initiatives", label: "Initiatives" },
  { id: "contact", label: "Contact" },
] as const;

/** Contact links stay null until the real URL is provided — never fabricate them. */
export const contactLinks: { label: string; href: string | null; display: string }[] = [
  { label: "Email", href: "mailto:a.raqeeb2468@gmail.com", display: "a.raqeeb2468@gmail.com" },
  { label: "GitHub", href: null, display: "Profile link coming soon" },
  { label: "Research", href: null, display: "Research profile coming soon" },
];

export const interests = [
  "Computer Science",
  "Artificial Intelligence",
  "Computer Vision",
  "Robotics & Autonomous Systems",
  "Embedded Systems",
  "Engineering Research",
  "Energy Systems",
];

export const timeline = [
  { years: "2018 — 2024", title: "Sultan Ul Uloom Public School", detail: "CBSE education" },
  { years: "2024 — 2025", title: "Class X, CBSE", detail: "Completed with 96%" },
  { years: "2025 — 2027", title: "MS Junior College", detail: "MPC · Telangana State Board" },
];

export const academicStats = [
  { value: "96", unit: "%", label: "CBSE Class X" },
  { value: "98", unit: "%", label: "Telangana State Board Class XI" },
  { value: "#1", unit: "", label: "School rank, Grades IX & X · ~180 students" },
  { value: "Au", unit: "", label: "Academic Excellence Gold Medals" },
];

export type ProjectSlug = "esp32-rover" | "gesture-controller" | "suspension-energy";

export type Project = {
  slug: ProjectSlug;
  index: string;
  title: string;
  shortTitle: string;
  category: string;
  role?: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  theme: "vermilion" | "violet" | "electric";
  tech: string[];
};

export const projects: Project[] = [
  {
    slug: "esp32-rover",
    index: "01",
    title: "ESP32 Autonomous Rover",
    shortTitle: "Rover",
    category: "Robotics / Embedded Systems / Autonomous Technology",
    role: "Founder & Lead Engineer",
    tagline: "A field robot for disaster inspection and environmental mapping.",
    description:
      "An experimental robotic rover developed for disaster inspection and environmental mapping. It combines embedded electronics, sensor integration, motor control, wireless communication and robotic movement into one platform.",
    image: roverArt,
    imageAlt: "Abstract orange chrome sculpture of a six-wheeled rover",
    theme: "vermilion",
    tech: ["ESP32 DevKit", "TB6612FNG", "HC-SR04", "SH1106 OLED", "LM2596", "2× 18650", "Bluetooth"],
  },
  {
    slug: "gesture-controller",
    index: "02",
    title: "Computer Vision Hand-Gesture Controller",
    shortTitle: "Gesture",
    category: "Artificial Intelligence / Computer Vision / Robotics",
    tagline: "Drive a robot with nothing but your hand.",
    description:
      "A computer-vision control system that lets a user steer the ESP32 rover through hand gestures — linking landmark tracking and gesture classification directly to robotic motion over Bluetooth Low Energy.",
    image: gestureArt,
    imageAlt: "Abstract fragmented robotic hand in red, blue and pink on purple",
    theme: "violet",
    tech: ["Python", "OpenCV", "MediaPipe", "Landmark detection", "Gesture classification", "BLE"],
  },
  {
    slug: "suspension-energy",
    index: "03",
    title: "Vehicle Suspension Energy Recovery",
    shortTitle: "Suspension",
    category: "Independent Research / Energy Systems",
    tagline: "Where does the energy of a bumpy road go — and can we get it back?",
    description:
      "An independent theoretical research project investigating energy recovery opportunities in vehicle suspension systems — exploring suspension dynamics, energy conversion and potential applications.",
    image: suspensionArt,
    imageAlt: "Silver coil spring dissolving into flowing electric blue energy",
    theme: "electric",
    tech: ["Suspension dynamics", "Energy conversion", "Theoretical modelling", "Literature review"],
  },
];

export const roverComponents = [
  { id: "esp32", name: "ESP32 DevKit", role: "Brain", note: "Dual-core microcontroller handling control logic, sensor reads and the Bluetooth link." },
  { id: "tb6612", name: "TB6612FNG", role: "Motor driver", note: "Dual H-bridge that translates logic-level commands into bidirectional motor power." },
  { id: "hcsr04", name: "HC-SR04", role: "Perception", note: "Ultrasonic rangefinder used to sense obstacles ahead of the rover." },
  { id: "oled", name: "SH1106 OLED", role: "Telemetry", note: "On-board display for live status and readings." },
  { id: "lm2596", name: "LM2596", role: "Power regulation", note: "Buck converter stepping battery voltage down to a stable logic supply." },
  { id: "battery", name: "2× 18650 cells", role: "Energy", note: "Dual lithium-ion cell configuration powering motors and electronics." },
  { id: "bt", name: "Bluetooth", role: "Link", note: "Wireless control channel between operator and rover." },
];

export const gesturePipeline = [
  { step: "Camera input", detail: "Live video frames captured with OpenCV." },
  { step: "Hand detection", detail: "MediaPipe locates the hand in each frame." },
  { step: "Landmark tracking", detail: "21 hand landmarks and fingertip positions tracked." },
  { step: "Gesture classification", detail: "Finger states mapped to discrete commands, with temporal stability filtering." },
  { step: "BLE communication", detail: "Stable commands sent to the ESP32 over Bluetooth Low Energy." },
  { step: "Robot response", detail: "The rover moves — forward, turn, stop." },
];

export const initiatives = [
  {
    id: "vista",
    index: "I",
    name: "VISTA",
    category: "AI / Accessibility / Computer Vision",
    concept:
      "An initiative exploring AI-powered visual assistance for blind and low-vision users — investigating how computer vision and artificial intelligence can help people better understand their surroundings and access visual information.",
    pillars: ["Accessibility", "Human-centred technology", "AI-powered assistance", "Practical problem-solving"],
    image: vistaArt,
    imageAlt: "Abstract layered glass eye sculpture in violet, blue and orange",
  },
  {
    id: "accessmap",
    index: "II",
    name: "AccessMap",
    category: "Accessibility / Community / Digital Mapping",
    concept:
      "A community-powered initiative focused on mapping accessible locations and helping people discover places with useful accessibility information.",
    pillars: ["Inclusive infrastructure", "Community participation", "Accessible navigation", "Social impact through technology"],
    image: accessmapArt,
    imageAlt: "Abstract off-white topographic city model with glowing orange routes",
  },
];

export const researchInterests = [
  { no: "R.01", title: "Vehicle suspension energy recovery", body: "Independent theoretical study of recoverable energy in suspension motion.", link: "/work/suspension-energy" as const },
  { no: "R.02", title: "Autonomous systems", body: "How machines sense, decide and move with minimal human input." },
  { no: "R.03", title: "Artificial intelligence & computer vision", body: "Teaching machines to interpret images, hands and environments." },
  { no: "R.04", title: "Robotics & embedded systems", body: "Where code meets motors, sensors and power electronics." },
  { no: "R.05", title: "Future research", body: "Assistive technology, energy systems and human-centred AI." },
];

export const achievementStats = [
  { value: "1st", label: "State-level science exhibition" },
  { value: "450", label: "Students led as House Captain" },
  { value: "20", label: "Member cabinet coordinated" },
  { value: "98%", label: "Class XI, Telangana State Board" },
];

export const achievementGroups = [
  {
    title: "Academic recognition",
    items: ["Academic Excellence Gold Medal", "School Topper in Grades IX and X", "98% in Class XI"],
  },
  {
    title: "Science & innovation",
    items: [
      "First place at a state-level science exhibition",
      "Multiple science exhibition participations",
      "Led three-member science exhibition teams",
    ],
  },
  {
    title: "Competitions",
    items: [
      "Second place, state-level quiz competition",
      "Penultimate round, Viksit Bharat International Quiz",
      "First place, state-level essay and elocution competitions",
    ],
  },
  {
    title: "Leadership",
    items: ["House Captain in Grade X", "Responsibilities spanning ~450 students and a 20-member cabinet"],
  },
  {
    title: "Beyond the lab",
    items: ["Competitive speedcubing", "Participant, SFA India Nationals", "Teaches Rubik's Cube solving to other students"],
  },
];

export const skillGroups = [
  { code: "SW", title: "Programming & Software", items: ["Python", "OpenCV", "MediaPipe"] },
  {
    code: "HW",
    title: "Robotics & Embedded",
    items: ["ESP32", "Embedded electronics", "Sensor integration", "Motor control", "Bluetooth Low Energy", "Hardware prototyping"],
  },
  { code: "AI", title: "Artificial Intelligence", items: ["Computer vision", "Hand landmark tracking", "Gesture recognition", "AI applications"] },
  {
    code: "RE",
    title: "Research & Engineering",
    items: ["Independent research", "Engineering problem-solving", "Technical documentation", "Experimental prototyping"],
  },
  {
    code: "LC",
    title: "Leadership & Communication",
    items: ["Team leadership", "Project coordination", "Science exhibitions", "Public speaking", "Collaborative problem-solving"],
  },
];
