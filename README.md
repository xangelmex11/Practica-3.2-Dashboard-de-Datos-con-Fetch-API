# Práctica 3.2: Dashboard de Datos con Fetch API

Este proyecto es un Dashboard interactivo desarrollado con HTML, CSS y Vanilla JavaScript. Demuestra el consumo de una API RESTful externa utilizando la Fetch API moderna.

## Características Principales
- Consumo asíncrono de datos usando `async / await` y `Promises`.
- Renderizado dinámico de elementos en el DOM.
- Gestión de estados de la interfaz de usuario:
  - **Estado de Carga:** Muestra un *spinner* animado mientras se esperan los datos.
  - **Estado de Error:** Captura excepciones (bloques `try/catch`) y muestra mensajes informativos en pantalla si falla la conexión.
  - **Estado de Éxito:** Genera tarjetas informativas en un formato de cuadrícula.

## Tecnologías Utilizadas
- HTML5
- CSS3 (CSS Grid y Flexbox)
- JavaScript (ES6+)
- JSONPlaceholder API (Endpoint de prueba)

## Instrucciones de Ejecución

Para visualizar y ejecutar este proyecto localmente, sigue estos pasos:

1. Clona o descarga este repositorio en tu computadora.
2. No se requieren dependencias de Node.js ni procesos de compilación.
3. Puedes ejecutar la aplicación de dos maneras:
   - **Opción básica:** Simplemente haz doble clic en el archivo `index.html` para abrirlo en tu navegador web predeterminado.
   - **Opción recomendada (Live Server):** Si utilizas Visual Studio Code, instala la extensión "Live Server". Haz clic derecho sobre `index.html` y selecciona "Open with Live Server" para evitar problemas con políticas de CORS locales al hacer peticiones Fetch.
4. Una vez abierto, el Dashboard solicitará automáticamente los datos. Puedes usar el botón "Recargar Datos" para forzar una nueva petición.