# Auditoría de apartados del MVP de Pliego Claro

**Fecha:** 30 de septiembre de 2026  
**Estado:** implementada en la beta local  
**Objetivo:** que cada apartado sirva para una decisión o una acción real, y no sea solo una pantalla decorativa.

## Criterio de revisión

Se ha aplicado una regla sencilla: cada pantalla debe responder a una pregunta concreta.

| Apartado | Pregunta que debe responder |
|---|---|
| Hoy | ¿Qué necesita atención ahora? |
| Oportunidades | ¿Qué casos merecen abrirse y por qué? |
| Expedientes | ¿Qué casos estoy comparando y en qué estado están? |
| Tareas | ¿Qué duda concreta tengo que cerrar? |
| Mi empresa | ¿Qué puedo demostrar y qué me falta? |
| Notas de prueba | ¿Qué hemos aprendido y qué vamos a cambiar? |
| Ajustes | ¿Qué reglas y datos generales controlan el espacio? |

La guía de tareas de [GOV.UK Design System](https://design-system.service.gov.uk/components/task-list/) recomienda que cada tarea tenga un nombre claro y un estado comprensible. También indica que debe poder completarse en el orden que tenga sentido para la persona. Para los datos de resumen, la [Summary list](https://design-system.service.gov.uk/components/summary-list/) recomienda separar cada dato clave en una pareja etiqueta-valor, en vez de mezclarlo en un párrafo.

## Cambios incorporados

### Hoy

- Prioridad por fecha límite exacta cuando existe.
- Número real de tareas abiertas.
- Próxima fecha, revisión pendiente y tareas visibles en la misma pantalla.
- Acceso directo a la ficha y a la lista de tareas.
- Las tareas aparcadas por un `NO-GO` no cuentan como trabajo activo.

### Oportunidades

- El filtro “Más próximas” ordena por fecha y no solo excluye casos aparcados.
- La búsqueda local también revisa resumen, siguiente acción y requisitos.
- Las fechas exactas se muestran cuando existen.
- `GO` queda bloqueado si el modo estricto está activo y quedan requisitos decisivos sin confirmar.
- Cada cambio de decisión o evidencia deja una entrada de historial local.
- Al crear una oportunidad se puede añadir fecha límite exacta y enlace oficial.

### Expedientes

- Filtros propios para `Todos`, `REVISAR`, `GO` y `NO-GO`.
- Cada fila muestra fecha, evidencias claras y siguiente acción.
- El listado conserva el carácter de prueba y no presenta documentos como sincronizados.

### Tareas

- Las tareas se derivan de la siguiente acción y de los requisitos no confirmados.
- Se pueden completar o reabrir desde la lista.
- Cada tarea lleva a la oportunidad relacionada.
- Se separan tareas abiertas, completadas y aparcadas.

### Mi empresa

- Se elimina el porcentaje fijo inventado.
- El progreso se calcula a partir de seis bloques locales: servicios, zonas, solvencia técnica, solvencia económica, colaboración y documentación.
- Se hacen visibles las carencias que pueden cambiar una decisión.
- El perfil incorpora los temas aportados en entrevistas: solvencia técnica y económica, medios externos y asociación con otras empresas.

### Notas de prueba

- Se convierte en un diario de benchmark local.
- Cada nota tiene tipo, texto, fecha y oportunidad relacionada opcional.
- Se pueden registrar hallazgos, problemas, decisiones, preguntas y reglas.
- Las notas se guardan solo en este navegador y se pueden eliminar.

### Ajustes

- El perfil de licitador ahora incluye los bloques de solvencia y colaboración.
- La densidad seleccionada se aplica a la lista de oportunidades.
- La decisión inicial configurada se respeta al crear una oportunidad, salvo que el modo estricto obligue a empezar en `REVISAR`.

## Límites que se mantienen explícitos

- No hay conexión real con PLACSP, BOE, TED ni portales autonómicos.
- No se suben documentos ni se verifica ROLECE, CIF, certificados o cuentas.
- No hay cuentas multiusuario, correo, Calendar ni notificaciones nativas.
- Las oportunidades actuales siguen siendo casos de prueba editables.
- El enlace oficial de una oportunidad solo se abre si lo aporta la persona que la crea o si ya estaba en el caso de ejemplo.

## Siguiente validación recomendada

Probar tres sesiones cortas con una oportunidad real en cada una:

1. abrir el caso desde `Hoy`;
2. identificar la primera tarea;
3. revisar un requisito y su fuente;
4. intentar marcar `GO` con información pendiente;
5. completar una comprobación;
6. registrar en `Notas de prueba` qué ha sido confuso.

No mediremos solo si la pantalla gusta. Mediremos si la persona encuentra el bloqueo, entiende la evidencia que falta y termina con una acción concreta.

## Control de calidad posterior — 1 de octubre de 2026

Se corrigieron problemas detectados al revisar la beta con datos guardados:

- progreso lateral fijo del perfil sustituido por progreso calculado;
- fecha antigua en el resumen de la ficha sustituida por la fecha exacta disponible;
- contador de oportunidades actualizado al filtrar o buscar;
- preferencias de visibilidad de etiquetas aplicadas a la ficha;
- enlaces de fuente vacíos tratados como “pendiente”, sin navegación falsa;
- búsqueda global llevada a Oportunidades cuando se utiliza desde otra ruta;
- importación local validada para evitar oportunidades o enlaces mal formados;
- versión de recursos cambiada para que el navegador no conserve una interfaz antigua en caché.
