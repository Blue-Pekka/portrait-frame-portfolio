import roverArt from "@/assets/rover-art.webp";
import gestureArt from "@/assets/gesture-art.webp";
import suspensionArt from "@/assets/suspension-art.webp";
import portraitAsset from "@/assets/raqeeb-portrait.webp.asset.json";
import roverPhotoAsset from "@/assets/rover-photo.webp.asset.json";
import roverCad1Asset from "@/assets/rover-cad-1.webp.asset.json";
import roverCad2Asset from "@/assets/rover-cad-2.webp.asset.json";

export const person = {
  name: "Mohammad Abdul Raqeeb",
  shortName: "M. A. Raqeeb",
  location: "Hyderabad, India",
  role: "Class XII · MPC · MS Junior College",
  intro:
    "A Class XII student from Hyderabad applying to study engineering. I like building things that work — a robot rover, a gesture-controlled robot, and a short research paper on energy from car suspensions.",
  portrait: portraitAsset.url,
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "academics", label: "Academics" },
  { id: "activities", label: "Extracurriculars" },
  { id: "contact", label: "Contact" },
] as const;

/** Only real, user-provided links — never fabricate them. */
export const contactLinks: { label: string; href: string; display: string }[] = [
  { label: "Email", href: "mailto:a.raqeeb2468@gmail.com", display: "a.raqeeb2468@gmail.com" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammad-abdul-raqeeb-6011b6443",
    display: "linkedin.com/in/mohammad-abdul-raqeeb",
  },
  { label: "GitHub", href: "https://github.com/Blue-Pekka", display: "github.com/Blue-Pekka" },
  { label: "Research paper", href: "https://doi.org/10.5281/zenodo.23158581", display: "doi.org/10.5281/zenodo.23158581" },
];

export const researchPaper = {
  title: "A Theoretical Study of Mechanical Energy Harvesting from Vehicle Suspension",
  venue: "Zenodo · October 2026",
  href: "https://doi.org/10.5281/zenodo.23158581",
  summary:
    "A theoretical look at whether some of the energy in a car's suspension movement could be turned into electricity, using the elastic energy stored in the suspension spring. No physical experiments — the paper also discusses existing regenerative shock absorbers and the limits of a practical system.",
};

export const timeline = [
  { years: "2018 — 2024", title: "Sultan Ul Uloom Public School", detail: "CBSE" },
  { years: "2024 — 2025", title: "Class X, CBSE", detail: "96%" },
  { years: "2025 — 2027", title: "MS Junior College", detail: "MPC · Telangana State Board · 98% in Class XI" },
];

export const academicStats = [
  { value: "96%", label: "CBSE Class X" },
  { value: "98%", label: "Class XI, Telangana State Board" },
  { value: "#1", label: "School rank, Grades IX & X (~180 students)" },
  { value: "Gold", label: "Academic Excellence Medal" },
];

export const academicHonours = [
  "Academic Excellence Gold Medal",
  "School Topper in Grades IX and X",
  "98% in Class XI, Telangana State Board",
];

export const activityGroups = [
  {
    title: "Competitions & science fairs",
    items: [
      "First place, state-level science exhibition",
      "Second place, state-level quiz competition",
      "Penultimate round, Viksit Bharat International Quiz",
      "First place, state-level essay and elocution competitions",
    ],
  },
  {
    title: "Leadership",
    items: [
      "House Captain in Grade X — about 450 students and a 20-member cabinet",
      "Led three-member teams at science exhibitions",
    ],
  },
  {
    title: "Beyond the classroom",
    items: ["Competitive speedcuber; SFA India Nationals participant", "Teaches Rubik's Cube solving to other students"],
  },
  {
    title: "Ideas in development",
    items: [
      "VISTA — concept for an AI visual assistant for blind and low-vision people",
      "AccessMap — concept for a community map of accessible places",
    ],
  },
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
  /** Real photo used on the project page hero; the home card keeps `image`. */
  heroImage?: { src: string; alt: string; aspect: string };
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
      "An experimental rover for disaster inspection and environmental mapping — one platform combining embedded electronics, sensing, motor control and a wireless link.",
    image: roverArt,
    imageAlt: "Abstract orange chrome sculpture of a six-wheeled rover",
    heroImage: {
      src: roverPhotoAsset.url,
      alt: "The assembled rover on a wooden table: matte black 3D-printed body, OLED reading RAQEEB ROBOT and MODE: MANUAL, ultrasonic sensor in the front opening and knobby rubber tyres",
      aspect: "7 / 8",
    },
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
      "A computer-vision system that steers the ESP32 rover with hand gestures — landmark tracking and gesture classification driving motion over Bluetooth Low Energy.",
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
      "Independent theoretical research on recovering energy from vehicle suspension — suspension dynamics, energy conversion and the limits of doing it.",
    image: suspensionArt,
    imageAlt: "Silver coil spring dissolving into flowing electric blue energy",
    theme: "electric",
    tech: ["Suspension dynamics", "Energy conversion", "Theoretical modelling", "Literature review"],
  },
];

export const roverBuild = {
  intro:
    "The shell starts as a model. These two views are the CAD part; the photo at the top of this page is the same cover printed in matte black PLA and fitted with the display and sensor.",
  shots: [
    {
      src: roverCad1Asset.url,
      alt: "CAD model of the rover chassis top cover seen from the front three-quarter, showing the display recess and sensor opening",
      label: "Chassis cover — CAD, front",
      caption:
        "Modelled in SOLIDWORKS: the recess that holds the display, the opening for the ultrasonic sensor, the ventilation slots and the wheel arch.",
    },
    {
      src: roverCad2Asset.url,
      alt: "CAD model of the rover chassis top cover seen from the rear three-quarter, showing the cooling slots and the curved wheel well",
      label: "Chassis cover — CAD, rear",
      caption: "The same part from the opposite side — cooling slots and the curved wheel well, before it was printed.",
    },
  ],
};

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
