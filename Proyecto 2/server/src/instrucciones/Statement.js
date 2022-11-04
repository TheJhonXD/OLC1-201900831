"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statement = void 0;
const instruccion_1 = require("../abstractas/instruccion");
const singleton_1 = require("../Patron/singleton");
const TablaSimbolos_1 = require("../TSimbolos/TablaSimbolos");
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
    ejecutar(env) {
        for (const i of this.var_name) {
            if (env != undefined) {
                singleton_1.Singleton.tablaSimbolos.push(new TablaSimbolos_1.Simbolo(i, "Variable", this.tipo, env, this.line, this.column));
            }
            else {
                singleton_1.Singleton.tablaSimbolos.push(new TablaSimbolos_1.Simbolo(i, "Variable", this.tipo, "-", this.line, this.column));
            }
        }
        // console.log("Declaracion de tipo \"" + this.tipo + "\" nombre: \"" + this.var_name + "\"");
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
                code += this.unirNodo(this.cont, this.contaux);
                this.contaux = this.valor.getContador();
            }
            else {
                code += this.createNodoGraph(this.contaux, "", this.valor);
                code += this.unirNodo(this.cont, this.contaux);
            }
        }
        return code;
    }
}
exports.Statement = Statement;
