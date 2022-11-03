"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CicloFor = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class CicloFor extends instruccion_1.Instruction {
    constructor(declaracion, condition, inc, ins, line, column) {
        super(line, column);
        this.declaracion = declaracion;
        this.condition = condition;
        this.inc = inc;
        this.ins = ins;
    }
    ejecutar() {
    }
}
exports.CicloFor = CicloFor;
