"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relacional = void 0;
const Expresion_1 = require("../abstractas/Expresion");
class Relacional extends Expresion_1.Expresion {
    constructor(left, right, rel, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.rel = rel;
    }
    ejecutar() {
    }
}
exports.Relacional = Relacional;
