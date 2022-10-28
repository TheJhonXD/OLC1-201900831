const parser = require('./grammar/gramatica.js');
const fs = require('fs');

try {
    const entrada = fs.readFileSync("src/entrada.txt");
    console.log("********************** Analisis iniciado **********************");
    const ast = parser.parse(entrada.toString());
    console.log(ast);
    for (const instruccion of ast) {
        try {
            instruccion.ejecutar();
        } catch (error) {
            console.log(error);
            
        }
    }
    console.log("***************************************************************");
} catch (error) {
    console.log(error);
}