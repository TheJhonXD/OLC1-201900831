const fs = require('fs');
const gramatica = require('./gramatica');

fs.readFile('./entrada.txt', (err, data) => {
    if (err) throw err;
    console.log("Todo está bien");
    console.log(data.toString());
    console.log("ahora toca analizar");
    gramatica.parse(data.toString());
});