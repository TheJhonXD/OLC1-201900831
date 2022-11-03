"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternario = void 0;
const Expresion_1 = require("../abstractas/Expresion");
class Ternario extends Expresion_1.Expresion {
    constructor(line, column) {
        super(line, column);
    }
    ejecutar() {
    }
}
exports.Ternario = Ternario;
