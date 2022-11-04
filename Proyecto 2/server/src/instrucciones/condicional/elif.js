"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C_Elif = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class C_Elif extends instruccion_1.Instruction {
    constructor(condicion, ins, line, column) {
        super(line, column);
        this.condicion = condicion;
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
        code += this.createNodoGraph(this.cont, "", "ELIF");
        this.contaux++;
        //Nodo condicion
        code += this.createNodoGraph(this.contaux, "<Condicion>", "");
        code += this.unirNodo(this.cont, this.contaux);
        let auxiliar = this.contaux;
        this.contaux++;
        if (typeof this.condicion == "object") {
            code += this.condicion.getNodo(this.contaux);
            code += this.unirNodo(auxiliar, this.contaux);
            this.contaux = this.condicion.getContador();
        }
        else {
            code += this.createNodoGraph(this.contaux, "", this.condicion);
            code += this.unirNodo(auxiliar, this.contaux);
        }
        this.contaux++;
        //Nodo instrucciones
        code += this.createNodoGraph(this.contaux, "<Lista Instrucciones>", "");
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
exports.C_Elif = C_Elif;
