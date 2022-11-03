"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncDec = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class IncDec extends instruccion_1.Instruction {
    constructor(var_name, operador, line, column) {
        super(line, column);
        this.var_name = var_name;
        this.operador = operador;
    }
    ejecutar() {
    }
}
exports.IncDec = IncDec;
