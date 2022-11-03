"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Run = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class Run extends instruccion_1.Instruction {
    constructor(llamda, line, column) {
        super(line, column);
        this.llamda = llamda;
    }
    ejecutar() {
    }
}
exports.Run = Run;
