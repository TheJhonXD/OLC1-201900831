"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor(id, tipo, tipoVar, entorno, line, column) {
        this.id = id;
        this.tipo = tipo;
        this.tipoVar = tipoVar;
        this.entorno = entorno;
        this.line = line;
        this.column = column;
    }
}
exports.Simbolo = Simbolo;
