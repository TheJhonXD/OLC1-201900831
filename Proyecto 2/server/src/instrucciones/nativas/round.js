"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class Round extends instruccion_1.Instruction {
    constructor(valor, line, column) {
        super(line, column);
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
        code += this.createNodoGraph(this.cont, "<funcion>", "Round");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Parametro>", this.valor.toString());
        code += this.unirNodo(this.cont, this.contaux);
        return code;
    }
}
exports.Round = Round;
