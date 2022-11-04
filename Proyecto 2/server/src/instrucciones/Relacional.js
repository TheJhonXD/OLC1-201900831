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
        this.cont = 0;
        this.contaux = 0;
    }
    ejecutar() {
    }
    getContador() {
        return this.contaux;
    }
    createNodoGraph(cont, nodoName, contendio) {
        return "\tn" + cont + "[label=\"" + nodoName + "\\n" + contendio + "\"];\n";
    }
    unirNodo(first, second) {
        return "\tn" + first + "->" + "n" + second + ";\n";
    }
    getNodo(cont) {
        this.cont = cont;
        this.contaux = cont;
        let code = "";
        code += this.createNodoGraph(this.contaux, "", this.rel);
        this.contaux++;
        if (typeof this.left == "object") {
            code += this.left.getNodo(this.contaux);
            code += this.unirNodo(this.cont, this.contaux);
            this.contaux = this.left.getContador();
        }
        else {
            code += this.createNodoGraph(this.contaux, "", this.left);
            code += this.unirNodo(this.cont, this.contaux);
        }
        this.contaux++;
        if (typeof this.right == "object") {
            code += this.right.getNodo(this.contaux);
            code += this.unirNodo(this.cont, this.contaux);
            this.contaux = this.right.getContador();
        }
        else {
            code += this.createNodoGraph(this.contaux, "", this.right);
            code += this.unirNodo(this.cont, this.contaux);
        }
        return code;
    }
}
exports.Relacional = Relacional;
