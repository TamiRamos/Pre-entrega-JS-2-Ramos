// Lista simulada de empleados
const empleados = [
  { numero: 101, contraseña: "abc123" },
  { numero: 102, contraseña: "pass456" },
  { numero: 103, contraseña: "ambar2025" }
];

// Inicialización del stock desde localStorage o array vacío
let stock = JSON.parse(localStorage.getItem("stock")) || [];

// Elementos del DOM
const formLogin = document.getElementById("formLogin");
const mensajeLogin = document.getElementById("mensajeLogin");
const panelStock = document.getElementById("panelStock");
const formProducto = document.getElementById("formProducto");
const lista = document.getElementById("listaProductos");

// Login de empleados
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const num = parseInt(document.getElementById("numEmpleado").value);
  const pass = document.getElementById("password").value;

  const empleado = empleados.find(emp => emp.numero === num && emp.contraseña === pass);

  if (empleado) {
    document.getElementById("login").style.display = "none";
    panelStock.style.display = "block";
    renderStock();
  } else {
    mensajeLogin.textContent = "Datos incorrectos. Intente nuevamente.";
  }
});

// Agregar producto al stock
formProducto.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const precio = parseFloat(document.getElementById("precio").value);
  const codigo = document.getElementById("codigo").value;

  const producto = { nombre, cantidad, precio, codigo };
  stock.push(producto);
  localStorage.setItem("stock", JSON.stringify(stock));
  formProducto.reset();
  renderStock();
});

// Mostrar productos en pantalla
function renderStock() {
  lista.innerHTML = "";
  stock.forEach((prod, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${prod.nombre}</strong> (Código: ${prod.codigo})<br>
      Cantidad: ${prod.cantidad} | Precio: $${prod.precio}
      <br>
      <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    lista.appendChild(div);
  });
}

// Eliminar producto del stock
function eliminarProducto(index) {
  stock.splice(index, 1);
  localStorage.setItem("stock", JSON.stringify(stock));
  renderStock();
}
