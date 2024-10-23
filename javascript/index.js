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
  
  const tiposLavados = [
    { nombre: "Combo Corsa", duracion: "1:30", minutos: convertirHorasAMinutos("1:30") },
    { nombre: "Combo Cronos", duracion: "2:00", minutos: convertirHorasAMinutos("2:00") },
    { nombre: "Combo Lambo", duracion: "4:00", minutos: convertirHorasAMinutos("4:00") }
  ];
  
  let pedidos = [];

  function ingresarPedidos() {
    let continuar = true;
    
    while (continuar) {
      let modelo = prompt("Ingresa el modelo del auto:");
      let patente = prompt("Ingresa la patente del auto:");
      let tipoLavado = parseInt(prompt("Ingresa el tipo de lavado (1: Combo Corsa, 2: Combo Cronos, 3: Combo Lambo):"));
      let horaDeseada = prompt("Ingresa la hora deseada para el pedido (HH:MM):");

      if (tipoLavado >= 1 && tipoLavado <= 3) {
        let lavadoSeleccionado = tiposLavados[tipoLavado - 1];
        
        // Crear objeto del pedido
        let pedido = {
          modelo,
          patente,
          tipoLavado: lavadoSeleccionado.nombre,
          duracion: lavadoSeleccionado.duracion,
          minutosDuracion: lavadoSeleccionado.minutos,
          horaDeseada
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
    
    console.log(`\nPedido más largo: ${pedidoMasLargo.tipoLavado}, Duración: ${pedidoMasLargo.duracion}, Hora: ${pedidoMasLargo.horaDeseada}`);
    console.log(`Pedido más corto: ${pedidoMasCorto.tipoLavado}, Duración: ${pedidoMasCorto.duracion}, Hora: ${pedidoMasCorto.horaDeseada}`);
    
    console.log("\nPedidos detallados:");
    pedidos.forEach(pedido => {
      console.log(`Modelo: ${pedido.modelo}, Patente: ${pedido.patente}, Lavado: ${pedido.tipoLavado}, Hora: ${pedido.horaDeseada}`);
    });
  }
  
  // Inicia las funciones
  ingresarPedidos();
  analizarPedidos();
  