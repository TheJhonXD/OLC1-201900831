"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorMod = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class VectorMod extends instruccion_1.Instruction {
    constructor(var_name, pos, line, column, valor) {
        super(line, column);
        this.var_name = var_name;
        this.pos = pos;
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
        code += this.createNodoGraph(this.cont, "<Vector>", "Acceder posicion");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Nombre>", this.var_name);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Pos>", "");
        code += this.unirNodo(this.cont, this.contaux);
        let auxiliar = this.contaux;
        this.contaux++;
        if (typeof this.pos == "object") {
            code += this.pos.getNodo(this.contaux);
            code += this.unirNodo(auxiliar, this.contaux);
            this.contaux = this.pos.getContador();
        }
        else {
            code += this.createNodoGraph(this.contaux, "", this.pos);
            code += this.unirNodo(auxiliar, this.contaux);
        }
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Valor>", "");
        code += this.unirNodo(this.cont, this.contaux);
        auxiliar = this.contaux;
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
        return code;
    }
}
exports.VectorMod = VectorMod;
