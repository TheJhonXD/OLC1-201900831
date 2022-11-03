"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C_Elif = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class C_Elif extends instruccion_1.Instruction {
    constructor(condicion, ins, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.ins = ins;
    }
    ejecutar() {
    }
}
exports.C_Elif = C_Elif;
