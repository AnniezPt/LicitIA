---
name: Pliego Claro Design System
colors:
  surface: '#eafefa'
  surface-dim: '#cbdeda'
  surface-bright: '#eafefa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e4f8f4'
  surface-container: '#def2ee'
  surface-container-high: '#d9ece9'
  surface-container-highest: '#d3e7e3'
  on-surface: '#0d1e1d'
  on-surface-variant: '#404945'
  inverse-surface: '#233431'
  inverse-on-surface: '#e1f5f1'
  outline: '#717975'
  outline-variant: '#c0c8c3'
  surface-tint: '#3a6758'
  primary: '#134235'
  on-primary: '#ffffff'
  primary-container: '#2d5a4c'
  on-primary-container: '#a0cfbe'
  inverse-primary: '#a1d1bf'
  secondary: '#556500'
  on-secondary: '#ffffff'
  secondary-container: '#d6ee71'
  on-secondary-container: '#5a6b00'
  tertiary: '#004335'
  on-tertiary: '#ffffff'
  tertiary-container: '#035d4a'
  on-tertiary-container: '#8ad3bb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bcedda'
  primary-fixed-dim: '#a1d1bf'
  on-primary-fixed: '#002118'
  on-primary-fixed-variant: '#214f41'
  secondary-fixed: '#d6ee71'
  secondary-fixed-dim: '#bad158'
  on-secondary-fixed: '#181e00'
  on-secondary-fixed-variant: '#3f4c00'
  tertiary-fixed: '#a7f1d8'
  tertiary-fixed-dim: '#8bd5bc'
  on-tertiary-fixed: '#002018'
  on-tertiary-fixed-variant: '#005140'
  background: '#eafefa'
  on-background: '#0d1e1d'
  surface-variant: '#d3e7e3'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.375rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '600'
    lineHeight: 1.375rem
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem
    fontWeight: '700'
    lineHeight: 0.875rem
    letterSpacing: 0.04em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-base: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

The design system establishes a high-density, analytical workspace tailored for small and medium-sized enterprises (pymes) navigating Spanish public procurement (*licitación pública*). The tool shifts the emotional state of a bidding team from administrative fatigue and legal apprehension to methodical confidence and rapid, evidence-grounded decision making (**GO**, **REVISAR**, **NO-GO**).

The aesthetic direction is **Functional Precision / Systematic Modern**:
- **Utilitarian & Methodical:** Every visual element serves analytical legibility. Decorative flourishes, marketing hyperbole, and consumer-grade animations are excluded in favor of audit-ready clarity.
- **Warm Institutional:** Replaces sterile, cold administrative grays with an architectural warm-canvas approach (#F5F6F1) combined with deep mineral forest ink (#142523), creating an environment that remains easy on the eyes over hours of fine-print contract analysis.
- **Evidence-First Feedback:** Visual signals are calibrated for regulatory certainty. Decisions are never decorative; badges, completion meters, and risk indicators display explicit typographic confirmations alongside functional iconography to maintain rigorous accessibility and zero cognitive ambiguity.

## Colors

The palette balances quiet institutional authority with high-contrast functional triage. The primary color canvas utilizes an off-white warm limestone tone to reduce optical glare during intensive document inspection.

### Color Roles & Semantics

- **Canvas & Backgrounds:**
  - `canvas-base`: `#F5F6F1` (Global app background, warm limestone)
  - `surface-card`: `#FFFFFF` (Data sheets, analysis cards, table surfaces)
  - `surface-subtle`: `#ECEFE6` (Table headers, nested panels, input fills)

- **Ink & Typography:**
  - `text-primary`: `#142523` (High-contrast slate-forest for criteria, titles, and legal terms)
  - `text-secondary`: `#576561` (Metadata, CPV codes, file references, hints)
  - `text-disabled`: `#8E9A95` (Placeholders, inactive steps)

- **Structural Borders:**
  - `border-subtle`: `#E2E4DA` (Card borders, table dividers, input boundaries)
  - `border-strong`: `#CBD0C3` (Active containers, tab lines, focused table rows)

- **Primary Actions & Focus:**
  - `brand-forest`: `#2D5A4C` (Primary navigation accents, primary buttons, major structural anchors)
  - `brand-lime`: `#D7EF72` (High-visibility focus rings, active step pips, strategic callouts)
  - `brand-forest-hover`: `#23473C`

- **Triage States (GO / REVISAR / NO-GO):**
  - **GO (Confirmado / Solvente):**
    - Text/Icon: `#1B6A56`
    - Background: `#E8F5F0`
    - Border: `#A8DEC9`
  - **REVISAR (Condicionado / Dudoso / Pendiente):**
    - Text/Icon: `#9A6208`
    - Background: `#FEF6E7`
    - Border: `#F9DCA8`
  - **NO-GO (Descarte / Riesgo Crítico / Insolvencia):**
    - Text/Icon: `#9C2A2A`
    - Background: `#FDEEEE`
    - Border: `#F5C2C2`

## Typography

The design system implements **Plus Jakarta Sans** across all textual hierarchies, with **JetBrains Mono** reserved exclusively for alphanumeric administrative identifiers (e.g., CPV codes, expediente numbers, secure verification codes / CSV, and EUR currency amounts).

Key typographic guidelines:
- **No Marketing Display Scales:** Sizing is tightly bounded between 11px (`label-sm`) and 28px (`headline-xl`). Titular scales mirror technical evaluation tools and data workbenches rather than editorial magazines.
- **Tabular Figures:** All numeric tables, budget breakdowns (PBL - Presupuesto Base de Licitación, VEC - Valor Estimado del Contrato), and scoring matrices must employ tabular numbers (`font-variant-numeric: tabular-nums`).
- **Uppercase Restraint:** Uppercase usage is restricted to short status codes (`GO`, `REVISAR`, `NO-GO`), CPV prefixes, and micro-labels (`label-sm`).

## Layout & Spacing

The layout model is anchored by a persistent vertical workbench navigation and a fluid-responsive multi-pane evaluation split screen.

### Structure & Grids
- **Desktop (>= 1280px):**
  - **Sidebar:** Fixed width of `240px`, non-collapsible during active evaluation sessions to keep document stages visible.
  - **Work Area:** 12-column fluid grid. Split evaluation view typically pairs 7 columns for criteria/pliego extraction with 5 columns for compliance notes and checklist verification.
  - **Margins & Gutters:** `2rem` outer edge margins with `1.5rem` gutters between primary panes.
- **Tablet (768px - 1279px):**
  - Sidebar collapses to a compact `64px` icon dock or flyout drawer.
  - Gutters compress to `1rem` and margins to `1.25rem`. Single-column tabbed pane toggle between pliego context and decision checklist.
- **Mobile (< 768px):**
  - Linear stack with bottom sticky action drawer for triage decisions. Outer margin of `1rem`.

### Spacing Density
Spacing tokens operate on a 4px sub-grid with tight defaults. Card interiors utilize `space-base` (16px), table cell vertical padding is held at `space-sm` (8px) for high density, and field-label groupings are linked with `space-xs` (4px).

## Elevation & Depth

Visual hierarchy relies on crisp borders and soft tonal containment rather than dramatic drop shadows.

- **Level 0 (Canvas Base):** Background `#F5F6F1`.
- **Level 1 (Card & Worksheet Containers):** Surface `#FFFFFF` enclosed by a 1px border of `#E2E4DA`. No shadow is cast in the static state.
- **Level 2 (Hover & Active Contexts):** Surface `#FFFFFF` with `border: 1px solid #CBD0C3` and a subtle ambient contact shadow: `0 2px 4px rgba(20, 37, 35, 0.04)`.
- **Level 3 (Flyouts, Popovers, Criterion Modals):** Surface `#FFFFFF` with `border: 1px solid #E2E4DA` and an elevated shadow: `0 8px 24px rgba(20, 37, 35, 0.08), 0 2px 6px rgba(20, 37, 35, 0.04)`.
- **Focus Rings:** Distinctive 2px solid ring in `#2D5A4C` offset by 2px in `#D7EF72` for keyboard-accessible navigational certainty.

## Shapes

The design system implements a controlled, technical corner radius (`roundedness: 1`):
- **Base Components (Inputs, Buttons, Badges):** `6px` (`0.375rem`) — maintains a crisp, reliable tool feel without sharp needles.
- **Cards, Modals, Panels:** `8px` (`0.5rem`) — soft enough to delimit regions cleanly without playful bubble contours.
- **Triage Decision Badges & Chips:** `4px` to `6px` (`0.25rem` to `0.375rem`) — never fully circular or pill-shaped, ensuring they read as formal status tags rather than social tags.

## Components

### 1. Decision Status Badges (GO / REVISAR / NO-GO)
- **Structure:** 1px border, 16px inline SVG icon, uppercase `label-md` text, and horizontal padding of `8px` (`space-sm`), height `24px`.
- **GO:** Background `#E8F5F0`, border `#A8DEC9`, text/icon `#1B6A56`. Icon: Checkmark circle.
- **REVISAR:** Background `#FEF6E7`, border `#F9DCA8`, text/icon `#9A6208`. Icon: Alert triangle.
- **NO-GO:** Background `#FDEEEE`, border `#F5C2C2`, text/icon `#9C2A2A`. Icon: Octagonal ban or cross.
- **Rule:** Never display color alone; the label and icon must always accompany the token.

### 2. Buttons
- **Primary:** Background `#2D5A4C`, text `#FFFFFF`, border none, hover `#23473C`. Focus: 2px ring `#D7EF72`.
- **Secondary (Accented Triage):** Background `#FFFFFF`, border `1px solid #E2E4DA`, text `#142523`, hover background `#F5F6F1`.
- **Destructive:** Background `#FDEEEE`, text `#9C2A2A`, border `1px solid #F5C2C2`, hover background `#F8D8D8`.
- **Sizes:** Compact (`32px` height, `12px` font) for in-table actions; Regular (`38px` height, `14px` font) for form submissions.

### 3. Evidence & Completeness Progress Indicators
- **Meter Display:** A linear 4px high track with background `#E2E4DA`. Progress fill `#2D5A4C` (or `#1B6A56` once 100% verified).
- **Fractional Counters:** Rendered in `label-md` as `"2/5 evidencias claras"` with secondary ink `#576561` and bold numerical tally `#142523`.

### 4. Dense Procurement Tables (Tablas de Pliegos)
- **Header:** Background `#ECEFE6`, uppercase `label-sm` text `#576561`, bottom border `1px solid #E2E4DA`, height `36px`.
- **Row:** Height `44px` (dense) to `52px` (standard), bottom border `1px solid #E2E4DA`. Hover state `#F8F9F5`.
- **Cell Content:** Left-aligned for pliego text and administrative bodies; right-aligned for budget numbers and deadlines; centered for status badges.

### 5. Form Inputs & Evaluation Checkboxes
- **Input Fields:** Background `#FFFFFF`, border `1px solid #E2E4DA`, text `#142523`, placeholder `#8E9A95`. Active focus border `#2D5A4C` with 1px shadow glow in `#D7EF72`.
- **Evaluation Checkbox:** 16px by 16px square, radius `3px`. Unchecked border `1.5px solid #CBD0C3`. Checked background `#2D5A4C` with white checkmark. Indeterminate state shows minus dash.

### 6. Sidebar (Navegación del Pliego)
- **Geometry:** 240px fixed desktop width, full viewport height, background `#FFFFFF`, right border `1px solid #E2E4DA`.
- **Items:** 36px height, padding `8px 12px`, radius `6px`. Inactive text `#576561`, active state background `#ECEFE6`, text `#142523`, with a 3px vertical accent bar on the left in `#2D5A4C`.
- **Sections:** Claramente etiquetadas en español técnico: *Órgano de Contratación*, *Pliego Administrativo (PCAP)*, *Pliego Técnico (PPT)*, *Solvencia Económica*, *Solvencia Técnica*, *Criterios Evaluables*.

### 7. Criteria Evidence Card (Ficha de Criterio)
- **Layout:** White card, `1px solid #E2E4DA`, padded `16px`.
- **Header:** Displays criterion weight (e.g., "[40 Puntos] Fórmula Automática"), criterion title, and decision badge toggle.
- **Body:** Direct excerpt quotation from the official bulletin (DOUE, BOE, o Plataforma de Contratación) with subtle left border quote bar in `#CBD0C3`.