"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamar = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class Llamar extends instruccion_1.Instruction {
    constructor(var_name, line, column, param) {
        super(line, column);
        this.var_name = var_name;
        this.param = param;
    }
    ejecutar() {
    }
}
exports.Llamar = Llamar;
