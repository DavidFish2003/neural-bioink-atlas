// Extraction agent: reads each paper in data/papers/ and writes a structured
// record to data/extractions/<PMCID>.json. Every record's evidence quotes are then
// checked against the paper text; anything unsupported is flagged for human review.
//
// Usage: node pipeline/extract.mjs [PMCID ...] [--force]
// Needs ANTHROPIC_API_KEY (or an `ant auth login` profile).
import fs from "node:fs";
import Anthropic from "@anthropic-ai/sdk";
import { extractionSchema } from "./schema.mjs";
import { verifyExtraction } from "./verify.mjs";

const MODEL = "claude-opus-5-5";

const SYSTEM = `You are a careful research assistant curating a database of bioinks used to 3D-bioprint neural tissue.
Read the full paper and fill the schema for every distinct formulation x cell type the authors actually printed and tested.

Rules:
- Report only what the paper states. If a value is missing, or appears only in a figure without a number in the text, use null and say so in review_notes. Never estimate.
- Convert units as the schema describes (psi -> kPa, mm/min -> mm/s) and note the original unit in review_notes.
- For every numeric value and every material you report, add an evidence item whose quote is copied verbatim from the paper text, short enough to locate (under 300 characters).
- Reviews and editorials: set paper_type accordingly and return an empty formulations list.
- Set confidence to low when the paper is ambiguous about which formulation a number belongs to.`;

const client = new Anthropic();

async function extractOne(pmcid) {
  const text = fs.readFileSync(`data/papers/${pmcid}.txt`, "utf8");
  const meta = JSON.parse(fs.readFileSync(`data/papers/${pmcid}.meta.json`, "utf8"));

  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 64000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default", // if the model declines, the API retries on a fallback model in the same call
    output_config: {
      effort: "high",
      format: { type: "json_schema", schema: extractionSchema },
    },
    system: SYSTEM,
    messages: [{
      role: "user",
      content: `Paper: ${meta.title} (${meta.journal}, ${meta.year}; ${meta.pmcid})\n\n<paper>\n${text}\n</paper>`,
    }],
  });
  const msg = await stream.finalMessage();

  if (msg.stop_reason === "refusal") throw new Error(`declined (${msg.stop_details?.category ?? "no category"})`);
  if (msg.stop_reason === "max_tokens") throw new Error("output hit max_tokens; record would be truncated");
  const out = msg.content.find((b) => b.type === "text");
  const data = JSON.parse(out.text);

  const verified = verifyExtraction(data, text);
  const record = {
    pmcid,
    meta,
    extracted_at: new Date().toISOString(),
    extracted_by: msg.model,
    ...verified,
  };
  fs.writeFileSync(`data/extractions/${pmcid}.json`, JSON.stringify(record, null, 2));
  return { record, usage: msg.usage };
}

// ---- CLI ----
const args = process.argv.slice(2);
const force = args.includes("--force");
let ids = args.filter((a) => /^PMC\d+$/.test(a));
if (!ids.length) {
  ids = fs.readdirSync("data/papers").filter((f) => f.endsWith(".txt")).map((f) => f.replace(".txt", ""));
}
fs.mkdirSync("data/extractions", { recursive: true });

let inTok = 0, outTok = 0;
for (const pmcid of ids) {
  if (!force && fs.existsSync(`data/extractions/${pmcid}.json`)) { console.log(`skip ${pmcid} (already extracted)`); continue; }
  try {
    const { record, usage } = await extractOne(pmcid);
    inTok += usage.input_tokens; outTok += usage.output_tokens;
    const flagged = record.formulations.filter((f) => f.needs_review).length;
    console.log(`ok   ${pmcid}: ${record.formulations.length} formulations, ${flagged} flagged for review`);
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) { console.log(`rate-limited on ${pmcid}; rerun later (finished papers are kept)`); break; }
    if (e instanceof Anthropic.AuthenticationError || /resolve authentication/i.test(e.message)) {
      console.log("No Anthropic credentials found. Set ANTHROPIC_API_KEY (see README), then rerun.");
      process.exit(1);
    }
    if (e instanceof Anthropic.APIError) console.log(`fail ${pmcid}: API ${e.status ?? ""} ${e.message}`);
    else console.log(`fail ${pmcid}: ${e.message}`);
  }
}
console.log(`tokens: ${inTok} in / ${outTok} out`);
