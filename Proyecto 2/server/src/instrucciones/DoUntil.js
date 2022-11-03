"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoUntil = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class DoUntil extends instruccion_1.Instruction {
    constructor(ins, condition, line, column) {
        super(line, column);
        this.ins = ins;
        this.condition = condition;
    }
    ejecutar() {
    }
}
exports.DoUntil = DoUntil;
