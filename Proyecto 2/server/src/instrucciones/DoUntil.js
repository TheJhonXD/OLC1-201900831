"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoUntil = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class DoUntil extends instruccion_1.Instruction {
    constructor(ins, condition, line, column) {
        super(line, column);
        this.ins = ins;
        this.condition = condition;
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
        code += this.createNodoGraph(this.cont, "<Instruccion>", "Do Until");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Lista de instrucciones>", "");
        code += this.unirNodo(this.cont, this.contaux);
        let auxiliar = this.contaux;
        //Instrucciones
        for (const ins of this.ins) {
            try {
                if (typeof ins == "object") {
                    code += ins.getNodo(this.contaux + 1);
                    code += this.unirNodo(auxiliar, this.contaux + 1);
                    this.contaux = ins.getContador();
                }
                this.contaux++;
            }
            catch (error) {
                console.log(error);
            }
        }
        //Condicion
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Condicion>", "");
        code += this.unirNodo(this.cont, this.contaux);
        auxiliar = this.contaux;
        this.contaux++;
        if (typeof this.condition == "object") {
            code += this.condition.getNodo(this.contaux);
            code += this.unirNodo(auxiliar, this.contaux);
            this.contaux = this.condition.getContador();
        }
        else {
            code += this.createNodoGraph(this.contaux, "", this.condition);
            code += this.unirNodo(auxiliar, this.contaux);
        }
        return code;
    }
}
exports.DoUntil = DoUntil;
