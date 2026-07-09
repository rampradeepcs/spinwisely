/**
 * Nachi Tekneka — site content
 * Sourced from the official company profile (ISO 9001:2015 certified).
 */

export const company = {
  name: "Nachi Tekneka",
  brandLine: "A Solution Provider for the Spinning Industry",
  tagline: "Not just parts — parts for solutions.",
  cert: "ISO 9001:2015 Certified",
  phone: "+91 422 267 0091",
  mobile: "+91 96003 09378",
  email: "info@nachitekneka.com",
  website: "www.nachitekneka.com",
};

export const nav = [
  { label: "SpinLyfeX", href: "#spinlyfex" },
  { label: "Products", href: "#products" },
  { label: "Solutions", href: "#solutions" },
  { label: "Services", href: "#services" },
  { label: "Company", href: "#company" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: 500, suffix: "+", label: "Trusted happy customers" },
  { value: 8, suffix: "", label: "Spinning departments served" },
  { value: 3, suffix: "", label: "Continents, one network" },
  { value: 20, suffix: "%", label: "Lower maintenance cost*" },
];

export const heroCallouts = [
  {
    id: "controller",
    title: "G90 AC Servo + Motion Controller",
    body: "High-performance drive that replaces legacy servo electronics without altering the machine.",
  },
  {
    id: "motor",
    title: "M90 High-Torque Servomotor",
    body: "Precision AC servomotor engineered for consistent draft and long service life.",
  },
  {
    id: "hmi",
    title: "E-Draft via HMI",
    body: "On-screen draft adjustments eliminate NW1 / NW2 gear changes entirely.",
  },
];

/* Flagship retrofit brand — Nachi SpinLyfeX */
export const spinlyfex = [
  {
    id: "servo",
    name: "SpinLyfeX Servo Upgrade",
    fit: "RSB 1 · 51 · 851 · 951",
    summary:
      "Drop-in servo modernization for classic Rieter draw frames — restoring precision without a full rebuild.",
    accent: "#ed3237",
    img: "/spinlyfex/servo.jpg",
  },
  {
    id: "servo-pro",
    name: "SpinLyfeX Servo Upgrade Pro",
    fit: "RSB D30 · D35 · D40 · D45 · D22 · D24",
    summary:
      "Next-generation servo package for the D-series, delivering higher torque and tighter control loops.",
    accent: "#5b8def",
    img: "/spinlyfex/servo-pro.jpg",
  },
  {
    id: "maxx",
    name: "SpinLyfeX Servo Upgrade MAXX",
    fit: "RSB D30 · D35 · D40 · D45 · D22 · D24",
    summary:
      "Eliminates the differential gearbox altogether. G90 controller, M90 servomotor and HMI E-Draft in one plug-and-play system.",
    accent: "#ed3237",
    featured: true,
    img: "/spinlyfex/maxx.jpg",
  },
  {
    id: "inverter",
    name: "SpinLyfeX Inverter Upgrade",
    fit: "Blowroom · Carding · Lap Former · Spinning",
    summary:
      "Nachi PROTOcon converts legacy KEB, Commander & Vectron drives to robust Yaskawa AC platforms — originality preserved.",
    accent: "#f5a623",
    img: "/spinlyfex/inverter.jpg",
  },
  {
    id: "leveler",
    name: "SpinLyfeX Carding Auto Leveler",
    fit: "DK 715 · 740 · 760 · 780 · 800 · 803 · 903",
    summary:
      "Closed-loop autoleveling for even sliver. Hank variation held within ±0.04 and 5 m CV under 2.5%.",
    accent: "#2ec4a6",
    img: "/spinlyfex/leveler.jpg",
  },
];

export const maxxFeatures = [
  "Eliminates the complex differential gearbox — no oil changes, gear swaps, bearings or brake pads.",
  "Replaces the G90 servo drive & M90 servomotor with a high-performance G90 AC Servo + Motion Controller and high-torque M90 AC servomotor.",
  "E-Draft adjustments through the HMI display — no NW1 / NW2 gear changes.",
  "Plug-and-play design for seamless setup by mill technicians.",
  "Preserves the originality of the machine.",
];

/* OEM-level quality pillars */
export const qualityPillars = [
  { title: "Equal & Equivalent Raw Materials", icon: "materials" },
  { title: "Precision Dimensional Accuracy", icon: "precision" },
  { title: "Assembly-Tested Components", icon: "tested" },
  { title: "Prototype Verified Before Launch", icon: "prototype" },
  { title: "Engineered for Reliable Performance", icon: "engineered" },
  { title: "Deep Understanding of Part Function", icon: "function" },
];

/* Product catalog categories */
export const categories = [
  {
    id: "electrical",
    name: "Electrical & Electronics",
    count: "120+ parts",
    blurb:
      "PCBs, measuring units, impulse generators, sensors, encoders, controllers and displays.",
    examples: ["Power Supply PCB", "Measuring Unit", "Impulse Generator", "DSP Control Board"],
    icon: "electronics",
  },
  {
    id: "pneumatics",
    name: "Pneumatics",
    count: "60+ parts",
    blurb:
      "Valve blocks, solenoid & magnet valves, cylinders, regulators and pressure switches.",
    examples: ["Valve Block", "Solenoid Valve", "Pneumatic Cylinder", "Pressure Regulator"],
    icon: "pneumatics",
  },
  {
    id: "blowroom",
    name: "Blow Room & Carding",
    count: "80+ parts",
    blurb:
      "Rollers, sprockets, toothed belt discs, bearings, brushes and precision mechanicals.",
    examples: ["Take-off Roller", "Grooved Roller Top", "Planetary Gear", "Cleaning Brush"],
    icon: "carding",
  },
  {
    id: "comber",
    name: "Comber",
    count: "90+ parts",
    blurb:
      "Nippers, circular & top combs, detaching rollers, brushes and ratchet assemblies.",
    examples: ["Nipper Complete", "Circular Comb", "Detaching Cylinder", "Combing Brush"],
    icon: "comber",
  },
  {
    id: "drawframe",
    name: "Draw Frame",
    count: "140+ parts",
    blurb:
      "Sensing rollers, differential gearing, coilers, calender assemblies and fluted rollers.",
    examples: ["Sensing Roller", "Differential Gearing", "Coiler", "Calender Assembly"],
    icon: "drawframe",
  },
  {
    id: "ringframe",
    name: "Ring & Lap Former",
    count: "100+ parts",
    blurb:
      "Grippers, carriers, spindle brakes, guiding rolls, belts and top rollers for ring & lap.",
    examples: ["Gripper Complete", "Spindle Brake", "Guiding Roll", "Top Roller"],
    icon: "ringframe",
  },
];

/* Departments across the spinning line */
export const solutions = [
  { name: "Blowroom", detail: "Uniclean · Uniflex — contifeed & electrical conversion." },
  { name: "Carding", detail: "C50 · C51 · DK series — full conversion with auto leveler." },
  { name: "Lap Former", detail: "Unilap E30 · E32 — drive & mechanical retrofits." },
  { name: "Comber", detail: "E6X–E90 — nipper, detaching & drafting audits." },
  { name: "Draw Frame", detail: "RSB / SB series — servo & inverter modernization." },
  { name: "Ring & Compact", detail: "G33 · K44 — top-arm rebuild & auto-doffer kits." },
];

/* On-site technical services */
export const services = [
  {
    name: "Draw Frame Technical Audit",
    points: [
      "Comprehensive mechanical condition assessment",
      "Auto-leveler audit & precision calibration",
      "Quality monitoring verification & validation",
      "Process optimization for sliver uniformity",
    ],
  },
  {
    name: "Comber Technical Audit",
    points: [
      "Nipper, detaching & drafting performance analysis",
      "Noil extraction & combing quality verification",
      "Sliver evenness evaluation",
      "Optimization for cleaning efficiency & stability",
    ],
  },
  {
    name: "Ring & Compact Frame Audit",
    points: [
      "Expert onsite top-arm rebuild & maintenance",
      "Auto-doffer maintenance kit installation",
      "Reduction of end breakage & downtime",
      "Machine condition assessment for reliable output",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "The SpinLyfeX MAXX retrofit removed our differential gearbox headaches completely. Draft changes now take seconds on the HMI — no gear swaps, no downtime.",
    author: "Maintenance Head",
    role: "Ring Spinning Mill, Tamil Nadu",
  },
  {
    quote:
      "OEM-level quality at a fraction of the lead time. Their measuring units and PCBs simply work, and delivery is faster than the original suppliers.",
    author: "Technical Director",
    role: "Composite Spinning Group, Gujarat",
  },
  {
    quote:
      "The draw frame audit and auto-leveler calibration lifted our sliver consistency measurably. A genuine engineering partner, not just a parts vendor.",
    author: "General Manager",
    role: "Yarn Manufacturer, USA",
  },
];

export const offices = [
  { city: "Coimbatore", country: "India", role: "Headquarters", flag: "🇮🇳", x: 70, y: 58 },
  { city: "Wyoming", country: "USA", role: "Nachi Tekneka USA LLC", flag: "🇺🇸", x: 20, y: 42 },
  { city: "Mexico City", country: "Mexico", role: "Indmex Technology SA DE DV", flag: "🇲🇽", x: 22, y: 55 },
];

export const downloads = [
  {
    title: "Company Profile",
    desc: "Full 51-page catalog — products, retrofits & services.",
    meta: "PDF · 5.8 MB",
    kind: "brochure",
  },
  {
    title: "SpinLyfeX Retrofit Guide",
    desc: "Servo, inverter & auto-leveler upgrade specifications.",
    meta: "PDF · Technical",
    kind: "spec",
  },
  {
    title: "Top Roller Compatibility Chart",
    desc: "Cot sizes across Draw Frame, Comber & Lap Former.",
    meta: "PDF · Reference",
    kind: "chart",
  },
];
