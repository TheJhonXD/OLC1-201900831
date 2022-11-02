const parser = require('./grammar/gramatica.js');
const fs = require('fs');

function createAST(ast:any) {
    let code:string = "";
    let cont = 1;
    code += "digraph G{\n\tnode[shape=\"box\" style=\"rounded\" fontname=\"Helvetica\"]\n";
    code += "\tins[label=\"Instrucciones\"];\n";
    for (const instruccion of ast) {
        try {
            code += instruccion.getNodo(cont + 1);
        } catch (error) {
            console.log(error);
            
        }
    }
    console.log(code);
}

try {
    const entrada = fs.readFileSync("src/entrada.txt");
    console.log("********************** Analisis iniciado **********************");
    const ast = parser.parse(entrada.toString());
    console.log(ast);
    // console.log("-------------------------");
    // createAST(ast);
    // console.log("-------------------------");

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