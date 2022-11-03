"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pop = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class Pop extends instruccion_1.Instruction {
    constructor(var_name, line, column) {
        super(line, column);
        this.var_name = var_name;
    }
    ejecutar() {
    }
}
exports.Pop = Pop;
