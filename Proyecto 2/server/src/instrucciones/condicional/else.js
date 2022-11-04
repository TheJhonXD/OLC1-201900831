"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C_Else = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class C_Else extends instruccion_1.Instruction {
    constructor(ins, line, column) {
        super(line, column);
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
        code += this.createNodoGraph(this.cont, "", "ELSE");
        this.contaux++;
        //Nodo instrucciones
        code += this.createNodoGraph(this.contaux, "<Lista Instrucciones>", "");
        code += this.unirNodo(this.cont, this.contaux);
        let auxiliar = this.contaux;
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
exports.C_Else = C_Else;
