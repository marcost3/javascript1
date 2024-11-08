const tiposLavados = [
  { nombre: "Combo Corsa", duracion: "1:30" },
  { nombre: "Combo Cronos", duracion: "2:00" },
  { nombre: "Combo Lambo", duracion: "4:00" }
];

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

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

function analizarNumero(numero) {
  const CANT_NUMEROS = 10;
  
  const numeroLimpio = numero.replace(/\D/g, '');

  if (numeroLimpio.length === CANT_NUMEROS) {
      console.log("El número telefónico es correcto.");
      return true;
  } else {
      console.log(`El número telefónico es incorrecto. Se ingresaron ${numeroLimpio.length} dígitos.`);
      alert(`El número telefónico es incorrecto. Se ingresaron ${numeroLimpio.length} dígitos.`);
      return false;
  }
}

function convertirHoraEnMinutos(hora) {
  const [horas, minutos] = hora.split(":").map(Number);
  return horas * 60 + minutos;
}

function validarDisponibilidad(nuevoPedido) {
  const nuevaFecha = nuevoPedido.fecha;
  const nuevaHoraInicio = convertirHoraEnMinutos(nuevoPedido.hora);
  const nuevaHoraFin = convertirHoraEnMinutos(nuevoPedido.horaFin);

  for (let pedido of pedidos) {
      if (pedido.fecha === nuevaFecha) {
          const horaInicioExistente = convertirHoraEnMinutos(pedido.hora);
          const horaFinExistente = convertirHoraEnMinutos(pedido.horaFin);

          if (
              (nuevaHoraInicio < horaFinExistente && nuevaHoraFin > horaInicioExistente)
          ) {
              return false;
          }
      }
  }

  return true;
}


function agregarTurnoATabla(pedido) {
  const agendaTurnos = document.querySelector("#agendaTurnos tbody");
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

  const agendaTurnos = document.querySelector("#agendaTurnos tbody");
  agendaTurnos.innerHTML = ""; 

  pedidos.forEach(pedido => agregarTurnoATabla(pedido));
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

  const nuevoPedido = {
      modelo,
      patente,
      telefono,
      fecha,
      hora,
      combo: combo.nombre,
      horaFin
  };

  if (!validarDisponibilidad(nuevoPedido)) {
      alert("El horario seleccionado se superpone con otro turno ya reservado. Por favor, elige otro horario.");
      return;
  }

  pedidos.push(nuevoPedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  document.getElementById('turnoConfirmacion').classList.remove('d-none');
  setTimeout(() => {
      document.getElementById('turnoConfirmacion').classList.add('d-none');
  }, 3000);

  agregarTurnoATabla(nuevoPedido);
  this.reset();
});
