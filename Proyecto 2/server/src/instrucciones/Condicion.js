"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Condicion = void 0;
const Expresion_1 = require("../abstractas/Expresion");
class Condicion extends Expresion_1.Expresion {
    constructor(left, right, op, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.op = op;
    }
    ejecutar() {
    }
}
exports.Condicion = Condicion;
