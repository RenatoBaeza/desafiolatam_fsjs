const { registrar, leer } = require('./operaciones.js')
const process = require('process');
const operacion = process.argv[2];
const argumentos = process.argv.slice(3);

if (operacion === 'registrar') {
    const [nombre, edad, tipo, color, enfermedad] = argumentos;
    registrar(nombre, edad, tipo, color, enfermedad);
} 

else if (operacion === 'leer') {
    leer();
} 

else {
    console.log("Por favor usar 'leer' o 'registrar'");
}
