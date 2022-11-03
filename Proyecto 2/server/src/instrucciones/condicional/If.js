"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C_If = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class C_If extends instruccion_1.Instruction {
    constructor(condicion, ins, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.ins = ins;
    }
    ejecutar() {
    }
}
exports.C_If = C_If;
