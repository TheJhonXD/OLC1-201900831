"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statement = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class Statement extends instruccion_1.Instruction {
    constructor(tipo, var_name, line, column, valor) {
        super(line, column);
        this.tipo = tipo;
        this.var_name = var_name;
        this.valor = valor;
        this.scope = "none";
        this.cont = 0;
        this.contaux = 0;
    }
    ejecutar() {
        console.log("Declaracion de tipo \"" + this.tipo + "\" nombre: \"" + this.var_name + "\"");
    }
    setScope(entorno) {
        this.scope = entorno;
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
        code += this.createNodoGraph(this.contaux, "<Instruccion>", "Declaracion");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Nombre><Tipo>", this.var_name + ":" + this.tipo);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;
        if (this.valor != undefined) {
            if (typeof this.valor == 'object') {
                code += this.valor.getNodo(this.contaux);
            }
            else {
                code += this.createNodoGraph(this.contaux, "", this.valor);
            }
            code += this.unirNodo(this.cont, this.contaux);
        }
        return code;
    }
}
exports.Statement = Statement;
