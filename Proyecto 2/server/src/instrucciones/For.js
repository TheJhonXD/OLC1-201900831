"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CicloFor = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class CicloFor extends instruccion_1.Instruction {
    constructor(declaracion, condition, inc, ins, line, column) {
        super(line, column);
        this.declaracion = declaracion;
        this.condition = condition;
        this.inc = inc;
        this.ins = ins;
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
        code += this.createNodoGraph(this.cont, "<Instruccion>", "For");
        //Variable
        this.contaux++;
        code += this.declaracion.getNodo(this.contaux);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux = this.declaracion.getContador();
        //condicion
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Condicion>", "");
        code += this.unirNodo(this.cont, this.contaux);
        let auxiliar = this.contaux;
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
        //incremento decremento
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Salto>", "");
        code += this.unirNodo(this.cont, this.contaux);
        auxiliar = this.contaux;
        this.contaux++;
        code += this.inc.getNodo(this.contaux);
        code += this.unirNodo(auxiliar, this.contaux);
        this.contaux = this.inc.getContador();
        //Instrucciones
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Lista instrucciones>", "");
        code += this.unirNodo(this.cont, this.contaux);
        auxiliar = this.contaux;
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
        return code;
    }
}
exports.CicloFor = CicloFor;
