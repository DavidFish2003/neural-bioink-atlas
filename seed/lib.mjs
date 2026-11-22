// Shared helpers for the hand-run extraction batches (records made by Claude in Claude Code).
import fs from "node:fs";

/** Fill a formulation with null defaults so every record has the full schema. */
export const F = (o) => ({
  crosslinking: null, additives: [], cell_density: null, printer: null, nozzle: null,
  pressure_kpa: null, print_speed_mm_s: null, stiffness_kpa: null, stiffness_note: null,
  viability_percent: null, viability_day: null, viability_assay: null, culture_days: null,
  neural_markers: [], disease: null, review_notes: null, confidence: "high", ...o,
});

/** Paper that was read and judged out of scope (kept so it isn't re-extracted). */
export const OUT = (paper_type, summary) => ({ paper_type, is_neural_bioprinting: false, summary, formulations: [] });

export function writeAll(papers, label) {
  fs.mkdirSync("data/extractions", { recursive: true });
  for (const [pmcid, data] of Object.entries(papers)) {
    const meta = JSON.parse(fs.readFileSync(`data/papers/${pmcid}.meta.json`, "utf8"));
    const formulations = data.formulations.map((f) => ({ ...f, needs_review: false, review_reasons: [], reviewed: false }));
    fs.writeFileSync(`data/extractions/${pmcid}.json`, JSON.stringify({
      pmcid, meta, extracted_at: new Date().toISOString(),
      extracted_by: "Claude (Claude Code session), pending human review", ...data, formulations,
    }, null, 2));
  }
  console.log(`${label}: wrote ${Object.keys(papers).length} extractions`);
}
