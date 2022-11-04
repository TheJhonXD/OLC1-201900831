"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = void 0;
class Singleton {
    constructor() {
    }
    analize(texto) {
        try {
        }
        catch (error) {
        }
    }
    static getInstance() {
        if (Singleton.instr == null) {
            Singleton.instr = new Singleton();
            Singleton.listaError = [];
            Singleton.ast = [];
            Singleton.tablaSimbolos = [];
        }
        return Singleton.instr;
    }
    limpiar() {
        Singleton.listaError = [];
        Singleton.ast = [];
        Singleton.tablaSimbolos = [];
    }
    getAst() {
        return Singleton.ast;
    }
    setAst(ast_) {
        Singleton.ast = ast_;
    }
    getlistaError() {
        return Singleton.listaError;
    }
    gettablaSimbolos() {
        return Singleton.tablaSimbolos;
    }
}
exports.Singleton = Singleton;
