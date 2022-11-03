"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoWhile = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class DoWhile extends instruccion_1.Instruction {
    constructor(ins, condition, line, column) {
        super(line, column);
        this.ins = ins;
        this.condition = condition;
    }
    ejecutar() {
    }
}
exports.DoWhile = DoWhile;
