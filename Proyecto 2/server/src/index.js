"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const singleton_1 = require("./Patron/singleton");
let instr = singleton_1.Singleton.getInstance();
let express = require('express');
const ruta = express.Router();
let fs = require('fs');
const parser = require('./grammar/gramatica.js');
//const fs = require('fs');
function createAST(ast) {
    let code = "";
    let cont = 1;
    code += "digraph G{\n\tnode[shape=\"box\" style=\"rounded\" fontname=\"Helvetica\"]\n";
    code += "\tins[label=\"Instrucciones\"];\n";
    for (const instruccion of ast) {
        try {
            code += instruccion.getNodo(cont + 1);
            code += "\tins->" + "n" + (cont + 1) + ";\n";
            cont += 1000;
        }
        catch (error) {
            console.log(error);
        }
    }
    code += "}";
    console.log(code);
    return code;
}
function TablaSimbolos(ast) {
    try {
        // const entrada = fs.readFileSync("src/entrada.txt");
        for (const instruccion of ast) {
            try {
                if (typeof instruccion == "object") {
                    instruccion.ejecutar();
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
ruta.post("/code", (req, res) => {
    let codigo = req.body.code;
    let astGraph;
    //console.log(codigo);
    instr.limpiar();
    try {
        const ast = parser.parse(codigo.toString());
        instr.setAst(ast);
        // console.log(ast);
        astGraph = createAST(ast);
        instr.setAstGraph(astGraph);
        console.log("************* AST Generado *************");
        TablaSimbolos(ast);
        console.log("************* Tabla de Simbolos Generado *************");
        res.json({ message: astGraph });
    }
    catch (error) {
        console.log(error);
    }
    //console.log(aux);
    // res.json({ message:  "jsjsjsj"});
});
ruta.get("/errores", (req, res) => {
    //console.log(codigo);
    let cabecera = ['#', 'Tipo Error', 'Descripcion', 'Linea', 'Columna'];
    res.json({ header: cabecera, lista: instr.TablaErrores() });
});
ruta.get("/simbolos", (req, res) => {
    //console.log(codigo);
    let cabecera = ['Identificador', 'Tipo', 'Tipo', 'Entorno', 'Linea', 'Columna'];
    res.json({ header: cabecera, lista: instr.SymbolTable() });
});
ruta.get("/codeArbol", (req, res) => {
    //console.log(codigo);
    let codigo = `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Graphviz</title>
    </head>
    <body>
        <script src="https://d3js.org/d3.v5.js"></script>
        <script src="https://unpkg.com/@hpcc-js/wasm@0.3.13/dist/index.min.js"></script>
        <script src="https://unpkg.com/d3-graphviz@3.0.5/build/d3-graphviz.js"></script>
        <div id="graph" style="text-align: center;"></div>
        <script>
            d3.select("#graph").graphviz(
                { useWorker: false }
                ).renderDot(\`${instr.getAstGraph()}\`);
        </script>
    </body>
    </html>`;
    fs.writeFile("graphviz.html", codigo, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("El html fue creado correctamente");
    });
    res.json({ codeAST: instr.getAstGraph() });
});
module.exports = ruta;
