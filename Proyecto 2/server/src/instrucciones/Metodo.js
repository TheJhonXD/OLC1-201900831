"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metodo = void 0;
const instruccion_1 = require("../abstractas/instruccion");
const singleton_1 = require("../Patron/singleton");
const TablaSimbolos_1 = require("../TSimbolos/TablaSimbolos");
class Metodo extends instruccion_1.Instruction {
    constructor(tipo, var_name, instrucciones, line, column, params) {
        super(line, column);
        this.tipo = tipo;
        this.var_name = var_name;
        this.instrucciones = instrucciones;
        this.params = params;
        this.cont = 0;
        this.contaux = 0;
        this.scope = "-";
    }
    ejecutar(env) {
        // console.log("Metodo con nombre \"" + this.var_name + "\" en la linea " + this.line);
        singleton_1.Singleton.tablaSimbolos.push(new TablaSimbolos_1.Simbolo(this.var_name, "Método", this.tipo, this.scope, this.line, this.column));
        for (const ins of this.instrucciones) {
            if (typeof ins == "object") {
                ins.ejecutar("Método " + this.var_name);
            }
        }
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
        code += this.createNodoGraph(this.cont, "<Instruccion>", "Metodo");
        this.contaux++;
        //Tipo
        code += this.createNodoGraph(this.contaux, "<Tipo>", this.tipo);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;
        //Nombre variable
        code += this.createNodoGraph(this.contaux, "<Nombre>", this.var_name);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;
        //Parametros
        if (this.params != undefined) {
            code += this.createNodoGraph(this.contaux, "<Parametros>", this.params.toString());
            code += this.unirNodo(this.cont, this.contaux);
        }
        //instrucciones
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Lista instrucciones>", "");
        code += this.unirNodo(this.cont, this.contaux);
        let auxiliar = this.contaux;
        for (const ins of this.instrucciones) {
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
exports.Metodo = Metodo;
