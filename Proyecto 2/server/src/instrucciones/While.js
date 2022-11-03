"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mientras = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class Mientras extends instruccion_1.Instruction {
    constructor(condition, ins, line, column) {
        super(line, column);
        this.condition = condition;
        this.ins = ins;
    }
    ejecutar() {
    }
}
exports.Mientras = Mientras;
