"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Varios = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class Varios extends instruccion_1.Instruction {
    constructor(name, valor, line, column) {
        super(line, column);
        this.name = name;
        this.valor = valor;
    }
    ejecutar() {
    }
}
exports.Varios = Varios;
