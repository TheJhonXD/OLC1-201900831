"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class Switch extends instruccion_1.Instruction {
    constructor(valor, casos, line, column, defec) {
        super(line, column);
        this.valor = valor;
        this.casos = casos;
        this.defec = defec;
    }
    ejecutar() {
    }
}
exports.Switch = Switch;
