// Batch 3: brain tumour, blood-brain barrier and stem cell papers (review references) + recent papers.
import { F, OUT, writeAll } from "./lib.mjs";

writeAll({
  PMC8517394: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Coaxial printing made hollow alginate microfibres with glioma cells in the shell and endothelial cells in a collagen core, to study how glioma drives blood vessel formation.",
    formulations: [F({
      name: "2% alginate shell (glioma) / collagen core (HUVEC)", base_materials: ["alginate", "collagen"], material_class: "natural",
      composition_detail: "Shell: 2% sodium alginate with U118 glioma cells; core: 1 mg/mL collagen with HUVECs", crosslinking: "3% CaCl2",
      cell_type: "U118 glioma cells + HUVEC endothelial cells", cell_source: "cell line", cell_density: "1 x 10^6 cells/mL (glioma shell)",
      print_method: "coaxial extrusion", nozzle: "coaxial, 0.577 / 1.469 mm ID",
      key_outcome: "Shell/core fibres let glioma-endothelial interaction and vessel-like formation be studied in a tubular structure.",
      application: "disease model", disease: "glioblastoma",
      evidence: [
        { field: "composition", quote: "U118-RFP cells were resuspended in 2% sodium alginate solution as shell stream with a concentration of 1 × 106/ml" },
        { field: "core", quote: "to obtain a core stream with cell concentration of 1×105/ml and final collagen concentration of 1 mg/ml" },
        { field: "nozzle", quote: "The printing device is mainly consisted of a sheath/core nozzle, which composed of two concentric circles (inner diameters:0.577 mm, 1.469 mm, respectively)." },
      ],
    })],
  },
  PMC8049977: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Light-based (DLP) printing built glioblastoma models with patient-derived glioblastoma stem cells and endothelial cells in GelMA/hyaluronic acid matrices of tumour-like (7 kPa) and brain-like (0.45 kPa) stiffness.",
    formulations: [F({
      name: "GelMA + methacrylated hyaluronic acid (stiff tumour core)", base_materials: ["GelMA", "methacrylated hyaluronic acid"], material_class: "natural",
      composition_detail: "GelMA and GMHA blends tuned to 7 kPa (tumour) and 0.45 kPa (brain)", crosslinking: "photocrosslinking (DLP)",
      cell_type: "glioblastoma stem cells + endothelial cells", cell_source: "human primary/fetal", print_method: "light-based (DLP/SLA)",
      stiffness_kpa: 7, stiffness_note: "tumour core designed to match GBM tissue; brain region 0.45 kPa",
      key_outcome: "Stiff tumour regions and soft brain regions in one print reproduced GBM's biophysical heterogeneity.",
      application: "disease model", disease: "glioblastoma",
      evidence: [
        { field: "stiffness_kpa", quote: "Matrix stiffness of the tumor core and the endothelial regions was designed to mimic that of GBM patient tissues (7 kPa) and normal brain tissues (0.45 kPa)." },
        { field: "print_method", quote: "Flexibility of the DLP-based bioprinting process and versatile material selection allow orthogonal modulation of biophysical properties and biochemical characteristics." },
        { field: "cells", quote: "Human patient derived glioblastoma stem cells (TS576) were obtained from Dr." },
      ],
    })],
  },
  PMC8373143: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A perfusable, vascularized glioblastoma model was printed with patient-derived tumour cells, astrocytes and microglia in a fibrin/gelatin bioink, and used to predict drug responses.",
    formulations: [F({
      name: "Fibrin 3D-bioink (1% fibrinogen + 6% gelatin)", base_materials: ["fibrinogen", "gelatin"], material_class: "natural",
      composition_detail: "1% (w/v) fibrinogen, 6% (w/v) gelatin, 3% transglutaminase, 0.5 U/mL thrombin", crosslinking: "thrombin + transglutaminase",
      cell_type: "patient-derived glioblastoma cells + astrocytes + microglia", cell_source: "human primary/fetal", cell_density: "1 x 10^6 cells/mL (tumour, astrocytes)",
      print_method: "extrusion (pneumatic)", stiffness_kpa: 24.5, stiffness_note: "Young's modulus, compression, at 6% gelatin",
      key_outcome: "A perfusable printed GBM model with stromal cells mimicked tumour growth and drug response.",
      application: "drug screening", disease: "glioblastoma",
      evidence: [
        { field: "stiffness_kpa", quote: "Young’s modulus of 24.5 ± 2.6 kPa was achieved when the final gelatin concentration was 6% (w/v)" },
        { field: "composition", quote: "constant fibrinogen [1% (w/v)], Th (0.5 U/ml), and TG [3% (w/v)] and gelatin at serial concentrations" },
        { field: "cell_density", quote: "was mixed with Azurite-labeled PD-GB4 cells (1 × 106 cells/ml), GFP-labeled hAstro (1 × 106 cells/ml), and hMG (1 × 105 cells/ml)" },
      ],
    })],
  },
  PMC10376721: OUT("primary research", "A 3D-printed perfusable microvessel scaffold modelling the human blood-brain barrier; endothelial cells and pericytes were seeded into the lumens after printing, so no cell-laden bioink was printed."),
  PMC11617618: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A bioink made from decellularized cerebrovascular matrix was coaxially printed with brain endothelial cells into perfusable tubes. The tissue-specific matrix improved blood-brain barrier properties compared with other matrices.",
    formulations: [F({
      name: "Cerebrovascular dECM (2.4%) + 0.6% alginate", base_materials: ["decellularized cerebrovascular ECM", "alginate"], material_class: "decellularized matrix",
      composition_detail: "2.4% CBVdECM + 0.6% sodium alginate, core of Pluronic F-127 + CaCl2", crosslinking: "Ca2+ from sacrificial Pluronic core",
      cell_type: "human brain microvascular endothelial cells (+ pericytes)", cell_source: "human primary/fetal",
      printer: "3DX Bioprinter (T&R Biofab)", print_method: "coaxial extrusion", nozzle: "coaxial 14G/18G", pressure_kpa: 30,
      viability_percent: 95, viability_day: 14, culture_days: 14,
      key_outcome: "Cerebrovascular-specific dECM bioink promoted barrier properties; viability stayed >95% over 14 days.",
      application: "disease model", disease: "neuroinflammation",
      review_notes: "Viability is a threshold ('>95%'). Shell pressure 30 kPa; core 110 kPa.",
      evidence: [
        { field: "composition", quote: "The final bioink contained 1× Dulbecco’s modified Eagle’s medium, 2.4% CBVdECM, and 0.6% sodium alginate." },
        { field: "pressure_kpa", quote: "at respective temperatures of 4 and 37 °C and respective pneumatic pressures of 30 and 110 kPa" },
        { field: "viability_percent", quote: "Although all groups showed similar cell viabilities of >95% after 14 d in culture" },
      ],
    })],
  },
  PMC7050497: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Alginate lattices were printed with neural progenitor cells to expand them in 3D for cell manufacturing. Alginate stiffness (30 Pa to 1 kPa) changed how well the cells expanded.",
    formulations: [F({
      name: "2% alginate, 8 mM Ca2+ (stem cell expansion lattice)", base_materials: ["alginate"], material_class: "natural",
      composition_detail: "2% w/v alginate (LVG/VLVG blends) pre-crosslinked with 8 mM Ca2+; RGD variant", crosslinking: "CaSO4 pre-crosslink, printed into gelatin/CaCl2 support",
      additives: ["RGD peptide (some formulations)"], cell_type: "neural progenitor cells", cell_source: "other",
      cell_density: "30 x 10^6 cells/mL", print_method: "embedded/suspension bath", nozzle: "22 G",
      stiffness_kpa: 1, stiffness_note: "G' ~1 kPa (stiffest); 0.1 kPa intermediate; 0.03 kPa softest",
      key_outcome: "Printed alginate lattices allowed 3D expansion of NPCs for biomanufacturing, with stiffness affecting growth.",
      application: "regeneration/implant", confidence: "medium",
      review_notes: "NPC species/source not captured.",
      evidence: [
        { field: "composition / density", quote: "Alginate bioinks (8 mM Ca2+, 30 ×106 NPCs/mL, 2% w/v) were extruded through a 22-gauge needle" },
        { field: "stiffness", quote: "with the stiffest gels (plateau storage shear modulus, G′ ~ 1 kPa) using a large molecular weight alginate" },
      ],
    })],
  },
  PMC6832547: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A custom coaxial microfluidic extrusion printer built layered meshes of hiPSC-derived cortical neurons and glia in alginate/Matrigel fibres. Constructs stayed partly viable and functional up to 50 days after printing.",
    formulations: [F({
      name: "2% alginate + 0.5x Matrigel microfibres", base_materials: ["alginate", "Matrigel"], material_class: "natural",
      composition_detail: "2% w/v alginate + 0.5x Matrigel, crosslinked with 0.33 mM CaCl2, then alginate lyase", crosslinking: "CaCl2 (coaxial) then alginate lyase digestion",
      cell_type: "cortical neurons and glia", cell_source: "human iPSC-derived", printer: "custom coaxial microfluidic printer",
      print_method: "coaxial extrusion", print_speed_mm_s: 4, viability_percent: 68, viability_day: 50, culture_days: 50,
      viability_assay: "Live/Dead",
      key_outcome: "Printed hiPSC cortical constructs stayed 68% viable 50 days after printing.",
      application: "basic neurobiology",
      review_notes: "Speed converted from 240 mm/min. Viability measured on one construct (nine fields).",
      evidence: [
        { field: "composition", quote: "We obtained the best results using a solution containing 2% w/v alginate and 0.5× Matrigel (~50% dilution from stock), printed using 0.33 mM CaCl2 crosslinking solution" },
        { field: "print_speed", quote: "deposited at a speed of 240 mm/min" },
        { field: "viability_percent", quote: "viability was consistently maintained over time as assessed by live/dead staining up to DPP50 (68 ± 8% live cells" },
      ],
    })],
  },
  PMC12169505: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "GelMA/PEGDA hybrid bioinks were printed with SH-SY5Y cells for nerve guidance conduits. PEGDA concentration and molecular weight tuned stiffness (about 50-600 kPa), degradation and printability.",
    formulations: [F({
      name: "10% GelMA + PEGDA hybrids", base_materials: ["GelMA", "PEGDA"], material_class: "hybrid natural-synthetic",
      composition_detail: "10% GelMA with 5-15% PEGDA (MW 700-4000)", crosslinking: "photocrosslinking",
      cell_type: "SH-SY5Y neuroblastoma", cell_source: "cell line", printer: "Cellink BIO X6", print_method: "extrusion (pneumatic)",
      nozzle: "25 G tapered (250 µm)", stiffness_note: "elastic modulus ~50 kPa (10% GelMA) to 600 kPa (10G+15P700)",
      key_outcome: "Adding PEGDA slowed degradation and raised stiffness; cells spread in GelMA and 10G+5P700 gels.",
      application: "regeneration/implant",
      evidence: [
        { field: "nozzle", quote: "All bioinks were printed using a 25G tapered nozzle (250 µm inner diameter)." },
        { field: "stiffness", quote: "The elastic modulus of hydrogels ranges from ≈50 kPa (10G) to 600 kPa (10G+15P700 )" },
        { field: "printer", quote: "The printability of the bioink was performed using an extrusion‐based bioprinter (BIOX6, CELLINK, Sweden)." },
      ],
    })],
  },
}, "batch 3");
