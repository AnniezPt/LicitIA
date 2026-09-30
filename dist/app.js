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
let activeDetailTab = "summary";
let searchQuery = "";

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
  let visible = opportunities;
  if (activeFilter === "review") visible = visible.filter((item) => item.decision === "REVISAR");
  if (activeFilter === "go") visible = visible.filter((item) => item.decision === "GO");
  if (activeFilter === "soon") visible = visible.filter((item) => item.deadline !== "Caso aparcado");
  if (searchQuery) {
    const query = searchQuery.toLocaleLowerCase();
    visible = visible.filter((item) => [item.title, item.organization, item.sector, item.amount].join(" ").toLocaleLowerCase().includes(query));
  }
  return visible;
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
  const confirmedCount = item.requirements.filter((req) => req.status === "confirmed").length;
  const statusLabels = { confirmed: "Confirmado en la fuente", pending: "Pendiente de comprobar", unknown: "No encontrado" };
  const requirementsView = `
    <div class="requirements-view">
      <div class="view-heading"><div><p class="detail-section-title">Control de requisitos</p><h3>Requisitos y evidencias</h3></div><span class="completion-label">${confirmedCount}/${item.requirements.length} claros</span></div>
      <p class="view-intro">Cada requisito debe quedar unido a una fuente, una evidencia y una siguiente acción. Pulsa el indicador para recorrer los estados de prueba.</p>
      <div class="requirement-groups">
        <section class="requirement-group"><div class="group-heading"><strong>Requisitos que cambian la decisión</strong><span>${item.requirements.length}</span></div>
          <div class="requirements">${item.requirements.map((req, index) => `
            <div class="requirement">
              <button class="requirement-check ${req.status}" data-requirement="${index}" type="button" aria-label="Cambiar estado de ${escapeHtml(req.text)}">${req.status === "confirmed" ? "✓" : req.status === "pending" ? "!" : "?"}</button>
              <div class="requirement-copy"><strong>${escapeHtml(req.text)}</strong><span class="requirement-source">${escapeHtml(req.source)}</span><span class="requirement-status status-${req.status}">${statusLabels[req.status]}</span></div>
              <span class="requirement-action">Ver fuente</span>
            </div>`).join("")}
          </div>
          <a class="source-link" href="${escapeAttribute(item.source)}" target="_blank" rel="noreferrer">Abrir ${escapeHtml(item.sourceLabel)} ↗</a>
        </section>
      </div>
    </div>`;
  const summaryView = `
    <div class="summary-view">
      <div class="view-heading"><div><p class="detail-section-title">Lectura rápida</p><h3>Resumen del expediente</h3></div><span class="example-label">Datos de ejemplo · editable</span></div>
      <div class="summary-grid">
        <div class="summary-cell summary-wide"><span>Qué se compra</span><strong>${escapeHtml(item.summary)}</strong></div>
        <div class="summary-cell"><span>Quién lo compra</span><strong>${escapeHtml(item.organization)}</strong></div>
        <div class="summary-cell"><span>Importe orientativo</span><strong>${escapeHtml(item.amount)}</strong></div>
        <div class="summary-cell"><span>Fecha límite</span><strong>${escapeHtml(item.deadline)}</strong></div>
        <div class="summary-cell"><span>Sector</span><strong>${escapeHtml(item.sector)}</strong></div>
        <div class="summary-cell summary-wide"><span>Qué falta comprobar</span><strong>${escapeHtml(item.nextStep)}</strong></div>
      </div>
      <div class="next-step"><p class="detail-section-title">Siguiente paso inmediato</p><p>${escapeHtml(item.nextStep)}</p><span>${escapeHtml(item.nextDate)}</span></div>
    </div>`;
  const documentsView = `
    <div class="documents-view"><div class="view-heading"><div><p class="detail-section-title">Documentación</p><h3>Fuentes del expediente</h3></div><span class="example-label">No sincronizado</span></div>
      <p class="view-intro">Esta lista es estructural: hasta conectar una fuente oficial, no afirma que los documentos estén descargados o verificados.</p>
      <div class="document-list">${["PCAP · Pliego de cláusulas administrativas", "PPT · Prescripciones técnicas", "Anexos · Modelos y declaraciones"].map((name, index) => `<div class="document-row"><span class="document-icon">${index === 0 ? "PDF" : index === 1 ? "DOC" : "ZIP"}</span><div><strong>${name}</strong><span>Fuente pendiente de asociar · ejemplo editable</span></div><a class="document-action" href="${escapeAttribute(item.source)}" target="_blank" rel="noreferrer">Ver fuente ↗</a></div>`).join("")}</div>
    </div>`;
  const decisionView = `
    <div class="decision-view"><div class="view-heading"><div><p class="detail-section-title">Matriz de decisión</p><h3>¿Merece invertir tiempo?</h3></div><span class="decision-pill ${decisionClass(item.decision)}">${escapeHtml(item.decision)}</span></div>
      <div class="decision-buttons decision-buttons-large">${["GO", "REVISAR", "NO-GO"].map((decision) => `<button class="decision-button ${item.decision === decision ? "active" : ""}" data-decision="${decision}" type="button">${decision}</button>`).join("")}</div>
      <div class="decision-columns"><div><p class="detail-section-title">Por qué sube</p><ul class="why-list">${item.why.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}</ul></div><div><p class="detail-section-title">Qué falta para decidir</p><p class="decision-copy">${escapeHtml(item.nextStep)}</p></div></div>
      <button class="button button-dark confirm-decision" data-decision-confirm type="button">Confirmar decisión provisional</button>
    </div>`;
  const tasksView = `
    <div class="tasks-view"><div class="view-heading"><div><p class="detail-section-title">Acciones vinculadas</p><h3>Tareas del expediente</h3></div><button class="button button-outline" type="button" data-task-add>+ Crear tarea</button></div>
      <div class="task-list"><div class="task-row"><span class="task-state task-state-review">En curso</span><div><strong>${escapeHtml(item.nextStep)}</strong><span>Responsable: por asignar · ${escapeHtml(item.nextDate)}</span></div></div><div class="task-row"><span class="task-state task-state-pending">Pendiente</span><div><strong>Asociar evidencia a cada requisito decisivo</strong><span>Responsable: por asignar · Fecha por confirmar</span></div></div></div>
    </div>`;
  const historyView = `
    <div class="history-view"><div class="view-heading"><div><p class="detail-section-title">Trazabilidad</p><h3>Historial de prueba</h3></div><span class="example-label">Datos locales</span></div>
      <div class="timeline"><div class="timeline-item"><span>Ahora</span><div><strong>Expediente abierto en el MVP</strong><p>La información se mantiene en este navegador.</p></div></div><div class="timeline-item"><span>Inicio</span><div><strong>Oportunidad añadida como ejemplo</strong><p>La fuente oficial todavía debe contrastarse.</p></div></div></div>
    </div>`;
  const tabViews = { summary: summaryView, requirements: requirementsView, documents: documentsView, decision: decisionView, tasks: tasksView, history: historyView };
  detailElement.innerHTML = `
    <div class="detail-content">
      <div class="detail-topline"><div><span class="detail-eyebrow">Ficha de decisión · ${escapeHtml(item.fit)} encaje</span><h2>${escapeHtml(item.title)}</h2><p class="detail-organization">${escapeHtml(item.organization)} · ${escapeHtml(item.sector)} · <span class="mono">${escapeHtml(item.amount)}</span></p></div><span class="decision-pill ${decisionClass(item.decision)}">${escapeHtml(item.decision)}</span></div>
      <div class="detail-summary"><div><span>Presupuesto</span><strong>${escapeHtml(item.amount)}</strong></div><div><span>Plazo / estado</span><strong>${escapeHtml(item.deadline)}</strong></div><div><span>Evidencias</span><strong>${confirmedCount}/${item.requirements.length} claras</strong></div></div>
      <nav class="detail-tabs" aria-label="Secciones del expediente">${[["summary","Resumen"],["requirements","Requisitos y evidencias"],["documents","Documentos"],["decision","Decisión"],["tasks","Tareas"],["history","Historial"]].map(([id,label]) => `<button class="detail-tab ${activeDetailTab === id ? "active" : ""}" data-tab="${id}" type="button">${label}${id === "requirements" ? `<small>${item.requirements.length}</small>` : id === "tasks" ? `<small>2</small>` : ""}</button>`).join("")}</nav>
      <div class="detail-tab-panel">${tabViews[activeDetailTab]}</div>
      <p class="detail-note">La información de esta ficha debe contrastarse siempre con el expediente oficial. Los datos visibles están rotulados como ejemplo cuando aún no existe conexión documental.</p>
    </div>`;

  detailElement.querySelectorAll("[data-tab]").forEach((button) => button.addEventListener("click", () => {
    activeDetailTab = button.dataset.tab;
    renderDetail();
  }));
  detailElement.querySelectorAll("[data-decision]").forEach((button) => button.addEventListener("click", () => {
    item.decision = button.dataset.decision;
    persist("Decisión guardada");
    render();
    showToast(`Decisión actualizada: ${item.decision}`);
  }));
  detailElement.querySelector("[data-decision-confirm]")?.addEventListener("click", () => showToast(`Decisión provisional confirmada: ${item.decision}`));
  detailElement.querySelectorAll("[data-requirement]").forEach((button) => button.addEventListener("click", () => {
    const requirement = item.requirements[Number(button.dataset.requirement)];
    requirement.status = requirement.status === "unknown" ? "pending" : requirement.status === "pending" ? "confirmed" : "unknown";
    persist("Evidencia guardada");
    render();
  }));
  detailElement.querySelector("[data-task-add]")?.addEventListener("click", () => showToast("La creación de tareas queda preparada para la siguiente iteración."));
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

document.querySelector("#globalSearch")?.addEventListener("input", (event) => {
  searchQuery = event.target.value.trim();
  renderList();
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.querySelector("#globalSearch")?.focus();
  }
});

document.querySelector("#resetDemo").addEventListener("click", () => {
  opportunities = structuredClone(seedOpportunities);
  selectedId = opportunities[0].id;
  activeFilter = "all";
  activeDetailTab = "summary";
  searchQuery = "";
  if (document.querySelector("#globalSearch")) document.querySelector("#globalSearch").value = "";
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
