// function saludar() {
//   alert("Hola")
// }

// saludar()

// function sumar(a, b) {
//   return a + b
// }

// console.log(sumar(2, 2))

const productos = [
  { id: 1, nombre: "Teclado Mecánico", precio: 80 },
  { id: 2, nombre: "Ratón Inalámbrico", precio: 45 },
  { id: 3, nombre: "Auriculares", precio: 60 },
  { id: 4, nombre: "Alfombrilla XL", precio: 20 },
]

const body = document.body
const catalogo = document.getElementById("catalogo")
const btnTema = document.getElementById("btn-tema")
const btnMenu = document.getElementById("btn-menu")
const panelCarrito = document.getElementById("panel-carrito")
const listaCarrito = document.getElementById("lista-carrito")
const contador = document.getElementById("contador")
const totalPrecio = document.getElementById("total-precio")
const btnVaciar = document.getElementById("btn-vaciar")
const btnResetTotal = document.getElementById("btn-reset-total")

function aplicarTemaGuardado() {
  const tema = localStorage.getItem("tema")

  if (tema === "oscuro") {
    body.classList.add("oscuro")
    btnTema.textContent = "☀️ Modo Claro"
  }
}

btnTema.addEventListener("click", () => {
  body.classList.toggle("oscuro")

  if (body.classList.contains("oscuro")) {
    localStorage.setItem("tema", "oscuro")
    btnTema.textContent = "☀️ Modo Claro"
  } else {
    localStorage.setItem("tema", "claro")
    btnTema.textContent = "🌙 Modo Oscuro"
  }
})

btnResetTotal.addEventListener("click", () => {
  localStorage.clear()
  location.reload()
})

btnMenu.addEventListener("click", (e) => {
  e.stopPropagation()
  panelCarrito.classList.toggle("panel-oculto")
  console.log("Has hecho click en el carrito")
})

panelCarrito.addEventListener("click", (e) => {
  e.stopPropagation()
  console.log("Has hecho click en el panel del carrito")
})

document.addEventListener("click", () => {
  panelCarrito.classList.add("panel-oculto")
  console.log("Has hecho click en el documento")
})

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

function pintarCatalogo() {
  catalogo.innerHTML = productos
    .map(
      ({ id, nombre, precio }) => `
      <div class="card">
        <h3>${nombre}</h3>
        <p>${precio}€</p>
        <button class="btn-add" data-id="${id}">Añadir</button>
      </div>
  `,
    )
    .join("")
}

function pintarCarrito() {
  if (carrito.length === 0) {
    listaCarrito.innerHTML = "<p>El carrito está vacío</p>"
    contador.textContent = "0"
    totalPrecio.textContent = "0€"
    return
  }

  listaCarrito.innerHTML = carrito
    .map(
      ({ id, nombre, precio, cantidad }) => `
      <div class="item-carrito">
        <span>${nombre} (x${cantidad})</span>
        <span>${precio * cantidad}€</span>
        <button class="btn-borrar" data-id="${id}">X</button>
      </div>
  `,
    )
    .join("")

  const total = carrito.reduce(
    (suma, { precio, cantidad }) => suma + precio * cantidad,
    0,
  )

  const unidades = carrito.reduce((suma, { cantidad }) => suma + cantidad, 0)

  totalPrecio.textContent = `${total}€`
  contador.textContent = unidades
}

function agregarProducto(idProducto) {
  const producto = productos.find((p) => p.id === idProducto)
  const productoEnCarrito = carrito.find((item) => item.id === idProducto)

  if (productoEnCarrito) {
    carrito = carrito.map((item) =>
      item.id === idProducto ? { ...item, cantidad: item.cantidad + 1 } : item,
    )
  } else {
    carrito = [...carrito, { ...producto, cantidad: 1 }]
    // Así lo hicimos el otro día en clase
    // const nuevoItem = {id, nombre, precio, cantidad: 1}
    // carrito = [...carrito, nuevoItem]
  }

  guardarCarrito()
  pintarCarrito()
}

function eliminarProducto(idProducto) {
  carrito = carrito.filter((item) => item.id !== idProducto)
  guardarCarrito()
  pintarCarrito()
}

catalogo.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add")) {
    agregarProducto(Number(e.target.dataset.id))
  }
})

listaCarrito.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-borrar")) {
    eliminarProducto(Number(e.target.dataset.id))
  }
})

btnVaciar.addEventListener("click", () => {
  carrito = []
  localStorage.removeItem("carrito")
  pintarCarrito()
})

// Inicialización
aplicarTemaGuardado()
pintarCatalogo()
pintarCarrito()
