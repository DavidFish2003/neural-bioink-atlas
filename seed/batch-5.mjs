// Batch 5: remaining recent papers, plus papers read and judged out of scope.
import { F, OUT, writeAll } from "./lib.mjs";

writeAll({
  PMC10761197: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Glioma stem cells were printed in a gelatin/alginate scaffold and compared with other 3D settings to study how they form blood vessels. Printed cells stayed about 85% viable over a week.",
    formulations: [F({
      name: "10% gelatin + 1% alginate (glioma stem cells)", base_materials: ["gelatin", "alginate"], material_class: "natural",
      composition_detail: "10% gelatin + 1% sodium alginate", cell_type: "glioma stem cells (GSC23)", cell_source: "cell line",
      cell_density: "2 x 10^5 cells/mL", printer: "Medprin extrusion bioprinter", print_method: "extrusion (pneumatic)",
      viability_percent: 86.65, viability_day: 1, culture_days: 7,
      key_outcome: "Printed GSCs were 86.7% viable on day 1 and 85.3% on day 7, steadier than a cast hybrid hydrogel (65% by day 7).",
      application: "disease model", disease: "glioblastoma",
      evidence: [
        { field: "composition / density", quote: "to reach a final concentration of 10% gelatin, 1% sodium alginate and 2 × 105/ml GSC23 cells" },
        { field: "viability_percent", quote: "the cell viability of GSCs in 3D bioprinted hydrogel scaffold and hybrid hydrogel was 86.65 ± 1.64% and 92.71 ± 1.33%, respectively" },
        { field: "printer", quote: "GSC models were generated using an extrusion bioprinter (Medprin Regenerative Medical Technologies Co., Ltd., Guangzhou, China)" },
      ],
    })],
  },
  PMC11616263: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A hydrogel microphysiological system with a brain-endothelial vessel channel was rapidly printed to co-culture glioblastoma cells and astrocytes, avoiding PDMS so drug tests aren't skewed. It reproduced two GBM cell populations and drug resistance.",
    formulations: [F({
      name: "Fibrin gel (4 mg/mL) in printed microfluidic hydrogel", base_materials: ["fibrinogen"], material_class: "natural",
      composition_detail: "4 mg/mL fibrinogen with 1 U/mL thrombin", crosslinking: "thrombin",
      cell_type: "U87 glioblastoma cells, astrocytes, brain endothelial cells", cell_source: "cell line", print_method: "light-based (DLP/SLA)",
      viability_percent: 80, key_outcome: "All cell types stayed above 80% viable; the model showed GBM heterogeneity and drug resistance.",
      application: "drug screening", disease: "glioblastoma", confidence: "medium",
      review_notes: "Viability is a threshold ('above 80%'). Which parts were printed vs cast should be checked.",
      evidence: [
        { field: "composition", quote: "were used at the final concentration of 4 mg mL−1 and 1 U mL−1, respectively to obtain fibrin gel" },
        { field: "viability_percent", quote: "All the cell types maintain cell viability above 80% while cultured on the 3D‐bioprinted model." },
      ],
    })],
  },
  PMC12027382: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "iPSC-derived embryoid bodies were printed in an alginate/carboxymethylcellulose ink with diluted Matrigel to grow cerebral organoids without manual Matrigel embedding. The organoids reached ~2 mm by day 40, like standard ones.",
    formulations: [F({
      name: "1.5% alginate + 1% CMC + Matrigel (1:10)", base_materials: ["alginate", "carboxymethylcellulose", "Matrigel"], material_class: "natural",
      composition_detail: "1.5% w/v sodium alginate, 1% w/v sodium carboxymethylcellulose, Matrigel diluted 1:10",
      cell_type: "neural embryoid bodies to cerebral organoids", cell_source: "human iPSC-derived", print_method: "extrusion (pneumatic)",
      nozzle: "0.6 mm", pressure_kpa: 40, print_speed_mm_s: 100, culture_days: 40,
      key_outcome: "Printed organoids grew to ~2 mm by day 40, matching Matrigel-embedded organoids with far less Matrigel.",
      application: "disease model",
      review_notes: "Pressure converted from 0.4 bar.",
      evidence: [
        { field: "composition", quote: "the Matrigel® is diluted (1:10) in a solution enriched with 1.5 w/v% sodium alginate (SA), 1 w/v% of sodium carboxymethylcellulose (CMC)" },
        { field: "pressure / speed", quote: "The experimental parameters used for the extrusion printing were a pressure of 0.4 bar, a speed of 100 mm/s, and a needle diameter of 0.6 mm" },
        { field: "outcome", quote: "By day 40, these organoids reached approximately 2 mm in diameter, matching the size observed at the same time point in Matrigel®-based cORGs." },
      ],
    })],
  },
  PMC12648946: {
    paper_type: "protocol", is_neural_bioprinting: true,
    summary: "A protocol that prints droplets of extracellular matrix to confine human pluripotent stem cells, so they self-assemble into single-lumen, neural-tube-like neuroepithelial tissues.",
    formulations: [F({
      name: "Cultrex ECM droplets (micropatterning)", base_materials: ["Cultrex basement membrane extract"], material_class: "natural",
      composition_detail: "Cultrex basement membrane extract printed as droplets", cell_type: "pluripotent stem cells to neuroepithelium",
      cell_source: "other", print_method: "extrusion (pneumatic)", nozzle: "27 G (0.200 mm)", pressure_kpa: 20, print_speed_mm_s: 15,
      key_outcome: "Printed ECM droplets restrict hPSC growth to start single-lumen neural tube-like tissues.",
      application: "method/protocol", review_notes: "Matrix is printed; cells are seeded onto the printed droplets.",
      evidence: [
        { field: "nozzle", quote: "Nozzle type: 27 gauge (0.200 mm);" },
        { field: "pressure_kpa", quote: "Pressure: 20 kPa;" },
        { field: "print_speed", quote: "Print speed: 15.0 mm/s;" },
      ],
    })],
  },
  PMC12935268: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A simple capillary 'bioprinter' deposited human neural stem cells in small alginate gel spots onto electrospun fibre mats, giving control over where cells sit.",
    formulations: [F({
      name: "Alginate gel spots on electrospun fibres", base_materials: ["alginate"], material_class: "natural",
      composition_detail: "Alginate gelled in 20 mM Ca2+ medium; later removed with alginate lyase", crosslinking: "20 mM Ca2+, then alginate lyase",
      cell_type: "neural stem cells", cell_source: "other", print_method: "other",
      key_outcome: "Gel-encapsulated deposition placed hNSCs precisely on fibre substrates at low cost.",
      application: "method/protocol", confidence: "medium",
      review_notes: "Alginate concentration and NSC source not captured.",
      evidence: [
        { field: "crosslinking", quote: "the fiber substrate is soaked in a small volume of medium containing 20 mM Ca2+" },
        { field: "method", quote: "we opted for a simpler approach where the nozzle remained stationary and only injected a single population of cells" },
      ],
    })],
  },
  PMC7676439: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A custom ultra-low-cost bioprinter was built and tested with mouse radial glial neural stem cells and mesenchymal stem cells in alginate/gelatin inks; cells grew and kept their ability to differentiate.",
    formulations: [F({
      name: "0.8% alginate + 0.5% gelatin (radial glia)", base_materials: ["alginate", "gelatin"], material_class: "natural",
      composition_detail: "0.8% w/v sodium alginate + 0.5% w/v gelatin", crosslinking: "CaCl2",
      cell_type: "radial glial neural stem cells", cell_source: "rodent primary", printer: "custom ultra-low-cost bioprinter",
      print_method: "extrusion (mechanical/piston)", nozzle: "25 G (0.26 mm)",
      key_outcome: "A very cheap custom printer supported neural stem cell growth and differentiation.",
      application: "method/protocol",
      evidence: [
        { field: "composition", quote: "a 0.8% (w/v) sodium alginate and 0.5% (w/v) gelatin bioink was synthesized for the pRGCs" },
        { field: "nozzle", quote: "in this case a 25-gauge needle with 0.26 mm diameter" },
        { field: "cells", quote: "primary radial glial (pRGCs) stem cells, a neural stem cell population derived from mice subventricular zone" },
      ],
    })],
  },
  // Read and judged out of scope:
  PMC11834377: OUT("primary research", "Bioprinted cartilage microtissue; neuro-immune effects studied, but not a neural tissue model."),
  PMC13398944: OUT("primary research", "Bone regeneration scaffold with printed alginate microfibres; nerve effects studied in bone, not a neural tissue model."),
  PMC7198818: OUT("primary research", "Protein-engineered hydrogels printed as tissue-on-chip with endothelial and breast cells; not neural."),
  PMC12826543: OUT("primary research", "Light-based printing of drug-secreting fibroblasts as a cell therapy after glioblastoma resection; the printed cells are not neural or tumour tissue."),
  PMC10234214: OUT("primary research", "Scaled-up production of hiPSC aggregates as wholly cellular bioinks; not specific to neural tissue."),
  PMC10418654: OUT("primary research", "Adipose-derived stem cells in a 3D PEG matrix (cast, not printed)."),
  PMC5725567: OUT("primary research", "Neurovascular tissue built by 3D culture without bioprinting."),
  PMC6794630: OUT("primary research", "3D blood-brain barrier culture model of Alzheimer's disease without bioprinting."),
  PMC9875663: OUT("primary research", "Gelatin microsphere scaffolds for spinal cord injury; not bioprinted."),
  PMC10990108: OUT("primary research", "Developmental biology of axon guidance in zebrafish; not bioprinting."),
  PMC11914955: OUT("primary research", "Sacrificial printing of microvasculature; no neural cells."),
  PMC12892021: OUT("primary research", "Fibrous fillers for cell alignment in bioprinting; not neural."),
  PMC13695564: OUT("primary research", "Bioprinted bone scaffolds with innervation effects; bone model."),
  PMC7656262: OUT("primary research", "General micro-organisation printing of mammalian cells; not a neural model."),
  PMC8544540: OUT("primary research", "Bioprinted skeletal muscle with innervation in vivo; muscle model."),
  PMC7513966: OUT("other", "Corrigendum notice."),
}, "batch 5");
