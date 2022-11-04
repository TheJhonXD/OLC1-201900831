"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Push = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class Push extends instruccion_1.Instruction {
    constructor(var_name, valor, line, column) {
        super(line, column);
        this.var_name = var_name;
        this.valor = valor;
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
        code += this.createNodoGraph(this.cont, "<Instruccion>", "Push");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Nombre>", this.var_name);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;
        if (typeof this.valor == "object") {
            code += this.valor.getNodo(this.contaux);
            code += this.unirNodo(this.cont, this.contaux);
            this.contaux = this.valor.getContador();
        }
        else {
            code += this.createNodoGraph(this.contaux, "<Parametro>", this.valor);
            code += this.unirNodo(this.cont, this.contaux);
        }
        return code;
    }
}
exports.Push = Push;
