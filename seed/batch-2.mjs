// Batch 2: references from Willerth et al. 2025 (Adv. Drug Deliv. Rev.) review, continued.
import { F, writeAll } from "./lib.mjs";

writeAll({
  PMC7319181: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Clusters of iPSC-derived spinal neural progenitors and oligodendrocyte progenitors were printed in Matrigel into channels of a 3D-printed scaffold to build a spinal cord model. Cells stayed over 75% viable and extended axons along the channels.",
    formulations: [F({
      name: "50% Matrigel cell clusters in printed scaffold", base_materials: ["Matrigel"], material_class: "natural",
      composition_detail: "50% Matrigel cell-laden ink; scaffolds printed from alginate/PEGDA/GelMA/gelatin-fibrin inks",
      cell_type: "spinal neural progenitors and oligodendrocyte progenitors", cell_source: "human iPSC-derived",
      print_method: "extrusion (pneumatic)", nozzle: "100 µm ID", viability_percent: 75, viability_day: 4, culture_days: 4,
      key_outcome: "Cells printed in 50% Matrigel stayed >75% viable over 4 days, unlike GelMA or gelatin/fibrin (20% by day 4).",
      application: "regeneration/implant",
      review_notes: "Viability is a threshold ('>75%'). Gelatin/fibrin and GelMA matrices dropped to 20% viability by day 4.",
      evidence: [
        { field: "composition", quote: "Based on the appropriate balance of cell viability and morphology, 50% Matrigel concentration was chosen for the cell-laden bioink." },
        { field: "viability_percent", quote: "The overall cell viability over 4 days in culture was >75% for both iPSC-derived sNPCs and OPCs when printed in 50% Matrigel" },
        { field: "nozzle", quote: "extrude the different bio-inks through the micronozzle with a 100 μm inner diameter" },
      ],
    })],
  },
  PMC9144715: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Boundary cap neural crest stem cells were printed in gelatin crosslinked with transglutaminase to work toward spinal cord organoids. 12% gelatin with 25 mg/mL transglutaminase printed well and supported survival and differentiation.",
    formulations: [F({
      name: "12% gelatin + 25 mg/mL transglutaminase", base_materials: ["gelatin"], material_class: "natural",
      composition_detail: "12% gelatin crosslinked with 25 mg/mL microbial transglutaminase, with laminin", crosslinking: "microbial transglutaminase (enzymatic)",
      additives: ["laminin"], cell_type: "boundary cap neural crest stem cells", cell_source: "rodent primary",
      printer: "Cellink BIO X", print_method: "extrusion (mechanical/piston)", nozzle: "0.41 mm", viability_assay: "alamarBlue",
      key_outcome: "12% gelatin/mTG gave good gelation and printability and the largest rise in viable cells from day 1 to 3.",
      application: "regeneration/implant", confidence: "medium",
      review_notes: "Species of the boundary cap cells not captured (dissected from dorsal root ganglia). No absolute viability percentage.",
      evidence: [
        { field: "composition", quote: "we selected a mixture of 12% gelatin with 25 mg/mL mTG for 3D printing of three-layered structures" },
        { field: "printer", quote: "Three sets of scaffolds with 1, 3 and 5 layers were prepared with a BIO X syringe pump printhead (CELLINK AB, Gothenburg, Sweden)" },
      ],
    })],
  },
  PMC11468953: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Two alginate/gellan gum/laminin blends were used to print hiPSC-derived neural progenitors on an EnvisionTEC Bioplotter. The two blends, both within brain stiffness, produced distinctly different neural 3D models.",
    formulations: [F({
      name: "1.5% alginate / 0.5% gellan gum + laminin", base_materials: ["alginate", "gellan gum", "laminin"], material_class: "natural",
      composition_detail: "1.5% ALG / 0.5% GG blend (laminin-supplemented variants)", crosslinking: "ionic (Ca2+)",
      cell_type: "neural progenitor cells", cell_source: "human iPSC-derived", printer: "EnvisionTEC 3D-Bioplotter",
      print_method: "extrusion (pneumatic)", nozzle: "200 µm ID", stiffness_note: "elastic moduli within the range of brain stiffness",
      key_outcome: "Different ALG/GG/LAM blends steered hiPSC-NPCs into distinct neural 3D models.",
      application: "basic neurobiology", confidence: "medium",
      review_notes: "Paper also uses a 1% ALG/0.01% LAM blend; which blend was printed vs cast should be checked.",
      evidence: [
        { field: "composition", quote: "The 1.5% ALG/0.5% GG blend was prepared by mixing 3% (w/v) ALG stock solution to 1.5% (w/v) GG stock solution" },
        { field: "printer", quote: "The printing was carried out with an EnvisioTEC 3D‐Bioplotter (Manufacturers Series), using a nozzle with 200 µm inner diameter" },
        { field: "stiffness", quote: "The elastic moduli of the hydrogel blends lay within the range of brain stiffness." },
      ],
    })],
  },
  PMC10953436: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A brain-soft PEG matrix with RGD, YIGSR and collagen IV was printed with iPSC-derived astrocytes, neural progenitors and brain endothelial-like cells. Printing supported astrocyte growth, vessel-like networks and better neural differentiation.",
    formulations: [F({
      name: "PEG + RGD + YIGSR + collagen IV (1.5 kPa)", base_materials: ["PEG", "collagen IV"], material_class: "hybrid natural-synthetic",
      composition_detail: "PEG-based matrix with RGD and YIGSR peptides and 3 mg/mL collagen IV, 1.5 kPa",
      additives: ["RGD peptide", "YIGSR peptide"], cell_type: "astrocytes, neural progenitors, brain endothelial-like cells", cell_source: "human iPSC-derived",
      cell_density: "10 x 10^6 cells/mL (NPCs, iBMECLs); 5 x 10^6 cells/mL (astrocytes)", printer: "Inventia RASTRUM", print_method: "inkjet/droplet",
      stiffness_kpa: 1.5, stiffness_note: "matrix stiffness matched to human brain", viability_percent: 82.2, viability_day: 1, culture_days: 7,
      key_outcome: "Printed iPSC astrocytes were 82% viable at day 1 and developed typical astrocyte morphology.",
      application: "drug screening", confidence: "medium",
      review_notes: "Print method inferred from the RASTRUM droplet system; confirm.",
      evidence: [
        { field: "stiffness_kpa", quote: "full‐length collagen IV at a stiffness similar to the human brain (1.5 kPa)" },
        { field: "viability_percent", quote: "iPSC‐derived astrocytes were printed with good viability (82.2% ± 10.1 SD)" },
        { field: "cell_density", quote: "containing 3 mg/mL collagen IV at 10 × 106 cells/mL for iPSC‐derived BMEC‐like cells (iBMECLs), and neural progenitor cells (NPCs) and 5 × 106 cells/mL for astrocytes" },
      ],
    })],
  },
  PMC9059157: {
    paper_type: "protocol", is_neural_bioprinting: true,
    summary: "A step-by-step protocol from the Willerth lab for printing neural tissues with Axolotl Biosciences' fibrin-based bioink on a CELLINK BIO X pneumatic printhead, either onto plates or into an agarose support bath.",
    formulations: [F({
      name: "Axolotl fibrin bioink on BIO X (protocol)", base_materials: ["fibrinogen", "alginate", "gelatin"], material_class: "natural",
      composition_detail: "Fibrin-based bioink (Axolotl Biosciences); 2% alginate / 2% gelatin mixture also described",
      crosslinking: "crosslinker added after printing (2-3 min)", cell_type: "neural cells (protocol, cell line agnostic)", cell_source: "other",
      printer: "Cellink BIO X", print_method: "extrusion (pneumatic)", pressure_kpa: 11, print_speed_mm_s: 15,
      key_outcome: "Recommended 15 mm/s at 11 kPa on plates, 20 mm/s at 20 kPa into agarose support bath.",
      application: "method/protocol",
      evidence: [
        { field: "pressure / speed", quote: "A speed of 15 mm/s and pressure of 11 kPa is recommended." },
        { field: "support bath", quote: "A speed of 20 mm/s and a pressure of 20 kPa is recommended." },
        { field: "composition", quote: "A mixture of 2% alginate/2% gelatin (w/v) is typically produced." },
      ],
    })],
  },
  PMC9141644: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Blood cells from healthy donors and sporadic ALS patients were reprogrammed to iPSCs, turned into neural stem cells, printed in hydrogel constructs, and differentiated into motor neurons. Printed cells stayed viable and differentiated, supporting bioprinting for ALS research.",
    formulations: [F({
      name: "Hydrogel construct for ALS patient motor neurons", base_materials: ["hydrogel (composition not stated in text)"], material_class: "natural",
      composition_detail: "Not stated in the main text", cell_type: "neural stem cells to motor neurons (healthy and sALS)", cell_source: "human iPSC-derived",
      print_method: "extrusion (pneumatic)", nozzle: "23 G (0.41 mm)", pressure_kpa: 45, print_speed_mm_s: 10,
      key_outcome: "Healthy and sALS patient stem cells survived printing and differentiated into motor neurons in 3D.",
      application: "disease model", disease: "amyotrophic lateral sclerosis", confidence: "low",
      review_notes: "Bioink composition not found in the text (likely in supplementary material). Pressure range 45-70 kPa (lower bound recorded); speed converted from 600 mm/min.",
      evidence: [
        { field: "pressure / speed / nozzle", quote: "Bioink was printed using a 0.41 mm nozzle (23G) at 25 °C, with a printing speed of 600 mm/min and with a pressure between 45 and 70 kPa." },
        { field: "cells", quote: "We reprogrammed healthy and sALS peripheral blood mononuclear cells (PBMCs) in iPSCs and differentiated them in neural stem cells (NSCs) in 2D." },
      ],
    })],
  },
}, "batch 2");
