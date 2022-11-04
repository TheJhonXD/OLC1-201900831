"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamar = void 0;
const instruccion_1 = require("../abstractas/instruccion");
class Llamar extends instruccion_1.Instruction {
    constructor(var_name, line, column, param) {
        super(line, column);
        this.var_name = var_name;
        this.param = param;
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
        code += this.createNodoGraph(this.cont, "<Instruccion>", "Llamada");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Nombre>", this.var_name);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;
        if (this.param != undefined) {
            code += this.createNodoGraph(this.contaux, "<Parametros>", this.param.toString());
            code += this.unirNodo(this.cont, this.contaux);
        }
        return code;
    }
}
exports.Llamar = Llamar;
