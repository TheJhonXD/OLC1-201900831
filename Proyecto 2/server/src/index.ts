const parser = require('./grammar/gramatica.js');
const fs = require('fs');

try {
    const entrada = fs.readFileSync('./entrada.txt');
    const ast = parser.parse(entrada.toString());
    console.log("Analisis iniciado...");

    // for (const instruccion of ast) {
    //     try {
    //         instruccion.ejecutar();
    //     } catch (error) {
    //         console.log(error);
            
    //     }
    // }
} catch (error) {
    console.log(error);
}