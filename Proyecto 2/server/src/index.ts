import { Singleton } from './Patron/singleton';
let instr:Singleton = Singleton.getInstance();
let express = require('express');
const ruta = express.Router();

const parser = require('./grammar/gramatica.js');
//const fs = require('fs');

function createAST(ast:any) {
    let code:string = "";
    let cont = 1;
    code += "digraph G{\n\tnode[shape=\"box\" style=\"rounded\" fontname=\"Helvetica\"]\n";
    code += "\tins[label=\"Instrucciones\"];\n";
    for (const instruccion of ast) {
        try {
            code += instruccion.getNodo(cont + 1);
            code += "\tins->" + "n" + (cont + 1) + ";\n"
            cont += 1000;
        } catch (error) {
            console.log(error);
            
        }
    }
    code += "}";
    console.log(code);
}

function TablaSimbolos(ast:any){
    try {
        // const entrada = fs.readFileSync("src/entrada.txt");
        for (const instruccion of ast) {
            try {
                instruccion.ejecutar();
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

ruta.post("/code", (req:any, res:any) => {
    let codigo = req.body.code;
    //console.log(codigo);
    try{
        const ast = parser.parse(codigo.toString());
        instr.limpiar();
        instr.setAst(ast);
        console.log(ast);
        createAST(ast);
        console.log("************* AST Generado *************");
        TablaSimbolos(ast);
        console.log("************* Tabla de Simbolos Generado *************");
    }catch (error){
        console.log(error);
    }
    res.json({ mensaje: "codigo recibido" });
});

module.exports = ruta;