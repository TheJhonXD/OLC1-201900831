"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class Funcion extends instruccion_1.Instruction {
    constructor(tipo, var_name, instrucciones, line, column, params) {
        super(line, column);
        this.tipo = tipo;
        this.var_name = var_name;
        this.instrucciones = instrucciones;
        this.params = params;
    }
    ejecutar() {
        console.log("Funcion con nombre \"" + this.var_name + "\" en la linea " + this.line);
    }
}
exports.Funcion = Funcion;
