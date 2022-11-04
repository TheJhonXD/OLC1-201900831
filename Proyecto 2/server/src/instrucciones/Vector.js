"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class Vector extends instruccion_1.Instruction {
    constructor(tipo, var_name, line, column, valor, listval) {
        super(line, column);
        this.tipo = tipo;
        this.var_name = var_name;
        this.valor = valor;
        this.listval = listval;
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
        code += this.createNodoGraph(this.cont, "<Instruccion>", "Vector");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Tipo>", this.tipo);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Nombre>", this.var_name);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;
        if (this.valor != undefined) {
            code += this.createNodoGraph(this.contaux, "<Tamaño>", "");
            code += this.unirNodo(this.cont, this.contaux);
            let auxiliar = this.contaux;
            this.contaux++;
            if (typeof this.valor == "object") {
                code += this.valor.getNodo(this.contaux);
                code += this.unirNodo(auxiliar, this.contaux);
                this.contaux = this.valor.getContador();
            }
            else {
                code += this.createNodoGraph(this.contaux, "", this.valor);
                code += this.unirNodo(auxiliar, this.contaux);
            }
        }
        else if (this.listval != undefined) {
            code += this.createNodoGraph(this.contaux, "<Valores>", this.listval.toString());
            code += this.unirNodo(this.cont, this.contaux);
        }
        return code;
    }
}
exports.Vector = Vector;
