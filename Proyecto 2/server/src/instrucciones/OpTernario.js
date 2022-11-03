"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpTernario = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class OpTernario extends instruccion_1.Instruction {
    constructor(condition, first_valor, second_valor, line, column) {
        super(line, column);
        this.condition = condition;
        this.first_valor = first_valor;
        this.second_valor = second_valor;
    }
    ejecutar() {
    }
}
exports.OpTernario = OpTernario;
