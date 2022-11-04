"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error_ = void 0;
class Error_ {
    constructor(tipo, mensaje, line, column) {
        this.tipo = tipo;
        this.mensaje = mensaje;
        this.line = line;
        this.column = column;
        this.num = 1;
    }
    incNum() {
        this.num++;
    }
}
exports.Error_ = Error_;
