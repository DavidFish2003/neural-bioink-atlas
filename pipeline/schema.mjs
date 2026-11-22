// JSON schema the extraction agent must fill for every paper.
// Every numeric field is nullable: the agent is told to leave a value null rather than guess.

const str = { type: "string" };
const nullableStr = { type: ["string", "null"] };
const nullableNum = { type: ["number", "null"] };
const strList = { type: "array", items: str };

export const CELL_SOURCES = [
  "human iPSC-derived", "human ESC-derived", "human MSC", "human primary/fetal",
  "rodent primary", "cell line", "other", "acellular",
];
export const PRINT_METHODS = [
  "extrusion (pneumatic)", "extrusion (mechanical/piston)", "coaxial extrusion",
  "embedded/suspension bath", "microfluidic printhead", "inkjet/droplet", "light-based (DLP/SLA)",
  "laser-assisted", "other", "not reported",
];
export const APPLICATIONS = [
  "disease model", "drug screening", "regeneration/implant", "basic neurobiology", "method/protocol",
];

const formulation = {
  type: "object",
  additionalProperties: false,
  required: [
    "name", "base_materials", "material_class", "composition_detail", "crosslinking", "additives",
    "cell_type", "cell_source", "cell_density", "printer", "print_method", "nozzle",
    "pressure_kpa", "print_speed_mm_s", "stiffness_kpa", "stiffness_note",
    "viability_percent", "viability_day", "viability_assay", "culture_days",
    "neural_markers", "key_outcome", "application", "disease", "evidence", "confidence", "review_notes",
  ],
  properties: {
    name: { ...str, description: "Short label for this formulation/condition as the paper names it, e.g. 'Fibrin + RA microspheres'." },
    base_materials: { ...strList, description: "Hydrogel/polymer components, normalized names, e.g. ['fibrinogen','alginate','genipin']." },
    material_class: { type: "string", enum: ["natural", "synthetic", "hybrid natural-synthetic", "decellularized matrix", "composite with nanomaterial"] },
    composition_detail: { ...str, description: "Concentrations as reported, e.g. '1.5% alginate, 20 mg/mL fibrinogen'." },
    crosslinking: { ...nullableStr, description: "Crosslinking agent and method, e.g. 'CaCl2 + thrombin bath'." },
    additives: { ...strList, description: "Drugs, growth factors, microspheres, nanoparticles, ECM peptides added to the ink." },
    cell_type: { ...str, description: "Cells printed, e.g. 'neural progenitor cells', 'astrocytes'. 'none' if acellular." },
    cell_source: { type: "string", enum: CELL_SOURCES },
    cell_density: { ...nullableStr, description: "As reported, e.g. '5 x 10^6 cells/mL'." },
    printer: { ...nullableStr, description: "Printer model, e.g. 'BIO X (Cellink)', 'Aspect RX1'." },
    print_method: { type: "string", enum: PRINT_METHODS },
    nozzle: { ...nullableStr, description: "Nozzle gauge or diameter as reported." },
    pressure_kpa: { ...nullableNum, description: "Printing pressure in kPa (convert psi x 6.895, bar x 100). Null if not reported." },
    print_speed_mm_s: { ...nullableNum, description: "Print speed in mm/s (convert mm/min / 60)." },
    stiffness_kpa: { ...nullableNum, description: "Elastic/compressive/storage modulus of the construct in kPa, if measured." },
    stiffness_note: { ...nullableStr, description: "Which modulus and how measured, e.g. 'storage modulus G', rheology, day 1'." },
    viability_percent: { ...nullableNum, description: "Cell viability (%) after printing. Use the main reported value; null if only shown in a figure without a number." },
    viability_day: { ...nullableNum, description: "Day post-printing when that viability was measured." },
    viability_assay: { ...nullableStr, description: "e.g. 'Live/Dead (calcein-AM/EthD-1)', 'PrestoBlue'." },
    culture_days: { ...nullableNum, description: "Longest culture duration reported for the printed construct, in days." },
    neural_markers: { ...strList, description: "Markers used to show neural identity/maturation, e.g. ['TUJ1','MAP2','GFAP','TH']." },
    key_outcome: { ...str, description: "One sentence: the main finding for this formulation." },
    application: { type: "string", enum: APPLICATIONS },
    disease: { ...nullableStr, description: "Disease modelled, e.g. \"Alzheimer's disease\", or null." },
    evidence: {
      type: "array",
      description: "Verbatim quotes from the paper supporting the numeric and material fields. Copy text exactly; keep each under 300 characters.",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["field", "quote"],
        properties: { field: str, quote: str },
      },
    },
    confidence: { type: "string", enum: ["high", "medium", "low"] },
    review_notes: { ...nullableStr, description: "Anything a human reviewer should double-check (ambiguous units, values only in figures, etc.)." },
  },
};

export const extractionSchema = {
  type: "object",
  additionalProperties: false,
  required: ["paper_type", "is_neural_bioprinting", "summary", "formulations"],
  properties: {
    paper_type: { type: "string", enum: ["primary research", "protocol", "review", "other"] },
    is_neural_bioprinting: { type: "boolean", description: "True if the paper bioprints neural/glial cells or neural tissue models." },
    summary: { ...str, description: "Two-sentence plain-language summary of the paper." },
    formulations: { type: "array", items: formulation, description: "One entry per distinct bioink formulation x cell type tested. Empty for reviews." },
  },
};
