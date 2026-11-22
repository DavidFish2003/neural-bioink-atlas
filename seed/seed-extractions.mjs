// Seed extractions written during the initial build (by Claude in a Claude Code session) from
// the open-access full texts in data/papers/. Same schema the API agent produces; the build step
// re-verifies every quote against the paper text. Values not stated in the text are left null.
// Run: node seed/seed-extractions.mjs   (then: npm run build)
import fs from "node:fs";

const F = (o) => ({
  crosslinking: null, additives: [], cell_density: null, printer: null, nozzle: null,
  pressure_kpa: null, print_speed_mm_s: null, stiffness_kpa: null, stiffness_note: null,
  viability_percent: null, viability_day: null, viability_assay: null, culture_days: null,
  neural_markers: [], disease: null, review_notes: null, confidence: "high", ...o,
});

const fibrinInk = ["fibrinogen", "alginate", "genipin"];
const fibrinXL = "CaCl2 + chitosan + thrombin crosslinker, co-extruded in microfluidic printhead";

const papers = {
  PMC10207712: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Healthy and Alzheimer's patient-derived hiPSC neural progenitors were bioprinted in a fibrin-based bioink on the Aspect RX1 microfluidic printer, with or without drug-releasing PCL microspheres. Constructs stayed viable for 30-45 days and were characterized for viability, markers and calcium signalling.",
    formulations: [
      F({ name: "Fibrin bioink (AD, no microspheres)", base_materials: fibrinInk, material_class: "natural",
        composition_detail: "20 mg/mL fibrinogen, 0.5% w/v alginate, 0.3 mg/mL genipin", crosslinking: fibrinXL,
        cell_type: "neural progenitor cells (basal forebrain cholinergic neuron differentiation)", cell_source: "human iPSC-derived",
        cell_density: "1 x 10^6 cells/mL", printer: "Aspect RX1", print_method: "microfluidic printhead",
        pressure_kpa: 9, print_speed_mm_s: 25, viability_percent: 83.78, viability_day: 1, culture_days: 45,
        key_outcome: "Viability 83.8% on day 1 and 78.8% on day 30 for AD constructs without microspheres.",
        application: "disease model", disease: "Alzheimer's disease",
        review_notes: "Pressure converted from 90 mbar (bioink channel); crosslinker 100 mbar, buffer 500 mbar.",
        evidence: [
          { field: "composition", quote: "fibrinogen (cat no. 341578, EMD Millipore, Burlington, MA, USA) was prepared at a concentration of 20 mg/mL, 0.5% w/v sodium alginate" },
          { field: "cell_density", quote: "mixed with the primed neural progenitor cells (NPCs) at a concentration of 1 × 106 cells/mL of bioink" },
          { field: "pressure_kpa", quote: "The pressures were set at 100 mbar, 90 mbar, and 500 mbar for the crosslinker, bioink, and buffer, respectively." },
          { field: "print_speed", quote: "A printing speed of 25 mm/s and a 40% rectilinear infill pattern were used" },
          { field: "viability_percent", quote: "On day 1 directly after bioprinting, cell viability for the AD C group was 83.78 ± 4.96%" },
        ] }),
      F({ name: "Fibrin bioink + purmorphamine PCL microspheres (AD)", base_materials: fibrinInk, material_class: "natural",
        composition_detail: "20 mg/mL fibrinogen, 0.5% w/v alginate, 0.3 mg/mL genipin; PCL microspheres 1 mg/mL", crosslinking: fibrinXL,
        additives: ["purmorphamine-loaded PCL microspheres"],
        cell_type: "neural progenitor cells (basal forebrain cholinergic neuron differentiation)", cell_source: "human iPSC-derived",
        cell_density: "1 x 10^6 cells/mL", printer: "Aspect RX1", print_method: "microfluidic printhead",
        pressure_kpa: 9, print_speed_mm_s: 25, viability_percent: 92.16, viability_day: 1, culture_days: 45,
        key_outcome: "Microspheres raised day-1 viability to 92.2%, but viability fell to 43.9% by day 30.",
        application: "disease model", disease: "Alzheimer's disease",
        review_notes: "Pressure converted from 90 mbar. The large day-30 drop vs. the no-microsphere group is worth discussing with the authors.",
        evidence: [
          { field: "additives", quote: "The bioink including cells and PCL microspheres encapsulated with puro were used to print tissue constructs." },
          { field: "pressure_kpa", quote: "The pressures were set at 100 mbar, 90 mbar, and 500 mbar for the crosslinker, bioink, and buffer, respectively." },
          { field: "print_speed", quote: "A printing speed of 25 mm/s and a 40% rectilinear infill pattern were used" },
          { field: "viability_percent", quote: "AD CM had a viability of 92.16 ± 5.94%" },
          { field: "viability_percent (day 30)", quote: "the AD CM group with a viability of 43.92 ± 12.52%" },
        ] }),
    ],
  },
  PMC8394541: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Adipose-derived mesenchymal stem cells were bioprinted in the lab's fibrin-based bioink on the RX1 printer and differentiated toward dopaminergic neurons for 12 days. Cells expressed TH and TUJ1 and released dopamine.",
    formulations: [
      F({ name: "Fibrin bioink (MSC to dopaminergic neurons)", base_materials: fibrinInk, material_class: "natural",
        composition_detail: "20 mg/mL fibrinogen, 0.5% w/v alginate, 0.3 mg/mL genipin", crosslinking: fibrinXL,
        cell_type: "mesenchymal stem cells differentiated to dopaminergic neurons", cell_source: "human MSC",
        cell_density: "2 x 10^6 cells/mL", printer: "Aspect RX1", print_method: "microfluidic printhead",
        pressure_kpa: 5, print_speed_mm_s: 25, stiffness_kpa: 1, stiffness_note: "elastic modulus ~1 kPa", culture_days: 12,
        neural_markers: ["TH", "TUJ1"], key_outcome: "Printed MSCs expressed TH and TUJ1 after 12 days of dopaminergic induction.",
        application: "disease model", disease: "Parkinson's disease",
        review_notes: "Pressure converted from 50 mbar (bioink channel). Viability is reported in figures; no single number in the text.",
        evidence: [
          { field: "composition", quote: "The final concentration in the bioink for fibrinogen, sodium alginate, and genipin was 20 mg/mL, 0.5% w/v, and 0.3 mg/mL, respectively." },
          { field: "cell_density", quote: "The MSCs were then thawed and mixed with the bioink at a concentration of 2 × 106 per 1 mL of bioink." },
          { field: "pressure_kpa", quote: "The pressure of the crosslinker, bioink and buffer were 60 mbar, 50 mbar, and 100 mbar, respectively." },
          { field: "print_speed", quote: "The printing speed was 25 mm/s" },
          { field: "stiffness_kpa", quote: "the elastic modulus was around 1 kPa, which is the optimal stiffness for neuronal differentiation" },
        ] }),
    ],
  },
  PMC7026266: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "hiPSC-derived neural progenitors were printed in a fibrin bioink containing guggulsterone-releasing microspheres on the RX1 printer. Tissues were over 90% viable and expressed dopaminergic and glial markers after 30 days.",
    formulations: [
      ["GM", 92, "guggulsterone-loaded microspheres", "Guggulsterone microspheres gave the highest day-7 viability (98%) and supported TH+ dopaminergic neurons at day 30."],
      ["UM", 78, "unloaded microspheres", "Unloaded microspheres: 78% viability on day 1, 94% on day 7."],
      ["SG", 89, "soluble guggulsterone (no microspheres)", "Soluble drug: 89% viability on day 1, 91% on day 7."],
    ].map(([g, v, add, outcome]) => F({ name: `Fibrin bioink + ${add} (${g})`, base_materials: fibrinInk, material_class: "natural",
      composition_detail: "20 mg/mL fibrinogen, 0.5% w/v alginate, 0.3 mg/mL genipin", crosslinking: fibrinXL,
      additives: [add], cell_type: "neural progenitor cells (dopaminergic differentiation)", cell_source: "human iPSC-derived",
      cell_density: "1 x 10^6 cells/mL", printer: "Aspect RX1", print_method: "microfluidic printhead",
      pressure_kpa: 5, print_speed_mm_s: 25, viability_percent: v, viability_day: 1, culture_days: 30,
      neural_markers: ["TUJ1", "FOXA2", "TH", "GFAP", "O4"], key_outcome: outcome,
      application: "disease model", disease: "Parkinson's disease",
      review_notes: "Pressure converted from 50 mbar (bioink channel). Marker percentages are reported for the construct overall.",
      evidence: [
        { field: "composition", quote: "NPCs at a concentration of 1 million cells/mL were thawed and resuspended in the bioink composed of 20 mg/mL of fibrinogen" },
        { field: "pressure_kpa", quote: "The printing speed used was 25 mm/s and pressure for bioink, crosslinker and buffer channels were 50 mbar, 60 mbar, and 100 mbar, respectively." },
        { field: "viability_percent", quote: "Constructs from all groups showed high viability 1-day post-printing: GM (92 ± 3%), UM (78 ± 11%), SG (89 ± 2%)" },
        { field: "viability_percent (day 7)", quote: "The GM group exhibited the highest level of viability on day 7 (98 ± 1%)" },
      ] })),
  },
  PMC12080301: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "All-trans retinoic acid-loaded PCL microparticles were made with microfluidics and mixed into a fibrin bioink printed on a BIO X into an agarose support bath. The study measured how the microparticles change the ink's rheology and drug release.",
    formulations: [
      F({ name: "Fibrin bioink + atRA-PCL microparticles (acellular)", base_materials: fibrinInk, material_class: "natural",
        composition_detail: "20 mg/mL fibrinogen, 0.3 mg/mL genipin, 1% w/v alginate", crosslinking: "chitosan crosslinker (0.075% w/v), printed into 0.5% agarose support bath",
        additives: ["all-trans retinoic acid PCL microparticles"], cell_type: "none", cell_source: "acellular",
        printer: "BIO X", print_method: "embedded/suspension bath", pressure_kpa: 15, print_speed_mm_s: 11,
        stiffness_note: "storage/loss modulus by rheology (figure only)",
        key_outcome: "Microparticles altered the fibrin ink's viscoelastic properties, a material-design step toward built-in neural differentiation cues.",
        application: "method/protocol", confidence: "medium",
        review_notes: "The methods sentence swaps units ('pressure ... 11 mm s−1 and the speed to 15 kPa'). Recorded as 15 kPa pressure and 11 mm/s speed; confirm with the authors.",
        evidence: [
          { field: "composition", quote: "the final concentration in the bioink was: 20 mg mL−1 fibrinogen, 0.3 mg mL−1 genipin and 1% w/v sodium alginate" },
          { field: "pressure_kpa / print_speed", quote: "For all prints, the pressure was set to 11 mm s−1 and the speed to 15 kPa" },
          { field: "printer", quote: "3D printing was performed using a BioX 3D printer" },
        ] }),
    ],
  },
  PMC12422755: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A Geltrex/GelMA blend was used to bioprint human iPSC-derived neural progenitors, which self-organized into neurogenic-niche-like clusters. Constructs stayed viable for over 110 days.",
    formulations: [
      F({ name: "Geltrex / GelMA blend", base_materials: ["Geltrex", "GelMA"], material_class: "natural",
        composition_detail: "8% (w/v) GelMA with Irgacure (0.25% final) blended with Geltrex", crosslinking: "photocrosslinking (Irgacure)",
        cell_type: "neural progenitor cells", cell_source: "human iPSC-derived", printer: "3DBS Educational Starter Printer",
        print_method: "extrusion (mechanical/piston)", nozzle: "22 G (0.413 mm ID)", print_speed_mm_s: 3.3,
        stiffness_kpa: 0.1, stiffness_note: "storage modulus G' ~100 Pa at 1 Hz", culture_days: 110,
        neural_markers: ["FABP7", "NESTIN", "GFAP"],
        key_outcome: "Printed hNPCs self-organized into neurogenic-niche-like clusters and stayed viable for more than 110 days.",
        application: "basic neurobiology", confidence: "medium",
        review_notes: "Viability shown qualitatively; no percentage in the text. Print method inferred from the methods description.",
        evidence: [
          { field: "composition", quote: "An 8% (w/v) GelMA solution was prepared in PBS, and 0.5% (w/v) of the photoinitiator Irgacure was added" },
          { field: "print_speed / nozzle", quote: "The bioink was extruded from a 5 ml syringe at an average printing speed of 3.3 mm/s, using a 22 G needle" },
          { field: "stiffness_kpa", quote: "oscillatory tests indicated that our hydrogel exhibited storage modulus values within this range as a 3D model (∼100 Pa)" },
          { field: "culture_days", quote: "remaining viable for over 110 days" },
        ] }),
    ],
  },
  PMC13044844: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A PVA/alginate hybrid ink was optimized for printability and used to build scaffolds for SH-SY5Y neuroblastoma cells. The hybrid supported viability and ECM formation for 15 days, better than 2D culture.",
    formulations: [
      F({ name: "PVA:ALG hybrid (16% PVA / 15% ALG)", base_materials: ["polyvinyl alcohol", "alginate"], material_class: "hybrid natural-synthetic",
        composition_detail: "16 wt% PVA and 15 wt% alginate, 1:1 v/v", cell_type: "SH-SY5Y neuroblastoma (seeded on printed scaffold)", cell_source: "cell line",
        print_method: "extrusion (pneumatic)", nozzle: "25 G", pressure_kpa: 31.7, print_speed_mm_s: 10,
        stiffness_kpa: 2.34, stiffness_note: "Young's modulus, compression, crosslinked", culture_days: 15,
        key_outcome: "Hybrid scaffolds kept SH-SY5Y cells viable for 15 days, outperforming 2D culture.",
        application: "basic neurobiology",
        review_notes: "Pressure converted from 4.6 psi. Cells were seeded onto printed scaffolds, not printed inside the ink.",
        evidence: [
          { field: "composition / nozzle / pressure", quote: "Further characterizations were carried out using 16% PVA and 15% ALG, while a 25G nozzle and 4.6 psi pressure were utilized for bioprinting." },
          { field: "print_speed", quote: "25G nozzle diameter, 10 mm/s printing speed, and 50% infill density" },
          { field: "stiffness_kpa", quote: "the Young’s modulus increased from 1.6 kPa (N-XD) to 2.34 kPa (XD)" },
          { field: "cell_type", quote: "Neural cell proliferation, viability, and morphology were analyzed by culturing SH-SY5Y human neuroblastoma cells in 3D on hybrid scaffolds." },
        ] }),
    ],
  },
  PMC12376583: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Rat embryonic cortical neurons were printed in GelMA at cortex-like density to form '3D neuMatrix' with long-range axon connections. The model was used to mimic ischemic stroke.",
    formulations: [
      F({ name: "GelMA30 6% (3D neuMatrix)", base_materials: ["GelMA"], material_class: "natural",
        composition_detail: "6% (w/v) GelMA (30% methacrylation) with LAP photoinitiator", crosslinking: "photocrosslinking (LAP)",
        cell_type: "primary cortical neurons (E18)", cell_source: "rodent primary", cell_density: "1.5 x 10^7 cells/mL",
        printer: "SUNP BIOTECH extrusion bioprinter", print_method: "extrusion (pneumatic)", nozzle: "21 G (510 µm ID)", culture_days: 10,
        viability_assay: "Live/Dead + ATP quantification",
        key_outcome: "Printed neurons formed 3D networks with local and long-range functional axon connections; used as an ischemic stroke model.",
        application: "disease model", disease: "ischemic stroke",
        review_notes: "Viability is reported as relative ATP (%) rather than percent live cells, so viability_percent is left null.",
        evidence: [
          { field: "composition / cell_density", quote: "to a final concentration of 1.5×107 cells mL−1 in 6% (w/v) GelMA30" },
          { field: "nozzle", quote: "we have chosen a 21G nozzle with an inner diameter of 510 µm to reduce the shear force" },
          { field: "printer", quote: "The bioprinting process utilized an extrusion‐based bioprinter (SUNP BIOTECH)" },
        ] }),
    ],
  },
  PMC11843594: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A conductive silk-methacrylate/pectin bioink with MXene nanosheets was used to print rat neural stem cell spheroids and stimulate them electrically. The printed conduit also supported sciatic nerve regeneration in rats.",
    formulations: [
      F({ name: "20% SilMA + pectin + MXene-SP (conductive)", base_materials: ["silk fibroin methacrylate", "pectin", "MXene"], material_class: "composite with nanomaterial",
        composition_detail: "20% SilMA series with pectin and SP-modified MXene", crosslinking: "UV photocrosslinking (365 nm)",
        additives: ["MXene nanosheets (SP-modified)"], cell_type: "neural stem cell spheroids", cell_source: "rodent primary",
        print_method: "extrusion (pneumatic)", nozzle: "22 G (0.413 mm)", viability_percent: 80, viability_day: 5,
        viability_assay: "Live/Dead and MTT", key_outcome: "All MXene groups stayed above 80% viability by day 5; softer gels promoted neuronal differentiation.",
        application: "regeneration/implant", confidence: "medium",
        review_notes: "Viability is given as a threshold ('above 80%'). The text gives the pressure range in mm/min (a unit error), so pressure is left null.",
        evidence: [
          { field: "composition", quote: "we selected the 20% SilMA series with SP-modified MXene" },
          { field: "viability_percent", quote: "all groups exhibited cell viability above 80% by day 5" },
          { field: "nozzle", quote: "Extrusion parameters were configured in Ultimaker Cura to match the nozzle size (22g, 0.413 mm)" },
          { field: "cell_source", quote: "Primary cortical NSCs were isolated from embryonic day 16 (ED16) Wistar rat cortices" },
        ] }),
    ],
  },
  PMC12704128: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Optic nerve head astrocytes and endothelial cells were printed at the centre of retinal ganglion cell scaffolds to recreate how the retinal nerve fibre layer develops. Developing astrocytes increased RGC neurite polarization by 43%.",
    formulations: [
      F({ name: "Matrigel (astrocyte core)", base_materials: ["Matrigel"], material_class: "natural",
        composition_detail: "undiluted Matrigel (also screened: 4 mg/mL collagen-1, 1% alginate, 1% alginate-RGD)",
        cell_type: "optic nerve head astrocytes", cell_source: "rodent primary", cell_density: "1-1.5 x 10^6 cells/mL",
        printer: "Allevi 3", print_method: "extrusion (pneumatic)", nozzle: "22 G",
        key_outcome: "Developing ONH astrocytes increased RGC neurite polarization by 43%.",
        application: "basic neurobiology", review_notes: "No viability percentage or print pressure in the text.",
        evidence: [
          { field: "base_materials", quote: "printed using a 22 g needle in four previously published bioinks: undiluted matrigel, 4 mg/mL collagen-1, 1% alginate, and 1% alginate-modified with RGD cell binding domain peptides" },
          { field: "cell_density", quote: "Cells were resuspended in matrigel at 4°C at a concentration of 1–1.5 × 106 cells/mL" },
          { field: "printer", quote: "Bioprinting was conducted using an extrusion-based Allevi 3 bioprinter (3D systems)." },
        ] }),
    ],
  },
  PMC11780150: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A dynamic GelMA/oxidized hyaluronic acid bioink with N-cadherin- and BDNF-mimicking peptides was printed with neural stem cells. The dynamic, bioactive ink sped up neural network self-organization and improved recovery in vivo.",
    formulations: [
      ["G", "5% GelMA", ["GelMA"], [], 91.83, "and G (91.83 ± 2.54 %) constructs"],
      ["GH", "5% GelMA + 1% OHA", ["GelMA", "oxidized hyaluronic acid"], [], 95.52, "higher than that within the GH (95.52 ± 1.97 %)"],
      ["GHP", "5% GelMA + 1% OHA + 3 mM RGI + 3 mM HAVDI", ["GelMA", "oxidized hyaluronic acid"], ["BDNF-mimicking peptide (RGI)", "N-cadherin-mimicking peptide (HAVDI)"], 96.26, "the viability of NSCs within the GHP construct reached 96.26 ± 2.33 %"],
    ].map(([n, comp, mats, add, v, vq]) => F({ name: `${n}: ${comp}`, base_materials: mats, material_class: "natural",
      composition_detail: comp, crosslinking: n === "G" ? "photocrosslinking" : "photocrosslinking + reversible Schiff-base bonds",
      additives: add, cell_type: "neural stem cells", cell_source: "rodent primary", cell_density: "2 x 10^7 cells/mL",
      print_method: "extrusion (pneumatic)", nozzle: "260 µm", pressure_kpa: 5, print_speed_mm_s: 20,
      viability_percent: v, viability_day: 7, culture_days: 7, neural_markers: ["NF", "SYN"],
      key_outcome: n === "GHP" ? "The dynamic peptide ink gave the highest day-7 NSC viability and the fastest neural network formation." : `Day-7 NSC viability ${v}%.`,
      application: "regeneration/implant", confidence: "medium",
      review_notes: "NSCs are from rodent hippocampus; confirm species.",
      evidence: [
        { field: "composition", quote: "G (5 % GelMA), GH (5 % GelMA and 1 % OHA), or GHP (5 % GelMA, 1 % OHA, 3 mM RGI, and 3 mM HAVDI)" },
        { field: "cell_density", quote: "the prepolymer solutions were used to resuspend NSCs (2 × 107 cells/mL) to form a homogeneous bioink" },
        { field: "pressure_kpa / print_speed", quote: "extrusion pressure: 5 kPa; printing speed: 20 mm/s" },
        { field: "viability_percent", quote: vq },
      ] })),
  },
  PMC12822481: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A soft gelatin/alginate/fibrinogen bioink was used to print hiPSC-derived neural progenitors into small dot-shaped hippocampal patches for transplantation. Transplants improved outcomes in a mouse model of Alzheimer's-like dementia.",
    formulations: [
      F({ name: "GEL10: gelatin / alginate / fibrinogen", base_materials: ["gelatin", "alginate", "fibrinogen"], material_class: "natural",
        composition_detail: "2.56% gelatin, 0.14% alginate, 0.57% fibrinogen (w/v)", cell_type: "neural progenitor cells", cell_source: "human iPSC-derived",
        cell_density: "6.67 x 10^6 cells/mL", printer: "BIOMAKER 4 (SUNP BIOTECH)", print_method: "extrusion (mechanical/piston)",
        nozzle: "0.30 mm ID", print_speed_mm_s: 5, stiffness_note: "compressive modulus 1-4 kPa during culture; shear modulus <1 kPa",
        viability_percent: 86.38, viability_day: 0, culture_days: 14,
        key_outcome: "Viability 86.4% after printing and 77.0% at day 14; transplanted patches improved Alzheimer's-like dementia outcomes.",
        application: "regeneration/implant", disease: "Alzheimer's disease",
        review_notes: "Stiffness is reported as a 1-4 kPa range, so stiffness_kpa is left null. Extrusion was volume-controlled (1 mm3/s), not pressure-controlled.",
        evidence: [
          { field: "composition", quote: "The bioink (2.56% gelatin, 0.14% alginate, 0.57% fibrinogen) formed stably and mimicked brain tissue mechanics." },
          { field: "cell_density", quote: "the medium concentration (6.67 × 10⁶ cells·mL−1) was selected for further study" },
          { field: "print_speed", quote: "needle inner diameter of 0.30 mm, printing speed of 5 mm·s−1, and extrusion speed of 1 mm3·s−1" },
          { field: "viability_percent", quote: "demonstrating 86.38 ± 1.25% viability post‐printing that stabilized to 76.99 ± 1.59% by DAY 14" },
        ] }),
    ],
  },
};

fs.mkdirSync("data/extractions", { recursive: true });
for (const [pmcid, data] of Object.entries(papers)) {
  const meta = JSON.parse(fs.readFileSync(`data/papers/${pmcid}.meta.json`, "utf8"));
  const formulations = data.formulations.map((f) => ({ ...f, needs_review: false, review_reasons: [], reviewed: false }));
  fs.writeFileSync(`data/extractions/${pmcid}.json`, JSON.stringify({
    pmcid, meta, extracted_at: new Date().toISOString(),
    extracted_by: "seed: Claude (Claude Code session), pending human review", ...data, formulations,
  }, null, 2));
}
console.log(`wrote ${Object.keys(papers).length} seed extractions`);
