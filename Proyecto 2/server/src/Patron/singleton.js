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
    getAstGraph() {
        return Singleton.astGraph;
    }
    setAstGraph(ast) {
        Singleton.astGraph = ast;
    }
    getlistaError() {
        return Singleton.listaError;
    }
    gettablaSimbolos() {
        return Singleton.tablaSimbolos;
    }
    settablaSimbolos(lista) {
        Singleton.tablaSimbolos = lista;
    }
    TablaErrores() {
        let tabla = [];
        let tr = [];
        let cont = 1;
        for (const i of Singleton.listaError) {
            tr.push(cont);
            tr.push(i.tipo);
            tr.push(i.mensaje);
            tr.push(i.line);
            tr.push(i.column);
            tabla.push(tr);
            tr = [];
            cont++;
        }
        return tabla;
    }
    SymbolTable() {
        let tabla = [];
        let tr = [];
        for (const i of Singleton.tablaSimbolos) {
            tr.push(i.id);
            tr.push(i.tipo);
            tr.push(i.tipoVar);
            tr.push(i.entorno);
            tr.push(i.line);
            tr.push(i.column);
            tabla.push(tr);
            tr = [];
        }
        return tabla;
    }
}
exports.Singleton = Singleton;
