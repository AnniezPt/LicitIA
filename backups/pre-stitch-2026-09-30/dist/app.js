const STORAGE_KEY = "pliego-claro-mvp-opportunities-v3";

const seedOpportunities = [
  {
    id: "ejemplo-digitalizacion",
    title: "Digitalización y catalogación de un archivo municipal",
    organization: "Administración pública · ejemplo editable",
    amount: "80.000 € aprox.",
    deadline: "Cierre en 12 días",
    sector: "Servicios digitales",
    decision: "REVISAR",
    fit: "Por comprobar",
    source: "https://contrataciondelestado.es/",
    sourceLabel: "Plataforma oficial",
    summary: "Ejemplo neutro para comprobar si una empresa puede traducir requisitos de solvencia, medios y colaboración en una decisión explicable.",
    why: ["El objeto se puede entender de un vistazo.", "Permite separar solvencia económica y técnica.", "Sirve para probar la relación entre requisito y evidencia."],
    nextStep: "Comprobar qué trabajos similares puede demostrar la empresa y asociar cada uno a su documento.",
    nextDate: "Primera revisión · 25 min",
    requirements: [
      { text: "Experiencia en trabajos similares", source: "Solvencia técnica · por comprobar", status: "pending" },
      { text: "Volumen anual de negocio suficiente", source: "Solvencia económica · por comprobar", status: "pending" },
      { text: "Medios personales y materiales adecuados", source: "Medios de ejecución · por comprobar", status: "unknown" },
      { text: "Condiciones de colaboración y subcontratación", source: "Condiciones administrativas · por comprobar", status: "confirmed" }
    ]
  },
  {
    id: "ejemplo-ciberseguridad",
    title: "Formación en ciberseguridad para personal público",
    organization: "Organismo público · ejemplo editable",
    amount: "41.180 € aprox.",
    deadline: "Cierre en 18 días",
    sector: "Formación",
    decision: "REVISAR",
    fit: "Por comprobar",
    source: "https://contrataciondelestado.es/",
    sourceLabel: "Plataforma oficial",
    summary: "Ejemplo para comprobar si la ficha distingue entre afirmar que una empresa sabe hacerlo y demostrarlo con la evidencia que pide el expediente.",
    why: ["Permite trabajar con certificados y referencias.", "Pide separar personas, experiencia y medios.", "Ayuda a probar la revisión requisito por requisito."],
    nextStep: "Separar cada requisito de solvencia de la evidencia concreta que tendría que aportar la empresa.",
    nextDate: "Segunda prueba · después del primer ejemplo",
    requirements: [
      { text: "Trabajos similares y certificados de buena ejecución", source: "Solvencia técnica · por comprobar", status: "unknown" },
      { text: "Personal técnico y currículos", source: "Medios personales · por comprobar", status: "unknown" },
      { text: "Medios técnicos disponibles", source: "Prescripciones · por comprobar", status: "pending" },
      { text: "Integración de solvencia o colaboración", source: "Documentación administrativa · por comprobar", status: "confirmed" }
    ]
  },
  {
    id: "ejemplo-mantenimiento",
    title: "Mantenimiento preventivo de instalaciones públicas",
    organization: "Entidad local · ejemplo editable",
    amount: "30.000 € aprox. / año",
    deadline: "Aparcado por ahora",
    sector: "Mantenimiento",
    decision: "NO-GO",
    fit: "Baja por ahora",
    source: "https://contrataciondelestado.es/",
    sourceLabel: "Plataforma oficial",
    summary: "Ejemplo para dejar visible que la búsqueda por proximidad y las habilitaciones pueden requerir más información que el primer MVP.",
    why: ["La proximidad puede ser parte central de la ejecución.", "Puede exigir personal cualificado y medios específicos.", "Tiene más carga técnica para una primera prueba."],
    nextStep: "No invertir tiempo hasta saber si las personas de prueba necesitan búsqueda por proximidad.",
    nextDate: "Aparcado hasta validar los primeros ejemplos",
    requirements: [
      { text: "Personal cualificado para las revisiones", source: "Requisito técnico · por comprobar", status: "unknown" },
      { text: "Materiales y medios para varias instalaciones", source: "Medios de ejecución · por comprobar", status: "unknown" },
      { text: "Capacidad de atender revisiones urgentes", source: "Condiciones de ejecución · por comprobar", status: "pending" }
    ]
  }
];

let opportunities = loadOpportunities();
let selectedId = opportunities[0]?.id;
let activeFilter = "all";

const listElement = document.querySelector("#opportunityList");
const detailElement = document.querySelector("#detailPanel");
const toastElement = document.querySelector("#toast");

function loadOpportunities() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) && saved.length ? saved : structuredClone(seedOpportunities);
  } catch (error) {
    return structuredClone(seedOpportunities);
  }
}

function persist(message = "Guardado local") {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));
  const status = document.querySelector("#saveStatus");
  status.textContent = message;
  window.clearTimeout(persist.timer);
  persist.timer = window.setTimeout(() => { status.textContent = "Guardado local"; }, 1800);
}

function showToast(message) {
  toastElement.textContent = message;
  toastElement.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toastElement.classList.remove("show"), 2800);
}

function decisionClass(decision) {
  return decision.toLowerCase().replace("-", "-");
}

function visibleOpportunities() {
  if (activeFilter === "review") return opportunities.filter((item) => item.decision === "REVISAR");
  if (activeFilter === "go") return opportunities.filter((item) => item.decision === "GO");
  if (activeFilter === "soon") return opportunities.filter((item) => item.deadline !== "Caso aparcado");
  return opportunities;
}

function renderMetrics() {
  document.querySelector("#metricReview").textContent = opportunities.filter((item) => item.decision === "REVISAR").length;
  document.querySelector("#metricGo").textContent = opportunities.filter((item) => item.decision === "GO").length;
  document.querySelector("#metricNoGo").textContent = opportunities.filter((item) => item.decision === "NO-GO").length;
  document.querySelector("#metricNext").textContent = opportunities.some((item) => item.deadline !== "Caso aparcado") ? "2 casos" : "—";
  document.querySelector("#opportunityCount").textContent = `${opportunities.length} ${opportunities.length === 1 ? "caso" : "casos"}`;
}

function renderList() {
  const visible = visibleOpportunities();
  listElement.innerHTML = visible.length ? visible.map((item) => `
    <article class="opportunity-card ${item.id === selectedId ? "selected" : ""}" data-id="${item.id}" tabindex="0" role="button" aria-label="Abrir ${escapeHtml(item.title)}">
      <div class="card-topline"><span class="card-sector">${escapeHtml(item.sector)}</span><span class="decision-pill ${decisionClass(item.decision)}">${escapeHtml(item.decision)}</span></div>
      <h3>${escapeHtml(item.title)}</h3>
      <p class="card-organization">${escapeHtml(item.organization)}</p>
      <div class="card-meta"><span>Importe <strong>${escapeHtml(item.amount)}</strong></span><span>Cierre <strong>${escapeHtml(item.deadline)}</strong></span></div>
    </article>
  `).join("") : `<div class="empty-list"><strong>No hay casos con este filtro.</strong><span>Prueba otra vista o añade una oportunidad.</span></div>`;

  listElement.querySelectorAll(".opportunity-card").forEach((card) => {
    card.addEventListener("click", () => selectOpportunity(card.dataset.id));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectOpportunity(card.dataset.id); }
    });
  });
}

function renderDetail() {
  const item = opportunities.find((entry) => entry.id === selectedId);
  if (!item) {
    detailElement.innerHTML = `<div class="detail-empty"><span class="empty-mark">◈</span><h2>Elige una oportunidad</h2><p>Aquí veremos sus requisitos, evidencias y la decisión que toca tomar.</p></div>`;
    return;
  }
  detailElement.innerHTML = `
    <div class="detail-content">
      <div class="detail-topline"><span class="detail-eyebrow">Ficha de decisión · ${escapeHtml(item.fit)} encaje</span><span class="decision-pill ${decisionClass(item.decision)}">${escapeHtml(item.decision)}</span></div>
      <h2>${escapeHtml(item.title)}</h2>
      <p class="detail-organization">${escapeHtml(item.organization)} · ${escapeHtml(item.sector)}</p>
      <div class="detail-summary">
        <div><span>Presupuesto</span><strong>${escapeHtml(item.amount)}</strong></div>
        <div><span>Plazo / estado</span><strong>${escapeHtml(item.deadline)}</strong></div>
        <div><span>Evidencias</span><strong>${item.requirements.filter((req) => req.status === "confirmed").length}/${item.requirements.length} claras</strong></div>
      </div>
      <div class="detail-grid">
        <div>
          <p class="detail-section-title">Requisitos que cambian la decisión</p>
          <div class="requirements">${item.requirements.map((req, index) => `
            <div class="requirement">
              <button class="requirement-check ${req.status}" data-requirement="${index}" type="button" aria-label="Cambiar estado de ${escapeHtml(req.text)}">${req.status === "confirmed" ? "✓" : req.status === "pending" ? "!" : ""}</button>
              <div class="requirement-copy">${escapeHtml(req.text)}<span class="requirement-source">${escapeHtml(req.source)}</span></div>
            </div>`).join("")}
          </div>
          <a class="source-link" href="${escapeAttribute(item.source)}" target="_blank" rel="noreferrer">Abrir ${escapeHtml(item.sourceLabel)} ↗</a>
        </div>
        <div class="detail-aside">
          <div><p class="detail-section-title">Por qué está aquí</p><ul class="why-list">${item.why.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}</ul></div>
          <div class="decision-box"><p class="detail-section-title">Decisión provisional</p><div class="decision-buttons">${["GO", "REVISAR", "NO-GO"].map((decision) => `<button class="decision-button ${item.decision === decision ? "active" : ""}" data-decision="${decision}" type="button">${decision}</button>`).join("")}</div></div>
          <div class="next-step"><p class="detail-section-title">Siguiente acción</p><p>${escapeHtml(item.nextStep)}</p><span>${escapeHtml(item.nextDate)}</span></div>
        </div>
      </div>
      <p class="detail-note">La información de esta ficha debe contrastarse siempre con el expediente oficial.</p>
    </div>`;

  detailElement.querySelectorAll("[data-decision]").forEach((button) => button.addEventListener("click", () => {
    item.decision = button.dataset.decision;
    persist("Decisión guardada");
    render();
    showToast(`Decisión actualizada: ${item.decision}`);
  }));
  detailElement.querySelectorAll("[data-requirement]").forEach((button) => button.addEventListener("click", () => {
    const requirement = item.requirements[Number(button.dataset.requirement)];
    requirement.status = requirement.status === "unknown" ? "pending" : requirement.status === "pending" ? "confirmed" : "unknown";
    persist("Evidencia guardada");
    render();
  }));
}

function render() {
  renderMetrics();
  renderList();
  renderDetail();
  document.querySelectorAll(".filter").forEach((button) => button.classList.toggle("active", button.dataset.filter === activeFilter));
}

function selectOpportunity(id) {
  selectedId = id;
  render();
  if (window.matchMedia("(max-width: 1050px)").matches) document.querySelector("#detailPanel").scrollIntoView({ behavior: "smooth", block: "start" });
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
}

function escapeAttribute(value = "") { return escapeHtml(value).replace(/`/g, "&#96;"); }

document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  render();
}));

document.querySelector("#resetDemo").addEventListener("click", () => {
  opportunities = structuredClone(seedOpportunities);
  selectedId = opportunities[0].id;
  activeFilter = "all";
  persist("Ejemplos restaurados");
  render();
  showToast("Se han restaurado los casos de ejemplo.");
});

const dialog = document.querySelector("#addDialog");
const closeDialog = () => { dialog.hidden = true; };
document.querySelector("#openAdd").addEventListener("click", () => {
  dialog.hidden = false;
  dialog.querySelector("input[name='title']").focus();
});
document.querySelector("#closeAdd").addEventListener("click", closeDialog);
document.querySelector("#cancelAdd").addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => { if (event.target === dialog) closeDialog(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !dialog.hidden) closeDialog(); });
document.querySelector("#addForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const title = String(formData.get("title") || "").trim();
  if (!title) return;
  const id = `custom-${Date.now()}`;
  opportunities.unshift({
    id,
    title,
    organization: String(formData.get("organization") || "Sin organismo").trim(),
    amount: String(formData.get("amount") || "Por confirmar").trim(),
    deadline: String(formData.get("deadline") || "Por confirmar").trim(),
    sector: String(formData.get("sector") || "Sin clasificar").trim(),
    decision: "REVISAR",
    fit: "Por comprobar",
    source: "https://contrataciondelestado.es/",
    sourceLabel: "Plataforma oficial",
    summary: "Caso añadido durante una prueba. Completa los requisitos y la fuente después de revisar el expediente.",
    why: ["Todavía no se ha revisado con la ficha.", "Es una oportunidad aportada durante una conversación."],
    nextStep: "Añadir los tres requisitos que más pueden cambiar la decisión.",
    nextDate: "Primera revisión pendiente",
    requirements: [
      { text: "Requisito decisivo por identificar", source: "Pendiente de leer el expediente", status: "unknown" },
      { text: "Evidencia de la empresa por comprobar", source: "Pendiente de asociar documento", status: "unknown" }
    ]
  });
  selectedId = id;
  activeFilter = "all";
  persist("Oportunidad guardada");
  render();
  closeDialog();
  event.currentTarget.reset();
  showToast("Oportunidad añadida al panel.");
});

render();
