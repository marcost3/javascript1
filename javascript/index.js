// crear un programa que verifique si un numero telefonico es real.

function analizarNumero() {
    
    let numero = prompt("Ingrese un número telefónico seguido de un punto final:");
    
    let contador = 0;

    const CANT_NUMEROS = 10;

    for (let i = 0; numero[i] !== "."; i++) {
        contador++;
    }

    if (contador === CANT_NUMEROS) {
        console.log("El número telefónico es correcto.");
    } else {
        console.log(`El número telefónico es incorrecto. Se ingresaron ${contador} caracteres.`);
    }
}

// pre-entrega2

function convertirHorasAMinutos(duracion) {
    const [horas, minutos] = duracion.split(":").map(Number);
    return horas * 60 + minutos;
}

function validarHorario(horario) {
  const [horas, minutos] = horario.split(":").map(Number);

  if (isNaN(horas) || isNaN(minutos)) {
    return false; 
  }

  if (horas < 0 || horas > 24) {
    return false;
  }

  if (minutos < 0 || minutos >= 60) {
    return false;
  }

  if (horas === 24 && minutos !== 0) {
    return false;
  }

  return true;
}

function sumarDuracion(horarioInicio, duracionLavado) {

  let [horasInicio, minutosInicio] = horarioInicio.split(":").map(Number);

  let [horasDuracion, minutosDuracion] = duracionLavado.split(":").map(Number);

  let horasFinalizacion = horasInicio + horasDuracion;
  let minutosFinalizacion = minutosInicio + minutosDuracion;

  if (minutosFinalizacion >= 60) {
    minutosFinalizacion -= 60;
    horasFinalizacion += 1;
  }

  if (horasFinalizacion >= 24) {
    horasFinalizacion -= 24;
  }

  let horasFinal = horasFinalizacion.toString().padStart(2, "0");
  let minutosFinal = minutosFinalizacion.toString().padStart(2, "0");

  return `${horasFinal}:${minutosFinal}`;
}


const tiposLavados = [
  { nombre: "Combo Corsa", duracion: "1:30", minutos: convertirHorasAMinutos("1:30") },
  { nombre: "Combo Cronos", duracion: "2:00", minutos: convertirHorasAMinutos("2:00") },
  { nombre: "Combo Lambo", duracion: "4:00", minutos: convertirHorasAMinutos("4:00") }
];

let pedidos = [];

function ingresarPedidos() {
  let continuar = true;
  
  while (continuar) {
    let modelo = prompt("Ingrese el modelo del auto:");
    let patente = prompt("Ingrese la patente del auto (formato ABC123 o AB123CD):");
    let tipoLavado = parseInt(prompt("Ingrese el tipo de lavado (1: Combo Corsa, 2: Combo Cronos, 3: Combo Lambo):"));
    let horaDeseada;
    do {
        horaDeseada = prompt("Ingresa la hora deseada para el pedido (HH:MM):");
        if (!validarHorario(horaDeseada)) {
          console.log("El horario no es válido. Debe estar entre 00:00 y 24:00.");
        }
      } while (!validarHorario(horaDeseada));

    if (tipoLavado >= 1 && tipoLavado <= 3) {
      let lavadoSeleccionado = tiposLavados[tipoLavado - 1];
      
      let pedido = {
        modelo,
        patente,
        tipoLavado: lavadoSeleccionado.nombre,
        duracion: lavadoSeleccionado.duracion,
        minutosDuracion: lavadoSeleccionado.minutos,
        horaDeseada,
        horaFinalizacion: sumarDuracion(horaDeseada, lavadoSeleccionado.duracion)
      };
      
      pedidos.push(pedido);
    } else {
      console.log("Tipo de lavado inválido. Por favor, inténtalo de nuevo.");
    }
    continuar = prompt("¿Deseas ingresar otro pedido? (si/no)") === "si";
  }
}

function analizarPedidos() {
  if (pedidos.length === 0) {
    console.log("No hay pedidos ingresados.");
    return;
  }
  
  let cantidadLavados = tiposLavados.map(lavado => ({
    nombre: lavado.nombre,
    cantidad: pedidos.filter(pedido => pedido.tipoLavado === lavado.nombre).length
  }));
  
  let pedidoMasLargo = pedidos.reduce((max, pedido) => (pedido.minutosDuracion > max.minutosDuracion ? pedido : max));
  let pedidoMasCorto = pedidos.reduce((min, pedido) => (pedido.minutosDuracion < min.minutosDuracion ? pedido : min));
  
  console.log("Cantidad de cada tipo de lavado:");
  cantidadLavados.forEach(lavado => {
    console.log(`${lavado.nombre}: ${lavado.cantidad}`);
  });
  
  console.log(`\nPedido más largo: ${pedidoMasLargo.tipoLavado}, Duración: ${pedidoMasLargo.duracion}, Hora inicio: ${pedidoMasLargo.horaDeseada}, Hora fin: ${pedidoMasLargo.horaFinalizacion}`);
  console.log(`Pedido más corto: ${pedidoMasCorto.tipoLavado}, Duración: ${pedidoMasCorto.duracion}, Hora inicio: ${pedidoMasCorto.horaDeseada}, Hora fin: ${pedidoMasCorto.horaFinalizacion}`);
  
  console.log("\nPedidos detallados:");
  pedidos.forEach(pedido => {
    console.log(`Modelo: ${pedido.modelo}, Patente: ${pedido.patente}, Lavado: ${pedido.tipoLavado}, Hora: ${pedido.horaDeseada}`);
  });
}

// Inicia las funciones
ingresarPedidos();
analizarPedidos();
  