"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const instruccion_1 = require("../../abstractas/instruccion");
class Switch extends instruccion_1.Instruction {
    constructor(valor, casos, line, column, defec) {
        super(line, column);
        this.valor = valor;
        this.casos = casos;
        this.defec = defec;
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
        code += this.createNodoGraph(this.cont, "<Instruccion>", "Switch");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Valor>", "");
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
        //Casos
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "Casos", "");
        code += this.unirNodo(this.cont, this.contaux);
        auxiliar = this.contaux;
        for (const c of this.casos) {
            try {
                code += c.getNodo(this.contaux + 1);
                code += this.unirNodo(auxiliar, this.contaux + 1);
                this.contaux = c.getContador();
                this.contaux++;
            }
            catch (error) {
                console.log(error);
            }
        }
        this.contaux++;
        //Default
        if (this.defec != undefined) {
            code += this.defec.getNodo(this.contaux);
            code += this.unirNodo(this.cont, this.contaux);
            this.contaux = this.defec.getContador();
        }
        return code;
    }
}
exports.Switch = Switch;
