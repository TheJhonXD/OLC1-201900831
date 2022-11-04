"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrizInit = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class MatrizInit extends instruccion_1.Instruction {
    constructor(tipo, var_name, first_valor, second_valor, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.var_name = var_name;
        this.first_valor = first_valor;
        this.second_valor = second_valor;
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
        code += this.createNodoGraph(this.cont, "<Instruccion>", "Matriz");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Tipo>", this.tipo);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Nombre>", this.var_name);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;
        //Firts valor
        code += this.createNodoGraph(this.contaux, "<Valores 1>", this.first_valor.toString());
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Valores 2>", this.second_valor.toString());
        code += this.unirNodo(this.cont, this.contaux);
        return code;
    }
}
exports.MatrizInit = MatrizInit;
