"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrizInit = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class MatrizInit extends instruccion_1.Instruction {
    constructor(tipo, var_name, first_valor, second_valor, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.var_name = var_name;
        this.first_valor = first_valor;
        this.second_valor = second_valor;
    }
    ejecutar() {
    }
}
exports.MatrizInit = MatrizInit;
