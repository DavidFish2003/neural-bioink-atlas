// Merge every extraction into the single file the web app reads: web/data/bioinks.json
// Re-runs the evidence check so hand-edited extractions are re-verified too.
import fs from "node:fs";
import { verifyExtraction } from "./verify.mjs";

const files = fs.readdirSync("data/extractions").filter((f) => f.endsWith(".json"));
const papers = [];
const formulations = [];

for (const f of files) {
  const rec = JSON.parse(fs.readFileSync(`data/extractions/${f}`, "utf8"));
  const textPath = `data/papers/${rec.pmcid}.txt`;
  // Keep any human "reviewed" decisions across rebuilds.
  const reviewed = new Map(rec.formulations.map((x) => [x.name, x.reviewed]));
  const checked = fs.existsSync(textPath) ? verifyExtraction(rec, fs.readFileSync(textPath, "utf8")) : rec;
  if (!rec.is_neural_bioprinting) continue;

  papers.push({
    pmcid: rec.pmcid, ...rec.meta, paper_type: rec.paper_type, summary: rec.summary,
    extracted_by: rec.extracted_by, n_formulations: checked.formulations.length,
  });
  checked.formulations.forEach((x, i) => {
    const isReviewed = reviewed.get(x.name) === true;
    formulations.push({
      id: `${rec.pmcid}-${i + 1}`,
      pmcid: rec.pmcid,
      year: rec.meta.year,
      ...x,
      reviewed: isReviewed,
      needs_review: x.needs_review && !isReviewed,
    });
  });
}

papers.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
const out = {
  generated_at: new Date().toISOString(),
  n_papers: papers.length,
  n_formulations: formulations.length,
  papers,
  formulations,
};
fs.mkdirSync("web/data", { recursive: true });
fs.writeFileSync("web/data/bioinks.json", JSON.stringify(out, null, 2));
console.log(`built web/data/bioinks.json: ${papers.length} papers, ${formulations.length} formulations, ` +
  `${formulations.filter((x) => x.needs_review).length} need review`);
