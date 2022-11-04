"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class Case extends instruccion_1.Instruction {
    constructor(valor, ins, line, column) {
        super(line, column);
        this.valor = valor;
        this.ins = ins;
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
        code += this.createNodoGraph(this.cont, "<Case>", "");
        this.contaux++;
        if (typeof this.valor == "object") {
            code += this.valor.getNodo(this.contaux);
            code += this.unirNodo(this.cont, this.contaux);
            this.contaux = this.valor.getContador();
        }
        else {
            code += this.createNodoGraph(this.contaux, "", this.valor);
            code += this.unirNodo(this.cont, this.contaux);
        }
        //instrucciones
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Lista instrucciones>", "");
        code += this.unirNodo(this.cont, this.contaux);
        let auxiliar = this.contaux;
        for (const ins of this.ins) {
            try {
                code += ins.getNodo(this.contaux + 1);
                code += this.unirNodo(auxiliar, this.contaux + 1);
                this.contaux = ins.getContador();
                this.contaux++;
            }
            catch (error) {
                console.log(error);
            }
        }
        return code;
    }
}
exports.Case = Case;
