// Batch 4: recent neural bioprinting papers from PubMed Central.
import { F, OUT, writeAll } from "./lib.mjs";

writeAll({
  PMC11176035: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A neurovascular unit of primary human astrocytes, pericytes and brain endothelial cells was printed as a ring, with patient-derived glioblastoma cells printed at its centre, to follow tumour growth in a brain-like setting.",
    formulations: [F({
      name: "Fibrinogen + 6% gelatin (neurovascular ring + GBM dot)", base_materials: ["fibrinogen", "gelatin"], material_class: "natural",
      composition_detail: "2.5-5 mg/mL fibrinogen with 6% gelatin and aprotinin; tumour dot in 6% gelatin (bioink C)", crosslinking: "thrombin",
      additives: ["aprotinin"], cell_type: "astrocytes, pericytes, brain endothelial cells + JHH-520 GBM cells", cell_source: "human primary/fetal",
      cell_density: "3 x 10^6 cells/mL (GBM)", printer: "RegenHU", print_method: "extrusion (pneumatic)", nozzle: "21 G ring / 26 G tumour dot",
      key_outcome: "The printed neurovascular unit let patient GBM cells grow in a brain-like microenvironment for tumour studies.",
      application: "disease model", disease: "glioblastoma",
      evidence: [
        { field: "composition", quote: "These three types (A: 5 mg ml−1 fibrinogen with 6% gelatin and aprotinin." },
        { field: "nozzle", quote: "A ring pattern was printed through with a 21G needle (inner diameter of 0.514 mm)" },
        { field: "cell_density", quote: "a dot pattern was printed at the center of the ring structure of NVU with JHH520 cells in 3 million cells ml−1 concentration in bioink‐C via 26G needle" },
      ],
    })],
  },
  PMC11469067: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A very low-viscosity alginate/collagen bioink was printed into a gelatin support bath at ~10 µm resolution to build neurovascular unit models. Partial alginate lysis softened the gel to about 1 kPa, close to brain.",
    formulations: [F({
      name: "0.5% alginate + 0.1% collagen (A5C1) in gelatin bath", base_materials: ["alginate", "collagen"], material_class: "natural",
      composition_detail: "0.5% w/v alginate + 0.1% w/v collagen; support bath 4.5% gelatin + 0.2% CaCl2", crosslinking: "Ca2+ from support bath, then alginate lysis",
      cell_type: "neurovascular unit cells (glia, endothelial cells)", cell_source: "other", printer: "custom syringe extrusion printer",
      print_method: "embedded/suspension bath", stiffness_kpa: 1, stiffness_note: "after lysis (~1 kPa); A5 before lysis 1.96 kPa",
      key_outcome: "Low-viscosity ink printed at ~10 µm resolution and softened to brain-like ~1 kPa after lysis.",
      application: "basic neurobiology", confidence: "medium",
      review_notes: "Cell types and sources not fully captured from the text.",
      evidence: [
        { field: "composition", quote: "The group with 0.5% [w/v] sodium alginate/ 0.1% [w/v] collagen (A5C1) was set to be the experimental/testing group" },
        { field: "stiffness", quote: "the lysis processing can decrease the hydrogels’ modulus to ≈1 kPa" },
        { field: "printer", quote: "A syringe‐based extrusion printer was custom‐designed and produced." },
      ],
    })],
  },
  PMC11694092: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Soft and stiff hyaluronic acid bioinks were printed together to guide axons from stem cell-derived neurons, as a model of how nerves innervate tissue. The soft ink with NGF and laminin formed channels for axon growth.",
    formulations: [F({
      name: "Soft HA bioink + NGF + laminin (axon guidance)", base_materials: ["hyaluronic acid"], material_class: "natural",
      composition_detail: "Soft HA-based bioink supplemented with NGF and laminin; paired with a stiff HA bioink for structure",
      additives: ["NGF", "laminin"], cell_type: "neurons", cell_source: "other", print_method: "extrusion (pneumatic)",
      nozzle: "32 G (100 µm)", pressure_kpa: 70, print_speed_mm_s: 15.1,
      key_outcome: "hPSC-derived neurons formed 3D networks in the soft ink with guidance cues, while the stiff ink restricted them.",
      application: "basic neurobiology", confidence: "medium",
      review_notes: "Pressure converted from 0.7 bar (soft ink); stiff ink 2.3 bar at 19.0 mm/s. Neurons are hPSC-derived (ESC or iPSC not captured).",
      evidence: [
        { field: "pressure / speed", quote: "pressures of 0.7 bar and 2.3 bar, speeds of 15.1 mm s−1 and 19.0 mm s−1" },
        { field: "nozzle", quote: "32 G (inner Ø 100 µm) blunt needles 0.50 inches in length (CellInk, USA) were used for printing." },
        { field: "outcome", quote: "human pluripotent stem cell (hPSC) ‐derived neurons form a 3D neuronal network in the softer bioink supplemented with guidance cues" },
      ],
    })],
  },
  PMC11468931: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Hyaluronan-PEG hydrogels with covalently attached laminin were developed for 3D neuron culture and printed on a BIO X. Laminin stayed bound in the gel, and printed stem cells were about 50-55% viable.",
    formulations: [F({
      name: "1% HA:PEG + laminin (click-crosslinked)", base_materials: ["hyaluronic acid", "PEG", "laminin"], material_class: "hybrid natural-synthetic",
      composition_detail: "1% (w/v) HA-BCN:PEG with azide-modified laminin", crosslinking: "bioorthogonal click chemistry (SPAAC)",
      cell_type: "neuroepithelial stem cells (lt-NES) and SH-SY5Y", cell_source: "other", printer: "Cellink BIO X",
      print_method: "extrusion (pneumatic)", nozzle: "27 G", pressure_kpa: 1, print_speed_mm_s: 25, viability_percent: 52,
      key_outcome: "Laminin-presenting HA gels supported neuronal culture and could be printed at very low pressure.",
      application: "regeneration/implant", confidence: "medium",
      review_notes: "Viability reported as a range (50-55%); midpoint recorded. lt-NES species/source not captured.",
      evidence: [
        { field: "printer / pressure / speed", quote: "Bioprinting was conducted using a Cellink BioX equipped with a 27G needle at 1 kPa pressure and 25 mm s−1" },
        { field: "viability_percent", quote: "Cell viabilities of about 50–55% were obtained with no difference between the two conditions" },
        { field: "composition", quote: "3D bioprinted structures based on the HA:PEG‐LN hydrogels at a concentration of 1% (w/v)." },
      ],
    })],
  },
  PMC7608409: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "Rapid light-based printing built glioblastoma tissue with tumour cells, macrophages, astrocytes and neural stem cells in GelMA/hyaluronic acid. The model captured how macrophages support tumour growth and drug resistance.",
    formulations: [F({
      name: "4% GelMA + 0.25% GMHA (GBM core)", base_materials: ["GelMA", "methacrylated hyaluronic acid"], material_class: "natural",
      composition_detail: "4% GelMA + 0.25% GMHA (cell-laden), LAP photoinitiator", crosslinking: "photocrosslinking (DLP)",
      cell_type: "glioblastoma stem cells, macrophages, astrocytes, neural progenitors", cell_source: "human primary/fetal",
      print_method: "light-based (DLP/SLA)", stiffness_kpa: 2.8, stiffness_note: "tumour core; brain-like periphery 0.9 kPa",
      key_outcome: "Printed GBM tissues reproduced tumour-macrophage dependencies and immune interactions.",
      application: "disease model", disease: "glioblastoma", confidence: "medium",
      review_notes: "Print method inferred from the 'rapid 3D bioprinting' light-based system used by this group; confirm.",
      evidence: [
        { field: "composition", quote: "Cells were encapsulated into a material mixture of 4% GelMA (at 95% degree of methacrylation) and 0.25% GMHA" },
        { field: "stiffness_kpa", quote: "The stiffness of cell-encapsulated tumor core was 2.8 ± 0.6 kPa, while the less populated peripheral region containing NPCs and astrocytes was 0.9 ± 0.2 kPa." },
      ],
    })],
  },
  PMC9830177: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A fibrin/alginate/genipin bioink (based on the Willerth lab formulation) was printed on a BIO X at low pressure to cluster human neural progenitor cells into lattices.",
    formulations: [F({
      name: "UTEP bioink: fibrin + HV/MV alginate + genipin", base_materials: ["fibrinogen", "alginate", "genipin"], material_class: "natural",
      composition_detail: "20 mg/mL fibrin, 20 mg/mL HV alginate, 10 mg/mL MV alginate, 0.3 mg/mL genipin",
      crosslinking: "20 mg/mL CaCl2 + 1.7 µg/mL thrombin + 0.75 mg/mL chitosan", cell_type: "neural progenitor cells", cell_source: "other",
      printer: "Cellink BIO X", print_method: "extrusion (pneumatic)", nozzle: "18 G", pressure_kpa: 21, print_speed_mm_s: 2,
      key_outcome: "Low-pressure printing (21 kPa) of a fibrin/alginate ink formed clustered neural progenitor lattices.",
      application: "method/protocol", confidence: "medium",
      review_notes: "Human NPC source (iPSC/ESC/fetal) not captured.",
      evidence: [
        { field: "composition", quote: "final concentrations of 20 mg/mL fibrin, 20 mg/mL high viscosity (HV) alginate (#154724, MP Biomedicals-ThermoFisher Scientific), 10 mg/mL medium viscosity (MV) alginate, and 0.3 mg/mL genipin" },
        { field: "pressure / speed", quote: "Low extrusion pressure of 21 kPa was used to ensure cell viability and create lattice patterns designed with SolidWorks (Concord, MA) at 2 mm/s" },
        { field: "crosslinking", quote: "Solutions of the crosslinker were prepared to have final concentrations of 20 mg/mL CaCl2, 1.7 μg/mL thrombin, and 0.75 mg/mL chitosan." },
      ],
    })],
  },
  PMC7310269: {
    paper_type: "primary research", is_neural_bioprinting: true,
    summary: "A conductive bioink of collagen with polypyrrole-block-polycaprolactone was developed for printing neural tissue constructs; adding the conductive polymer raised the gel's modulus and print fidelity.",
    formulations: [F({
      name: "4% collagen + PPy-b-PCL (conductive)", base_materials: ["collagen", "polypyrrole-b-polycaprolactone"], material_class: "composite with nanomaterial",
      composition_detail: "4% (w/v) collagen type I with 0.5-2% PPy-b-PCL", cell_type: "not captured", cell_source: "other",
      print_method: "extrusion (mechanical/piston)", stiffness_note: "modulus rises with PPy-b-PCL; highest at 2%",
      key_outcome: "Conductive polymer increased the collagen ink's mechanical integrity for neural constructs.",
      application: "regeneration/implant", confidence: "low",
      review_notes: "Cell type and viability not found in the extracted text; check the paper.",
      evidence: [
        { field: "composition", quote: "A concentration of 4% (w/v) Collagen Type 1 was used." },
        { field: "stiffness", quote: "the mechanical integrity of the collagen hydrogel increases with increasing concentration of PPy-b-PCL" },
      ],
    })],
  },
  PMC8329473: OUT("primary research", "Co-axial printing of bone marrow stem cell structures with neural cells to study osteogenesis; a bone model, not a neural tissue model."),
  PMC10176209: OUT("protocol", "Bio-protocol version of the Willerth lab's MSC-derived neural tissue study (PMC8394541); not counted twice."),
}, "batch 4");
