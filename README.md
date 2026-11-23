# Neural Bioink Atlas

**Live site:** https://neural-bioink-atlas.netlify.app

An AI agent that reads open-access neural bioprinting papers, extracts each bioink formulation into a structured record, and **checks every number against a verbatim quote from the paper**. Records it can't back up are flagged for human review. A static web app lets you filter, chart and compare the formulations.

**Current data:** 43 papers, 48 bioink entries, 156 of 156 supporting quotes verified word-for-word. Papers come from the reference list of Willerth et al. 2025 (*Adv. Drug Deliv. Rev.*, doi:10.1016/j.addr.2025.115524) plus recent PubMed Central papers; 19 further papers were read and set aside as out of scope.

## Why
Bioink design for neural tissue is mostly trial and error, and the data that would let you learn from past work (composition, crosslinking, printer settings, stiffness, viability, markers) is scattered across methods sections in inconsistent units. A curated, evidence-linked table is the first thing a machine-learning model for bioink design needs.

## How it works

```
PubMed Central (open access)
      │  pipeline/fetch.mjs     search + download full text (NCBI E-utilities)
      ▼
data/papers/*.txt
      │  pipeline/extract.mjs   Claude fills a strict JSON schema (pipeline/schema.mjs)
      ▼
data/extractions/*.json
      │  pipeline/verify.mjs    every quote is matched against the paper text;
      │                         numbers without a verified quote are flagged
      ▼
web/data/bioinks.json  ──►  web/ (filters, charts, evidence view, compare)
```

- **Units are normalized:** mbar and psi to kPa, mm/min to mm/s. Each conversion is noted on the record.
- **No guessing:** values that appear only in figures are left blank, with a note.
- **Self-checking:** the verifier caught a missing citation in the seed data during the build, and it flags values with ambiguous units for a person to confirm.

## Run it

Requires Node 18+.

```bash
npm install

# 1. Fetch papers (by PMCID, or by search)
npm run fetch -- --search "bioprinting[tiab] AND neural progenitor*[tiab]" --max 10

# 2. Extract with Claude (needs an Anthropic API key)
export ANTHROPIC_API_KEY=sk-ant-...        # PowerShell: $env:ANTHROPIC_API_KEY="sk-ant-..."
npm run extract                            # skips papers already extracted; --force to redo

# 3. Rebuild the database the web app reads
npm run build

# 4. View it
npm run serve                              # http://localhost:5173
```

The extractor uses `claude-opus-5-5` with structured outputs, so the API guarantees the response matches the schema. A typical paper costs a few cents.

To review a flagged record, open `data/extractions/<PMCID>.json`, fix the values, set `"reviewed": true` on the formulation, and run `npm run build` again.

### How the current records were made
The current records were extracted by Claude in Claude Code sessions (scripts in `seed/`: `seed-extractions.mjs`, `batch-1.mjs` to `batch-5.mjs`) using the same schema, and all passed the same quote check. `npm run extract` uses the Claude API instead; it has not yet been run end to end.

## Deploy
Live at **https://neural-bioink-atlas.netlify.app**. To publish changes: `npm run deploy` (rebuilds the data, then deploys `web/` to Netlify; requires `netlify login`).

## Roadmap
- Add papers from other reviews with `npm run references -- <DOI>`.
- Baseline model: predict post-print viability from composition, cell source and print settings, with honest uncertainty given the small n.
- Reviewer mode in the browser, so a domain expert can approve records without editing JSON.
- Link formulations to outcomes over time (differentiation markers, electrophysiology).

## Data and limits
Every record links to its source paper; cite the original papers, not this database. The seed is a prototype: it is agent-extracted and pending expert review.
