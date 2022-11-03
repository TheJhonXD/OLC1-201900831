"use strict";
let express = require('express');
const ruta = express.Router();
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
}
function execute(codigo) {
    try {
        // const entrada = fs.readFileSync("src/entrada.txt");
        console.log("********************** Analisis iniciado **********************");
        const ast = parser.parse(codigo.toString());
        console.log(ast);
        // console.log("-------------------------");
        // createAST(ast);
        // console.log("-------------------------");
        for (const instruccion of ast) {
            try {
                instruccion.ejecutar();
            }
            catch (error) {
                console.log(error);
            }
        }
        console.log("***************************************************************");
    }
    catch (error) {
        console.log(error);
    }
}
ruta.post("/code", (req, res) => {
    let codigo = req.body.code;
    //console.log(codigo);
    try {
        const ast = parser.parse(codigo.toString());
        console.log(ast);
        createAST(ast);
    }
    catch (error) {
        console.log(error);
    }
    res.json({ mensaje: "codigo recibido" });
});
module.exports = ruta;
