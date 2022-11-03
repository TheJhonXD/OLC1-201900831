"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casteo = void 0;
const Expresion_1 = require("../abstractas/Expresion");
class Casteo extends Expresion_1.Expresion {
    constructor(tipo, valor, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.valor = valor;
    }
    ejecutar() {
    }
}
exports.Casteo = Casteo;
