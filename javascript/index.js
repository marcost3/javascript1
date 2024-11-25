const tiposLavados = [
  { nombre: "Combo Corsa", duracion: "1:30" },
  { nombre: "Combo Cronos", duracion: "2:00" },
  { nombre: "Combo Lambo", duracion: "4:00" }
];

let pedidos = [];

fetch('../data/pedidos.json')
  .then(response => response.json())
  .then(data => {
      pedidos = data;
      cargarTurnos();
  })
  .catch(() => {
      mostrarToast("Error cargando datos iniciales", "error");
  });

const sumarDuracion = (horaInicio, duracion) => {
  const [horasInicio, minutosInicio] = horaInicio.split(":").map(Number);
  const [horasDuracion, minutosDuracion] = duracion.split(":").map(Number);
  const horasFin = (horasInicio + horasDuracion + Math.floor((minutosInicio + minutosDuracion) / 60)) % 24;
  const minutosFin = (minutosInicio + minutosDuracion) % 60;
  return `${String(horasFin).padStart(2, "0")}:${String(minutosFin).padStart(2, "0")}`;
};

const analizarNumero = numero => {
  const numeroLimpio = numero.replace(/\D/g, '');
  const valido = numeroLimpio.length === 10;
  if (!valido) {
      Swal.fire("Número incorrecto", `Se ingresaron ${numeroLimpio.length} dígitos`, "error");
  }
  return valido;
};

const validarDisponibilidad = nuevoPedido => {
  const nuevaHoraInicio = convertirHoraEnMinutos(nuevoPedido.hora);
  const nuevaHoraFin = convertirHoraEnMinutos(nuevoPedido.horaFin);

  return !pedidos.some(pedido =>
      pedido.fecha === nuevoPedido.fecha &&
      nuevaHoraInicio < convertirHoraEnMinutos(pedido.horaFin) &&
      nuevaHoraFin > convertirHoraEnMinutos(pedido.hora)
  );
};

const convertirHoraEnMinutos = hora => {
  const [horas, minutos] = hora.split(":").map(Number);
  return horas * 60 + minutos;
};

const mostrarToast = (mensaje, tipo = "success") => {
  Toastify({
      text: mensaje,
      duration: 3000,
      gravity: "top",
      position: "center",
      style: { background: tipo === "success" ? "green" : "red" }
  }).showToast();
};

const cargarTurnos = () => {
  const tbody = document.querySelector("#agendaTurnos tbody");
  tbody.innerHTML = pedidos.map(pedido => `
      <tr>
          <td>${pedido.modelo}</td>
          <td>${pedido.patente}</td>
          <td>${pedido.telefono}</td>
          <td>${pedido.fecha}</td>
          <td>${pedido.hora}</td>
          <td>${pedido.horaFin}</td>
          <td>${pedido.combo}</td>
      </tr>
  `).join("");
};

document.getElementById('turnoForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const modelo = document.getElementById('modelo').value;
  const patente = document.getElementById('patente').value;
  const telefono = document.getElementById('telefono').value;
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const comboIndex = document.getElementById('combo').selectedIndex;
  const combo = tiposLavados[comboIndex];
  const horaFin = sumarDuracion(hora, combo.duracion);

  const nuevoPedido = { modelo, patente, telefono, fecha, hora, combo: combo.nombre, horaFin };

  if (!analizarNumero(nuevoPedido.telefono)) return;

  if (!validarDisponibilidad(nuevoPedido)) {
      Swal.fire("Horario ocupado", "Por favor elige otro horario.", "warning");
      return;
  }

  pedidos.push(nuevoPedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  cargarTurnos();
  mostrarToast("Turno reservado con éxito");
  this.reset();  // Reset de turnos (borrar si se quiere guardar los turnos)
});
