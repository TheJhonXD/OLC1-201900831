"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class Vector extends instruccion_1.Instruction {
    constructor(tipo, var_name, line, column, valor, listval) {
        super(line, column);
        this.tipo = tipo;
        this.var_name = var_name;
        this.valor = valor;
        this.listval = listval;
    }
    ejecutar() {
    }
}
exports.Vector = Vector;
