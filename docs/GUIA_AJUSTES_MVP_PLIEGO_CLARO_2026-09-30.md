# Guía de Ajustes del MVP de Pliego Claro

Fecha: 30 de septiembre de 2026  
Estado: implementado como configuración local de prueba

## Criterio

La pantalla de Ajustes debe contener preferencias que cambien el comportamiento general del espacio de trabajo y controles de datos. Las acciones frecuentes deben permanecer junto a la función a la que afectan: por ejemplo, cambiar una decisión dentro del expediente y no dentro de Ajustes.

La estructura sigue cuatro reglas:

1. Agrupar ajustes por función y usar nombres que coincidan con el título de su sección.
2. Mostrar un resumen claro antes de entrar en detalle.
3. Separar preferencias, datos, avisos y acciones destructivas.
4. No presentar como conectada una cuenta, fuente oficial, notificación o integración que todavía no exista.

## Secciones implementadas

- **Espacio de trabajo:** nombre visible, zona horaria y estado local.
- **Perfil de licitador:** sectores, servicios y zonas de ejecución que servirán como señales de encaje.
- **Búsqueda y proximidad:** preferencia para mostrar proximidad cuando exista el dato, sin convertirla en descarte automático.
- **Reglas de decisión:** estado inicial, modo estricto y leyenda de estados.
- **Avisos de fechas:** anticipación configurable y estado explícito de la futura integración con Calendar o notificaciones del sistema.
- **Datos y resguardo:** tamaño orientativo, exportación/importación JSON y restauración de preferencias.
- **Apariencia:** densidad de lista y etiquetas de ejemplo.
- **Zona de riesgo:** restauración de oportunidades de prueba separada de los ajustes normales.

## Qué queda fuera por ahora

- Datos empresariales verificados, ROLECE, CIF, poderes o certificados.
- Conexiones oficiales con PLACSP, BOE, DOUE, perfiles de contratante o Calendar.
- Cuentas de usuario, permisos multiusuario y autenticación.
- Telemetría, sincronización en la nube y notificaciones nativas.

## Fundamento externo

- [Android Developers · Settings](https://developer.android.com/design/ui/mobile/guides/patterns/settings): recomienda agrupar, usar lenguaje claro, mostrar un resumen y reservar Ajustes para preferencias de uso general.
- [Apple Human Interface Guidelines · Settings](https://developer.apple.com/design/human-interface-guidelines/settings): advierte contra incluir demasiados ajustes o pedir en Ajustes información que puede recogerse en el flujo correspondiente.
- [Microsoft Learn · Guidelines for app settings](https://learn.microsoft.com/en-us/windows/apps/design/app-settings/guidelines-for-app-settings): recomienda agrupar opciones relacionadas y desactivar o marcar claramente las que no sean relevantes o estén pendientes.
