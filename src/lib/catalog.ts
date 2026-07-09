/**
 * Nachi Tekneka — full parts catalog.
 * Product names, machine compatibility and images are sourced directly from the
 * official company profile. Images live in /public/catalog (cropped from the profile).
 */

export type Product = {
  id: string;
  name: string;
  fit: string;
  img: string;
  category: string; // category id
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  blurb: string;
  department: string;
  icon: string;
  products: Product[];
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Build products from a page's row-major [name, fit] list. */
function fromPage(page: number, cat: string, rows: [string, string][]): Product[] {
  return rows.map(([name, fit], i) => {
    const r = Math.floor(i / 4);
    const c = i % 4;
    return {
      id: `${slugify(name)}-${page}${r}${c}`,
      name,
      fit,
      img: `/catalog/pg${page}_${r}${c}.jpg`,
      category: cat,
    };
  });
}

/* ---------------- Electrical & Electronics ---------------- */
const electrical = [
  ...fromPage(11, "electrical", [
    ["B195 Measuring System", "RSB D30 · D35 · D40 · D45"],
    ["B2 RPM Transmitter KPL", "RSB D30 · D35 · D40 · D45"],
    ["B2 RPM Transmitter KPL", "RSB D22 · D24"],
    ["B91 Impulse Generator", "RSB D30"],
    ["B91 Impulse Generator", "RSB D35"],
    ["B91 Impulse Generator", "RSB D40 · D45"],
    ["B91 Impulse Generator", "RSB D22 · D24"],
    ["B92 Impulse Generator", "RSB D40"],
    ["B92 Impulse Generator", "RSB D24 · D45"],
    ["B92 Impulse Generator", "RSB D22 Right"],
    ["B92 Impulse Generator", "RSB D22 Left"],
    ["B91 Impulse Generator", "RSB D26 · D50"],
    ["B12 Impulse Generator", "RSB D30 · D35"],
    ["B1 / B90 Impulse", "G33 · K44"],
    ["B29 Impulse Generator", "RSB D50 · D55"],
    ["B2 Impulse Generator", "B2 D50 · D55"],
  ]),
  ...fromPage(12, "electrical", [
    ["Cable DX95:X3 (B91, B92)", "RSB D45"],
    ["Magnetic Sensor & Rotor", "G33 · K44"],
    ["B3 · B4 · B40 · B41 · B43", "RSB D40 · D45"],
    ["B4 Initiator", "RSB D40 · D45"],
    ["B24 Light Scanner", "RSB D35 · D40 · D45"],
    ["B24 Light Scanner", "RSB D45 · D24"],
    ["Servo Motor Encoder", "RSB D45"],
    ["Servomotor Encoder", "RSB D35 · D40"],
    ["B2 Sensor", "RSB 851 · 951"],
    ["B10 Photo Sensor Unit", "RSB 851 · 951"],
    ["B91 Tacho Generator", "RSB 851 · 951"],
    ["B93 Tacho Generator", "RSB 851 · 951"],
    ["Measuring Unit", "Carding C60"],
    ["Ultrasonic Sensor", "Unilap E35"],
    ["Ultrasonic Sensor", "Unifloc A11"],
    ["Measuring Unit", "Carding C60"],
  ]),
];

/* ---------------- Pneumatics ---------------- */
const pneumatics = [
  ...fromPage(18, "pneumatics", [
    ["3/2 Way Solenoid Valve", "RSB D30 · D35"],
    ["3/2 Way Solenoid Valve", "Comber Machine"],
    ["5/3 Way Valve NW5-G1/4", "Unilap Machine"],
    ["3/2 Way Solenoid Valve", "RSB D30 · D35"],
    ["5/3 Way Magnet Valve", "Unilap Machine"],
    ["3/2 Way Solenoid Valve", "RSB D30 · D35"],
    ["5/2 Way Valve NW4 G1/8", "Unilap Machine"],
    ["Pneumatic Cylinder 25/125", "Comber Machine"],
    ["Linear Cylinder", "RSB D30 · D35"],
    ["Pneumatic Cylinder 20/50", "Unilap E32"],
    ["Pneumatic Cylinder 40/160", "K43 · K44"],
    ["Pneumatic Cylinder 80/550", "Carding C60"],
    ["Pneumatic Cylinder 25/50", "Omega Lap E35"],
    ["Pneumatic Cylinder 40/80", "G32 Machine"],
    ["Pneumatic Cylinder 50/400", "Unilap E36"],
    ["Pneumatic Cylinder D32 H80", "RSB D30 · D35 · D40 · D45"],
  ]),
  ...fromPage(19, "pneumatics", [
    ["Pneumatic Cylinder 80/550", "Carding C60"],
    ["Pneumatic Cylinder 25/200", "Unilap Machine"],
    ["Pneumatic Cylinder 25/200", "Unilap Machine"],
    ["Pneumatic Cylinder Abst", "RSB D30 · D35 · D40 · D45"],
    ["Pneumatic Cylinder 50/400", "Unilap E32"],
    ["Loading Element", "Unilap Machine"],
    ["Loading Element", "Unilap Machine"],
    ["Loading Element", "Unilap Machine"],
    ["Filter Regulator Complete", "RSB D30 · D35 · D40 · D45"],
    ["Compressed Air Regulator", "E35 Machine"],
    ["Fine Adjusting Valve", "Unilap Machine"],
    ["Filter Regulator", "RSB D30 · D35"],
    ["Filter Regulator", "Comber Machine"],
    ["Pressure Regulator", "Comber Machine"],
    ["Pressure Regulator", "RSB D30 · D35 · D40 · D45"],
    ["Pressure Regulator KPL", "RSB D30 · D35 · D40 · D45"],
  ]),
];

/* ---------------- Blow Room & Carding ---------------- */
const blowroom = [
  ...fromPage(23, "blowroom", [
    ["Axle", "Blow Room"],
    ["Bolt Complete D20X114.4", "E6X · E7X · E8X · E90"],
    ["Calender Roller D15 X 124", "E6X · E7X · E8X · E90"],
    ["Grooved Roller Top", "Carding C51"],
    ["Toothed-Belt-Disc", "Unifloc A21"],
    ["Intermediate Ring", "Unifloc A11"],
    ["Cape Hood Behind", "Unifloc A11"],
    ["Flange", "Unifloc A11"],
    ["Fixing Device", "Unifloc A11"],
    ["Deviating Unit Complete", "Unifloc A11"],
    ["Bracket for Covertape", "Carding"],
    ["Wiper", "Unifloc A21"],
    ["Sliding Rail 50 M", "Unifloc A11"],
    ["Slide-Rail", "Unifloc A11"],
    ["Cover Tape L-101650", "Unifloc A11"],
    ["Feeding Tape", "Unimix B71"],
  ]),
  ...fromPage(24, "blowroom", [
    ["Differential Pressure Switch", "DK Series"],
    ["Sealing Rings", "Blow Room · Carding"],
    ["Sprocket T=21-17", "Unifloc A11"],
    ["Sprocket T17", "Unifloc A11"],
    ["Sprocket T32", "Unifloc A11"],
    ["Calender Housing", "Carding C51"],
    ["Bearing Bracket", "Carding C51"],
    ["Bevel Gearing Complete", "E62 · E65"],
    ["Planetary Gear", "Carding C60"],
    ["Cleaning Brush New Type", "Carding C51"],
    ["Brush Round", "Carding C51"],
    ["Suction Tube", "Carding C60"],
    ["Spindle", "Carding C60 · C70"],
    ["Suction Tube", "Carding C60"],
    ["Power Grip 43SF", "Carding C51"],
    ["Cross Band Roll", "Carding C60"],
  ]),
];

/* ---------------- Lap Former ---------------- */
const lapformer = [
  ...fromPage(27, "lapformer", [
    ["Toothed Segment", "E30 · E32"],
    ["Spur Toothed Wheel", "E30 · E32"],
    ["Tooth Type Chain HDL 118", "E30 · E32"],
    ["Tooth Type Chain HDL 150", "E30 · E32"],
    ["Tooth Chain HDL 200", "E30 · E32"],
    ["Tooth Type Chains", "E30 · E32"],
    ["Universal Shaft Left", "E30 · E32 · E35 · E36"],
    ["Universal Shaft Right", "E30 · E32 · E35 · E36"],
    ["Connecting Ring MIT", "E30 · E32"],
    ["Guiding Track", "E30 · E32"],
    ["Pressure Hose", "E30 · E32"],
    ["Bearing Saddle V3", "E30 · E32"],
    ["Bearing Saddle H3", "E30 · E32"],
    ["Bearing Saddle M3", "E30 · E32"],
    ["Loading Element E", "E30 · E32 · E35 · E36"],
    ["Loading Element M", "E30 · E32 · E35 · E36"],
  ]),
  ...fromPage(28, "lapformer", [
    ["Loading Element A", "E30 · E32 · E35 · E36"],
    ["Cylinder and Guide", "E30 · E32 · E35 · E36"],
    ["Pressure Booster", "E35 · E36"],
    ["Pressure Spring 4X21", "E30 · E32"],
    ["Pressure Spring 2X13", "E30 · E32"],
    ["Pressure Spring 2X28", "E30 · E32"],
    ["Sealing Ring 25X47X7", "E30 · E32 · E35 · E36"],
    ["Sealing Ring 25X47X8", "E30 · E32 · E35 · E36"],
    ["Washer", "E30 · E32 · E35 · E36"],
    ["Sealing Ring AS 28X40", "E30 · E32 · E35 · E36"],
    ["Gas Pressure Spring", "E30 · E32"],
    ["Gas Pressure Spring", "E35 · E36"],
    ["Gas Pressure Spring", "E30 · E32 · E35 · E36"],
  ]),
];

/* ---------------- Comber ---------------- */
const comber = [
  ...fromPage(30, "comber", [
    ["Feed Cylinder Complete", "E6X · E7X · E8X · E90"],
    ["Detaching Cylinder", "E6X · E7X · E8X · E90"],
    ["Detaching Roller Drive", "E6X · E7X · E8X · E90"],
    ["Detaching Roller End", "E6X · E7X · E8X · E90"],
    ["Lap Feed", "E6X · E7X · E8X"],
    ["Lap Feed Cover", "E6X · E7X · E8X · E90"],
    ["Lap Feeding Open", "E6X · E7X"],
    ["Lap Feed Back", "E6X · E7X · E8X"],
    ["Combing Brush", "E8X · E90"],
    ["Combing Brush", "E6X · E7X · E8X"],
    ["Combing Brush", "E6X · E7X · E8X"],
    ["Combing Brush - Wood", "E6X · E7X"],
    ["Cleaning Spiral Brush", "E6X · E7X · E8X · E90"],
    ["Bellow", "E6X · E7X · E8X · E90"],
    ["Front Support Left & Right", "E6X · E7X · E8X · E90"],
    ["Ratchet Wheel Right T20", "E6X · E7X · E8X · E90"],
  ]),
  ...fromPage(31, "comber", [
    ["Ratchet Wheel Left", "E6X · E7X · E8X · E90"],
    ["Ratchet Wheel Right", "E6X · E7X · E8X · E90"],
    ["Pressure Saddle", "E6X · E7X · E8X · E90"],
    ["Hinge", "E6X · E7X · E8X · E90"],
    ["Spur Toothed Wheel Z25", "E6X · E7X · E8X · E90"],
    ["Ratchet RH Backward", "E6X · E7X · E8X · E90"],
    ["Ratchet LH Forward Feed", "E6X · E7X · E8X · E90"],
    ["Ratchet RH Backward", "E6X · E7X · E8X · E90"],
    ["Ratchet RH / LH Forward", "E6X · E7X · E8X · E90"],
    ["Pressure Aggregat", "E6X · E7X · E8X · E90"],
    ["Pressure Cylinder", "E6X · E7X · E8X · E90"],
    ["Top Comb Bed Mil", "E6X · E7X · E8X · E90"],
    ["Holder", "E6X · E7X · E8X · E90"],
    ["Holder", "E6X · E7X · E8X · E90"],
    ["Cover", "E6X · E7X · E8X · E90"],
    ["Cover", "E6X · E7X · E8X · E90"],
  ]),
];

/* ---------------- Draw Frame ---------------- */
const drawframe = [
  ...fromPage(36, "drawframe", [
    ["Side Part Oben / Unten", "RSB D30 · D35"],
    ["Side Part Oben / Unten", "RSB D30 · D35"],
    ["Feeding Hub B9.0 CPL", "RSB D30 · D35"],
    ["Deflector B6 F.Tastrolle", "RSB D30 · D35"],
    ["Tension Spring 10394714", "RSB D40 · D45 · D50"],
    ["Diaphragm BFA 80/70X45", "RSB D30 · D35"],
    ["Spiral Bevel Gear 51/22T", "RSB 851 · 951"],
    ["Shock Absorber", "RSB 851 · 951"],
    ["Bearing DR1625", "RSB D30 · D35 · D40 · D45"],
    ["Cogged Belt Wheel Z22", "RSB D30 · D35 · D40 · D45"],
    ["Contact Disk", "RSB D30 · D35 · D40 · D45"],
    ["Sliver Funnel D13 WZF", "RSB D45 · D50 · D24"],
    ["Loading Lever", "RSB D45 · D50 · D24"],
    ["Sliver Guide D26", "RSB D30 · D35 · D40 · D45"],
    ["Pulley D210 Ballig", "SB D15"],
    ["Accessories", "RSB D30 · D35 · D40 · D45"],
  ]),
  ...fromPage(37, "drawframe", [
    ["Differential Gearing Cpl", "RSB D35"],
    ["Differential Gearing Cpl", "RSB D40 · D45 · D22 · D24"],
    ["Differential Gearing Cpl", "RSB D30"],
    ["Pinion Cage", "RSB D35 · D4X · D2X"],
    ["Drive Mit Bremse", "RSB D40 · D45 · D22 · D24"],
    ["Pulley D.185 PJ 10", "RSB D40 · D45 · D22 · D24"],
    ["Clutch Mit Nabe", "RSB D40 · D45 · D22 · D24"],
    ["Pinion Cage", "RSB D30"],
    ["Spur Gear", "RSB D30 · D35"],
    ["Shaft", "RSB D30 · D35"],
    ["Brake Disk VDB 1580", "RSB D40 · D45 · D22 · D24"],
    ["Brake Plate", "RSB D30 · D35"],
    ["Coupling", "RSB D30 · D35"],
    ["Set Of Tension Element", "RSB D40 · D45 · D22 · D24"],
    ["Loading-Arm-Complete", "RSB D40 · D45"],
    ["Tappet", "RSB D40 · D45 · D50"],
  ]),
];

/* ---------------- Ring & Compact Frame ---------------- */
const ringframe = [
  ...fromPage(45, "ringframe", [
    ["Nipper Complete", "G32 · G38 · K42 · K48"],
    ["Balloon Compress Ring", "G32 · G38 · K42 · K48"],
    ["Spur Gear Drive MZ", "G33 · K44"],
    ["Drive Tape", "G3X · K4X"],
    ["Loading-Pit-Complete", "G32 · G38 · K42 · K48"],
    ["Clutch Ring HPS", "G33 · K44"],
    ["Tape Tension Roller", "G33 · K44"],
    ["Spindle Brake HPS", "G33 · K44"],
    ["Gripper Complete", "G33 · K44"],
    ["Gripper Complete New", "G33 · K44"],
    ["Gripper Ring Small", "G33 · K44"],
    ["Gripper Membrane", "G33 · K44"],
    ["Compression Hose", "G33 · K44"],
    ["Connection Piece G-L", "G3X · K4X"],
    ["Support for Suction Pipe", "K4X"],
    ["Steel Strip Roboload", "G33 · K44 · G35 · K45"],
  ]),
  ...fromPage(46, "ringframe", [
    ["Steel Strip", "G33 · K44 · G35 · K45"],
    ["Wheel Complete", "G3X · K4X"],
    ["Carrier Bottom", "G33 · K44"],
    ["Carrier UT", "G33 · K44"],
    ["Carrier OT T70-GUZ", "G3X · K4X"],
    ["Carrier OT T70-GUZ", "G3X · K4X"],
    ["Carrier OT T70-GUZ", "G3X · K4X"],
    ["Carrier OT T70-GUZ", "G3X · K4X"],
    ["Carrier Top 70-UZ DIA18", "G3X · K4X"],
    ["Carrier OT - Without Stud", "G3X · K4X"],
    ["Carrier OT", "G3X · K4X"],
    ["Tappet DUI 18 & 20", "G3X · K4X"],
    ["4072", "G3X · K4X"],
    ["Peg Tray", "G3X · K4X"],
    ["Tube Complete", "G3X · K4X"],
    ["Bearing-Pivot-Complete", "G33 · K44"],
  ]),
];

/* ---------------- Top Roller (curated clean crops) ---------------- */
const toproller: Product[] = [
  ["Top Roller", "RSB 851", "pg48_20.jpg"],
  ["Top Roller", "RSB D30", "pg48_30.jpg"],
  ["Top Roller", "RSB D50", "pg48_23.jpg"],
  ["Unilap Top Roller", "RSB D30 · D35", "pg48_31.jpg"],
  ["Comber Drafting Top Roller", "RSB D30 · D35", "pg48_32.jpg"],
  ["Detaching Top Roller", "RSB D30 · D35", "pg48_33.jpg"],
].map(([name, fit, file], i) => ({
  id: `${slugify(name)}-tr${i}`,
  name,
  fit,
  img: `/catalog/${file}`,
  category: "toproller",
}));

export const categories: Category[] = [
  {
    id: "electrical",
    name: "Electrical & Electronics",
    slug: "electrical-electronics",
    department: "All departments",
    icon: "electronics",
    blurb:
      "PCBs, measuring systems, impulse generators, encoders, sensors, tacho generators and control boards — the electronic backbone of the spinning line.",
    products: electrical,
  },
  {
    id: "pneumatics",
    name: "Pneumatics",
    slug: "pneumatics",
    department: "Comber · Lap Former · Draw Frame",
    icon: "pneumatics",
    blurb:
      "Solenoid & magnet valves, valve blocks, pneumatic cylinders, regulators, filters and pressure switches for reliable air control.",
    products: pneumatics,
  },
  {
    id: "blowroom",
    name: "Blow Room & Carding",
    slug: "blow-room-carding",
    department: "Blow Room · Carding",
    icon: "carding",
    blurb:
      "Rollers, sprockets, toothed-belt discs, brushes, bearings, gearing and precision mechanicals for blowroom and carding machines.",
    products: blowroom,
  },
  {
    id: "lapformer",
    name: "Lap Former",
    slug: "lap-former",
    department: "Unilap · Omega Lap",
    icon: "ringframe",
    blurb:
      "Toothed segments, chains, shafts, bearing saddles, loading elements, springs and seals for lap-former machines.",
    products: lapformer,
  },
  {
    id: "comber",
    name: "Comber",
    slug: "comber",
    department: "Comber E6X–E90",
    icon: "comber",
    blurb:
      "Feed & detaching cylinders, combing brushes, ratchet assemblies, lap-feed components, holders and covers for combers.",
    products: comber,
  },
  {
    id: "drawframe",
    name: "Draw Frame",
    slug: "draw-frame",
    department: "RSB · SB series",
    icon: "drawframe",
    blurb:
      "Sensing rollers, differential gearing, coilers, calender assemblies, bearings and drive components for draw frames.",
    products: drawframe,
  },
  {
    id: "ringframe",
    name: "Ring & Compact Frame",
    slug: "ring-compact-frame",
    department: "G3X · K4X",
    icon: "ringframe",
    blurb:
      "Grippers, carriers, spindle brakes, nippers, steel strips, tapes and precision plastics for ring and compact spinning frames.",
    products: ringframe,
  },
  {
    id: "toproller",
    name: "Top Roller",
    slug: "top-roller",
    department: "Draw Frame · Comber · Lap Former",
    icon: "drawframe",
    blurb:
      "Precision cots and top rollers for draw frame, comber drafting and detaching — available across a wide range of cot sizes.",
    products: toproller,
  },
];

export const allProducts: Product[] = categories.flatMap((c) => c.products);

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(catSlug: string, productId: string) {
  const cat = getCategory(catSlug);
  if (!cat) return undefined;
  const product = cat.products.find((p) => p.id === productId);
  if (!product) return undefined;
  const related = cat.products.filter((p) => p.id !== productId).slice(0, 4);
  return { cat, product, related };
}

export const catalogStats = {
  categories: categories.length,
  products: allProducts.length,
};
