# Mini-Tienda

Proyecto práctico de repaso diseñado para consolidar los fundamentos de **JavaScript en el navegador**, **manipulación del DOM**, **eventos** y **persistencia con `localStorage`**.

## Estructura del Proyecto

- `index.html`: Estructura HTML con cabecera (selector de tema, menú desplegable del carrito y botón de reseteo) y catálogo de productos.
- `styles.css`: Estilos base y clases para el modo oscuro (`body.oscuro`) y el panel desplegable (`panel-oculto`).
- `script.js`: Punto de partida limpio (solo datos y capturas del DOM) para practicar desde cero.

## Conceptos Repasados

1. **Ejecución de funciones vs `console.log()`:** Llamar a una función con `()` ejecuta su código; `console.log()` sirve únicamente para inspeccionar valores por consola.
2. **`localStorage` con strings vs objetos/arrays:**
   - Textos simples (como `"oscuro"` o `"claro"`) se guardan y leen directamente sin `JSON`.
   - Arrays y objetos (como `carrito`) requieren `JSON.stringify()` al guardar y `JSON.parse()` al leer.
3. **`removeItem()` vs `clear()`:**
   - `localStorage.removeItem("carrito")` elimina únicamente el carrito conservando el tema elegido.
   - `localStorage.clear()` borra absolutamente todas las claves almacenadas en el navegador para la página.
4. **Burbujeo de eventos (_Event Bubbling_) y `e.stopPropagation()`:** Control de propagación para que hacer clic dentro de un menú desplegable no dispare el cierre global asociado al `document`.
5. **Inmutabilidad y renderizado:** Uso de `.map()`, `.filter()`, `.reduce()`, _spread operator_ (`...`), _destructuring_ y _event delegation_.

## Cómo ejecutarlo

Abre la carpeta en Visual Studio Code y lanza `index.html` con la extensión **Live Server**.
