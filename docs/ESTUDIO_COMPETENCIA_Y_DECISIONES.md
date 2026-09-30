# Estudio de herramientas de licitaciones y decisiones del MVP

**Fecha:** 29 de septiembre de 2026  
**Nombre de trabajo:** Pliego Claro  
**Estado:** hipótesis de producto para probar con personas reales

## 1. Qué se repite en el mercado

Las herramientas actuales suelen intentar cubrir el ciclo completo:

1. Buscar licitaciones en varias fuentes.
2. Filtrar por palabras, CPV, territorio, importe y actividad.
3. Crear alertas.
4. Analizar pliegos con IA.
5. Comparar la oportunidad con el perfil de la empresa.
6. Investigar adjudicatarios y competencia.
7. Organizar tareas, documentos y fechas.
8. Redactar o revisar la oferta.
9. Seguir la adjudicación y, en algunos casos, el contrato.

Esto confirma que existe un flujo reconocible, pero también deja una oportunidad: la mayoría de productos comunican amplitud. El MVP debe comprobar primero si una persona obtiene valor de una decisión concreta, no intentar reproducir todo el sector.

## 2. Comparativa práctica

### Pliegia

**Qué comunica:** buscador unificado, radar personalizado, afinidad, alertas, calendario, checklist, CRM y análisis trazable. Se posiciona explícitamente para pymes y muestra una entrada gratuita sencilla.

**Tomamos:**

- lenguaje claro para empresas pequeñas;
- una primera pantalla centrada en oportunidades relevantes;
- fechas, presupuesto, organismo y encaje visibles;
- checklist reutilizable;
- enlace permanente a la fuente oficial.

**No copiamos ahora:** el radar completo, la ingesta de múltiples fuentes ni la rentabilidad comercial.

Fuente: https://www.pliegia.es/software-licitaciones-pymes

### Gobierto Contratación

**Qué comunica:** explorador de datos, alertas, documentos, CRM Kanban, tareas, competencia, garantías, redacción de ofertas y ejecución contractual.

**Tomamos:**

- separar oportunidad, decisión y tareas;
- fases visibles;
- responsables y fechas;
- posibilidad de trabajar en equipo;
- trazabilidad de la información.

**No copiamos ahora:** su amplitud de producto, el seguimiento contractual, la investigación de competencia y la automatización administrativa.

Fuente: https://contratos.gobierto.es/ayuda/empresas/introduccion/introduccion

### Licitia

**Qué comunica:** buscador, alertas, lectura de pliegos, comparación de precios, competencia y ciclo hasta la adjudicación.

**Tomamos:**

- explicar que encontrar una oportunidad no basta;
- llevar a la persona desde el expediente hasta una decisión;
- mantener visible la fuente y el contexto.

**No copiamos:** el nombre, el enfoque de ciclo completo ni una promesa implícita de ganar.

Fuentes: https://licitia.eu/ y https://licitia.com.mx/

### LicitaGo

**Qué comunica:** puntuación de la oportunidad, cobertura, volumen, experiencia, capacidad operativa, riesgos e histórico de adjudicatarios.

**Tomamos:**

- hacer visible por qué una oportunidad parece adecuada;
- descomponer el resultado en factores comprensibles;
- diferenciar la decisión de la predicción.

**No copiamos:** una puntuación opaca ni la idea de que un algoritmo puede anticipar quién ganará.

Fuente: https://licitago.es/

### LicitScan y Otevia

**Qué comunican:** radar automático, puntuación de encaje, fuentes normalizadas y alertas por perfil.

**Tomamos:**

- priorizar para no mostrar una lista interminable;
- ordenar por relevancia, fecha y riesgo;
- hacer que el usuario vea qué debe revisar primero.

**No copiamos:** el radar automático antes de tener claro qué datos necesita realmente una empresa para decidir.

Fuentes: https://licitscan.com/ y https://otevia.es/

### AutoOferta / Radar de Contratos

**Qué comunica:** subir un pliego, extraer requisitos, crear checklist y preparar un borrador de memoria.

**Tomamos:**

- el expediente como unidad de trabajo;
- la secuencia documento → requisitos → acciones;
- la revisión humana antes de firmar o presentar.

**No copiamos ahora:** la generación de una oferta completa ni cualquier lenguaje que sugiera que la herramienta presenta o firma por la empresa.

Fuente: https://radardecontratos.com/

### La Licitadora

**Qué comunica:** lenguaje sencillo, borradores, mínimo dato, privacidad y control de la firma por parte de la empresa.

**Tomamos:**

- dejar claro que la decisión y la firma son de la empresa;
- usar lenguaje no jurídico cuando no sea necesario;
- pedir pocos datos al principio;
- mostrar límites y responsabilidades.

**No copiamos:** el posicionamiento de preparación completa de documentos en esta primera prueba.

Fuente: https://lalicitadora.es/

## 3. Nuestra oportunidad concreta

El MVP no será “otra plataforma que encuentra licitaciones”. Será una superficie de decisión para una empresa pequeña:

> “Antes de invertir horas en una oferta, quiero saber qué pide realmente el expediente, qué puedo demostrar y cuál es el siguiente paso.”

La diferencia debe estar en cuatro cosas:

1. **Evidencia visible:** cada requisito debe distinguir entre confirmado, pendiente y no encontrado.
2. **Fuente trazable:** cada afirmación importante debe enlazar al documento y, cuando sea posible, a la página o apartado.
3. **Decisión explicable:** GO, REVISAR o NO-GO debe ir acompañado de razones, no de un número mágico.
4. **Siguiente acción:** la pantalla debe terminar con una tarea concreta, responsable y fecha.

## 4. Qué entra en el primer MVP

- Panel de oportunidades de ejemplo.
- Filtros sencillos: todas, alta afinidad, revisar y próximas a cerrar.
- Ficha de una oportunidad.
- Resumen del objeto, organismo, presupuesto y plazo.
- Requisitos separados en solvencia, medios, documentación y condiciones.
- Estado de la evidencia: confirmado, pendiente o no encontrado.
- Decisión GO / REVISAR / NO-GO.
- Siguiente tarea editable.
- Alta manual de una oportunidad para poder probar casos propios.
- Persistencia local para que Annie pueda editar el prototipo sin backend.

## 5. Qué dejamos fuera deliberadamente

- Ingesta automática de PLACSP, BOE o TED.
- Registro y autenticación.
- Alertas por correo.
- IA que analice documentos reales sin revisión.
- Redacción automática de memorias.
- Seguimiento de competidores.
- Firma, presentación o asesoramiento jurídico.
- Pagos y planes comerciales.

Estas funciones podrán entrar después de observar qué pide la persona durante la prueba. No deben ocultar la pregunta principal: **¿la ficha ayuda a decidir mejor y más rápido?**

## 6. Guion de prueba para las llamadas

1. ¿Entiendes en menos de un minuto qué se compra?
2. ¿Ves qué requisitos son decisivos?
3. ¿Distingues lo que está confirmado de lo que falta comprobar?
4. ¿La decisión GO / REVISAR / NO-GO te parece útil o demasiado simplista?
5. ¿Qué dato o documento añadirías antes de decidir?
6. ¿Qué tarea debería generarse automáticamente?
7. ¿En qué momento seguirías usando Excel, correo u otra herramienta?
8. ¿Compartirías un expediente real para probarlo?

## 7. Fuentes consultadas

- https://www.pliegia.es/software-licitaciones-pymes
- https://contratos.gobierto.es/ayuda/empresas/introduccion/introduccion
- https://contratos.gobierto.es/empresas/tus-licitaciones
- https://licitia.eu/
- https://licitia.com.mx/
- https://licitago.es/
- https://licitscan.com/
- https://otevia.es/
- https://radardecontratos.com/
- https://lalicitadora.es/
