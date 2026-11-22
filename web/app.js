// Neural Bioink Atlas: loads data/bioinks.json and renders search, chart, table and detail views.
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = (v, d = 1) => Number(v).toLocaleString(undefined, { maximumFractionDigits: d });
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();

let DB, papers = {}, chart;
const state = { q: "", source: "", app: "", materials: new Set(), selected: new Set() };

init();

async function init() {
  try {
    DB = await (await fetch("data/bioinks.json", { cache: "no-store" })).json();
  } catch {
    $("main").innerHTML = '<p class="muted">The data file could not be loaded.</p>';
    return;
  }
  DB.papers.forEach((p) => (papers[p.pmcid] = p));

  const traced = DB.formulations.flatMap((f) => f.evidence).filter((e) => e.verified).length;
  $("#stats").textContent = `${DB.n_papers} papers · ${DB.n_formulations} bioinks · ${traced} values traced to their source`;

  fillSelect("#f-source", "All cell sources", uniq(DB.formulations.map((f) => f.cell_source)));
  fillSelect("#f-app", "All purposes", uniq(DB.formulations.map((f) => f.application)));
  renderChips();

  $("#q").addEventListener("input", (e) => { state.q = e.target.value.toLowerCase(); render(); });
  $("#f-source").addEventListener("change", (e) => { state.source = e.target.value; render(); });
  $("#f-app").addEventListener("change", (e) => { state.app = e.target.value; render(); });
  $("#compare-btn").addEventListener("click", openCompare);
  $("#detail").addEventListener("click", (e) => { if (e.target.id === "detail" || e.target.closest("[data-close]")) $("#detail").close(); });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => render());

  try { await document.fonts.ready; } catch {} // chart labels are measured once; wait for the font
  render();
}

const uniq = (a) => [...new Set(a.filter(Boolean))].sort();
function fillSelect(sel, label, values) {
  $(sel).innerHTML = `<option value="">${label}</option>` + values.map((v) => `<option value="${esc(v)}">${esc(cap(v))}</option>`).join("");
}

function renderChips() {
  const counts = {};
  DB.formulations.forEach((f) => f.base_materials.forEach((m) => (counts[m] = (counts[m] || 0) + 1)));
  const mats = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  $("#chips").innerHTML = mats.map((m) => `<button class="chip" aria-pressed="false" data-m="${esc(m)}">${esc(m)}</button>`).join("");
  $("#chips").addEventListener("click", (e) => {
    const b = e.target.closest(".chip"); if (!b) return;
    const m = b.dataset.m;
    state.materials.has(m) ? state.materials.delete(m) : state.materials.add(m);
    b.setAttribute("aria-pressed", state.materials.has(m));
    render();
  });
}

function filtered() {
  return DB.formulations.filter((f) => {
    if (state.source && f.cell_source !== state.source) return false;
    if (state.app && f.application !== state.app) return false;
    for (const m of state.materials) if (!f.base_materials.includes(m)) return false;
    if (state.q) {
      const p = papers[f.pmcid] || {};
      const hay = [f.name, f.cell_type, f.cell_source, f.printer, f.disease, f.composition_detail, f.key_outcome,
        ...f.base_materials, ...f.additives, ...f.neural_markers, p.title, ...(p.authors || [])].join(" ").toLowerCase();
      if (!hay.includes(state.q)) return false;
    }
    return true;
  });
}

function render() {
  const rows = filtered();
  $("#count").textContent = rows.length === DB.formulations.length ? rows.length : `${rows.length} of ${DB.formulations.length}`;
  renderTable(rows);
  renderChart(rows);
}

const authorYear = (p) => `${((p.authors || [])[0] || "").split(" ")[0]} ${p.year ?? ""}`.trim();

function renderTable(rows) {
  $("#tbl tbody").innerHTML = rows.map((f) => {
    const p = papers[f.pmcid] || {};
    return `<tr data-id="${f.id}">
      <td class="sel"><input type="checkbox" aria-label="Select ${esc(f.name)} to compare" ${state.selected.has(f.id) ? "checked" : ""}></td>
      <td>${esc(f.name)}${f.needs_review ? '<span class="dot" title="Some values are worth checking against the paper"></span>' : ""}
        <span class="sub">${esc(f.base_materials.join(", "))}</span></td>
      <td>${f.cell_source === "acellular" ? '<span class="muted">No cells (material test)</span>' : `${esc(cap(f.cell_type))}<span class="sub">${esc(f.cell_source)}</span>`}</td>
      <td class="num hide-sm">${f.stiffness_kpa === null ? '<span class="muted">–</span>' : fmt(f.stiffness_kpa, 2) + " kPa"}</td>
      <td class="num">${f.viability_percent === null ? '<span class="muted">–</span>' : fmt(f.viability_percent) + "%"}</td>
      <td class="hide-sm">${esc(authorYear(p))}</td>
    </tr>`;
  }).join("") || '<tr><td colspan="6" class="muted">No bioinks match.</td></tr>';

  $("#tbl tbody").onclick = (e) => {
    const tr = e.target.closest("tr[data-id]"); if (!tr) return;
    if (e.target.matches("input[type=checkbox]")) {
      const id = tr.dataset.id;
      if (e.target.checked) {
        if (state.selected.size >= 3) { e.target.checked = false; return; }
        state.selected.add(id);
      } else state.selected.delete(id);
      $("#compare-btn").hidden = state.selected.size < 2;
      $("#compare-btn").textContent = `Compare ${state.selected.size} →`;
      return;
    }
    openDetail(DB.formulations.find((f) => f.id === tr.dataset.id));
  };
}

function shortLabel(f) {
  let n = f.name.replace(/\s*\(.*?\)\s*/g, " ").split(":")[0].trim()
    .replace(/^Fibrin bioink \+ /, "Fibrin + ").replace(/-loaded/, "").replace(/microspheres?/, "MS");
  const small = innerWidth < 640; // phones: shorter labels, no author, so the axis isn't clipped
  const max = small ? 14 : 20;
  if (n.length > max) n = n.slice(0, max - 1).trim() + "…";
  return small ? n : `${n} · ${authorYear(papers[f.pmcid] || {})}`;
}

function renderChart(rows) {
  const v = rows.filter((f) => f.viability_percent !== null).sort((a, b) => b.viability_percent - a.viability_percent);
  Chart.defaults.font.family = "Inter, system-ui, sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = css("--text-2");
  if (chart) chart.destroy();
  $(".chart-box").style.height = `${Math.max(120, v.length * 24 + 50)}px`; // grow with the number of bars
  chart = new Chart($("#c-viab"), {
    type: "bar",
    data: {
      labels: v.map(shortLabel),
      datasets: [{ data: v.map((f) => f.viability_percent), backgroundColor: css("--accent"), borderRadius: 4, borderSkipped: "start", barThickness: 12 }],
    },
    options: {
      indexAxis: "y", maintainAspectRatio: false, animation: { duration: 200 },
      layout: { padding: { left: 4, right: 8 } },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: css("--surface"), titleColor: css("--text"), bodyColor: css("--text-2"),
          borderColor: css("--line"), borderWidth: 1, padding: 10, displayColors: false,
          callbacks: {
            title: (items) => v[items[0].dataIndex].name,
            label: (item) => {
              const f = v[item.dataIndex];
              return [`${fmt(f.viability_percent)}% viable${f.viability_day !== null ? ` on day ${f.viability_day}` : ""}`, cap(f.cell_type)];
            },
          },
        },
      },
      scales: {
        x: { min: 0, max: 100, grid: { color: css("--grid") }, border: { display: false }, ticks: { callback: (x) => x + "%" } },
        y: { grid: { display: false }, border: { display: false }, ticks: { autoSkip: false } },
      },
      onClick: (e, els) => els.length && openDetail(v[els[0].index]),
      onHover: (e, els) => (e.native.target.style.cursor = els.length ? "pointer" : "default"),
    },
  });
}

const FIELDS = [
  ["Recipe", (f) => f.composition_detail],
  ["Crosslinking", (f) => f.crosslinking],
  ["Added", (f) => f.additives.join(", ")],
  ["Cells", (f) => `${cap(f.cell_type)} (${f.cell_source})`],
  ["Cell density", (f) => f.cell_density],
  ["Printer", (f) => [f.printer, f.print_method !== "not reported" ? f.print_method : null].filter(Boolean).join(", ")],
  ["Nozzle", (f) => f.nozzle],
  ["Pressure", (f) => (f.pressure_kpa === null ? null : `${fmt(f.pressure_kpa)} kPa`)],
  ["Print speed", (f) => (f.print_speed_mm_s === null ? null : `${fmt(f.print_speed_mm_s)} mm/s`)],
  ["Stiffness", (f) => [f.stiffness_kpa === null ? null : `${fmt(f.stiffness_kpa, 2)} kPa`, f.stiffness_note].filter(Boolean).join(", ")],
  ["Viability", (f) => (f.viability_percent === null ? null : `${fmt(f.viability_percent, 2)}%${f.viability_day !== null ? ` on day ${f.viability_day}` : ""}`)],
  ["Culture time", (f) => (f.culture_days === null ? null : `${f.culture_days} days`)],
  ["Markers", (f) => f.neural_markers.join(", ")],
  ["Used for", (f) => cap([f.application, f.disease].filter(Boolean).join(", "))],
  ["Finding", (f) => f.key_outcome],
];

function openDetail(f) {
  const p = papers[f.pmcid] || {};
  $("#detail-body").innerHTML = `
    <div class="d-head">
      <div>
        <h3>${esc(f.name)}</h3>
        <div class="d-src">${esc(authorYear(p))}, <i>${esc(p.journal)}</i> · <a href="https://pmc.ncbi.nlm.nih.gov/articles/${f.pmcid}/" target="_blank" rel="noopener">Read paper</a></div>
      </div>
      <button class="close" data-close aria-label="Close">×</button>
    </div>
    <div class="d-body">
      ${f.review_notes ? `<p class="note">${esc(f.review_notes)}</p>` : ""}
      <dl class="kv">${FIELDS.filter(([, g]) => g(f)).map(([k, g]) => `<dt>${k}</dt><dd>${esc(g(f))}</dd>`).join("")}</dl>
      <h4>From the paper</h4>
      ${f.evidence.map((e) => `<p class="quote">“${esc(e.quote)}”${e.verified ? "" : ' <span class="muted">(not found in text)</span>'}</p>`).join("")}
    </div>`;
  $("#detail").showModal();
}

function openCompare() {
  const sel = DB.formulations.filter((f) => state.selected.has(f.id));
  $("#detail-body").innerHTML = `
    <div class="d-head"><h3>Compare</h3><button class="close" data-close aria-label="Close">×</button></div>
    <div class="d-body table-scroll">
      <table class="cmp">
        <thead><tr><th></th>${sel.map((f) => `<th>${esc(f.name)}<span class="sub">${esc(authorYear(papers[f.pmcid] || {}))}</span></th>`).join("")}</tr></thead>
        <tbody>${FIELDS.map(([k, g]) => `<tr><td>${k}</td>${sel.map((f) => `<td>${esc(g(f) || "–")}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>`;
  $("#detail").showModal();
}
