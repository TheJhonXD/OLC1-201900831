"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpTernario = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class OpTernario extends instruccion_1.Instruction {
    constructor(condition, first_valor, second_valor, line, column) {
        super(line, column);
        this.condition = condition;
        this.first_valor = first_valor;
        this.second_valor = second_valor;
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
        code += this.createNodoGraph(this.cont, "<>", "Operador Ternario");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Condicion>", "");
        code += this.unirNodo(this.cont, this.contaux);
        let auxiliar = this.contaux;
        this.contaux++;
        //Condicion
        if (typeof this.condition == "object") {
            code += this.condition.getNodo(this.contaux);
            code += this.unirNodo(auxiliar, this.contaux);
            this.contaux = this.condition.getContador();
        }
        else {
            code += this.createNodoGraph(this.contaux, "", this.condition);
            code += this.unirNodo(auxiliar, this.contaux);
        }
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<True>", "");
        code += this.unirNodo(this.cont, this.contaux);
        auxiliar = this.contaux;
        //Primer valor
        this.contaux++;
        if (typeof this.first_valor == "object") {
            code += this.first_valor.getNodo(this.contaux);
            code += this.unirNodo(auxiliar, this.contaux);
            this.contaux = this.first_valor.getContador();
        }
        else {
            code += this.createNodoGraph(this.contaux, "", this.first_valor);
            code += this.unirNodo(auxiliar, this.contaux);
        }
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<False>", "");
        code += this.unirNodo(this.cont, this.contaux);
        auxiliar = this.contaux;
        //Segundo valor
        this.contaux++;
        if (typeof this.second_valor == "object") {
            code += this.second_valor.getNodo(this.contaux);
            code += this.unirNodo(auxiliar, this.contaux);
            this.contaux = this.second_valor.getContador();
        }
        else {
            code += this.createNodoGraph(this.contaux, "", this.second_valor);
            code += this.unirNodo(auxiliar, this.contaux);
        }
        return code;
    }
}
exports.OpTernario = OpTernario;
