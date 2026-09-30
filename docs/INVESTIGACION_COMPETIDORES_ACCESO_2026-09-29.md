# Investigación de competidores y accesos de prueba

**Fecha de revisión:** 29 de septiembre de 2026  
**Producto analizado:** Pliego Claro, nombre de trabajo  
**Ámbito:** herramientas orientadas a empresas que buscan, analizan o preparan licitaciones públicas en España.

## Cómo se ha hecho

Se han revisado páginas oficiales, precios, demos públicas y, cuando existía un acceso abierto, el flujo real hasta el registro o la prueba. No se ha creado ninguna cuenta ni se ha enviado ningún correo, contraseña, CIF, documento de empresa o pliego real. Tampoco se ha subido un PDF a un tercero: esa acción transmite documentación y debe decidirse expresamente con un archivo concreto.

La investigación distingue entre:

- **verificado en una interfaz pública o en el formulario de prueba**;
- **prometido por la propia empresa en su web**;
- **no comprobado porque exige cuenta, datos de empresa o una demo privada**.

## Resumen ejecutivo

El mercado ya no compite solo por encontrar licitaciones. Se está organizando en cinco capas:

1. **Radar:** agregación de fuentes, filtros, CPV, territorio e importe.
2. **Priorización:** afinidad, score, recomendación o clasificación semántica.
3. **Lectura:** extracción de requisitos, criterios, plazos, garantías y riesgos.
4. **Decisión:** GO, REVISAR o NO-GO, normalmente con una puntuación o explicación.
5. **Ejecución:** checklist, responsables, pipeline, documentos, memoria y seguimiento del resultado.

Nuestra oportunidad no está en añadir otra lista de licitaciones. Está en hacer muy comprensible la capa 3-4 para una pyme: qué está demostrado, qué falta, qué puede dejarla fuera y cuál es la siguiente comprobación.

## Matriz de productos

| Producto | Acceso gratuito observado | Lo que aporta | Qué merece estudiar | Límite para copiar ahora |
|---|---|---|---|---|
| **Licitia** | Buscador sin cuenta; onboarding con ejemplos; cuenta gratuita anunciada sin tarjeta | Buscador, alertas, bandeja, IA sobre pliegos, pipeline, simulador de oferta, competencia e informes | Onboarding en lenguaje natural; explica por qué entra una oportunidad y qué términos usa; separa alerta de trabajo | Es un ciclo muy amplio. No debemos intentar replicar fuentes, CRM, mercado y precio a la vez |
| **Pliegia** | Plan Explora gratuito: 25 resultados por búsqueda, 1 alerta, 2 vigilancias, 10 guardadas y 3 oportunidades seguidas | Radar para pymes, afinidad, documentos catalogados, hallazgos con página, checklist, correcciones y exportación | La combinación “afinidad + trazabilidad + siguiente acción”; límites gratuitos fáciles de entender | El radar y la ingesta de fuentes no son la primera pregunta de nuestra beta |
| **Gobierto Contratación** | Prueba gratuita anunciada; el registro pide cuenta y tipo de usuario | Explorador con muchos filtros, búsqueda dentro de documentos, alertas, mercado, competencia, Kanban, tareas, garantías y redactor | Arquitectura por módulos; cada hallazgo lleva a una acción, fase, responsable o alerta | Su amplitud y precio corresponden a un producto maduro, no a nuestro primer test |
| **LicitAI** (`licitaiapp.es`) | 2 análisis Go/No-Go al mes en el plan gratuito anunciado; sin tarjeta | Ocho salidas de IA, citas por documento y página, riesgos de exclusión, sobres, precio, pipeline y borradores Word | Es el competidor más cercano a nuestra hipótesis: decisión ejecutiva + fuentes + pendientes | Evitar prometer memoria, precio o presentación automática antes de validar la lectura básica |
| **LicitaIA** (`licitaia.org`) | Analizador sin registro; 3 análisis gratuitos anunciados; cuenta con créditos de bienvenida y 14 días Pro | Buscador, alertas, análisis PDF, solvencia, GO/NO-GO, simulador, DEUC y copiloto | Buen embudo de entrada: el usuario obtiene valor antes de registrarse; separa resumen público de funciones de cuenta | El análisis de un documento real debe tener política clara de datos y revisión humana |
| **AutoOferta / Radar de Contratos** | Prueba con un pliego real anunciada | Perfil de empresa reutilizable, extracción del pliego, memoria Word, checklist por sobres y avisos | El perfil persistente de la empresa y la salida directamente editable | El salto a “oferta completa” puede crear una falsa sensación de automatización suficiente |
| **Pliegos.es** | Análisis y ejemplo descargable enviados por email; servicio asistido | Oferta completa, sobre administrativo, memoria guiada, informe de precio, checklist y acompañamiento | Cada requisito se enlaza al pliego y cada dato de empresa a su documento; la persona sigue escribiendo y decide | Es más servicio de acompañamiento que SaaS autodirigido; no debemos imitar su alcance operativo aún |
| **Alicitar** | Búsqueda pública; alertas gratis solo con email y sin contraseña | Base amplia de registros, empresas, organismos, BORME, tribunales, adjudicaciones y radar de renovaciones | La capa de inteligencia de mercado y la previsión de relicitar | No es la referencia para la experiencia de decisión de Pliego Claro |
| **LicitaGo** | Página pública; planes indicados como “próximamente” | Clasificación semántica sin depender solo del CPV, 71 campos, 16 criterios, GO/NO-GO/REVISAR e histórico | La decisión descompuesta en criterios configurables, no solo una nota final | La propia web indica que el lanzamiento está pendiente; no tratamos sus cifras como experiencia verificada |
| **LicitScan** | Prueba de 7 días anunciada | Radar continuo, score 0-100, fuentes nacionales/europeas, contratos menores, dashboard y exportación | Mostrar el score junto con motivo y acción | Un número único puede dar más seguridad de la que la documentación permite |
| **Otevia** | Formulario de alertas que pide email; no se completó | 3 fuentes, radar por perfil, puntuación 0-100, triaje y explicación de encaje | El mensaje “te encontramos a ti” y la explicación de coincidencia | Su propuesta está más cerca de descubrimiento y alertas que de revisión probatoria |

## Qué hemos visto realmente en las interfaces

### 1. El onboarding es una parte central del producto

Licitia no empieza preguntando por todos los CPV. Permite escribir algo parecido a “desarrollamos software a medida para administraciones públicas y estamos en Barcelona”. Después muestra dos alertas y hace visibles:

- términos principales y sinónimos;
- traducciones o variantes lingüísticas;
- CPV asociados;
- exclusiones para reducir ruido;
- una acción de ajuste del ámbito.

Esto es más fácil de entender que un formulario de filtros vacío. Para Pliego Claro conviene adoptar una versión más pequeña: describir la empresa, guardar tres capacidades y marcar tres límites. No hace falta construir un radar automático todavía; sí podemos usar ese perfil para explicar el encaje de una oportunidad manual.

### 2. La puntuación aparece en casi todas partes

Pliegia, LicitScan y Otevia anuncian afinidad o score. LicitaGo propone 71 campos y 16 criterios. La oportunidad no es inventar otra cifra, sino responder a la pregunta que la cifra deja abierta:

> “¿Por qué esta oportunidad parece adecuada y qué dato podría cambiar la decisión?”

Por eso mantenemos **GO / REVISAR / NO-GO** con razones visibles y estados de evidencia. La puntuación, si se añade más adelante, debe ser secundaria y desglosada.

### 3. La fuente y la página se han convertido en expectativa de confianza

Pliegia, LicitAI, LicitaIA, LicitaGo y Pliegos.es comunican citas, páginas o enlaces al documento de origen. Esto es una señal clara: un resumen sin procedencia no basta para una decisión de licitación.

En Pliego Claro cada requisito debe conservar:

- texto o interpretación breve;
- estado: confirmado, pendiente o no encontrado;
- documento o URL de origen;
- página o apartado cuando esté disponible;
- nota de revisión humana.

### 4. Los competidores convierten la lectura en trabajo

La salida no suele ser solo un resumen. Se convierte en checklist, tarea, responsable, fecha, Kanban, exportación o borrador Word. Este patrón sí entra en nuestro MVP, pero de forma deliberadamente pequeña: una siguiente acción editable por oportunidad.

### 5. La empresa se configura una vez y se reutiliza

AutoOferta, LicitAI y Pliegos.es construyen una memoria de empresa con actividad, referencias, certificados, equipo y límites. Es una buena idea para la segunda iteración, pero debe entrar después de observar qué datos utilizan realmente las personas piloto.

## Qué tomamos para la beta de Pliego Claro

### Mantener

1. **Decisión explicable:** GO, REVISAR o NO-GO, siempre con razones.
2. **Matriz de evidencia:** qué sabemos, qué falta y qué no aparece.
3. **Fuente visible:** enlace oficial y página/apartado cuando exista.
4. **Una siguiente acción:** no dejar a la persona con un resumen sin tarea.
5. **Perfil de empresa sencillo:** actividad, territorio, presupuesto orientativo y capacidades.
6. **Ejemplos realistas pero neutros:** para que las primeras llamadas no condicionen a los participantes con una empresa o marca concreta.

### Dejar para después

- agregación automática de PLACSP, BOE, TED y portales autonómicos;
- alertas por email;
- cuenta multiusuario y permisos;
- histórico de adjudicaciones y competidores;
- simulador de precios o baja temeraria;
- DEUC, memoria técnica y exportación Word;
- lectura automática de PDF real;
- puntuación numérica única;
- seguimiento contractual, garantías y renovaciones.

## Decisiones de producto derivadas

### Decisión 1 — no competir por cobertura todavía

La cobertura de fuentes es una infraestructura costosa y ya es un argumento fuerte de varios competidores. Para la prueba con personas reales importa más comprobar si la ficha ayuda a decidir. Trabajaremos inicialmente con oportunidades introducidas manualmente o con casos preparados.

### Decisión 2 — convertir el “score” en una explicación

No presentaremos una nota de 0 a 100 como verdad. Mostraremos tres bloques: **encaje**, **riesgos** y **evidencia pendiente**. Si se añade un score, será una ayuda visual derivada de esos bloques, nunca el resultado principal.

### Decisión 3 — separar lectura y redacción

El mercado empuja pronto hacia generar la oferta completa. Para la beta debemos probar antes la decisión previa: “¿merece la pena seguir?”. Redactar una memoria puede hacer que la persona valore la cantidad de salida y no la calidad de la decisión.

### Decisión 4 — diseñar la confianza desde el primer día

La interfaz debe avisar de lo que no sabe, conservar la fuente y recordar que el pliego oficial prevalece. Esta es una ventaja de producto y también un límite de responsabilidad.

## Próxima prueba con usuarios

Con los tres o cuatro primeros testers no preguntaremos “¿te gusta la aplicación?”. Les pediremos que hagan tres cosas:

1. decidir si seguirían con una oportunidad;
2. señalar qué requisito les genera más inseguridad;
3. crear o corregir la siguiente acción.

Mediremos solo:

- si entienden la decisión sin explicación nuestra;
- si detectan la diferencia entre confirmado y pendiente;
- si encuentran la fuente;
- si añaden un dato que falta;
- si cambiarían el resultado después de revisar una evidencia.

## Fuentes oficiales revisadas

- [Licitia: buscador y cuenta gratuita](https://licitia.eu/licitaciones?cpv=72000000)
- [Licitia: demo de módulos y acceso gratis](https://licitia.eu/demo)
- [Pliegia: análisis de pliegos](https://www.pliegia.es/analisis-pliegos-licitaciones)
- [Pliegia: planes y límites](https://www.pliegia.es/planes)
- [Gobierto: planes y precios](https://contratos.gobierto.es/empresas/planes)
- [Gobierto: explorador y búsqueda documental](https://contratos.gobierto.es/empresas/explorador-datos)
- [LicitAI: producto y precios](https://licitaiapp.es/)
- [LicitaIA: producto y precios](https://licitaia.org/)
- [LicitaIA: analizador sin registro](https://licitaia.org/analizar-gratis/)
- [AutoOferta: prueba y precio](https://radardecontratos.com/)
- [Pliegos.es: entregables y ejemplo](https://www.pliegos.es/producto)
- [Alicitar: buscador, alertas y radar](https://www.alicitar.es/)
- [LicitaGo: propuesta y estado de lanzamiento](https://licitago.es/)
- [LicitScan: radar y prueba](https://licitscan.com/)
- [Otevia: radar y triaje](https://otevia.es/)
- [El Vínculo: ficha en datos.gob.es](https://datos.gob.es/es/aplicaciones/el-vinculo)
