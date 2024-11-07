const tiposLavados = [
  { nombre: "Combo Corsa", duracion: "1:30" },
  { nombre: "Combo Cronos", duracion: "2:00" },
  { nombre: "Combo Lambo", duracion: "4:00" }
];

const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

function sumarDuracion(horaInicio, duracion) {
  let [horasInicio, minutosInicio] = horaInicio.split(":").map(Number);
  let [horasDuracion, minutosDuracion] = duracion.split(":").map(Number);
  let horasFin = horasInicio + horasDuracion;
  let minutosFin = minutosInicio + minutosDuracion;
  if (minutosFin >= 60) {
      minutosFin -= 60;
      horasFin += 1;
  }
  if (horasFin >= 24) horasFin -= 24;
  return `${String(horasFin).padStart(2, "0")}:${String(minutosFin).padStart(2, "0")}`;
}

function agregarTurnoATabla(pedido) {
  const agendaTurnos = document.getElementById("agendaTurnos").querySelector("tbody");
  const fila = document.createElement("tr");
  fila.innerHTML = `
      <td>${pedido.modelo}</td>
      <td>${pedido.patente}</td>
      <td>${pedido.telefono}</td>
      <td>${pedido.fecha}</td>
      <td>${pedido.hora}</td>
      <td>${pedido.horaFin}</td>
      <td>${pedido.combo}</td>
  `;
  agendaTurnos.appendChild(fila);
}

function cargarTurnos() {
  pedidos.forEach(agregarTurnoATabla);
}

document.getElementById('turnoForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const modelo = document.getElementById('modelo').value;
  const patente = document.getElementById('patente').value;
  const telefono = document.getElementById('telefono').value;
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const comboIndex = document.getElementById('combo').selectedIndex;
  const combo = tiposLavados[comboIndex];
  const horaFin = sumarDuracion(hora, combo.duracion);

  const pedido = {
      modelo,
      patente,
      telefono,
      fecha,
      hora,
      combo: combo.nombre,
      horaFin
  };

  pedidos.push(pedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  document.getElementById('turnoConfirmacion').classList.remove('d-none');
  setTimeout(() => {
      document.getElementById('turnoConfirmacion').classList.add('d-none');
  }, 3000);

  agregarTurnoATabla(pedido);
  this.reset();
});

// Cargar turnos existentes en la agenda al cargar la página
document.addEventListener("DOMContentLoaded", cargarTurnos);
