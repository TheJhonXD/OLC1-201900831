"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class Default extends instruccion_1.Instruction {
    constructor(ins, line, column) {
        super(line, column);
        this.ins = ins;
    }
    ejecutar() {
    }
}
exports.Default = Default;
