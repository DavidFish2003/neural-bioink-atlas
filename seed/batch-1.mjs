// Batch 1: references from Willerth et al. 2025 (Adv. Drug Deliv. Rev.) review.
import { F, writeAll } from "./lib.mjs";

writeAll({
  PMC10883639: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A soft fibrin-based bioink and a commercial bioprinter were used to print layered human neural tissues from stem cell-derived progenitors. Printed neurons formed functional circuits between layers within weeks, and astrocyte progenitors matured into astrocytes.",
    formulations: [F({
      name: "Soft fibrin gel (2.5 mg/mL fibrinogen, 0.5 U thrombin)", base_materials: ["fibrinogen", "thrombin"], material_class: "natural",
      composition_detail: "2.5 mg/mL fibrinogen gelled with 0.5 U thrombin (gelation ~145 s)", crosslinking: "thrombin",
      cell_type: "cortical neural progenitors and astrocyte progenitors", cell_source: "human ESC-derived", cell_density: "1 x 10^7 cells/mL",
      print_method: "extrusion (pneumatic)", viability_percent: 80, viability_day: 7, neural_markers: ["FOXG1", "PAX6"],
      key_outcome: "Printed neurons formed functional cortical-to-striatal circuits; about 80% of cells stayed viable for 7 days.",
      application: "basic neurobiology", confidence: "medium",
      review_notes: "Viability given as 'about 80%'. Also compared: Matrigel (92% viable, clogged the nozzle) and hyaluronic acid (85%).",
      evidence: [
        { field: "composition", quote: "We chose 2.5 mg/mL fibrinogen and 0.5 U thrombin for hydrogel construction, yielding a gelation time of about 145 ± 10 seconds" },
        { field: "viability_percent", quote: "more than 85% of the cells survived after 6 hours of culturing in the fibrin gel and about 80% of the cells retained viable for 7 days" },
        { field: "cell_source", quote: "The cortical NPCs, differentiated from GFP- or mCherry-labeled hESCs for 21 days, expressed forebrain cortical progenitor markers FOXG1 and PAX6" },
        { field: "cell_density", quote: "The cells were centrifuged and resuspended with 20 mg/mL fibrinogen solution at a density of 1 × 107/mL." },
      ],
    })],
  },
  PMC6721723: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Sodium alginate and gelatin blends were screened as bioinks for printing neural cells. A 6% alginate / 4% gelatin ink printed at 45-70 kPa gave good shape fidelity and supported SH-SY5Y viability.",
    formulations: [F({
      name: "6% alginate + 4% gelatin", base_materials: ["alginate", "gelatin"], material_class: "natural",
      composition_detail: "6% sodium alginate, 4% gelatin", crosslinking: "CaCl2",
      cell_type: "SH-SY5Y neuroblastoma", cell_source: "cell line", print_method: "extrusion (pneumatic)",
      nozzle: "0.41 mm", pressure_kpa: 55, print_speed_mm_s: 10, culture_days: 7,
      key_outcome: "6% alginate / 4% gelatin printed at 25 °C and 45-70 kPa was the best balance of printability and viability.",
      application: "method/protocol",
      review_notes: "Print speed converted from 600 mm/min. Viability reported relative to day 0, so no single percentage.",
      evidence: [
        { field: "pressure_kpa", quote: "printed using a temperature of 25 °C and a pressure of 55 kPa for 6%SA–4% GEL bioink and 45 kPa for 4% SA–4% GEL bioink" },
        { field: "print_speed", quote: "the print-head speed was set at 600 mm/min and the layer height at 0.4 mm" },
        { field: "nozzle", quote: "Cartridge was equipped with a 0.41 mm nozzle." },
        { field: "composition", quote: "Our results demonstrated that the optimal conditions were 6% SA and 4% GEL, printed at 25 °C and with a pressure of 45–70 kPa." },
      ],
    })],
  },
  PMC8387028: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Neural spheroids were printed inside a soft GelMA support bath laden with astrocytes to build brain-like co-culture constructs. The 5% GelMA bath matched brain stiffness (~0.7 kPa) while allowing embedded printing.",
    formulations: [F({
      name: "GelMA/gelatin/alginate ink in astrocyte-laden 5% GelMA bath", base_materials: ["GelMA", "gelatin", "alginate"], material_class: "natural",
      composition_detail: "Ink: 4 wt% GelMA, 1 wt% gelatin, 0.5 wt% alginate. Support bath: 5 wt% GelMA with 11 mM CaCl2",
      crosslinking: "UV photocrosslinking + CaCl2", cell_type: "neural spheroids with astrocytes in the bath", cell_source: "other",
      cell_density: "astrocytes 8 x 10^6 cells/mL in bath", printer: "Cellink Inkredible", print_method: "embedded/suspension bath",
      nozzle: "30 G", stiffness_kpa: 0.7, stiffness_note: "compressive modulus of 5 wt% GelMA bath after UV",
      key_outcome: "Embedded printing in a brain-soft GelMA bath allowed patterned neurospheroid/astrocyte co-cultures.",
      application: "basic neurobiology", confidence: "medium",
      review_notes: "Species/source of the spheroid cells not captured; check the methods.",
      evidence: [
        { field: "composition", quote: "The bioink was prepared using 4 wt% GelMA, 1 wt% gelatin, 0.5 wt% alginate, and 0.25% PI dissolved in 40% HBSS, 60% MEM" },
        { field: "printer", quote: "The bioink was loaded into 1 ml syringes (BD) capped with 30 G needles (blunt, BD) and mounted on the extruder of a Cellink Inkredible bioprinter." },
        { field: "cell_density", quote: "suspending astrocytes at a concentration of 8 × 106 cells ml−1 in a DMEM-based solution containing calcium chloride (CaCl2, 11 mM), PI (0.25 wt%), and freeze dried GelMA (5 wt%)" },
        { field: "stiffness_kpa", quote: "The compressive modulus of the 5 wt% GelMA hydrogels post UV exposure was measured to be 0.7 ± 0.1 kPa" },
      ],
    })],
  },
  PMC9888471: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Hyaluronan-PEG hydrogels functionalized with laminin- or RGD-derived peptides were used to culture and bioprint human fetal astrocytes and glioblastoma cells. Peptide choice changed how astrocytes spread and organized.",
    formulations: [F({
      name: "1% HA:PEG + IKVAV or cRGD peptide", base_materials: ["hyaluronic acid", "PEG"], material_class: "hybrid natural-synthetic",
      composition_detail: "1% (w/v) HA-BCN:(PEG-Az)8 with 1 mM peptide (IKVAV or cRGD)", crosslinking: "click chemistry (SPAAC)",
      additives: ["IKVAV peptide", "cRGD peptide"], cell_type: "fetal primary astrocytes and U87 glioblastoma cells", cell_source: "human primary/fetal",
      cell_density: "1.6 x 10^6 cells/mL", printer: "Cellink BIO X", print_method: "extrusion (pneumatic)", viability_assay: "AlamarBlue",
      key_outcome: "Peptide-functionalized HA hydrogels supported astrocyte culture and could be bioprinted.",
      application: "basic neurobiology", confidence: "medium",
      review_notes: "Print pressure/speed and a viability percentage were not found in the text.",
      evidence: [
        { field: "cell_density", quote: "1.6 million cells/ml of FPA and U87 were encapsulated in 1% HA:PEG hydrogels containing 1 mM of either peptide" },
        { field: "printer", quote: "All 3D bioprinting was performed using a syringe extrusion printhead on a Cellink BIOX 3D bioprinter (BICO, U.S.A)." },
      ],
    })],
  },
  PMC11334787: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A six-layer brain-cortex-like model was built by combining extrusion printing of GelMA/fibrin with melt electrowritten fibres that run through all layers. The fibres guided neurite growth, and glial layers drew PC12 cells toward them.",
    formulations: [F({
      name: "5% GelMA + 0.5% fibrinogen (G5F0.5)", base_materials: ["GelMA", "fibrinogen"], material_class: "natural",
      composition_detail: "5% w/v GelMA + 0.5% w/v fibrinogen", crosslinking: "UV (15 s) then CaCl2 0.2% + thrombin 10 U/mL",
      additives: ["melt electrowritten microfibres"], cell_type: "PC12 cells and glial cells in layers", cell_source: "cell line",
      printer: "custom multi-material printer", print_method: "extrusion (pneumatic)", pressure_kpa: 32, print_speed_mm_s: 10,
      stiffness_note: "5% GelMA alone 8.48 kPa; fibrin lowers modulus (1.67 kPa at 1.5%)",
      key_outcome: "10 µm cross-layer fibres guided neurite direction; glial layers promoted PC12 migration.",
      application: "basic neurobiology", confidence: "medium",
      review_notes: "Pressure converted from 320 mbar. Modulus for the chosen G5F0.5 blend is not stated as a single number.",
      evidence: [
        { field: "composition", quote: "a concentration of 5 % GelMA and 0.5 % Fib was selected as the matrix material for constructing the biomimetic cortical model in this study" },
        { field: "pressure / speed", quote: "DIW 320 10 100 – 24" },
        { field: "stiffness", quote: "the compression modulus of the G5 group (8.48 kPa) was closer to the modulus of natural cortical tissue" },
        { field: "cell_type", quote: "glial cells significantly promoted the migration of surrounding PC12 cells towards the glial layer but did not contribute to the extension of neurites" },
      ],
    })],
  },
  PMC9959598: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Four GelMA-based bioinks were compared for printing human iPSC-derived neural progenitors and SH-SY5Y cells. A 4% GelMA ink kept cells viable, printed easily, and supported differentiation into immature neurons.",
    formulations: [F({
      name: "4% GelMA (4GMA)", base_materials: ["GelMA"], material_class: "natural", composition_detail: "4% GelMA",
      crosslinking: "photocrosslinking", cell_type: "neural progenitor cells", cell_source: "human iPSC-derived",
      printer: "3DBS Educational Starter Printer", print_method: "extrusion (mechanical/piston)",
      stiffness_note: "the four bioinks ranged 5-45 kPa", neural_markers: ["NESTIN", "SOX2", "PAX6"],
      key_outcome: "4% GelMA was chosen for keeping cells viable with good printability; printed hNPCs became immature neurons.",
      application: "regeneration/implant",
      evidence: [
        { field: "composition", quote: "we selected the 4GMA_Gx composition for further bioprinting assays" },
        { field: "printer", quote: "Cells were bioprinted using a 3DBS Educational Starter Printer, which produced constructs measuring 4 × 4 × 1 mm." },
        { field: "stiffness", quote: "The stiffness of the four bioinks presented in this work are 5 to 45 kPa and thus within that range." },
      ],
    })],
  },
}, "batch 1");
