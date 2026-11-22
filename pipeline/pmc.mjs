// PubMed Central helpers: search the open-access subset and pull full text.
// Uses NCBI E-utilities (no key needed for light use; set NCBI_API_KEY to raise rate limits).

const EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function withKey(params) {
  if (process.env.NCBI_API_KEY) params.set("api_key", process.env.NCBI_API_KEY);
  params.set("tool", "bioinkagent");
  return params;
}

async function getJson(url) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url);
    if (res.ok) return res.json();
    await sleep(800 * (attempt + 1));
  }
  throw new Error(`NCBI request failed: ${url}`);
}

/** Search PMC's open-access subset. Returns PMCIDs like "PMC12422755". */
export async function searchPmc(term, max = 20) {
  const params = withKey(new URLSearchParams({
    db: "pmc",
    term: `(${term}) AND "open access"[filter]`,
    retmax: String(max),
    retmode: "json",
  }));
  const j = await getJson(`${EUTILS}/esearch.fcgi?${params}`);
  return j.esearchresult.idlist.map((id) => `PMC${id}`);
}

/** Title, journal, year, authors and DOI for a list of PMCIDs. */
export async function summarize(pmcids) {
  if (!pmcids.length) return [];
  const params = withKey(new URLSearchParams({
    db: "pmc",
    id: pmcids.map((p) => p.replace(/^PMC/, "")).join(","),
    retmode: "json",
  }));
  const j = (await getJson(`${EUTILS}/esummary.fcgi?${params}`)).result;
  return j.uids.map((uid) => {
    const r = j[uid];
    const doi = (r.articleids || []).find((a) => a.idtype === "doi")?.value ?? null;
    return {
      pmcid: `PMC${uid}`,
      title: r.title,
      journal: r.fulljournalname || r.source,
      year: Number.parseInt(r.pubdate, 10) || null,
      authors: (r.authors || []).map((a) => a.name),
      doi,
    };
  });
}

const decode = (s) =>
  s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
   .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
   .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
   .replace(/&amp;/g, "&");

/**
 * Full text of an open-access article as plain text, with section headings kept
 * as "## Heading" lines. Reference lists are dropped to save tokens.
 */
export async function fetchFullText(pmcid) {
  const params = withKey(new URLSearchParams({ db: "pmc", id: pmcid.replace(/^PMC/, ""), retmode: "xml" }));
  let xml = "";
  for (let attempt = 0; attempt < 4 && !xml; attempt++) {
    const res = await fetch(`${EUTILS}/efetch.fcgi?${params}`);
    if (res.ok) xml = await res.text();
    else await sleep(800 * (attempt + 1));
  }
  if (!xml) throw new Error(`Could not fetch ${pmcid}`);

  const abstract = (xml.match(/<abstract[\s\S]*?<\/abstract>/) || [""])[0];
  const body = (xml.match(/<body[\s\S]*<\/body>/) || [""])[0];
  if (!body) throw new Error(`${pmcid}: no full-text body (publisher may withhold it from PMC XML)`);

  const toText = (frag) =>
    decode(
      frag
        .replace(/<ref-list[\s\S]*?<\/ref-list>/g, "")
        .replace(/<xref[^>]*>[\s\S]*?<\/xref>/g, "")          // citation markers like [12]
        .replace(/<title>([\s\S]*?)<\/title>/g, "\n\n## $1\n")
        .replace(/<\/(p|caption|td|th|tr|list-item)>/g, "\n")
        .replace(/<[^>]+>/g, "")
    )
      .replace(/[ \t]+/g, " ")
      .replace(/\n\s*\n\s*\n+/g, "\n\n")
      .trim();

  return `## Abstract\n${toText(abstract)}\n\n${toText(body)}`;
}
