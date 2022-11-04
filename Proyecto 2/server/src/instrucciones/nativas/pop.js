"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pop = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class Pop extends instruccion_1.Instruction {
    constructor(var_name, line, column) {
        super(line, column);
        this.var_name = var_name;
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
        code += this.createNodoGraph(this.cont, "<Instruccion>", "Pop");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Nombre>", this.var_name);
        code += this.unirNodo(this.cont, this.contaux);
        return code;
    }
}
exports.Pop = Pop;
