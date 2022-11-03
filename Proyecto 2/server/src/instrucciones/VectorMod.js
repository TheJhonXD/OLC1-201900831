"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorMod = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class VectorMod extends instruccion_1.Instruction {
    constructor(var_name, pos, line, column, valorV, valor) {
        super(line, column);
        this.var_name = var_name;
        this.pos = pos;
        this.valorV = valorV;
        this.valor = valor;
    }
    ejecutar() {
    }
}
exports.VectorMod = VectorMod;
