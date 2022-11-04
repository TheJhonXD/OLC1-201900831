"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Condicional = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class Condicional extends instruccion_1.Instruction {
    constructor(cif, line, column, celif, celse) {
        super(line, column);
        this.cif = cif;
        this.celif = celif;
        this.celse = celse;
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
        code += this.createNodoGraph(this.cont, "<Instruccion>", "Condicional");
        this.contaux++;
        code += this.cif.getNodo(this.contaux);
        code += this.unirNodo(this.cont, this.contaux);
        let auxiliar = this.contaux - 1;
        this.contaux = this.cif.getContador();
        //Lista de elifs
        if (this.celif != undefined) {
            try {
                for (const celifaux of this.celif) {
                    code += celifaux.getNodo(this.contaux + 1);
                    code += "\tn" + auxiliar + "->" + "n" + (this.contaux + 1) + ";\n";
                    this.contaux = celifaux.getContador();
                    this.contaux++;
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        if (this.celse != undefined) {
            code += this.celse.getNodo(this.contaux + 1);
            code += this.unirNodo(auxiliar, this.contaux + 1);
            this.contaux = this.celse.getContador();
        }
        return code;
    }
}
exports.Condicional = Condicional;
