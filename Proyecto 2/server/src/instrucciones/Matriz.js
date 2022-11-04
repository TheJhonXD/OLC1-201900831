"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matriz = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class Matriz extends instruccion_1.Instruction {
    constructor(tipo, var_name, line, column, first_valor, second_valor) {
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
        code += this.createNodoGraph(this.contaux, "<Tamaño 1>", "");
        code += this.unirNodo(this.cont, this.contaux);
        let auxiliar = this.contaux;
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
        //Second valor
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Tamaño 2>", "");
        code += this.unirNodo(this.cont, this.contaux);
        auxiliar = this.contaux;
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
exports.Matriz = Matriz;
