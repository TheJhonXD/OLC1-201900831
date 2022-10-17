const fs = require('fs');
const gramatica = require('./gramatica');

fs.readFile('./entrada.txt', (err, data) => {
    if (err) throw err;
    console.log("********** Texto obtenido ************");
    console.log(data.toString());
    console.log("************************************");
    console.log("Analizando...");
    gramatica.parse(data.toString());
});