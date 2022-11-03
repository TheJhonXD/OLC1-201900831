"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Push = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class Push extends instruccion_1.Instruction {
    constructor(var_name, valor, line, column) {
        super(line, column);
        this.var_name = var_name;
        this.valor = valor;
    }
    ejecutar() {
    }
}
exports.Push = Push;
