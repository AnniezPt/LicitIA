# Pliego Claro — MVP de prueba

Nombre de trabajo para una primera beta de apoyo a la decisión en licitaciones públicas.

Este proyecto se está construyendo desde cero para probarlo con personas reales. El nombre, la identidad y la arquitectura pueden cambiar después.

Pliego Claro es una aplicación de trabajo. No es Room 137 ni un espacio editorial: no publica noticias, no redacta artículos y no muestra contenido de actualidad como producto principal.

## Qué prueba

Una empresa recibe una oportunidad y necesita decidir si merece la pena invertir tiempo en ella. El MVP ayuda a revisar:

- qué compra la Administración;
- qué solvencia y medios exige;
- qué evidencias están confirmadas o pendientes;
- si la decisión provisional es GO, REVISAR o NO-GO;
- cuál es la siguiente tarea.

## Cómo abrirlo

La primera versión es estática y no necesita instalación:

1. Abre `dist/index.html` en el navegador; o
2. ejecuta `python3 -m http.server 4173 --directory dist` y visita `http://localhost:4173`.

Los cambios de ejemplo se guardan en `localStorage` del navegador para que se puedan editar durante las pruebas sin backend.

## Documentación

- [Estudio de competencia y decisiones del MVP](docs/ESTUDIO_COMPETENCIA_Y_DECISIONES.md)
- [Competidores grandes: TenderYou y referentes](docs/COMPETIDORES_GRANDES_TENDERYOU_2026-09-29.md)
- [Investigación de competidores y accesos de prueba](docs/INVESTIGACION_COMPETIDORES_ACCESO_2026-09-29.md)
- [Método de benchmark de búsqueda y decisión](docs/METODO_BENCHMARK_BUSQUEDA_Y_DECISION_2026-09-30.md)

## Diseño y trazabilidad

- `design-reference/stitch-export-2026-09-30/` conserva la exportación ZIP de Stitch, las pantallas HTML, capturas y el sistema visual usado como referencia.
- `backups/pre-stitch-2026-09-30/` conserva los archivos funcionales del MVP anteriores a esta integración.
- El documento original de Stitch no se ha editado ni sustituido.

La integración actual traslada al MVP la navegación de espacio de trabajo, la paleta cálida/mineral, la tipografía de alta legibilidad, la búsqueda local y las pestañas del expediente. Los documentos y la conexión con fuentes oficiales siguen marcados como pendientes; no se presentan como sincronizados.

## Estado

- [x] Estructura nueva independiente.
- [x] Primera interfaz de trabajo.
- [x] Casos neutros de ejemplo, editables durante las pruebas.
- [x] Decisión GO / REVISAR / NO-GO.
- [x] Requisitos con evidencia y fuente.
- [x] Alta manual de oportunidades.
- [x] Primera integración visual y estructural basada en Stitch.
- [x] Búsqueda local de oportunidades y pestañas del expediente.
- [ ] Validación con llamadas reales.
- [ ] Nombre e identidad definitivos.
- [ ] Backend y usuarios.
