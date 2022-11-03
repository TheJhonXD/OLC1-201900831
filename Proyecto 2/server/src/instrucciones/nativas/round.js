"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class Round extends instruccion_1.Instruction {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    ejecutar() {
    }
}
exports.Round = Round;
