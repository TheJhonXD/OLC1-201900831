"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class Case extends instruccion_1.Instruction {
    constructor(valor, ins, line, column) {
        super(line, column);
        this.valor = valor;
        this.ins = ins;
    }
    ejecutar() {
    }
}
exports.Case = Case;
