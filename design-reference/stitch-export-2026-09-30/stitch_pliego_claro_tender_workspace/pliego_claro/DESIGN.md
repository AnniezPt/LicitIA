---
name: Pliego Claro
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#404945'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#717975'
  outline-variant: '#c0c8c3'
  surface-tint: '#3a6758'
  primary: '#134235'
  on-primary: '#ffffff'
  primary-container: '#2d5a4c'
  on-primary-container: '#a0cfbe'
  inverse-primary: '#a1d1bf'
  secondary: '#43655f'
  on-secondary: '#ffffff'
  secondary-container: '#c5eae2'
  on-secondary-container: '#496b65'
  tertiary: '#313b4e'
  on-tertiary: '#ffffff'
  tertiary-container: '#485266'
  on-tertiary-container: '#bbc5dd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bcedda'
  primary-fixed-dim: '#a1d1bf'
  on-primary-fixed: '#002118'
  on-primary-fixed-variant: '#214f41'
  secondary-fixed: '#c5eae2'
  secondary-fixed-dim: '#aacec6'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#2b4d47'
  tertiary-fixed: '#d9e3fb'
  tertiary-fixed-dim: '#bdc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3d475a'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.375rem
    fontWeight: '600'
    lineHeight: 1.875rem
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.625rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.0625rem
    fontWeight: '400'
    lineHeight: 1.75rem
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.625rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.84375rem
    fontWeight: '400'
    lineHeight: 1.375rem
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1.125rem
    letterSpacing: 0.015em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.025em
  legal-article:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.75rem
    letterSpacing: 0.005em
  numeral-data:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.9375rem
    fontWeight: '600'
    lineHeight: 1.375rem
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-mobile: 1rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system is engineered for the meticulous reading, analysis, and adjudication of complex public sector procurement dossiers (Ley de Contratos del Sector Público - LCSP). The visual posture embodies archival sobriety, bureaucratic transparency, and legal certainty.

The aesthetic fuses modern administrative efficiency with the tactile calm of legal paper stocks. It rejects SaaS flashiness, neon accents, vibrant limes, artificial gradients, and saturated novelty. Visual hierarchy relies on typographic precision, tabular clarity, high-contrast text rendering, and restrained semantic tinting. The emotional tone is authoritative, composed, and trustworthy—minimizing cognitive fatigue during intensive, hours-long document reviews.

## Colors

The color palette operates under strict functional discipline: color is reserved exclusively for interactive triggers, structural boundaries, and validated administrative states.

### Core Canvas & Surfaces
- **Canvas Base:** Soft warm ivory / marfil (`#F7F5F0`) mimics archival bond paper, reducing retina glare during prolonged reading sessions.
- **Card & Document Surfaces:** Pure stark white (`#FFFFFF`) framed strictly with structural hairpins (`#E4E2DC`). Surface backgrounds must remain uncolored and gradient-free.

### Typographic Contrast
- **Primary Ink & Headings:** Dark petroleum green (`#183A35`), delivering crisp, deep contrast exceeding WCAG AAA standards on both ivory and white surfaces.
- **Muted & Metadata Text:** Slate gray (`#667085`) for timestamps, document identifiers, section breadcrumbs, and non-actionable labels.

### Interactive Elements
- **Primary Brand / Action Accent:** Deep forest green (`#2D5A4C`), shifting to an authoritative dark pine (`#1F4036`) on hover and active states.

### Semantic Triage States
Semantic states use three-part pairings (tint surface, structural perimeter, high-density text/icon):
- **GO / Confirmado (Compliant / Awarded):** Surface `#E8F3EC`, Border `#CCE6D7`, Text & Icon `#276749`.
- **Revisar / Pendiente (Subsanación / In Review):** Surface `#FFF4D9`, Border `#F5DEAE`, Text & Icon `#936000`.
- **NO-GO / Bloqueado / Descarte (Excluded / Non-compliant):** Surface `#FBEAEA`, Border `#F4C7C7`, Text & Icon `#9B4B4B`.

Strictly prohibited: vibrant lime (`#D7EF72`), electric purples, saturated cyan panels, multi-tone gradients, or non-semantic color usage.

## Typography

Typography prioritizes continuous readability across administrative clauses, financial exhibits, and criteria matrices. **Plus Jakarta Sans** is configured throughout the hierarchy to blend geometric clarity with open letterforms.

### Configuration Rules
- **Tabular Figures:** Always apply `font-variant-numeric: tabular-nums lining-nums` across legal article notations, budgetary figures, CPV codes, and timestamps to preserve clean vertical scanning.
- **Line Length & Leading:** Long-form legal texts (`legal-article`) are capped at a line measure of 68–75 characters with an expanded line-height of `1.75rem` to prevent line jumping during intensive verification.
- **Hierarchy Separation:** Section titles and file identifiers employ heavier weights (`600` and `700`) paired with negative tracking to maintain crisp edge definition against ivory backdrops.

## Layout & Spacing

The layout system leverages a fixed-max-width multi-column model optimized for high-density document reading while safeguarding against visual sprawl on ultra-wide monitors.

### Layout Mechanics
- **Max Content Container:** Clamped to `1440px` centered on canvas, ensuring dossiers, metadata sidebars, and comparison panes remain within natural ocular span.
- **Dual-Pane Workflows:** Standard document audit view uses an asymmetric split: `380px` fixed metadata/triage rail on the left, fluid primary document viewport on the right (min `640px`, max `960px`).
- **Data Grids:** Tabular administrative registers utilize a 12-column grid with a `1.5rem` (`24px`) gutter, collapsing to 4 columns on mobile viewports.

### Breakpoints & Adaptive Flow
- **Mobile (< 768px):** Outer margins contract to `1rem`. Secondary analytical drawers fold into fixed bottom sheets. Document clause view takes 100% canvas width.
- **Tablet (768px - 1024px):** Outer margins expand to `2rem`. The secondary inspection pane transitions into an off-canvas overlay toggle.
- **Desktop (> 1024px):** Margins expand to `3rem`. Split-screen comparison and concurrent index navigation remain permanently docked.

## Elevation & Depth

Visual hierarchy is maintained through **low-contrast outlines** and tonal paper layering rather than physical extrusion or ambient drop shadows. Heavy blurs, drop shadows, and glassmorphism are eliminated to ensure documents feel grounded and crisp.

### Elevation Tiers
- **Tier 0 (Canvas Base):** Unbordered, `#F7F5F0`. Base reading plane.
- **Tier 1 (Surface Cards & Document Folios):** Background `#FFFFFF`, outline `1px solid #E4E2DC`. Zero shadow in resting state.
- **Tier 2 (Interactive Floating Rails & Active Toolbars):** Background `#FFFFFF`, outline `1px solid #D6D3CB`, shadow `0 2px 4px rgba(24, 58, 53, 0.04)`.
- **Tier 3 (Modal Dialogs & Legal Subsanación Overlays):** Background `#FFFFFF`, outline `1px solid #C4C0B6`, shadow `0 8px 24px rgba(24, 58, 53, 0.08)`. The backdrop overlay is a flat `#183A35` at 25% opacity with no blur filter.

## Shapes

Shapes reflect precision and restraint. Geometry is strictly governed by soft, minimal radii that soften corner transitions without appearing casual or toy-like.

- **Base Radius (Buttons, Inputs, Checkboxes, Selects):** `0.375rem` (6px).
- **Cards, Document Panels, and Modals (`rounded-lg`):** `0.5rem` (8px).
- **Badges and Status Indicators:** `0.25rem` (4px) to retain geometric definition alongside micro-typography. Pill (`9999px`) shapes are strictly prohibited except for small circular numerical counter chips.

## Components

### Buttons
- **Primary:** Background `#2D5A4C`, text `#FFFFFF`, border none, radius `0.375rem`, font-weight `600`. Hover state deepens to `#1F4036`. Focus state exhibits an outer ring of `2px solid #2D5A4C` with a `2px` offset in `#F7F5F0`.
- **Secondary / Administrative:** Background `#FFFFFF`, text `#183A35`, border `1px solid #E4E2DC`. Hover transitions background to `#F7F5F0` and border to `#D6D3CB`.
- **Destructive / Exclusión:** Background `#FFFFFF`, text `#9B4B4B`, border `1px solid #F4C7C7`. Hover switches surface to `#FBEAEA`.

### Triage Badges & Status Chips
All status chips are rectangular with `0.25rem` radius, padding `0.25rem 0.5rem`, using `label-sm` with tabular numerals.
- **Confirmado (GO):** Background `#E8F3EC`, text `#276749`, border `1px solid #CCE6D7`.
- **Revisar / Pendiente:** Background `#FFF4D9`, text `#936000`, border `1px solid #F5DEAE`.
- **Descarte / Bloqueado (NO-GO):** Background `#FBEAEA`, text `#9B4B4B`, border `1px solid #F4C7C7`.
- Saturated dot indicators, gradients, and full-bleed neon pills are excluded.

### Document Cards & Folders
- Cards rest on a `#FFFFFF` base with a uniform `1px solid #E4E2DC` perimeter.
- Header bars within cards are separated by a matching `1px solid #E4E2DC` bottom border, utilizing generous internal padding (`space-md` to `space-lg`).
- Cards must never carry colored flood backgrounds; status is indicated through a left structural border accent (`3px solid [status-border]`) or an internal badge.

### Inputs & Form Elements
- **Text & Numerical Fields:** Surface `#FFFFFF`, text `#183A35`, placeholder `#667085` at 70% opacity, border `1px solid #E4E2DC`, padding `0.5rem 0.75rem`, radius `0.375rem`. Focus applies border `#2D5A4C` with zero shadow glow.
- **Checkboxes & Radios:** `18px x 18px` box, border `1.5px solid #667085`, radius `0.25rem` (checkbox) or circle (radio). Active checked state uses `#2D5A4C` fill with a crisp `#FFFFFF` checkmark/indicator.

### Data Tables & Comparison Grids
- **Header:** Background `#F7F5F0`, text `#183A35`, font-weight `600`, border-bottom `1.5px solid #D6D3CB`.
- **Row:** Height `44px` default (or `36px` compact mode), alternating hover highlight `#FDFCFB`, bottom divider `1px solid #E4E2DC`.
- **Numerical Columns:** Right-aligned, formatted with `font-variant-numeric: tabular-nums`.

### Legal Clause Callout (Artículo Callout)
- White paper card, `1px solid #E4E2DC`, left-flanked by a `3px solid #2D5A4C` indicator bar.
- Metadata subheader displays Article/Pliego reference in `label-sm` (`#667085`), followed by full legal text in `legal-article` (`#183A35`).