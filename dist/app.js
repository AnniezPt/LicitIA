const STORAGE_KEY = "pliego-claro-mvp-opportunities-v3";
const SETTINGS_KEY = "pliego-claro-mvp-settings-v1";
const NOTES_KEY = "pliego-claro-mvp-benchmark-notes-v1";
const TEAM_KEY = "pliego-claro-mvp-team-v1";

const defaultTeam = [
  { id: "role-owner", name: "Responsable del proyecto", role: "Decisión y coordinación", note: "Rol local · sin invitaciones externas" }
];

const defaultSettings = {
  workspaceName: "Mi empresa (ejemplo)",
  timezone: "Europe/Madrid",
  sectors: "",
  locations: "",
  technicalSolvency: "",
  economicSolvency: "",
  collaborationNotes: "",
  documentsAvailable: "",
  includeProximity: true,
  strictLCSP: true,
  defaultDecision: "REVISAR",
  deadlineReminders: true,
  reminderDays: "7, 2, 1",
  density: "compact",
  showExampleLabels: true
};

const seedOpportunities = [
  {
    id: "ejemplo-digitalizacion",
    title: "Digitalización y catalogación de un archivo municipal",
    organization: "Administración pública · ejemplo editable",
    amount: "80.000 € aprox.",
    deadline: "Cierre en 12 días",
    deadlineDate: "2026-10-12",
    sector: "Servicios digitales",
    territory: { city: "Madrid", province: "Madrid", mode: "Presencial + remoto", mapX: 232, mapY: 145, note: "Ubicación de prueba" },
    decision: "REVISAR",
    fit: "Por comprobar",
    source: "https://contrataciondelestado.es/",
    sourceLabel: "Plataforma oficial",
    summary: "Ejemplo neutro para comprobar si una empresa puede traducir requisitos de solvencia, medios y colaboración en una decisión explicable.",
    why: ["El objeto se puede entender de un vistazo.", "Permite separar solvencia económica y técnica.", "Sirve para probar la relación entre requisito y evidencia."],
    nextStep: "Comprobar qué trabajos similares puede demostrar la empresa y asociar cada uno a su documento.",
    nextDate: "Primera revisión · 25 min",
    nextStepDone: false,
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
    deadlineDate: "2026-10-18",
    sector: "Formación",
    territory: { city: "Valladolid", province: "Valladolid", mode: "Remoto + desplazamiento puntual", mapX: 190, mapY: 91, note: "Ubicación de prueba" },
    decision: "REVISAR",
    fit: "Por comprobar",
    source: "https://contrataciondelestado.es/",
    sourceLabel: "Plataforma oficial",
    summary: "Ejemplo para comprobar si la ficha distingue entre afirmar que una empresa sabe hacerlo y demostrarlo con la evidencia que pide el expediente.",
    why: ["Permite trabajar con certificados y referencias.", "Pide separar personas, experiencia y medios.", "Ayuda a probar la revisión requisito por requisito."],
    nextStep: "Separar cada requisito de solvencia de la evidencia concreta que tendría que aportar la empresa.",
    nextDate: "Segunda prueba · después del primer ejemplo",
    nextStepDone: false,
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
    deadlineDate: null,
    sector: "Mantenimiento",
    territory: { city: "Guadalajara", province: "Guadalajara", mode: "Presencial", mapX: 249, mapY: 139, note: "Ubicación de prueba" },
    decision: "NO-GO",
    fit: "Baja por ahora",
    source: "https://contrataciondelestado.es/",
    sourceLabel: "Plataforma oficial",
    summary: "Ejemplo para dejar visible que la búsqueda por proximidad y las habilitaciones pueden requerir más información que el primer MVP.",
    why: ["La proximidad puede ser parte central de la ejecución.", "Puede exigir personal cualificado y medios específicos.", "Tiene más carga técnica para una primera prueba."],
    nextStep: "No invertir tiempo hasta saber si las personas de prueba necesitan búsqueda por proximidad.",
    nextDate: "Aparcado hasta validar los primeros ejemplos",
    nextStepDone: false,
    requirements: [
      { text: "Personal cualificado para las revisiones", source: "Requisito técnico · por comprobar", status: "unknown" },
      { text: "Materiales y medios para varias instalaciones", source: "Medios de ejecución · por comprobar", status: "unknown" },
      { text: "Capacidad de atender revisiones urgentes", source: "Condiciones de ejecución · por comprobar", status: "pending" }
    ]
  }
];

const seedNotes = [
  {
    id: "nota-regla-evidencia",
    kind: "Regla",
    text: "Separar siempre el hecho del pliego, la evidencia de la empresa y la duda pendiente.",
    opportunityId: "",
    createdAt: "2026-09-30T09:00:00.000Z"
  },
  {
    id: "nota-conectar-casos",
    kind: "Pendiente",
    text: "Conectar casos reales y registrar falsos positivos, falsos negativos y requisitos que el primer MVP no encuentra.",
    opportunityId: "",
    createdAt: "2026-09-30T09:05:00.000Z"
  }
];

let opportunities = loadOpportunities();
let settings = loadSettings();
let notes = loadNotes();
let team = loadTeam();
let selectedId = opportunities[0]?.id;
let activeFilter = "all";
let activeExpedientFilter = "all";
let activeTaskFilter = "open";
let activeDetailTab = "summary";
let searchQuery = "";

const listElement = document.querySelector("#opportunityList");
const detailElement = document.querySelector("#detailPanel");
const toastElement = document.querySelector("#toast");
const routeElement = document.querySelector("#routeView");
const dashboardSections = document.querySelectorAll(".dashboard-section");
const breadcrumbElement = document.querySelector(".breadcrumbs strong");

function loadOpportunities() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(saved) || !saved.length) return structuredClone(seedOpportunities);
    return saved.map((item) => {
      const seed = seedOpportunities.find((entry) => entry.id === item.id);
      return { ...(seed || {}), ...item, source: safeHttpUrl(item.source), requirements: Array.isArray(item.requirements) ? item.requirements : structuredClone(seed?.requirements || []), deadlineDate: item.deadlineDate ?? seed?.deadlineDate ?? null, nextStepDone: item.nextStepDone ?? false };
    });
  } catch (error) {
    return structuredClone(seedOpportunities);
  }
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    return saved && typeof saved === "object" ? { ...defaultSettings, ...saved } : { ...defaultSettings };
  } catch (error) {
    return { ...defaultSettings };
  }
}

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(NOTES_KEY));
    return Array.isArray(saved) ? saved : structuredClone(seedNotes);
  } catch (error) {
    return structuredClone(seedNotes);
  }
}

function loadTeam() {
  try {
    const saved = JSON.parse(localStorage.getItem(TEAM_KEY));
    return Array.isArray(saved) && saved.length ? saved : structuredClone(defaultTeam);
  } catch (error) {
    return structuredClone(defaultTeam);
  }
}

function persistSettings(message = "Ajustes guardados") {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  showToast(message);
}

function persistNotes(message = "Nota guardada") {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  showToast(message);
}

function persistTeam(message = "Equipo local actualizado") {
  localStorage.setItem(TEAM_KEY, JSON.stringify(team));
  showToast(message);
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

function recordHistory(item, label, detail) {
  item.history = Array.isArray(item.history) ? item.history : [];
  item.history.unshift({ label, detail, at: new Date().toISOString() });
  item.history = item.history.slice(0, 20);
}

function getDeadlineDate(item) {
  if (!item.deadlineDate) return null;
  const date = new Date(`${item.deadlineDate}T23:59:59`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(date) {
  if (!date) return "Fecha por confirmar";
  return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short" }).format(date).replace(".", "");
}

function daysUntil(date) {
  if (!date) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / 86400000);
}

function deadlineLabel(item) {
  const date = getDeadlineDate(item);
  const days = daysUntil(date);
  if (!date) return item.deadline || "Fecha por confirmar";
  if (days < 0) return `Cerró el ${formatDate(date)}`;
  if (days === 0) return `Cierra hoy · ${formatDate(date)}`;
  return `Cierra el ${formatDate(date)} · ${days} días`;
}

function deadlineCompactLabel(item) {
  const date = getDeadlineDate(item);
  const days = daysUntil(date);
  if (!date) return item.deadline || "Fecha por confirmar";
  if (days < 0) return `Cerró · ${formatDate(date)}`;
  return `${formatDate(date)} · ${days} días`;
}

function upcomingOpportunities() {
  return opportunities
    .filter((item) => getDeadlineDate(item) && daysUntil(getDeadlineDate(item)) >= 0)
    .sort((a, b) => getDeadlineDate(a) - getDeadlineDate(b));
}

function taskItems(item) {
  const tasks = [{
    id: `next-${item.id}`,
    opportunityId: item.id,
    title: item.nextStep || "Definir el siguiente paso",
    detail: item.nextDate || "Fecha por confirmar",
    status: item.nextStepDone ? "completed" : item.decision === "NO-GO" ? "blocked" : "in_progress",
    kind: "next",
    taskType: "decision",
    priority: item.nextStepDone ? "normal" : "high",
    dueDate: item.deadlineDate || ""
  }];
  (item.requirements || []).forEach((requirement, requirementIndex) => {
    const isCollaboration = /colaboraci[oó]n|subcontrat|medios externos|UTE|asociaci[oó]n/i.test(requirement.text);
    tasks.push({
      id: `requirement-${item.id}-${requirementIndex}`,
      opportunityId: item.id,
      title: `Comprobar: ${requirement.text}`,
      detail: requirement.source || "Fuente por asociar",
      status: requirement.status === "confirmed" ? "completed" : "pending",
      kind: "requirement",
      taskType: isCollaboration ? "collaboration" : "evidence",
      priority: requirement.status === "unknown" ? "high" : "normal",
      dueDate: item.deadlineDate || "",
      requirementIndex
    });
  });
  return tasks;
}

function allTasks() {
  return opportunities.flatMap((item) => taskItems(item));
}

function visibleTasks() {
  const tasks = allTasks();
  if (activeTaskFilter === "open") return tasks.filter((task) => ["pending", "in_progress"].includes(task.status));
  if (activeTaskFilter === "urgent") return tasks.filter((task) => task.status !== "completed" && task.priority === "high");
  if (activeTaskFilter === "evidence") return tasks.filter((task) => task.taskType === "evidence");
  if (activeTaskFilter === "collaboration") return tasks.filter((task) => task.taskType === "collaboration");
  if (activeTaskFilter === "completed") return tasks.filter((task) => task.status === "completed");
  return tasks;
}

function taskStatusLabel(status) {
  return { completed: "Completada", in_progress: "En curso", pending: "Pendiente", blocked: "Aparcada" }[status] || "Pendiente";
}

function taskTypeLabel(type) {
  return { decision: "Decisión", evidence: "Evidencia", collaboration: "Colaboración" }[type] || "Trabajo";
}

function taskPriorityLabel(priority) {
  return priority === "high" ? "Prioridad alta" : "Prioridad normal";
}

function taskDueLabel(task) {
  return task.dueDate ? `Antes del ${formatDate(getDeadlineDate({ deadlineDate: task.dueDate }))}` : "Fecha por confirmar";
}

function compactCount(value) {
  return value > 9 ? "9+" : String(value);
}

function taskStateClass(status) {
  return { completed: "task-state-completed", in_progress: "task-state-review", pending: "task-state-pending", blocked: "task-state-blocked" }[status] || "task-state-pending";
}

function profileBlocks() {
  return [
    ["Servicios y sectores", settings.sectors],
    ["Zonas de ejecución", settings.locations],
    ["Solvencia técnica", settings.technicalSolvency],
    ["Solvencia económica", settings.economicSolvency],
    ["Medios propios, externos o asociación", settings.collaborationNotes],
    ["Documentación disponible", settings.documentsAvailable]
  ];
}

function profileCompletion() {
  const blocks = profileBlocks();
  const completed = blocks.filter(([, value]) => String(value || "").trim()).length;
  return { blocks, completed, total: blocks.length, percentage: Math.round((completed / blocks.length) * 100) };
}

function taskRowMarkup(task, showOpportunity = true) {
  const item = opportunities.find((entry) => entry.id === task.opportunityId);
  const completed = task.status === "completed";
  return `<div class="task-board-row ${completed ? "task-board-row-completed" : ""}">
    <button class="task-check-button ${taskStateClass(task.status)}" data-task-complete="${escapeAttribute(task.id)}" type="button" aria-label="${completed ? "Reabrir" : "Completar"} tarea">${completed ? "✓" : "○"}</button>
    <div class="task-board-copy"><strong>${escapeHtml(task.title)}</strong><span>${escapeHtml(task.detail)}${showOpportunity && item ? ` · ${escapeHtml(item.title)}` : ""}</span><small><b>${escapeHtml(taskTypeLabel(task.taskType))}</b> · ${escapeHtml(taskPriorityLabel(task.priority))} · ${escapeHtml(taskDueLabel(task))}</small></div>
    <span class="task-state ${taskStateClass(task.status)}">${taskStatusLabel(task.status)}</span>
    ${item ? `<button class="route-row-action" data-open-opportunity="${escapeAttribute(item.id)}" type="button">Abrir →</button>` : ""}
  </div>`;
}

function completeTask(taskId) {
  const task = allTasks().find((entry) => entry.id === taskId);
  const item = task && opportunities.find((entry) => entry.id === task.opportunityId);
  if (!task || !item) return;
  if (task.kind === "requirement") {
    const requirement = item.requirements[task.requirementIndex];
    requirement.status = task.status === "completed" ? "pending" : "confirmed";
    recordHistory(item, requirement.status === "confirmed" ? `Tarea completada: ${requirement.text}` : `Tarea reabierta: ${requirement.text}`, "Estado de evidencia actualizado desde Tareas.");
  } else {
    item.nextStepDone = !item.nextStepDone;
    recordHistory(item, item.nextStepDone ? "Siguiente acción completada" : "Siguiente acción reabierta", item.nextStep);
  }
  persist(item.nextStepDone ? "Tarea completada" : "Tarea actualizada");
  render();
}

function decisionClass(decision) {
  return decision.toLowerCase().replace("-", "-");
}

function visibleOpportunities() {
  let visible = opportunities;
  if (activeFilter === "review") visible = visible.filter((item) => item.decision === "REVISAR");
  if (activeFilter === "go") visible = visible.filter((item) => item.decision === "GO");
  if (activeFilter === "soon") visible = visible.filter((item) => getDeadlineDate(item) && daysUntil(getDeadlineDate(item)) >= 0).sort((a, b) => getDeadlineDate(a) - getDeadlineDate(b));
  if (searchQuery) {
    const query = searchQuery.toLocaleLowerCase();
    visible = visible.filter((item) => [item.title, item.organization, item.sector, item.amount, item.summary, item.nextStep, ...(item.requirements || []).map((requirement) => requirement.text)].join(" ").toLocaleLowerCase().includes(query));
  }
  return visible;
}

function renderMetrics() {
  const openTasks = allTasks().filter((task) => task.status === "pending" || task.status === "in_progress");
  const upcoming = upcomingOpportunities();
  const profile = profileCompletion();
  document.querySelector("#metricReview").textContent = opportunities.filter((item) => item.decision === "REVISAR").length;
  document.querySelector("#metricGo").textContent = opportunities.filter((item) => item.decision === "GO").length;
  document.querySelector("#metricNoGo").textContent = opportunities.filter((item) => item.decision === "NO-GO").length;
  document.querySelector("#metricNext").textContent = upcoming.length ? `${upcoming.length} · ${formatDate(getDeadlineDate(upcoming[0]))}` : "—";
  document.querySelector("#opportunityCount").textContent = `${opportunities.length} ${opportunities.length === 1 ? "caso" : "casos"}`;
  document.querySelector('[data-route-count="hoy"]')?.replaceChildren(document.createTextNode(compactCount(openTasks.length)));
  document.querySelector('[data-route-count="tareas"]')?.replaceChildren(document.createTextNode(compactCount(openTasks.length)));
  document.querySelector("[data-workspace-name]")?.replaceChildren(document.createTextNode(settings.workspaceName || "Mi empresa"));
  const profileProgress = document.querySelector("[data-profile-progress]");
  if (profileProgress) profileProgress.style.width = `${profile.percentage}%`;
  document.documentElement.dataset.density = settings.density;
}

function renderList() {
  const visible = visibleOpportunities();
  const countLabel = document.querySelector("#opportunityCount");
  if (countLabel) countLabel.textContent = visible.length === opportunities.length ? `${opportunities.length} ${opportunities.length === 1 ? "caso" : "casos"}` : `${visible.length} de ${opportunities.length}`;
  listElement.innerHTML = visible.length ? visible.map((item) => `
    <article class="opportunity-card decision-${decisionClass(item.decision)} ${item.id === selectedId ? "selected" : ""}" data-id="${item.id}" tabindex="0" role="button" aria-label="Abrir ${escapeHtml(item.title)}">
      <div class="card-topline"><span class="card-sector">${escapeHtml(item.sector)}</span><span class="decision-pill ${decisionClass(item.decision)}">${escapeHtml(item.decision)}</span></div>
      <h3>${escapeHtml(item.title)}</h3>
      <p class="card-organization">${escapeHtml(item.organization)}</p>
      <div class="card-meta"><span>Importe <strong>${escapeHtml(item.amount)}</strong></span><span>Cierre <strong>${escapeHtml(deadlineCompactLabel(item))}</strong></span></div>
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
  const exampleBadge = settings.showExampleLabels ? `<span class="example-label">Datos de ejemplo · editable</span>` : "";
  const sourceLink = item.source ? `<a class="source-link" href="${escapeAttribute(item.source)}" target="_blank" rel="noreferrer">Abrir ${escapeHtml(item.sourceLabel || "fuente oficial")} ↗</a>` : `<span class="source-link source-link-muted">Fuente pendiente de asociar</span>`;
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
              ${item.source ? `<a class="requirement-action" href="${escapeAttribute(item.source)}" target="_blank" rel="noreferrer">Ver fuente ↗</a>` : `<span class="requirement-action requirement-action-muted">Fuente pendiente</span>`}
            </div>`).join("")}
          </div>
          ${sourceLink}
        </section>
      </div>
    </div>`;
  const summaryView = `
    <div class="summary-view">
      <div class="view-heading"><div><p class="detail-section-title">Lectura rápida</p><h3>Resumen del expediente</h3></div>${exampleBadge}</div>
      <div class="summary-grid">
        <div class="summary-cell summary-wide"><span>Qué se compra</span><strong>${escapeHtml(item.summary)}</strong></div>
        <div class="summary-cell"><span>Quién lo compra</span><strong>${escapeHtml(item.organization)}</strong></div>
        <div class="summary-cell"><span>Importe orientativo</span><strong>${escapeHtml(item.amount)}</strong></div>
        <div class="summary-cell"><span>Fecha límite</span><strong>${escapeHtml(deadlineLabel(item))}</strong></div>
        <div class="summary-cell"><span>Sector</span><strong>${escapeHtml(item.sector)}</strong></div>
        <div class="summary-cell summary-wide"><span>Qué falta comprobar</span><strong>${escapeHtml(item.nextStep)}</strong></div>
      </div>
      <div class="next-step"><p class="detail-section-title">Siguiente paso inmediato</p><p>${escapeHtml(item.nextStep)}</p><span>${escapeHtml(item.nextDate)}</span></div>
    </div>`;
  const documentsView = `
    <div class="documents-view"><div class="view-heading"><div><p class="detail-section-title">Documentación</p><h3>Fuentes del expediente</h3></div>${settings.showExampleLabels ? `<span class="example-label">No sincronizado</span>` : ""}</div>
      <p class="view-intro">Esta lista es estructural: hasta conectar una fuente oficial, no afirma que los documentos estén descargados o verificados.</p>
      <div class="document-list">${["PCAP · Pliego de cláusulas administrativas", "PPT · Prescripciones técnicas", "Anexos · Modelos y declaraciones"].map((name, index) => `<div class="document-row"><span class="document-icon">${index === 0 ? "PDF" : index === 1 ? "DOC" : "ZIP"}</span><div><strong>${name}</strong><span>Fuente pendiente de asociar · ejemplo editable</span></div>${item.source ? `<a class="document-action" href="${escapeAttribute(item.source)}" target="_blank" rel="noreferrer">Ver fuente ↗</a>` : `<span class="document-action document-action-muted">Pendiente</span>`}</div>`).join("")}</div>
    </div>`;
  const decisionView = `
    <div class="decision-view"><div class="view-heading"><div><p class="detail-section-title">Matriz de decisión</p><h3>¿Merece invertir tiempo?</h3></div><span class="decision-pill ${decisionClass(item.decision)}">${escapeHtml(item.decision)}</span></div>
      <div class="decision-buttons decision-buttons-large">${["GO", "REVISAR", "NO-GO"].map((decision) => `<button class="decision-button ${item.decision === decision ? "active" : ""}" data-decision="${decision}" type="button">${decision}</button>`).join("")}</div>
      <div class="decision-columns"><div><p class="detail-section-title">Por qué sube</p><ul class="why-list">${item.why.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}</ul></div><div><p class="detail-section-title">Qué falta para decidir</p><p class="decision-copy">${escapeHtml(item.nextStep)}</p></div></div>
      <button class="button button-dark confirm-decision" data-decision-confirm type="button">Confirmar decisión provisional</button>
    </div>`;
  const tasksView = `
    <div class="tasks-view"><div class="view-heading"><div><p class="detail-section-title">Acciones vinculadas</p><h3>Tareas del expediente</h3></div><span class="example-label">Derivadas de la revisión</span></div>
      <p class="view-intro">Cada duda pendiente se convierte en una tarea concreta. Al completar una comprobación, la evidencia pasa a confirmado.</p>
      <div class="task-list">${taskItems(item).map((task) => taskRowMarkup(task, false)).join("")}</div>
    </div>`;
  const historyView = `
    <div class="history-view"><div class="view-heading"><div><p class="detail-section-title">Trazabilidad</p><h3>Historial de prueba</h3></div><span class="example-label">Datos locales</span></div>
      <div class="timeline">${(item.history || [{ label: "Oportunidad añadida como ejemplo", detail: "La fuente oficial todavía debe contrastarse.", at: new Date().toISOString() }]).map((event) => `<div class="timeline-item"><span>${escapeHtml(formatDate(new Date(event.at)))}</span><div><strong>${escapeHtml(event.label)}</strong><p>${escapeHtml(event.detail)}</p></div></div>`).join("")}</div>
    </div>`;
  const tabViews = { summary: summaryView, requirements: requirementsView, documents: documentsView, decision: decisionView, tasks: tasksView, history: historyView };
  detailElement.innerHTML = `
    <div class="detail-content">
      <div class="detail-topline"><div><span class="detail-eyebrow">Ficha de decisión · ${escapeHtml(item.fit)} encaje</span><h2>${escapeHtml(item.title)}</h2><p class="detail-organization">${escapeHtml(item.organization)} · ${escapeHtml(item.sector)} · <span class="mono">${escapeHtml(item.amount)}</span></p></div><span class="decision-pill ${decisionClass(item.decision)}">${escapeHtml(item.decision)}</span></div>
      <div class="detail-summary"><div><span>Presupuesto</span><strong>${escapeHtml(item.amount)}</strong></div><div><span>Plazo / estado</span><strong>${escapeHtml(deadlineLabel(item))}</strong></div><div><span>Evidencias</span><strong>${confirmedCount}/${item.requirements.length} claras</strong></div></div>
      <nav class="detail-tabs" aria-label="Secciones del expediente">${[["summary","Resumen"],["requirements","Requisitos y evidencias"],["documents","Documentos"],["decision","Decisión"],["tasks","Tareas"],["history","Historial"]].map(([id,label]) => `<button class="detail-tab ${activeDetailTab === id ? "active" : ""}" data-tab="${id}" type="button">${label}${id === "requirements" ? `<small>${item.requirements.length}</small>` : id === "tasks" ? `<small>${taskItems(item).length}</small>` : ""}</button>`).join("")}</nav>
      <div class="detail-tab-panel">${tabViews[activeDetailTab]}</div>
      <p class="detail-note">La información de esta ficha debe contrastarse siempre con el expediente oficial. Los datos visibles están rotulados como ejemplo cuando aún no existe conexión documental.</p>
    </div>`;

  detailElement.querySelectorAll("[data-tab]").forEach((button) => button.addEventListener("click", () => {
    activeDetailTab = button.dataset.tab;
    renderDetail();
  }));
  detailElement.querySelectorAll("[data-decision]").forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.decision === "GO" && settings.strictLCSP && item.requirements.some((requirement) => requirement.status !== "confirmed")) {
      showToast("Modo estricto: faltan requisitos decisivos por confirmar.");
      return;
    }
    item.decision = button.dataset.decision;
    recordHistory(item, `Decisión provisional: ${item.decision}`, settings.strictLCSP ? "Aplicada con control de requisitos activo." : "Aplicada durante la prueba.");
    persist("Decisión guardada");
    render();
    showToast(`Decisión actualizada: ${item.decision}`);
  }));
  detailElement.querySelector("[data-decision-confirm]")?.addEventListener("click", () => showToast(`Decisión provisional confirmada: ${item.decision}`));
  detailElement.querySelectorAll("[data-requirement]").forEach((button) => button.addEventListener("click", () => {
    const requirement = item.requirements[Number(button.dataset.requirement)];
    requirement.status = requirement.status === "unknown" ? "pending" : requirement.status === "pending" ? "confirmed" : "unknown";
    recordHistory(item, `Estado actualizado: ${requirement.text}`, statusLabels[requirement.status]);
    persist("Evidencia guardada");
    render();
  }));
  detailElement.querySelectorAll("[data-task-complete]").forEach((button) => button.addEventListener("click", () => completeTask(button.dataset.taskComplete)));
}

function render() {
  renderMetrics();
  renderList();
  renderDetail();
  document.querySelectorAll(".filter").forEach((button) => button.classList.toggle("active", button.dataset.filter === activeFilter));
  renderRoute();
}

function currentRoute() {
  const route = window.location.hash.replace("#", "");
  return ["hoy", "oportunidades", "expedientes", "tareas", "asistencia", "radar", "equipo", "empresa", "pruebas", "ajustes"].includes(route) ? route : "oportunidades";
}

function assistanceItems(item) {
  const requirements = item?.requirements || [];
  const unresolved = requirements.filter((requirement) => requirement.status !== "confirmed");
  const needsTechnical = unresolved.some((requirement) => /experiencia|personal|medios|certificad/i.test(requirement.text));
  const needsEconomic = unresolved.some((requirement) => /volumen|econ[oó]mic|seguro|patrimonio/i.test(requirement.text));
  const needsCollaboration = unresolved.some((requirement) => /colaboraci[oó]n|subcontrat|medios externos|UTE|asociaci[oó]n/i.test(requirement.text));
  return [
    {
      label: "EXPERIENCIA ESPECÍFICA",
      title: needsTechnical ? "¿Puedes demostrar que sabes hacerlo?" : "¿Qué experiencia pide exactamente?",
      text: "No basta con pertenecer a un sector parecido: hay que identificar trabajos similares, periodo, importe y documento que los acredite.",
      action: needsTechnical ? "Revisar evidencia" : "Ver perfil de empresa",
      href: needsTechnical ? "#tareas" : "#ajustes",
      tone: needsTechnical ? "review" : "go"
    },
    {
      label: "SOLVENCIA Y MEDIOS",
      title: needsEconomic ? "¿Qué solvencia económica te exige?" : "¿Qué puedes acreditar hoy?",
      text: "Separamos solvencia económica, solvencia técnica, personas, titulaciones y medios materiales. Cada afirmación necesita una evidencia.",
      action: "Revisar requisitos",
      href: "#tareas",
      tone: needsEconomic ? "review" : "neutral"
    },
    {
      label: "VÍAS DE PARTICIPACIÓN",
      title: needsCollaboration ? "¿Puedes cubrir la carencia con otra empresa?" : "¿Cuándo tendría sentido colaborar?",
      text: "Hay que distinguir UTE, medios externos y subcontratación. No son intercambiables y el pliego determina qué se admite y quién debe ejecutar.",
      action: "Ver tareas de colaboración",
      href: "#tareas",
      tone: needsCollaboration ? "review" : "neutral"
    },
    {
      label: "COBERTURA TERRITORIAL",
      title: "¿Puedes ejecutar desde tu capacidad real?",
      text: "La proximidad sirve para estimar desplazamientos, logística y cobertura. No demuestra por sí sola solvencia ni preferencia legal.",
      action: "Abrir Radar territorial",
      href: "#radar",
      tone: item?.territory ? "go" : "neutral"
    }
  ];
}

function assistanceMarkup(item) {
  const cards = assistanceItems(item);
  const unresolved = (item?.requirements || []).filter((requirement) => requirement.status !== "confirmed").length;
  return `<div class="assistance-shell"><section class="route-card route-card-assistance"><span>CÓMO PARTICIPAR</span><strong>No descartes una oportunidad sin entender primero la carencia.</strong><p>Esta guía convierte la duda “no tengo toda la experiencia” en comprobaciones concretas. Ordena el pliego, tu evidencia y las vías posibles de colaboración. No declara aptitud jurídica.</p><div class="assistance-context"><b>Caso de referencia</b><span>${escapeHtml(item?.title || "Selecciona una oportunidad")}</span><small>${unresolved ? `${unresolved} requisitos todavía necesitan comprobación.` : "Los requisitos visibles están confirmados en esta prueba."}</small></div><div class="assistance-actions"><a class="button button-dark assistance-primary" href="#tareas">Ver tareas que desbloquean la decisión →</a><a class="button button-light" href="#radar">Explorar cobertura territorial</a></div></section><section class="assistance-grid">${cards.map((card) => `<article class="assistance-card assistance-card-${card.tone}"><span>${escapeHtml(card.label)}</span><h2>${escapeHtml(card.title)}</h2><p>${escapeHtml(card.text)}</p><a href="${card.href}">${escapeHtml(card.action)} →</a></article>`).join("")}</section><section class="route-section assistance-principles"><div class="route-section-heading"><div><p class="eyebrow eyebrow-muted">AYUDA RÁPIDA</p><h2>Cómo leer una carencia antes de decidir</h2></div><a class="route-inline-action" href="#oportunidades">Volver a oportunidades →</a></div><div class="principle-list"><div><b>1 · Hecho</b><span>Qué exige realmente el expediente.</span></div><div><b>2 · Encaje</b><span>Qué puedes demostrar hoy.</span></div><div><b>3 · Vía</b><span>Si procede estudiar UTE, medios externos o subcontratación.</span></div><div><b>4 · Acción</b><span>Qué documento o conversación cierra la duda.</span></div></div></section></div>`;
}

function radarMarkup() {
  const points = opportunities.filter((item) => item.territory?.mapX && item.territory?.mapY);
  const selectedTerritory = settings.locations?.trim() ? settings.locations : "Sede o zonas de servicio pendientes de completar";
  const modeCounts = points.reduce((counts, item) => {
    const mode = item.territory.mode;
    counts[mode] = (counts[mode] || 0) + 1;
    return counts;
  }, {});
  const markers = points.map((item, index) => `<g class="radar-marker ${item.id === selectedId ? "is-selected" : ""}" data-radar-open="${escapeAttribute(item.id)}" tabindex="0" role="button" aria-label="Abrir ${escapeHtml(item.territory.city)}: ${escapeHtml(item.title)}"><circle cx="${item.territory.mapX}" cy="${item.territory.mapY}" r="${item.id === selectedId ? 8 : 6}"></circle><circle class="radar-marker-core" cx="${item.territory.mapX}" cy="${item.territory.mapY}" r="2.5"></circle><text x="${item.territory.mapX + 10}" y="${item.territory.mapY + 4}">${escapeHtml(item.territory.city)}</text></g>`).join("");
  const cards = points.map((item) => `<button class="radar-opportunity ${item.id === selectedId ? "is-selected" : ""}" data-open-opportunity="${escapeAttribute(item.id)}" type="button"><span><b>${escapeHtml(item.territory.city)}</b><small>${escapeHtml(item.territory.province)} · ${escapeHtml(item.territory.mode)}</small></span><strong>${escapeHtml(item.decision)}</strong><i>→</i></button>`).join("");
  return `<div class="radar-shell"><section class="route-card route-card-radar"><div><span>RADAR TERRITORIAL · DATOS DE PRUEBA</span><strong>¿Dónde puedes ejecutar de verdad?</strong><p>Una vista para relacionar cada oportunidad con tu cobertura, desplazamiento y modo de servicio. El mapa es orientativo: no sustituye el pliego ni crea preferencia local.</p></div><a class="button button-light" href="#ajustes">Configurar zonas de servicio</a></section><div class="radar-layout"><section class="map-card"><div class="map-card-head"><div><p class="eyebrow eyebrow-muted">VISTA TERRITORIAL</p><h2>Oportunidades por territorio</h2></div><span class="example-label">${points.length} casos demo</span></div><div class="map-stage"><svg class="spain-map" viewBox="0 0 390 270" role="img" aria-label="Mapa ilustrativo de España con oportunidades de prueba"><path class="spain-outline" d="M60 98 74 79 101 68 128 72 147 61 176 68 195 58 222 68 248 65 274 78 302 80 323 97 350 107 348 124 333 131 338 147 323 157 301 162 291 180 270 184 258 203 239 211 219 205 204 216 182 208 166 214 149 202 127 204 111 190 92 190 83 176 64 171 55 154 61 137 47 123Z"></path><path class="spain-relief" d="M78 96 119 88 158 95 193 82 224 91 254 83 292 101 324 111 M89 145 126 132 161 144 198 130 234 144 272 127 319 139 M115 177 148 163 186 178 226 165 267 174 304 153"></path><path class="island-shape island-canarias" d="M53 231 63 226 73 230 67 239 55 240Z M85 239 97 235 106 241 97 248 86 247Z"></path><path class="island-shape island-baleares" d="M311 64 319 58 327 63 321 70Z M335 74 343 69 351 74 344 80Z"></path>${markers}</svg><div class="map-legend"><span><i class="legend-dot legend-dot-active"></i>Oportunidad de prueba</span><span><i class="legend-dot legend-dot-base"></i>${escapeHtml(selectedTerritory)}</span></div></div><p class="map-disclaimer">La geometría es una vista visual del MVP. La distancia, el tiempo de desplazamiento y la cobertura real se calcularán cuando conectemos ubicación y fuente oficial.</p></section><aside class="radar-side"><section class="radar-side-card"><p class="eyebrow eyebrow-muted">TU COBERTURA DECLARADA</p><h2>${escapeHtml(selectedTerritory)}</h2><p>Completa la sede, provincias, radios y modalidad en Mi empresa para que este panel pueda comparar capacidad y territorio.</p><a href="#ajustes">Editar perfil →</a></section><section class="radar-side-card"><p class="eyebrow eyebrow-muted">CASOS EN EL RADAR</p><div class="radar-count-list">${Object.entries(modeCounts).map(([mode, count]) => `<div><span>${escapeHtml(mode)}</span><b>${count}</b></div>`).join("")}</div></section></aside></div><section class="route-section radar-opportunities"><div class="route-section-heading"><div><p class="eyebrow eyebrow-muted">ABRIR CASO</p><h2>Qué significa cada punto</h2></div><span class="count-label">Haz clic para ver encaje y carencias</span></div><div class="radar-opportunity-list">${cards || `<div class="empty-list"><strong>Aún no hay ubicaciones en los casos.</strong><span>Añade una oportunidad con territorio para probar el radar.</span></div>`}</div></section><section class="route-note radar-note"><strong>Regla de interpretación</strong><p>“Cerca” puede reducir desplazamiento o facilitar la ejecución, pero no demuestra experiencia, solvencia ni derecho a participar. El pliego manda.</p></section></div>`;
}

function teamMarkup() {
  const openTasks = allTasks().filter((task) => ["pending", "in_progress"].includes(task.status));
  return `<div class="team-shell"><section class="route-card route-card-accent"><span>COLABORACIÓN LOCAL</span><strong>Un lugar para saber quién tiene que cerrar cada duda</strong><p>Esta primera versión organiza roles y trabajo en el navegador. Todavía no envía invitaciones ni sincroniza cuentas.</p><div class="team-summary"><div><b>${team.length}</b><span>roles locales</span></div><div><b>${openTasks.length}</b><span>tareas abiertas</span></div><div><b>${opportunities.length}</b><span>expedientes</span></div></div></section><section class="route-section"><div class="route-section-heading"><div><p class="eyebrow eyebrow-muted">ROLES DEL ESPACIO</p><h2>Equipo y colaboradores</h2></div><span class="count-label">Solo en este navegador</span></div><div class="team-grid">${team.map((member) => `<article class="team-card"><div class="team-avatar">${escapeHtml(member.name.slice(0, 2).toUpperCase())}</div><div><strong>${escapeHtml(member.name)}</strong><span>${escapeHtml(member.role)}</span><small>${escapeHtml(member.note || "Rol local")}</small></div>${team.length > 1 ? `<button class="text-button team-delete" data-team-delete="${escapeAttribute(member.id)}" type="button">Quitar</button>` : ""}</article>`).join("")}</div></section><section class="route-note team-composer"><div class="route-section-heading"><div><p class="eyebrow eyebrow-muted">AÑADIR ROL</p><h2>¿Quién puede ayudar?</h2></div></div><form data-team-form class="team-form"><label class="field"><span>Nombre o referencia</span><input name="name" required placeholder="Ej. Colaborador técnico" /></label><label class="field"><span>Rol</span><input name="role" required placeholder="Ej. Solvencia y medios" /></label><button class="button button-dark" type="submit">Añadir al espacio</button></form><p class="team-note">Más adelante podremos asignar tareas, permisos y comentarios. Primero validamos si esta organización ayuda a trabajar mejor.</p></section></div>`;
}

function renderSettingsMarkup() {
  const storageBytes = new Blob([JSON.stringify({ opportunities, settings, team })]).size;
  return `
    <div class="settings-header">
      <div>
        <p class="eyebrow">Espacio de trabajo · Ajustes</p>
        <h1>Ajustes de la aplicación</h1>
        <p class="route-intro">Configura cómo Pliego Claro busca, filtra y presenta las oportunidades. Esta versión guarda los cambios solo en este navegador.</p>
      </div>
      <div class="settings-header-actions"><span class="settings-badge"><i></i> Datos locales · editable</span><span class="settings-badge settings-badge-muted">Sin conexión externa</span></div>
    </div>
    <div class="settings-notice"><span class="settings-notice-icon">◆</span><div><strong>Control de datos</strong><p>En este MVP no se sincronizan expedientes ni se envían pliegos a terceros. Las conexiones oficiales, cuentas de usuario y notificaciones nativas quedan pendientes de una próxima iteración.</p></div></div>
    <div class="settings-shell">
      <aside class="settings-nav" aria-label="Secciones de ajustes">
        <span>Secciones de ajuste</span>
        <a href="#ajuste-espacio">Espacio de trabajo</a>
        <a href="#ajuste-empresa">Perfil de licitador</a>
        <a href="#ajuste-busqueda">Búsqueda y proximidad</a>
        <a href="#ajuste-decision">Reglas de decisión</a>
        <a href="#ajuste-avisos">Avisos de fechas</a>
        <a href="#ajuste-datos">Datos y resguardo</a>
        <a href="#ajuste-apariencia">Apariencia</a>
        <a class="settings-nav-danger" href="#ajuste-riesgo">Zona de riesgo</a>
      </aside>
      <div class="settings-main">
        <section class="settings-section" id="ajuste-espacio">
          <div class="settings-section-heading"><div><span class="settings-kicker">01 · CONTEXTO</span><h2>Espacio de trabajo</h2><p>Identifica este entorno sin simular una cuenta o una conexión que todavía no existe.</p></div><span class="settings-section-icon">⌂</span></div>
          <div class="settings-field-grid">
            <label class="settings-field"><span>Nombre visible</span><input data-setting="workspaceName" type="text" value="${escapeAttribute(settings.workspaceName)}" placeholder="Ej. Mi empresa" /></label>
            <label class="settings-field"><span>Zona horaria de referencia</span><select data-setting="timezone"><option value="Europe/Madrid" ${settings.timezone === "Europe/Madrid" ? "selected" : ""}>Europe/Madrid</option><option value="UTC" ${settings.timezone === "UTC" ? "selected" : ""}>UTC</option></select></label>
            <div class="settings-readonly"><span>Estado del entorno</span><strong><i></i> Datos locales · modo prueba</strong><small>No implica que exista una conexión oficial.</small></div>
          </div>
        </section>

        <section class="settings-section" id="ajuste-empresa">
          <div class="settings-section-heading"><div><span class="settings-kicker">02 · ENCAJE</span><h2>Perfil de licitador</h2><p>Estos datos servirán para comparar una oportunidad con lo que realmente puedes hacer. Déjalos vacíos hasta validarlos.</p></div><span class="settings-section-icon">○</span></div>
          <div class="settings-field-grid">
            <label class="settings-field settings-field-wide"><span>Sectores, servicios o palabras clave propias</span><textarea data-setting="sectors" rows="3" placeholder="Ej. mantenimiento preventivo, digitalización, formación…">${escapeHtml(settings.sectors)}</textarea><small>Se utilizarán para mejorar filtros y búsquedas; no sustituyen la lectura del pliego.</small></label>
            <label class="settings-field settings-field-wide"><span>Zonas en las que puedes ejecutar</span><textarea data-setting="locations" rows="2" placeholder="Ej. Madrid, Guadalajara, remoto…">${escapeHtml(settings.locations)}</textarea><small>La proximidad será una señal de encaje, no una garantía de adjudicación.</small></label>
            <label class="settings-field settings-field-wide"><span>Experiencia y solvencia técnica</span><textarea data-setting="technicalSolvency" rows="3" placeholder="Trabajos similares, años de experiencia, certificados…">${escapeHtml(settings.technicalSolvency)}</textarea><small>Resume lo que puedes demostrar; después habrá que asociar cada afirmación a una evidencia.</small></label>
            <label class="settings-field settings-field-wide"><span>Solvencia económica</span><textarea data-setting="economicSolvency" rows="2" placeholder="Volumen de negocio, seguros, límites que debamos comprobar…">${escapeHtml(settings.economicSolvency)}</textarea><small>No se verifica automáticamente y no sustituye la documentación del expediente.</small></label>
            <label class="settings-field settings-field-wide"><span>Medios externos, asociación o colaboración</span><textarea data-setting="collaborationNotes" rows="2" placeholder="UTE, medios externos, subcontratación o colaboradores que podrían completar capacidades…">${escapeHtml(settings.collaborationNotes)}</textarea><small>Sirve para recordar cuándo una oportunidad puede requerir colaboración, no para afirmar que ya existe.</small></label>
            <label class="settings-field settings-field-wide"><span>Documentación disponible</span><textarea data-setting="documentsAvailable" rows="2" placeholder="Referencias, certificados, cuentas, seguros, currículos…">${escapeHtml(settings.documentsAvailable)}</textarea><small>Lista de documentos disponibles para la prueba; todavía no se suben ni se sincronizan.</small></label>
          </div>
        </section>

        <section class="settings-section" id="ajuste-busqueda">
          <div class="settings-section-heading"><div><span class="settings-kicker">03 · DESCUBRIMIENTO</span><h2>Búsqueda y proximidad</h2><p>Controla qué señales deben aparecer en las oportunidades sin convertirlas en una puntuación opaca.</p></div><span class="settings-section-icon">⌕</span></div>
          <div class="settings-option-list">
            <label class="settings-toggle"><span><strong>Usar proximidad como señal</strong><small>Mostrar distancia o coincidencia territorial cuando exista el dato. No descarta por sí sola.</small></span><input data-setting="includeProximity" type="checkbox" ${settings.includeProximity ? "checked" : ""} /></label>
            <div class="settings-inline-note"><strong>Importante:</strong> la búsqueda real todavía no está conectada a fuentes oficiales; esta preferencia prepara el criterio del MVP.</div>
          </div>
        </section>

        <section class="settings-section" id="ajuste-decision">
          <div class="settings-section-heading"><div><span class="settings-kicker">04 · TRIAJE</span><h2>Reglas de decisión</h2><p>Define los valores iniciales de la mesa. La decisión final debe seguir siendo explicable y revisable.</p></div><span class="settings-section-icon">✓</span></div>
          <div class="settings-field-grid">
            <label class="settings-field"><span>Estado inicial de una oportunidad nueva</span><select data-setting="defaultDecision"><option value="REVISAR" ${settings.defaultDecision === "REVISAR" ? "selected" : ""}>REVISAR · recomendado</option><option value="GO" ${settings.defaultDecision === "GO" ? "selected" : ""}>GO · solo si está confirmado</option><option value="NO-GO" ${settings.defaultDecision === "NO-GO" ? "selected" : ""}>NO-GO · solo si está descartada</option></select></label>
            <label class="settings-toggle settings-toggle-card"><span><strong>Modo estricto de requisitos</strong><small>No presentar como GO una oportunidad con requisitos decisivos pendientes.</small></span><input data-setting="strictLCSP" type="checkbox" ${settings.strictLCSP ? "checked" : ""} /></label>
          </div>
          <div class="settings-status-legend"><span><i class="status-dot status-dot-go"></i>Confirmado</span><span><i class="status-dot status-dot-review"></i>Pendiente de comprobar</span><span><i class="status-dot status-dot-no-go"></i>No encontrado o incompatible</span></div>
        </section>

        <section class="settings-section" id="ajuste-avisos">
          <div class="settings-section-heading"><div><span class="settings-kicker">05 · SEGUIMIENTO</span><h2>Avisos de fechas</h2><p>Prepara qué debe aparecer en “Hoy”. La integración con Calendar o notificaciones del sistema aún no está conectada.</p></div><span class="settings-section-icon">!</span></div>
          <div class="settings-field-grid">
            <label class="settings-toggle settings-toggle-card"><span><strong>Mostrar avisos en Hoy</strong><small>Destacar oportunidades que se acercan al cierre dentro del MVP.</small></span><input data-setting="deadlineReminders" type="checkbox" ${settings.deadlineReminders ? "checked" : ""} /></label>
            <label class="settings-field"><span>Anticipación de aviso</span><input data-setting="reminderDays" type="text" value="${escapeAttribute(settings.reminderDays)}" placeholder="7, 2, 1" /><small>Días antes del cierre, separados por comas.</small></label>
          </div>
          <div class="settings-inline-note"><strong>Estado actual:</strong> avisos internos preparados; recordatorios de calendario y alertas del sistema: pendientes.</div>
        </section>

        <section class="settings-section" id="ajuste-datos">
          <div class="settings-section-heading"><div><span class="settings-kicker">06 · SOBERANÍA</span><h2>Datos y resguardo</h2><p>Exporta o importa una copia antes de probar cambios importantes. El tamaño mostrado es orientativo del almacenamiento de esta prueba.</p></div><span class="settings-section-icon">□</span></div>
          <div class="settings-storage"><div><strong>Almacenamiento local</strong><span>${storageBytes} bytes · localStorage</span></div><div class="settings-storage-bar"><i style="width: 8%"></i></div></div>
          <div class="settings-action-grid"><button class="settings-action" data-export-local type="button"><strong>↓ Exportar copia</strong><span> oportunidades + ajustes en JSON</span></button><label class="settings-action"><strong>↑ Importar copia</strong><span> seleccionar un JSON previamente exportado</span><input data-import-local type="file" accept="application/json" hidden /></label><button class="settings-action" data-settings-defaults type="button"><strong>↺ Restaurar ajustes</strong><span> volver a los valores del MVP</span></button></div>
        </section>

        <section class="settings-section" id="ajuste-apariencia">
          <div class="settings-section-heading"><div><span class="settings-kicker">07 · LECTURA</span><h2>Apariencia y legibilidad</h2><p>La interfaz prioriza lectura documental, contraste y densidad controlada.</p></div><span class="settings-section-icon">✦</span></div>
          <div class="settings-field-grid">
            <label class="settings-field"><span>Densidad de la lista</span><select data-setting="density"><option value="compact" ${settings.density === "compact" ? "selected" : ""}>Compacta · más casos visibles</option><option value="comfortable" ${settings.density === "comfortable" ? "selected" : ""}>Cómoda · más espacio por caso</option></select></label>
            <label class="settings-toggle settings-toggle-card"><span><strong>Mostrar etiquetas de ejemplo</strong><small>Recordar qué datos aún no están conectados a fuentes oficiales.</small></span><input data-setting="showExampleLabels" type="checkbox" ${settings.showExampleLabels ? "checked" : ""} /></label>
          </div>
        </section>

        <section class="settings-section settings-section-risk" id="ajuste-riesgo">
          <div class="settings-section-heading"><div><span class="settings-kicker settings-kicker-danger">08 · PRECAUCIÓN</span><h2>Zona de riesgo</h2><p>Acciones que pueden sustituir datos locales. Las mantengo separadas de los ajustes normales.</p></div><span class="settings-section-icon settings-section-icon-danger">×</span></div>
          <div class="settings-danger-row"><div><strong>Restaurar oportunidades de ejemplo</strong><small>Reemplaza las oportunidades locales por los tres casos de prueba iniciales.</small></div><button class="button button-danger" data-route-reset type="button">Restaurar ejemplos</button></div>
        </section>
      </div>
    </div>`;
}

function renderRoute() {
  const route = currentRoute();
  if (route !== "oportunidades" && searchQuery) {
    searchQuery = "";
    const searchInput = document.querySelector("#globalSearch");
    if (searchInput) searchInput.value = "";
  }
  const breadcrumbLabels = { hoy: "Hoy", oportunidades: "Oportunidades", expedientes: "Expedientes", tareas: "Tareas", asistencia: "Cómo participar", radar: "Radar territorial", equipo: "Equipo", empresa: "Mi empresa", pruebas: "Notas de prueba", ajustes: "Ajustes" };
  if (breadcrumbElement) breadcrumbElement.textContent = breadcrumbLabels[route];
  dashboardSections.forEach((section) => { section.hidden = route !== "oportunidades"; });
  routeElement.hidden = route === "oportunidades";
  document.querySelectorAll(".nav-item[data-route]").forEach((item) => item.classList.toggle("active", item.dataset.route === route));
  if (route === "oportunidades") {
    renderList();
    renderDetail();
    document.querySelectorAll(".filter").forEach((button) => button.classList.toggle("active", button.dataset.filter === activeFilter));
    return;
  }

  const selected = opportunities.find((item) => item.id === selectedId) || opportunities[0];
  const openTasks = allTasks().filter((task) => task.status === "pending" || task.status === "in_progress");
  const parkedTasks = allTasks().filter((task) => task.status === "blocked");
  const completedTasks = allTasks().filter((task) => task.status === "completed");
  const upcoming = upcomingOpportunities();
  const profile = profileCompletion();
  const filteredExpedients = opportunities.filter((item) => activeExpedientFilter === "all" || item.decision === activeExpedientFilter);
  const routeData = {
    hoy: {
      eyebrow: "Espacio de trabajo · Hoy",
      title: "Lo que necesita tu atención",
      intro: "Una vista breve para empezar por lo que puede cambiar una decisión hoy.",
      body: `<div class="route-summary-strip"><article class="route-card route-card-accent"><span>PRÓXIMA FECHA</span><strong>${upcoming[0] ? escapeHtml(deadlineLabel(upcoming[0])) : "Sin fecha confirmada"}</strong><p>${upcoming[0] ? escapeHtml(upcoming[0].title) : "Añade una fecha exacta para priorizar mejor."}</p>${upcoming[0] ? `<button class="route-inline-action" data-open-opportunity="${escapeAttribute(upcoming[0].id)}" type="button">Abrir ficha →</button>` : ""}</article><article class="route-card"><span>TRABAJO ABIERTO</span><strong>${openTasks.length} tareas pendientes</strong><p>Una tarea es una duda que debe cerrarse antes de decidir.</p><a href="#tareas">Ver tareas →</a></article><article class="route-card"><span>REVISIÓN</span><strong>${opportunities.filter((item) => item.decision === "REVISAR").length} oportunidades</strong><p>Empieza por requisitos con evidencia pendiente.</p><a href="#oportunidades">Ver oportunidades →</a></article></div><section class="route-section"><div class="route-section-heading"><div><p class="eyebrow eyebrow-muted">PRIORIDAD</p><h2>Lo que puedes cerrar ahora</h2></div><span class="count-label">${Math.min(openTasks.length, 4)} visibles</span></div><div class="task-board">${openTasks.length ? openTasks.slice(0, 4).map((task) => taskRowMarkup(task)).join("") : `<div class="empty-list"><strong>No hay tareas abiertas.</strong><span>La bandeja está despejada por ahora.</span></div>`}</div></section>`
    },
    expedientes: {
      eyebrow: "Espacio de trabajo · Expedientes",
      title: "Expedientes de prueba",
      intro: "Casos locales que estamos usando para comprobar la búsqueda y la decisión.",
      body: `<div class="route-toolbar"><div class="filters" role="toolbar" aria-label="Filtrar expedientes"><button class="filter ${activeExpedientFilter === "all" ? "active" : ""}" data-expedient-filter="all" type="button">Todos</button><button class="filter ${activeExpedientFilter === "REVISAR" ? "active" : ""}" data-expedient-filter="REVISAR" type="button">Revisar</button><button class="filter ${activeExpedientFilter === "GO" ? "active" : ""}" data-expedient-filter="GO" type="button">GO</button><button class="filter ${activeExpedientFilter === "NO-GO" ? "active" : ""}" data-expedient-filter="NO-GO" type="button">NO-GO</button></div><span class="count-label">${filteredExpedients.length} de ${opportunities.length}</span></div><div class="route-list">${filteredExpedients.length ? filteredExpedients.map((item) => `<button class="route-list-row route-list-row-rich" data-open-opportunity="${escapeAttribute(item.id)}" type="button"><span class="route-list-status decision-pill ${decisionClass(item.decision)}">${escapeHtml(item.decision)}</span><span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.organization)} · ${escapeHtml(item.amount)} · ${escapeHtml(deadlineLabel(item))}</small><small>${item.requirements.filter((requirement) => requirement.status === "confirmed").length}/${item.requirements.length} evidencias claras · ${escapeHtml(item.nextStep)}</small></span><span class="route-arrow">→</span></button>`).join("") : `<div class="empty-list"><strong>No hay expedientes en esta vista.</strong><span>Prueba otro estado.</span></div>`}</div>`
    },
    tareas: {
      eyebrow: "Espacio de trabajo · Tareas",
      title: "Tareas pendientes",
      intro: "Acciones que deben cerrar una duda antes de convertir REVISAR en GO o NO-GO.",
      body: `<div class="route-summary-strip"><article class="route-card"><span>ABIERTAS</span><strong>${openTasks.length}</strong><p>Se generan desde la siguiente acción y los requisitos no confirmados.</p></article><article class="route-card"><span>COMPLETADAS</span><strong>${completedTasks.length}</strong><p>Las comprobaciones confirmadas dejan de bloquear la decisión.</p></article><article class="route-card"><span>APARCADAS</span><strong>${parkedTasks.length}</strong><p>Quedan fuera del trabajo activo hasta que cambie el contexto.</p></article></div><section class="route-section"><div class="route-section-heading"><div><p class="eyebrow eyebrow-muted">LISTA DE TRABAJO</p><h2>Qué toca hacer</h2></div><span class="count-label">${visibleTasks().length} visibles</span></div><div class="filters task-filters" role="toolbar" aria-label="Filtrar tareas"><button class="filter ${activeTaskFilter === "open" ? "active" : ""}" data-task-filter="open" type="button">Abiertas</button><button class="filter ${activeTaskFilter === "urgent" ? "active" : ""}" data-task-filter="urgent" type="button">Prioridad alta</button><button class="filter ${activeTaskFilter === "evidence" ? "active" : ""}" data-task-filter="evidence" type="button">Evidencia</button><button class="filter ${activeTaskFilter === "collaboration" ? "active" : ""}" data-task-filter="collaboration" type="button">Colaboración</button><button class="filter ${activeTaskFilter === "completed" ? "active" : ""}" data-task-filter="completed" type="button">Completadas</button><button class="filter ${activeTaskFilter === "all" ? "active" : ""}" data-task-filter="all" type="button">Todas</button></div><div class="task-board">${visibleTasks().length ? visibleTasks().map((task) => taskRowMarkup(task)).join("") : `<div class="empty-list"><strong>No hay tareas en esta vista.</strong><span>Prueba otro filtro o registra una nueva oportunidad.</span></div>`}</div></section>`
    },
    asistencia: {
      eyebrow: "Espacio de trabajo · Cómo participar",
      title: "Cómo participar",
      intro: "Una guía para entender si una carencia se puede cubrir antes de descartar una oportunidad.",
      body: assistanceMarkup(selected)
    },
    radar: {
      eyebrow: "Espacio de trabajo · Radar territorial",
      title: "Radar territorial",
      intro: "Relaciona oportunidades con tu capacidad de servicio y desplazamiento.",
      body: radarMarkup()
    },
    equipo: {
      eyebrow: "Espacio de trabajo · Equipo",
      title: "Equipo y colaboración",
      intro: "Organiza roles y responsabilidades sin fingir todavía una cuenta multiusuario.",
      body: teamMarkup()
    },
    empresa: {
      eyebrow: "Espacio de trabajo · Mi empresa",
      title: "Perfil de empresa",
      intro: "La ficha que permitirá contrastar una oportunidad con capacidades, solvencia y proximidad.",
      body: `<div class="route-grid"><article class="route-card route-card-accent"><span>ESTADO DEL PERFIL</span><strong>${profile.percentage}% preparado · ${profile.completed}/${profile.total} bloques</strong><div class="route-progress"><i style="width:${profile.percentage}%"></i></div><p>Datos locales y editables. No se ha conectado ninguna cuenta ni documento real.</p><a href="#ajustes">Completar perfil →</a></article><article class="route-card"><span>QUÉ CAMBIA LA DECISIÓN</span><strong>Solvencia, medios y asociación</strong><p>El perfil debe ayudarte a saber qué puedes demostrar, qué te falta y cuándo necesitas colaborar con otra empresa.</p><a href="#ajustes">Editar datos de encaje →</a></article></div><section class="route-section"><div class="route-section-heading"><div><p class="eyebrow eyebrow-muted">CONTROL DEL PERFIL</p><h2>Bloques pendientes</h2></div><span class="count-label">${profile.total - profile.completed} por completar</span></div><div class="profile-checklist">${profile.blocks.map(([label, value]) => `<div class="profile-check-row"><span class="profile-check ${String(value || "").trim() ? "profile-check-done" : ""}">${String(value || "").trim() ? "✓" : "○"}</span><span><strong>${escapeHtml(label)}</strong><small>${String(value || "").trim() ? "Añadido en el perfil local" : "Pendiente de validar"}</small></span></div>`).join("")}</div></section>`
    },
    pruebas: {
      eyebrow: "Espacio de trabajo · Notas de prueba",
      title: "Notas del benchmark",
      intro: "Lugar para registrar qué hemos probado, qué ha fallado y qué debe cambiar.",
      body: `<section class="route-note note-composer"><div class="route-section-heading"><div><span>REGISTRAR APRENDIZAJE</span><h2>Añadir una nota de benchmark</h2></div><span class="example-label">Solo en este navegador</span></div><form data-note-form class="note-form"><label class="field"><span>Tipo</span><select name="kind"><option>Hallazgo</option><option>Problema</option><option>Decisión</option><option>Pregunta</option><option>Regla</option></select></label><label class="field field-wide"><span>Qué hemos aprendido</span><textarea name="text" rows="3" required placeholder="Ej. La persona buscó la fecha de presentación antes que el importe…"></textarea></label><label class="field"><span>Oportunidad relacionada</span><select name="opportunityId"><option value="">General</option>${opportunities.map((item) => `<option value="${escapeAttribute(item.id)}">${escapeHtml(item.title)}</option>`).join("")}</select></label><div class="modal-actions"><button class="button button-dark" type="submit">Guardar nota</button></div></form></section><section class="route-section"><div class="route-section-heading"><div><p class="eyebrow eyebrow-muted">DIARIO DEL MVP</p><h2>Lo que sabemos hasta ahora</h2></div><span class="count-label">${notes.length} notas</span></div><div class="notes-board">${notes.length ? notes.map((note) => `<article class="route-note note-entry"><div class="note-entry-top"><span>${escapeHtml(note.kind || "Nota")}</span><time>${escapeHtml(formatDate(new Date(note.createdAt)))}</time></div><p>${escapeHtml(note.text)}</p>${note.opportunityId ? `<small>Relacionado con: ${escapeHtml(opportunities.find((item) => item.id === note.opportunityId)?.title || "oportunidad")}</small>` : `<small>Nota general del producto</small>`}<button class="text-button note-delete" data-note-delete="${escapeAttribute(note.id)}" type="button">Eliminar</button></article>`).join("") : `<div class="empty-list"><strong>Todavía no hay notas.</strong><span>Registra la primera observación de una prueba.</span></div>`}</div></section>`
    },
    ajustes: {
      eyebrow: "Espacio de trabajo · Ajustes",
      title: "Ajustes del prototipo",
      intro: "Controles básicos de esta versión local.",
      body: renderSettingsMarkup()
    }
  }[route];
  routeElement.innerHTML = route === "ajustes" ? routeData.body : `<div class="route-header"><p class="eyebrow">${routeData.eyebrow}</p><h1>${routeData.title}</h1><p class="route-intro">${routeData.intro}</p></div>${routeData.body}`;
  routeElement.querySelectorAll("[data-open-opportunity]").forEach((button) => button.addEventListener("click", () => {
    selectedId = button.dataset.openOpportunity;
    activeDetailTab = "summary";
    window.location.hash = "oportunidades";
  }));
  routeElement.querySelectorAll("[data-radar-open]").forEach((marker) => {
    const openMarker = () => {
      selectedId = marker.dataset.radarOpen;
      activeDetailTab = "summary";
      window.location.hash = "oportunidades";
    };
    marker.addEventListener("click", openMarker);
    marker.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openMarker(); }
    });
  });
  routeElement.querySelectorAll("[data-task-complete]").forEach((button) => button.addEventListener("click", () => completeTask(button.dataset.taskComplete)));
  routeElement.querySelectorAll("[data-expedient-filter]").forEach((button) => button.addEventListener("click", () => {
    activeExpedientFilter = button.dataset.expedientFilter;
    renderRoute();
  }));
  routeElement.querySelectorAll("[data-task-filter]").forEach((button) => button.addEventListener("click", () => {
    activeTaskFilter = button.dataset.taskFilter;
    renderRoute();
  }));
  routeElement.querySelector("[data-note-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const text = String(formData.get("text") || "").trim();
    if (!text) return;
    notes.unshift({ id: `note-${Date.now()}`, kind: String(formData.get("kind") || "Nota"), text, opportunityId: String(formData.get("opportunityId") || ""), createdAt: new Date().toISOString() });
    persistNotes();
    renderRoute();
  });
  routeElement.querySelectorAll("[data-note-delete]").forEach((button) => button.addEventListener("click", () => {
    notes = notes.filter((note) => note.id !== button.dataset.noteDelete);
    persistNotes("Nota eliminada");
    renderRoute();
  }));
  routeElement.querySelector("[data-team-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const role = String(formData.get("role") || "").trim();
    if (!name || !role) return;
    team.push({ id: `role-${Date.now()}`, name, role, note: "Rol local · pendiente de validar" });
    persistTeam();
    renderRoute();
  });
  routeElement.querySelectorAll("[data-team-delete]").forEach((button) => button.addEventListener("click", () => {
    team = team.filter((member) => member.id !== button.dataset.teamDelete);
    persistTeam("Rol local eliminado");
    renderRoute();
  }));
  routeElement.querySelector("[data-route-reset]")?.addEventListener("click", () => document.querySelector("#resetDemo").click());
  routeElement.querySelectorAll("[data-setting]").forEach((control) => control.addEventListener("change", () => {
    settings[control.dataset.setting] = control.type === "checkbox" ? control.checked : control.value;
    persistSettings();
    renderMetrics();
    document.documentElement.dataset.density = settings.density;
  }));
  routeElement.querySelector("[data-settings-defaults]")?.addEventListener("click", () => {
    settings = { ...defaultSettings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    renderRoute();
    showToast("Ajustes restaurados.");
  });
  routeElement.querySelector("[data-export-local]")?.addEventListener("click", () => {
    const payload = { format: "pliego-claro-mvp", exportedAt: new Date().toISOString(), opportunities, settings, team };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pliego-claro-copia-local.json";
    link.click();
    URL.revokeObjectURL(url);
    showToast("Copia local preparada.");
  });
  routeElement.querySelector("[data-import-local]")?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      try {
        const payload = JSON.parse(String(reader.result));
        if (!Array.isArray(payload.opportunities) || !payload.opportunities.length || payload.opportunities.some((item) => !item || typeof item !== "object" || typeof item.title !== "string" || !Array.isArray(item.requirements))) throw new Error("Formato no reconocido");
        opportunities = payload.opportunities.map((item) => ({ ...item, source: safeHttpUrl(item.source), requirements: item.requirements.map((requirement) => ({ text: String(requirement.text || "Requisito sin nombre"), source: String(requirement.source || "Fuente pendiente"), status: ["confirmed", "pending", "unknown"].includes(requirement.status) ? requirement.status : "unknown" })) }));
        settings = { ...defaultSettings, ...(payload.settings || {}) };
        team = Array.isArray(payload.team) && payload.team.length ? payload.team : structuredClone(defaultTeam);
        selectedId = opportunities[0]?.id;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        localStorage.setItem(TEAM_KEY, JSON.stringify(team));
        render();
        showToast("Copia local importada.");
      } catch (error) {
        showToast("No se ha podido importar: formato no reconocido.");
      }
    });
    reader.readAsText(file);
  });
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

function safeHttpUrl(value = "") {
  try {
    const url = new URL(String(value || "").trim());
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch (error) {
    return "";
  }
}

document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  render();
}));

window.addEventListener("hashchange", renderRoute);

document.querySelector("#globalSearch")?.addEventListener("input", (event) => {
  searchQuery = event.target.value.trim();
  if (searchQuery && currentRoute() !== "oportunidades") {
    window.location.hash = "oportunidades";
    return;
  }
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
  const source = safeHttpUrl(formData.get("source"));
  opportunities.unshift({
    id,
    title,
    organization: String(formData.get("organization") || "Sin organismo").trim(),
    amount: String(formData.get("amount") || "Por confirmar").trim(),
    deadline: String(formData.get("deadline") || "Por confirmar").trim(),
    deadlineDate: String(formData.get("deadlineDate") || "").trim() || null,
    sector: String(formData.get("sector") || "Sin clasificar").trim(),
    decision: settings.defaultDecision === "GO" && settings.strictLCSP ? "REVISAR" : settings.defaultDecision,
    fit: "Por comprobar",
    source,
    sourceLabel: source ? "Fuente aportada" : "Fuente pendiente",
    summary: "Caso añadido durante una prueba. Completa los requisitos y la fuente después de revisar el expediente.",
    why: ["Todavía no se ha revisado con la ficha.", "Es una oportunidad aportada durante una conversación."],
    nextStep: "Añadir los tres requisitos que más pueden cambiar la decisión.",
    nextDate: "Primera revisión pendiente",
    nextStepDone: false,
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
