"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Condicional = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class Condicional extends instruccion_1.Instruction {
    constructor(cif, line, column, celif, celse) {
        super(line, column);
        this.cif = cif;
        this.celif = celif;
        this.celse = celse;
    }
    ejecutar() {
    }
}
exports.Condicional = Condicional;
