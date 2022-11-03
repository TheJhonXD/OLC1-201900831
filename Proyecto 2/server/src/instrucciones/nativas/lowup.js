"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LowUp = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class LowUp extends instruccion_1.Instruction {
    constructor(tipo, valor, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.valor = valor;
    }
    ejecutar() {
    }
}
exports.LowUp = LowUp;
