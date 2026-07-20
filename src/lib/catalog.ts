/**
 * Nachi Tekneka — full parts catalog.
 * Product names, machine compatibility and images are sourced directly from the
 * official company profile. Images live in /public/catalog (cropped from the profile).
 */

import { asset } from "./asset";

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
  /** Display override for the parts count (e.g. "1000+") — the full range is
   *  larger than what's photographed in the online catalog. */
  count?: string;
};

/** Displayed parts count for a category ("1000+" override or actual length). */
export function categoryCount(c: Category): string {
  return c.count ?? String(c.products.length);
}

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
      img: asset(`/catalog/pg${page}_${r}${c}.png`),
      category: cat,
    };
  });
}

/* ---------------- Electrical & Electronics ---------------- */
/* Product photography: official part images (public/catalog/ee). */
const electrical: Product[] = [
  { id: "b195-measuring-system-1100", name: "B195 Measuring System", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/ee/b195-measuring-system-1100.png"), category: "electrical" },
  { id: "b2-rpm-transmitter-kpl-1101", name: "B2 RPM Transmitter KPL", fit: "RSB D30 · D35 · D40 · D45", img: asset("/catalog/ee/b2-rpm-transmitter-kpl-1101.png"), category: "electrical" },
  { id: "b2-rpm-transmitter-kpl-1102", name: "B2 RPM Transmitter KPL", fit: "RSB D22 · D24", img: asset("/catalog/ee/b2-rpm-transmitter-kpl-1102.png"), category: "electrical" },
  { id: "b91-impulse-generator-1103", name: "B91 Impulse Generator", fit: "RSB D30", img: asset("/catalog/ee/b91-impulse-generator-1103.png"), category: "electrical" },
  { id: "b91-impulse-generator-1110", name: "B91 Impulse Generator", fit: "RSB D35", img: asset("/catalog/ee/b91-impulse-generator-1110.png"), category: "electrical" },
  { id: "b91-impulse-generator-1111", name: "B91 Impulse Generator", fit: "RSB D40 · D45", img: asset("/catalog/ee/b91-impulse-generator-1111.png"), category: "electrical" },
  { id: "b91-impulse-generator-1112", name: "B91 Impulse Generator", fit: "RSB D22 · D24", img: asset("/catalog/ee/b91-impulse-generator-1112.png"), category: "electrical" },
  { id: "b92-impulse-generator-1113", name: "B92 Impulse Generator", fit: "RSB D40", img: asset("/catalog/ee/b92-impulse-generator-1113.png"), category: "electrical" },
  { id: "b92-impulse-generator-1120", name: "B92 Impulse Generator", fit: "RSB D24 · D45", img: asset("/catalog/ee/b92-impulse-generator-1120.png"), category: "electrical" },
  { id: "b92-impulse-generator-1121", name: "B92 Impulse Generator", fit: "RSB D22 Right", img: asset("/catalog/ee/b92-impulse-generator-1121.png"), category: "electrical" },
  { id: "b92-impulse-generator-1122", name: "B92 Impulse Generator", fit: "RSB D22 Left", img: asset("/catalog/ee/b92-impulse-generator-1122.png"), category: "electrical" },
  { id: "b91-impulse-generator-1123", name: "B91 Impulse Generator", fit: "RSB D26 · D50", img: asset("/catalog/ee/b91-impulse-generator-1123.png"), category: "electrical" },
  { id: "b12-impulse-generator-1130", name: "B12 Impulse Generator", fit: "RSB D30 · D35", img: asset("/catalog/ee/b12-impulse-generator-1130.png"), category: "electrical" },
  { id: "b1-b90-impulse-1131", name: "B1 / B90 Impulse", fit: "G33 · K44", img: asset("/catalog/ee/b1-b90-impulse-1131.png"), category: "electrical" },
  { id: "b29-impulse-generator-1132", name: "B29 Impulse Generator", fit: "RSB D50 · D55", img: asset("/catalog/ee/b29-impulse-generator-1132.png"), category: "electrical" },
  { id: "b2-impulse-generator-1133", name: "B2 Impulse Generator", fit: "B2 D50 · D55", img: asset("/catalog/ee/b2-impulse-generator-1133.png"), category: "electrical" },
  { id: "cable-dx95-x3-b91-b92-1200", name: "Cable DX95:X3 (B91, B92)", fit: "RSB D45", img: asset("/catalog/ee/cable-dx95-x3-b91-b92-1200.png"), category: "electrical" },
  { id: "magnetic-sensor-rotor-1201", name: "Magnetic Sensor & Rotor", fit: "G33 · K44", img: asset("/catalog/ee/magnetic-sensor-rotor-1201.png"), category: "electrical" },
  { id: "b3-b4-b40-b41-b43-1202", name: "B3 · B4 · B40 · B41 · B43", fit: "RSB D40 · D45", img: asset("/catalog/ee/b3-b4-b40-b41-b43-1202.png"), category: "electrical" },
  { id: "b4-initiator-1203", name: "B4 Initiator", fit: "RSB D40 · D45", img: asset("/catalog/ee/b4-initiator-1203.png"), category: "electrical" },
  { id: "b24-light-scanner-1210", name: "B24 Light Scanner", fit: "RSB D35 · D40 · D45", img: asset("/catalog/ee/b24-light-scanner-1210.png"), category: "electrical" },
  { id: "b24-light-scanner-1211", name: "B24 Light Scanner", fit: "RSB D45 · D24", img: asset("/catalog/ee/b24-light-scanner-1211.png"), category: "electrical" },
  { id: "servo-motor-encoder-1212", name: "Servo Motor Encoder", fit: "RSB D45", img: asset("/catalog/ee/servo-motor-encoder-1212.png"), category: "electrical" },
  { id: "servomotor-encoder-1213", name: "Servomotor Encoder", fit: "RSB D35 · D40", img: asset("/catalog/ee/servomotor-encoder-1213.png"), category: "electrical" },
  { id: "b2-sensor-1220", name: "B2 Sensor", fit: "RSB 851 · 951", img: asset("/catalog/ee/b2-sensor-1220.png"), category: "electrical" },
  { id: "b10-photo-sensor-unit-1221", name: "B10 Photo Sensor Unit", fit: "RSB 851 · 951", img: asset("/catalog/ee/b10-photo-sensor-unit-1221.png"), category: "electrical" },
  { id: "b91-tacho-generator-1222", name: "B91 Tacho Generator", fit: "RSB 851 · 951", img: asset("/catalog/ee/b91-tacho-generator-1222.png"), category: "electrical" },
  { id: "b93-tacho-generator-1223", name: "B93 Tacho Generator", fit: "RSB 851 · 951", img: asset("/catalog/ee/b93-tacho-generator-1223.png"), category: "electrical" },
  { id: "measuring-unit-1230", name: "Measuring Unit", fit: "Carding C60", img: asset("/catalog/ee/measuring-unit-1230.png"), category: "electrical" },
  { id: "ultrasonic-sensor-1231", name: "Ultrasonic Sensor", fit: "Unilap E35", img: asset("/catalog/ee/ultrasonic-sensor-1231.png"), category: "electrical" },
  { id: "ultrasonic-sensor-1232", name: "Ultrasonic Sensor", fit: "Unifloc A11", img: asset("/catalog/ee/ultrasonic-sensor-1232.png"), category: "electrical" },
  { id: "measuring-unit-1233", name: "Measuring Unit", fit: "Carding C60", img: asset("/catalog/ee/measuring-unit-1233.png"), category: "electrical" },
  { id: "a10-sensor-module-ee00", name: "A10 Sensor Module", fit: "RSB D22", img: asset("/catalog/ee/a10-sensor-module-ee00.png"), category: "electrical" },
  { id: "b50-measuring-unit-ee01", name: "B50 Measuring Unit", fit: "RSB D30 · D35", img: asset("/catalog/ee/b50-measuring-unit-ee01.png"), category: "electrical" },
  { id: "b50-output-cable-ee02", name: "B50 Output Cable", fit: "RSB D30 · D35", img: asset("/catalog/ee/b50-output-cable-ee02.png"), category: "electrical" },
  { id: "b90-measuring-unit-ee03", name: "B90 Measuring Unit", fit: "RSB 851 · 951", img: asset("/catalog/ee/b90-measuring-unit-ee03.png"), category: "electrical" },
  { id: "b90-measuring-unit-ee04", name: "B90 Measuring Unit", fit: "RSB D30 · D35", img: asset("/catalog/ee/b90-measuring-unit-ee04.png"), category: "electrical" },
  { id: "b90-output-cable-ee05", name: "B90 Output Cable", fit: "RSB D30 · D35", img: asset("/catalog/ee/b90-output-cable-ee05.png"), category: "electrical" },
  { id: "cable-kpl-gm-ee06", name: "Cable KPL GM", fit: "D95 · X3", img: asset("/catalog/ee/cable-kpl-gm-ee06.png"), category: "electrical" },
  { id: "can-bus-controller-ee07", name: "Can Bus Controller", fit: "Unilap & Comber", img: asset("/catalog/ee/can-bus-controller-ee07.png"), category: "electrical" },
  { id: "circulating-pump-ee08", name: "Circulating Pump", fit: "K44 Machine", img: asset("/catalog/ee/circulating-pump-ee08.png"), category: "electrical" },
  { id: "clutch-24vdc-200nm-ee09", name: "Clutch 24VDC 200NM", fit: "Unilap E32", img: asset("/catalog/ee/clutch-24vdc-200nm-ee09.png"), category: "electrical" },
  { id: "creel-sensor-cable-ee10", name: "Creel Sensor Cable", fit: "Omega Lap E35", img: asset("/catalog/ee/creel-sensor-cable-ee10.png"), category: "electrical" },
  { id: "d295-control-dsp-board-ee11", name: "D295 Control DSP Board", fit: "RSB D30 · D35", img: asset("/catalog/ee/d295-control-dsp-board-ee11.png"), category: "electrical" },
  { id: "d90-mother-board-ee12", name: "D90 Mother Board", fit: "RSB D30 · D35", img: asset("/catalog/ee/d90-mother-board-ee12.png"), category: "electrical" },
  { id: "digital-input-module-ee13", name: "Digital Input Module", fit: "Comber Machine", img: asset("/catalog/ee/digital-input-module-ee13.png"), category: "electrical" },
  { id: "distance-sensor-on-ee14", name: "Distance Sensor ON", fit: "RSB D30 · D35", img: asset("/catalog/ee/distance-sensor-on-ee14.png"), category: "electrical" },
  { id: "electromagnetic-clutch-ee15", name: "Electromagnetic Clutch", fit: "RSB D45", img: asset("/catalog/ee/electromagnetic-clutch-ee15.png"), category: "electrical" },
  { id: "encoder-24-v-100-imp-ee16", name: "Encoder 24 V = 100 IMP", fit: "G33 · K44", img: asset("/catalog/ee/encoder-24-v-100-imp-ee16.png"), category: "electrical" },
  { id: "h40-flashing-light-ee17", name: "H40 Flashing Light", fit: "RSB D22 · D24", img: asset("/catalog/ee/h40-flashing-light-ee17.png"), category: "electrical" },
  { id: "h41-flashing-light-ee18", name: "H41 Flashing Light", fit: "RSB 851 · 951 SB 2", img: asset("/catalog/ee/h41-flashing-light-ee18.png"), category: "electrical" },
  { id: "initiator-pnp-ee19", name: "Initiator PNP", fit: "Carding C70", img: asset("/catalog/ee/initiator-pnp-ee19.png"), category: "electrical" },
  { id: "initiator-pnp-ee20", name: "Initiator PNP", fit: "Comber E65 · E86", img: asset("/catalog/ee/initiator-pnp-ee20.png"), category: "electrical" },
  { id: "initiator-pnp-ee21", name: "Initiator PNP", fit: "Unilap E35", img: asset("/catalog/ee/initiator-pnp-ee21.png"), category: "electrical" },
  { id: "initiator-pnp-with-cable-ee22", name: "Initiator PNP with Cable", fit: "Unilap E32", img: asset("/catalog/ee/initiator-pnp-with-cable-ee22.png"), category: "electrical" },
  { id: "interface-can-open-ee23", name: "Interface Can Open", fit: "RSB D24 · D45", img: asset("/catalog/ee/interface-can-open-ee23.png"), category: "electrical" },
  { id: "k4-timer-ee24", name: "K4 Timer", fit: "RSB 851 · 951", img: asset("/catalog/ee/k4-timer-ee24.png"), category: "electrical" },
  { id: "lcd-display-ee25", name: "LCD Display", fit: "RSB D40 · D45", img: asset("/catalog/ee/lcd-display-ee25.png"), category: "electrical" },
  { id: "light-barrier-rlk-ee26", name: "Light Barrier RLK", fit: "RSB D22", img: asset("/catalog/ee/light-barrier-rlk-ee26.png"), category: "electrical" },
  { id: "light-scanner-pnp-ee27", name: "Light Scanner PNP", fit: "Comber Machine", img: asset("/catalog/ee/light-scanner-pnp-ee27.png"), category: "electrical" },
  { id: "light-scanner-pnp-ee28", name: "Light Scanner PNP", fit: "Uniflex B60", img: asset("/catalog/ee/light-scanner-pnp-ee28.png"), category: "electrical" },
  { id: "light-transmitter-pnp-ee29", name: "Light Transmitter PNP", fit: "Comber Machine", img: asset("/catalog/ee/light-transmitter-pnp-ee29.png"), category: "electrical" },
  { id: "limit-switch-ee30", name: "Limit Switch", fit: "RSB D30 · D35", img: asset("/catalog/ee/limit-switch-ee30.png"), category: "electrical" },
  { id: "limit-switch-20e-ee31", name: "Limit Switch 20E", fit: "RSB D50", img: asset("/catalog/ee/limit-switch-20e-ee31.png"), category: "electrical" },
  { id: "magnet-ee32", name: "Magnet", fit: "Unifloc A11", img: asset("/catalog/ee/magnet-ee32.png"), category: "electrical" },
  { id: "magnetic-switch-reed-ee33", name: "Magnetic Switch Reed", fit: "Comber · Unilap", img: asset("/catalog/ee/magnetic-switch-reed-ee33.png"), category: "electrical" },
  { id: "module-16-eingaenge-ee35", name: "Module 16 Eingaenge", fit: "RSB D35 · D40 · D45 · D24", img: asset("/catalog/ee/module-16-eingaenge-ee35.png"), category: "electrical" },
  { id: "motor-1-5-kw-220-420-ee36", name: "Motor 1.5 KW 220-420", fit: "RSB D22", img: asset("/catalog/ee/motor-1-5-kw-220-420-ee36.png"), category: "electrical" },
  { id: "n1-n2-stop-motion-unit-ee37", name: "N1 N2 Stop Motion Unit", fit: "RSB D30 · D35", img: asset("/catalog/ee/n1-n2-stop-motion-unit-ee37.png"), category: "electrical" },
  { id: "n3-sensor-module-ee38", name: "N3 Sensor Module", fit: "RSB D30", img: asset("/catalog/ee/n3-sensor-module-ee38.png"), category: "electrical" },
  { id: "n3-n4-n5-stop-motion-ee39", name: "N3 N4 N5 Stop Motion", fit: "RSB 851 · 951", img: asset("/catalog/ee/n3-n4-n5-stop-motion-ee39.png"), category: "electrical" },
  { id: "p3-power-supply-pcb-ee40", name: "P3 Power Supply PCB", fit: "RSB D30 · D35", img: asset("/catalog/ee/p3-power-supply-pcb-ee40.png"), category: "electrical" },
  { id: "p44-data-storage-pcb-ee41", name: "P44 Data Storage PCB", fit: "RSB D30 · D35", img: asset("/catalog/ee/p44-data-storage-pcb-ee41.png"), category: "electrical" },
  { id: "p53-sollwert-pcb-ee42", name: "P53 Sollwert PCB", fit: "RSB D30 · D35", img: asset("/catalog/ee/p53-sollwert-pcb-ee42.png"), category: "electrical" },
  { id: "photocell-pnp-24vdc-ee43", name: "Photocell PNP 24VDC", fit: "Comber Machine", img: asset("/catalog/ee/photocell-pnp-24vdc-ee43.png"), category: "electrical" },
  { id: "pillar-lamp-ee44", name: "Pillar Lamp", fit: "RSB 851 · 951 SB 2", img: asset("/catalog/ee/pillar-lamp-ee44.png"), category: "electrical" },
  { id: "power-supply-unit-ee45", name: "Power Supply Unit", fit: "A79 · C60 · E35", img: asset("/catalog/ee/power-supply-unit-ee45.png"), category: "electrical" },
  { id: "proximity-switch-ee46", name: "Proximity Switch", fit: "E32 · E65", img: asset("/catalog/ee/proximity-switch-ee46.png"), category: "electrical" },
  { id: "proximity-switch-ee47", name: "Proximity Switch", fit: "Unilap E32", img: asset("/catalog/ee/proximity-switch-ee47.png"), category: "electrical" },
  { id: "rectifier-275vac-2a-ee49", name: "Rectifier 275VAC 2A", fit: "Comber Machine", img: asset("/catalog/ee/rectifier-275vac-2a-ee49.png"), category: "electrical" },
  { id: "reflecting-light-barrier-ee50", name: "Reflecting Light Barrier", fit: "Carding C60", img: asset("/catalog/ee/reflecting-light-barrier-ee50.png"), category: "electrical" },
  { id: "reflecting-light-barrier-ee51", name: "Reflecting Light Barrier", fit: "Comber Machine", img: asset("/catalog/ee/reflecting-light-barrier-ee51.png"), category: "electrical" },
  { id: "reflecting-light-barrier-ee52", name: "Reflecting Light Barrier", fit: "G33 · K44", img: asset("/catalog/ee/reflecting-light-barrier-ee52.png"), category: "electrical" },
  { id: "relay-combi-3t-ee53", name: "Relay Combi - 3T", fit: "RSB 851 · 951", img: asset("/catalog/ee/relay-combi-3t-ee53.png"), category: "electrical" },
  { id: "s20-limit-switch-ee54", name: "S20 Limit Switch", fit: "RSB D24", img: asset("/catalog/ee/s20-limit-switch-ee54.png"), category: "electrical" },
  { id: "s25-limit-switch-ee55", name: "S25 Limit Switch", fit: "RSB 851 · 951 · SB 2", img: asset("/catalog/ee/s25-limit-switch-ee55.png"), category: "electrical" },
  { id: "s42-limit-switch-ee56", name: "S42 Limit Switch", fit: "RSB 851 · 951 SB 2", img: asset("/catalog/ee/s42-limit-switch-ee56.png"), category: "electrical" },
  { id: "s42-safety-limit-switch-ee57", name: "S42 Safety Limit Switch", fit: "Unilap · Comber", img: asset("/catalog/ee/s42-safety-limit-switch-ee57.png"), category: "electrical" },
  { id: "s44-limit-switch-ee58", name: "S44 Limit Switch", fit: "RSB 851 · 951 · SB 2", img: asset("/catalog/ee/s44-limit-switch-ee58.png"), category: "electrical" },
  { id: "scu-cpu-386ex-module-ee59", name: "SCU-CPU 386EX Module", fit: "Carding C60", img: asset("/catalog/ee/scu-cpu-386ex-module-ee59.png"), category: "electrical" },
  { id: "signal-lamp-dc-24v-ee60", name: "Signal Lamp DC 24V", fit: "RSB D40 · D45", img: asset("/catalog/ee/signal-lamp-dc-24v-ee60.png"), category: "electrical" },
  { id: "single-head-monitoring-ee61", name: "Single Head Monitoring", fit: "Comber Machine", img: asset("/catalog/ee/single-head-monitoring-ee61.png"), category: "electrical" },
  { id: "sliver-monitoring-ee62", name: "Sliver Monitoring", fit: "RSB D30 · D35", img: asset("/catalog/ee/sliver-monitoring-ee62.png"), category: "electrical" },
  { id: "veeder-root-keypad-ee63", name: "Veeder Root Keypad", fit: "RSB 851 · 951", img: asset("/catalog/ee/veeder-root-keypad-ee63.png"), category: "electrical" },
  { id: "vfd-display-ee64", name: "VFD Display", fit: "RSB D30", img: asset("/catalog/ee/vfd-display-ee64.png"), category: "electrical" },
  { id: "x94-connector-m-f-ee65", name: "X94 Connector M F", fit: "RSB 51 · 851 · 951", img: asset("/catalog/ee/x94-connector-m-f-ee65.png"), category: "electrical" },
  { id: "y90-brake-coil-ee66", name: "Y90 Brake Coil", fit: "RSB D35", img: asset("/catalog/ee/y90-brake-coil-ee66.png"), category: "electrical" },
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
  ["Top Roller", "RSB 851", "pg48_20.png"],
  ["Top Roller", "RSB D30", "pg48_30.png"],
  ["Top Roller", "RSB D50", "pg48_23.png"],
  ["Unilap Top Roller", "RSB D30 · D35", "pg48_31.png"],
  ["Comber Drafting Top Roller", "RSB D30 · D35", "pg48_32.png"],
  ["Detaching Top Roller", "RSB D30 · D35", "pg48_33.png"],
].map(([name, fit, file], i) => ({
  id: `${slugify(name)}-tr${i}`,
  name,
  fit,
  img: asset(`/catalog/${file}`),
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
    count: "1000+",
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
