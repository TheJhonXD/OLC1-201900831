"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Run = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class Run extends instruccion_1.Instruction {
    constructor(llamada, line, column) {
        super(line, column);
        this.llamada = llamada;
        this.cont = 0;
        this.contaux = 0;
    }
    ejecutar(env) {
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
        code += this.createNodoGraph(this.cont, "<Instruccion>", "Run");
        this.contaux++;
        code += this.llamada.getNodo(this.contaux);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux = this.llamada.getContador();
        return code;
    }
}
exports.Run = Run;
