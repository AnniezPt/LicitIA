# Plan de datos, tareas y asistencia — Pliego Claro

Fecha: 2 de octubre de 2026

## Decisión de esta iteración

El MVP incorpora tres superficies locales para probar el flujo de trabajo antes de conectar cuentas o fuentes externas:

- **Tareas**: trabajo abierto, prioridad, tipo, estado, fecha límite y oportunidad relacionada.
- **Asistencia**: guía estructurada para separar capacidad, evidencia, solvencia y colaboración.
- **Equipo**: roles locales y colaboradores de referencia, sin invitaciones ni sincronización multiusuario.

Se mantiene fuera de esta iteración:

- calendario externo y notificaciones nativas;
- análisis avanzado de precios;
- cuentas, permisos y colaboración multiusuario;
- conexión automática a fuentes oficiales.

## Qué debe resolver cada superficie

### Tareas

Una tarea debe cerrar una duda concreta. Tipos iniciales:

- decisión;
- evidencia;
- colaboración.

Cada tarea debe poder responder: qué hay que hacer, quién podría hacerlo, antes de qué fecha, qué documento lo prueba y qué cambia en la decisión.

### Asistencia

La asistencia local no da una conclusión jurídica automática. Ayuda a formular la siguiente comprobación:

1. qué dice el expediente;
2. qué puede demostrar la empresa;
3. qué brecha existe;
4. qué acción debe cerrarla.

### Equipo

La primera versión registra roles, no usuarios autenticados. Más adelante se podrá añadir asignación de tareas, comentarios, permisos e historial por persona cuando exista backend.

## Arquitectura de datos recomendada

```text
Fuentes oficiales
    ↓
+ ingestión periódica y registro de origen
    ↓
Datos normalizados de licitación
    ↓
Índice de búsqueda rápida
    ↓
Lista corta por perfil
    ↓
Análisis profundo de documentos
    ↓
Requisitos, evidencias, tareas y decisión
```

La aplicación no debe consultar todas las webs en cada búsqueda ni enviar todos los documentos a un modelo. Primero se filtran metadatos; después se analiza con más profundidad solo la lista corta.

## Fuentes a validar

1. **PLACSP**: conjuntos de datos abiertos sobre licitaciones, contratos menores y perfiles de contratante. Es la primera fuente a probar para España.
2. **TED**: Search API y datos abiertos para anuncios europeos y expedientes publicados en TED.
3. **Portales autonómicos o locales**: se añadirán solo cuando un caso de uso concreto justifique la integración.

La procedencia debe conservarse siempre: identificador de origen, URL, fecha de consulta, versión del documento y estado de extracción.

## Modelo mínimo de una oportunidad real

- identificador y fuente;
- título, organismo, CPV, importe, estado y fechas;
- ubicación y procedimiento;
- enlaces y documentos originales;
- documentos descargados o pendientes;
- requisitos extraídos;
- evidencia de la empresa;
- tareas generadas;
- decisión, motivo y fecha de revisión.

## Benchmark de rendimiento que debemos hacer

Con una muestra de 30–50 licitaciones reales mediremos:

- tiempo desde la publicación hasta la disponibilidad;
- tiempo hasta obtener una lista corta útil;
- falsos positivos y oportunidades relevantes perdidas;
- porcentaje de requisitos con fuente y página;
- tiempo hasta detectar el primer bloqueo;
- número de tareas útiles generadas;
- si la persona termina con una acción clara.

La métrica principal no será “tener más registros”, sino **tiempo hasta una decisión explicable**.

## Siguiente experimento

Construir un importador de prueba para una única fuente oficial y una muestra pequeña. No se conecta todavía a cuentas ni se automatiza la presentación de ofertas. Primero debe demostrar que el dato llega, se conserva con su fuente y se convierte en una ficha, una evidencia y una tarea revisable.
