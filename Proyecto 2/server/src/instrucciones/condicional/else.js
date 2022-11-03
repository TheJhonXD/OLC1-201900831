"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C_Else = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class C_Else extends instruccion_1.Instruction {
    constructor(ins, line, column) {
        super(line, column);
        this.ins = ins;
    }
    ejecutar() {
    }
}
exports.C_Else = C_Else;
