"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncDec = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class IncDec extends instruccion_1.Instruction {
    constructor(var_name, operador, line, column) {
        super(line, column);
        this.var_name = var_name;
        this.operador = operador;
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
        if (this.operador == "++") {
            code += this.createNodoGraph(this.cont, "Instruccion", "Incremento");
        }
        else {
            code += this.createNodoGraph(this.cont, "Instruccion", "Decremento");
        }
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "", this.var_name);
        code += this.unirNodo(this.cont, this.contaux);
        return code;
    }
}
exports.IncDec = IncDec;
