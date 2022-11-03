"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metodo = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class Metodo extends instruccion_1.Instruction {
    constructor(tipo, var_name, instrucciones, line, column, params) {
        super(line, column);
        this.tipo = tipo;
        this.var_name = var_name;
        this.instrucciones = instrucciones;
        this.params = params;
    }
    ejecutar() {
        console.log("Metodo con nombre \"" + this.var_name + "\" en la linea " + this.line);
    }
}
exports.Metodo = Metodo;
