// Download open-access full texts + metadata into data/papers/.
// Usage: node pipeline/fetch.mjs PMC123 PMC456 ...   or   node pipeline/fetch.mjs --search "<PMC query>" --max 20
import fs from "node:fs";
import { searchPmc, summarize, fetchFullText } from "./pmc.mjs";

const args = process.argv.slice(2);
let ids = args.filter((a) => /^PMC\d+$/.test(a));
const si = args.indexOf("--search");
if (si >= 0) {
  const max = Number(args[args.indexOf("--max") + 1]) || 20;
  ids = [...ids, ...(await searchPmc(args[si + 1], max))];
}
if (!ids.length) { console.error("Give PMCIDs or --search \"query\""); process.exit(1); }

fs.mkdirSync("data/papers", { recursive: true });
const metas = await summarize(ids);
for (const meta of metas) {
  const txt = `data/papers/${meta.pmcid}.txt`;
  if (fs.existsSync(txt)) { console.log(`skip ${meta.pmcid} (cached)`); continue; }
  try {
    const text = await fetchFullText(meta.pmcid);
    fs.writeFileSync(txt, text);
    fs.writeFileSync(`data/papers/${meta.pmcid}.meta.json`, JSON.stringify(meta, null, 2));
    console.log(`ok   ${meta.pmcid}  ${Math.round(text.length / 1000)}k chars  ${meta.title.slice(0, 70)}`);
  } catch (e) {
    console.log(`fail ${meta.pmcid}: ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, 400)); // be polite to NCBI
}
