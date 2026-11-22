// Evidence check: every quote the agent cites must actually appear in the paper.
// This catches hallucinated or paraphrased "quotes" before they reach the database.

const norm = (s) =>
  s.toLowerCase()
    .normalize("NFKD")
    .replace(/[‐-―−]/g, "-")   // dashes / minus signs
    .replace(/[‘’“”"']/g, "")
    .replace(/[^a-z0-9%.\-+/]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** True if the quote (or, for long quotes, most of its 8-word windows) occurs in the text. */
export function quoteFound(quote, normText) {
  const q = norm(quote);
  if (!q) return false;
  if (normText.includes(q)) return true;
  const words = q.split(" ");
  if (words.length < 10) return false;
  let hits = 0, total = 0;
  for (let i = 0; i + 8 <= words.length; i += 4) {
    total++;
    if (normText.includes(words.slice(i, i + 8).join(" "))) hits++;
  }
  return total > 0 && hits / total >= 0.75;
}

// Numeric fields that must be backed by a verified quote: either the quote contains the
// number itself, or (for unit-converted values) the quote is tagged with that field.
const NUMERIC = { pressure_kpa: "pressure", print_speed_mm_s: "speed", stiffness_kpa: "stiffness", viability_percent: "viability" };

function supported(value, tag, evidence) {
  const num = String(value);
  return evidence.some((e) => e.verified && (e.quote.includes(num) || e.field.toLowerCase().includes(tag)));
}

export function verifyExtraction(data, paperText) {
  const normText = norm(paperText);
  const formulations = data.formulations.map((f) => {
    const evidence = f.evidence.map((e) => ({ ...e, verified: quoteFound(e.quote, normText) }));
    const unverified = evidence.filter((e) => !e.verified).length;
    const unsupported = Object.entries(NUMERIC)
      .filter(([k, tag]) => f[k] !== null && !supported(f[k], tag, evidence))
      .map(([k]) => k);
    const reasons = [];
    if (unverified) reasons.push(`${unverified} quote(s) not found verbatim in the paper`);
    if (unsupported.length) reasons.push(`no verified quote for ${unsupported.join(", ")}`);
    if (f.confidence !== "high") reasons.push(`agent confidence: ${f.confidence}`);
    return { ...f, evidence, needs_review: reasons.length > 0, review_reasons: reasons, reviewed: false };
  });
  return { ...data, formulations };
}
