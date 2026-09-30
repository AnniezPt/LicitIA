const STORAGE_KEY = "pliego-claro-mvp-opportunities-v3";
const SETTINGS_KEY = "pliego-claro-mvp-settings-v1";

const defaultSettings = {
  workspaceName: "Mi empresa (ejemplo)",
  timezone: "Europe/Madrid",
  sectors: "",
  locations: "",
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
let settings = loadSettings();
let selectedId = opportunities[0]?.id;
let activeFilter = "all";
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
    return Array.isArray(saved) && saved.length ? saved : structuredClone(seedOpportunities);
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

function persistSettings(message = "Ajustes guardados") {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
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
    <article class="opportunity-card decision-${decisionClass(item.decision)} ${item.id === selectedId ? "selected" : ""}" data-id="${item.id}" tabindex="0" role="button" aria-label="Abrir ${escapeHtml(item.title)}">
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
  renderRoute();
}

function currentRoute() {
  const route = window.location.hash.replace("#", "");
  return ["hoy", "oportunidades", "expedientes", "tareas", "empresa", "pruebas", "ajustes"].includes(route) ? route : "oportunidades";
}

function renderSettingsMarkup() {
  const storageBytes = new Blob([JSON.stringify({ opportunities, settings })]).size;
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
  const breadcrumbLabels = { hoy: "Hoy", oportunidades: "Oportunidades", expedientes: "Expedientes", tareas: "Tareas", empresa: "Mi empresa", pruebas: "Notas de prueba", ajustes: "Ajustes" };
  if (breadcrumbElement) breadcrumbElement.textContent = breadcrumbLabels[route];
  dashboardSections.forEach((section) => { section.hidden = route !== "oportunidades"; });
  routeElement.hidden = route === "oportunidades";
  document.querySelectorAll(".nav-item[data-route]").forEach((item) => item.classList.toggle("active", item.dataset.route === route));
  if (route === "oportunidades") return;

  const selected = opportunities.find((item) => item.id === selectedId) || opportunities[0];
  const routeData = {
    hoy: {
      eyebrow: "Espacio de trabajo · Hoy",
      title: "Lo que necesita tu atención",
      intro: "Una vista breve para empezar por lo que puede cambiar una decisión hoy.",
      body: `<div class="route-grid"><article class="route-card route-card-accent"><span>REVISAR PRIMERO</span><strong>${escapeHtml(selected?.title || "Sin oportunidades")}</strong><p>${escapeHtml(selected?.nextStep || "Añade una oportunidad para empezar.")}</p><a href="#oportunidades">Abrir ficha →</a></article><article class="route-card"><span>RESUMEN</span><strong>${opportunities.filter((item) => item.decision === "REVISAR").length} oportunidades por revisar</strong><p>Empieza por las que tienen requisitos o evidencias pendientes.</p><a href="#oportunidades">Ver oportunidades →</a></article></div>`
    },
    expedientes: {
      eyebrow: "Espacio de trabajo · Expedientes",
      title: "Expedientes de prueba",
      intro: "Casos locales que estamos usando para comprobar la búsqueda y la decisión.",
      body: `<div class="route-list">${opportunities.map((item) => `<button class="route-list-row" data-open-opportunity="${escapeAttribute(item.id)}" type="button"><span class="route-list-status decision-pill ${decisionClass(item.decision)}">${escapeHtml(item.decision)}</span><span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.organization)} · ${escapeHtml(item.amount)}</small></span><span class="route-arrow">→</span></button>`).join("")}</div>`
    },
    tareas: {
      eyebrow: "Espacio de trabajo · Tareas",
      title: "Tareas pendientes",
      intro: "Acciones que deben cerrar una duda antes de convertir REVISAR en GO o NO-GO.",
      body: `<div class="route-list"><div class="route-list-row task-route-row"><span class="task-state task-state-review">En curso</span><span><strong>${escapeHtml(selected?.nextStep || "Seleccionar una oportunidad")}</strong><small>${escapeHtml(selected?.nextDate || "Fecha por confirmar")}</small></span></div><div class="route-list-row task-route-row"><span class="task-state task-state-pending">Pendiente</span><span><strong>Asociar evidencia a cada requisito decisivo</strong><small>Responsable por asignar · Fecha por confirmar</small></span></div></div>`
    },
    empresa: {
      eyebrow: "Espacio de trabajo · Mi empresa",
      title: "Perfil de empresa",
      intro: "La ficha que permitirá contrastar una oportunidad con capacidades, solvencia y proximidad.",
      body: `<div class="route-grid"><article class="route-card"><span>ESTADO DEL PERFIL</span><strong>84% preparado · ejemplo local</strong><div class="route-progress"><i></i></div><p>Aún no se conecta ninguna cuenta ni documento real.</p></article><article class="route-card"><span>PRÓXIMO PASO</span><strong>Definir capacidades y evidencias</strong><p>En la siguiente iteración añadiremos sectores, experiencia, medios, solvencia económica y área geográfica.</p></article></div>`
    },
    pruebas: {
      eyebrow: "Espacio de trabajo · Notas de prueba",
      title: "Notas del benchmark",
      intro: "Lugar para registrar qué hemos probado, qué ha fallado y qué debe cambiar.",
      body: `<div class="route-note"><span>NOTA ACTIVA</span><h3>La decisión debe poder explicarse</h3><p>Separar siempre el hecho del pliego, la evidencia de la empresa y la duda pendiente. Esta regla guía la búsqueda y las pestañas del expediente.</p><small>Guardado local · No se publica ni se envía a ningún servidor.</small></div><div class="route-note"><span>PENDIENTE</span><h3>Conectar casos reales</h3><p>Usar el benchmark de búsqueda para comparar resultados, falsos positivos y requisitos que el primer MVP no encuentra.</p></div>`
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
  routeElement.querySelector("[data-route-reset]")?.addEventListener("click", () => document.querySelector("#resetDemo").click());
  routeElement.querySelectorAll("[data-setting]").forEach((control) => control.addEventListener("change", () => {
    settings[control.dataset.setting] = control.type === "checkbox" ? control.checked : control.value;
    persistSettings();
  }));
  routeElement.querySelector("[data-settings-defaults]")?.addEventListener("click", () => {
    settings = { ...defaultSettings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    renderRoute();
    showToast("Ajustes restaurados.");
  });
  routeElement.querySelector("[data-export-local]")?.addEventListener("click", () => {
    const payload = { format: "pliego-claro-mvp", exportedAt: new Date().toISOString(), opportunities, settings };
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
        if (!Array.isArray(payload.opportunities)) throw new Error("Formato no reconocido");
        opportunities = payload.opportunities;
        settings = { ...defaultSettings, ...(payload.settings || {}) };
        selectedId = opportunities[0]?.id;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
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

document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  render();
}));

window.addEventListener("hashchange", renderRoute);

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
