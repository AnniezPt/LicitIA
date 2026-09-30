# Método de benchmark para Pliego Claro

**Fecha:** 30 de septiembre de 2026  
**Nombre del producto:** Pliego Claro, nombre de trabajo del producto antes llamado LicitIA  
**Estado:** método de prueba preparado; el buscador real todavía no está implementado en este MVP

## 1. Qué queremos demostrar

Pliego Claro debe ayudar a una pyme o a un responsable de ofertas de un equipo pequeño a decidir, antes de invertir horas, si una oportunidad merece seguir adelante.

La prueba principal no es si la aplicación encuentra muchas licitaciones. Es si consigue que la persona:

1. encuentre una oportunidad relevante;
2. entienda qué compra la Administración;
3. detecte los requisitos que pueden bloquearla;
4. sepa qué evidencia necesita aportar;
5. distinga lo confirmado de lo pendiente;
6. termine con una acción concreta.

## 2. Situación actual del MVP

La versión actual de Pliego Claro ya permite:

- añadir una oportunidad manualmente;
- consultar una ficha de decisión;
- separar requisitos y estados de evidencia;
- cambiar entre GO, REVISAR y NO-GO;
- guardar cambios localmente en el navegador;
- trabajar con casos editables durante una prueba.

Todavía no permite comprobar de forma fiable:

- cobertura real de PLACSP, BOE, TED o portales autonómicos;
- recuperación de oportunidades a partir de una consulta;
- duplicados y versiones del mismo expediente;
- actualización de fechas y estados;
- precisión de CPV, organismo, presupuesto y documentos en un buscador productivo.

Por eso primero haremos un benchmark manual o semimanual. La búsqueda automática vendrá después de observar qué consultas y errores se repiten.

## 3. Tres capas de benchmark

### Capa A — Recuperación

Pregunta: **¿encuentra oportunidades que realmente encajan?**

Mediremos:

- resultados relevantes entre los cinco primeros;
- oportunidades relevantes que no aparecen;
- falsos positivos;
- duplicados;
- expedientes cerrados o desactualizados;
- capacidad para entender sinónimos y lenguaje natural;
- efecto de CPV, territorio, presupuesto y procedimiento;
- tiempo hasta encontrar el primer resultado útil.

### Capa B — Lectura y extracción

Pregunta: **¿extrae correctamente los datos que cambian la decisión?**

Campos mínimos:

- objeto;
- organismo;
- CPV;
- presupuesto base y si incluye IVA;
- valor estimado;
- fecha y hora límite;
- duración y prórroga;
- lotes;
- procedimiento;
- solvencia económica;
- solvencia técnica;
- medios personales y materiales;
- UTE o medios externos;
- subcontratación;
- garantías;
- criterios y ponderación;
- oferta anormalmente baja;
- proximidad o exigencia operativa;
- documentos que faltan.

### Capa C — Decisión y uso

Pregunta: **¿la ficha ayuda a decidir mejor y a actuar?**

Mediremos:

- tiempo hasta una decisión provisional;
- si la persona encuentra el requisito crítico;
- si diferencia confirmado, pendiente y no localizado;
- si localiza la fuente;
- cuántas correcciones hace;
- si cambia la decisión después de revisar una evidencia;
- si crea una siguiente acción con responsable y fecha;
- si volvería a usar la ficha con otro expediente.

## 4. Conjunto inicial de casos

No necesitamos empezar con cincuenta expedientes. Usaremos cuatro familias y añadiremos casos solo cuando aparezca un error nuevo o un segmento relevante.

| Caso | Qué prueba | Estado |
|---|---|---|
| Digitalización del fondo audiovisual de la Asamblea de Extremadura | Solvencia, medios, UTE, subcontratación y decisión con documento corto | Preparado |
| Formación y concienciación en ciberseguridad | Experiencia, certificados, personal técnico, medios externos y documentación | Preparado |
| Mantenimiento de instalaciones | Proximidad, capacidad logística, personal, materiales y atención urgente | Preparado |
| Mantenimiento de edificios de la Presidencia del Pleno de Madrid | Caso de contraste ya utilizado con benchmark competitivo; criterios, garantías, subrogación y pliego largo | Preparado |

Los tres primeros casos están documentados en [Selección del primer caso real](../../docs/SELECCION_CASO_PRUEBA_LICITIA_2026-09-27.md). El cuarto está en la [matriz competitiva](../../docs/MATRIZ_COMPETITIVA_LICITIA_2026-09-30.md).

## 5. Batería inicial de búsquedas

Cada búsqueda se probará con la misma fecha de corte, las mismas fuentes y un perfil de empresa definido. No cambiaremos la consulta hasta registrar el resultado.

### Perfil A — Empresa pequeña de digitalización

Consultas que debemos probar:

1. “Digitalización de archivos audiovisuales para administraciones públicas.”
2. “Conversión y catalogación de fondos audiovisuales en Extremadura.”
3. “Servicios de archivo digital y metadatos para organismos públicos, hasta 100.000 euros.”
4. “Licitaciones de digitalización documental sin exigir una experiencia desproporcionada.”

### Perfil B — Empresa de ciberseguridad y formación

Consultas que debemos probar:

1. “Formación y concienciación en ciberseguridad para empleados públicos.”
2. “Cursos de seguridad informática para administraciones públicas.”
3. “Sensibilización, phishing y formación en ciberseguridad, procedimiento abierto simplificado.”
4. “Servicios de formación tecnológica para organismos públicos en Madrid.”

### Perfil C — Empresa de mantenimiento local

Consultas que debemos probar:

1. “Mantenimiento de edificios e instalaciones públicas en Madrid.”
2. “Mantenimiento preventivo de instalaciones con atención urgente y personal técnico.”
3. “Contratos de mantenimiento cerca de Mérida con presupuesto inferior a 100.000 euros.”
4. “Licitaciones de mantenimiento donde la empresa pueda ejecutar presencialmente en un radio de 100 km.”

El objetivo no es que el producto acepte literalmente estas frases desde el primer día. Queremos descubrir qué conceptos debe entender y qué filtros necesita realmente.

## 6. Qué es un resultado correcto

Antes de probar una búsqueda, anotaremos una pequeña referencia esperada:

| Resultado | Etiqueta |
|---|---|
| Encaja con la actividad y la capacidad del perfil | Relevante |
| Tiene relación temática, pero exige una capacidad que el perfil no tiene | Cercano pero no válido |
| Coincide por una palabra, aunque el objeto real es distinto | Falso positivo |
| Debería aparecer por sinónimo, CPV o territorio y no aparece | Falso negativo |
| Es el mismo expediente o una versión repetida | Duplicado |
| La oportunidad está cerrada o sus datos han cambiado | Desactualizado |
| No se puede verificar con fuente y documento | No verificable |

La etiqueta no la decide el algoritmo. La decide una revisión humana con la fuente oficial delante.

## 7. Errores que queremos detectar primero

### Severidad alta

- fecha límite incorrecta;
- presupuesto sin distinguir IVA incluido o excluido;
- CPV u organismo equivocado;
- confundir procedimiento o estado;
- afirmar que una empresa cumple solvencia sin comprobar su evidencia;
- confundir UTE, medios externos y subcontratación;
- omitir un documento o un lote que cambia la decisión;
- dar GO cuando falta una página o un pliego crítico;
- citar una página incorrecta.

### Severidad media

- no detectar prórrogas;
- no mostrar garantías o seguros;
- no separar criterios automáticos y de juicio de valor;
- no identificar subrogación;
- no advertir de una penalización relevante;
- no explicar por qué una búsqueda tiene encaje;
- no mostrar que la proximidad afecta a la ejecución, pero no prueba la aptitud legal.

### Severidad baja

- orden poco útil;
- sinónimos no reconocidos cuando el resultado seguía apareciendo;
- texto demasiado largo;
- filtros secundarios difíciles de encontrar;
- etiquetas que una persona no entiende.

## 8. Qué debe aparecer en la primera pantalla

La ficha inicial debe priorizar lo que cambia la decisión, no todo lo que el expediente contiene:

1. Qué se compra.
2. Quién lo compra.
3. Cuánto vale y si incluye IVA.
4. Cuándo cierra.
5. Si hay lotes.
6. Cuáles son los tres posibles bloqueos principales.
7. Qué documento o página demuestra cada bloqueo.
8. Qué falta comprobar de la empresa.
9. Próxima acción.

El resto puede estar en una segunda capa. No debe ocupar la primera pantalla:

- un score único sin explicación;
- una memoria técnica automática;
- todos los detalles del procedimiento antes de saber si encaja;
- recomendaciones genéricas;
- competencia histórica si todavía no cambia la decisión;
- noticias o contenido editorial de Room 137.

## 9. Métricas de la primera ronda

Estas son métricas de aprendizaje, no objetivos comerciales definitivos:

| Métrica | Primera señal útil |
|---|---|
| Resultados relevantes en los cinco primeros | Al menos 3 de 5 en las consultas prioritarias |
| Datos críticos correctamente extraídos | 100 % en fecha límite, presupuesto y fuente para los casos de prueba antes de mostrar GO |
| Requisitos inventados | 0 |
| Decisiones con evidencia insuficiente | REVISAR, nunca GO automático |
| Tiempo hasta el primer resultado útil | Menos de 3 minutos en una prueba manual |
| Tiempo hasta decisión provisional | Menos de 10 minutos en caso corto |
| Fuente encontrada por la persona | 100 % de los requisitos críticos |
| Correcciones de usuario | Registrar todas; una corrección grave crea una regresión |

## 10. Cómo usaremos los resultados para editar la página

No cambiaremos la página por una opinión aislada. Aplicaremos estas reglas:

- un error crítico se corrige inmediatamente;
- un patrón repetido en dos casos entra en la interfaz o en el modelo de datos;
- un patrón repetido en tres casos se convierte en requisito P0;
- una función usada por nadie durante tres pruebas se reduce, se mueve o se aparca;
- una petición que exige construir una infraestructura completa queda como hipótesis hasta comprobar frecuencia y compromiso.

Cada cambio debe responder a una frase del tester, una acción observada o un expediente concreto.

## 11. Primera prueba que recomendamos

Empezar por el caso de digitalización de 16 páginas porque es corto y contiene solvencia, medios, UTE y subcontratación. La sesión debe durar 25 minutos:

1. La persona describe su empresa en una frase.
2. Se le enseñan tres resultados o tres casos preparados.
3. Elige cuál abriría primero.
4. Lee la ficha sin ayuda durante cinco minutos.
5. Marca GO, REVISAR o NO-GO.
6. Explica qué dato le falta.
7. Crea la siguiente acción.
8. Se registra cada corrección y cada duda.

No preguntaremos si “le gusta”. Observaremos si decide, qué no entiende y qué documento busca después.

## 12. Registro mínimo de una prueba

```markdown
### Prueba [ID]

- Fecha:
- Persona / perfil:
- Sector:
- Consulta o caso:
- Fuente oficial:
- Resultado esperado:
- Resultado observado:
- Errores:
- Campo que faltó:
- Corrección de la persona:
- Tiempo hasta primer resultado útil:
- Tiempo hasta decisión:
- Decisión: continuar / ajustar / aparcar / descartar
- Cambio de producto propuesto:
- Severidad: alta / media / baja
```

## Decisión actual

Usaremos **Pliego Claro** como nombre de trabajo en el MVP y en las pruebas. No renombraremos todavía todo el producto productivo ni daremos por cerrada la disponibilidad legal/comercial del nombre.

La siguiente acción es realizar una primera ronda manual con el caso de digitalización, ciberseguridad y mantenimiento. Solo después decidiremos qué parte del buscador merece construirse.
