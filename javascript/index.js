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

analizarNumero();
