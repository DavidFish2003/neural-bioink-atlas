// Build a reading list from a review's reference list.
// Crossref gives the references (with DOIs); NCBI's ID converter maps DOIs to PubMed Central IDs.
// Only papers with a PMC full text are kept, because those are the ones we can read.
//
// Usage: node pipeline/references.mjs <review DOI>   -> writes data/reading-list.json
import fs from "node:fs";

const doi = process.argv[2];
if (!doi) { console.error("Usage: node pipeline/references.mjs <review DOI>"); process.exit(1); }

const UA = { "User-Agent": "bioinkagent/0.1 (research prototype)" };
const work = (await (await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, { headers: UA })).json()).message;
const refs = work.reference || [];
console.log(`${work.title?.[0]}\n${refs.length} references deposited with Crossref`);

const dois = [...new Set(refs.map((r) => r.DOI?.toLowerCase()).filter(Boolean))];
console.log(`${dois.length} have DOIs`);

// NCBI ID converter, 100 IDs per request.
const found = [];
for (let i = 0; i < dois.length; i += 100) {
  const batch = dois.slice(i, i + 100);
  const url = `https://www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/?tool=bioinkagent&format=json&ids=${encodeURIComponent(batch.join(","))}`;
  const j = await (await fetch(url, { headers: UA })).json();
  for (const r of j.records || []) if (r.pmcid) found.push({ doi: r.doi, pmcid: r.pmcid, pmid: r.pmid ?? null });
  await new Promise((r) => setTimeout(r, 400));
}

const out = { review: { doi, title: work.title?.[0] }, n_references: refs.length, n_with_doi: dois.length, in_pmc: found };
fs.mkdirSync("data", { recursive: true });
fs.writeFileSync("data/reading-list.json", JSON.stringify(out, null, 2));
console.log(`${found.length} are in PubMed Central -> data/reading-list.json`);
