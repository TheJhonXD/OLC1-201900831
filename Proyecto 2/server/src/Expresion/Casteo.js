"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casteo = void 0;
const Expresion_1 = require("../abstractas/Expresion");
class Casteo extends Expresion_1.Expresion {
    constructor(tipo, valor, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.valor = valor;
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
        code += this.createNodoGraph(this.cont, "<Casteo>", this.tipo);
        this.contaux++;
        if (typeof this.valor == "object") {
            code += this.valor.getNodo();
            code += this.unirNodo(this.cont, this.contaux);
            this.contaux = this.valor.getContador();
        }
        else {
            code += this.createNodoGraph(this.contaux, "", this.valor);
            code += this.unirNodo(this.cont, this.contaux);
        }
        return code;
    }
}
exports.Casteo = Casteo;
