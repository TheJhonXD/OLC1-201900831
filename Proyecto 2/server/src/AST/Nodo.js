"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodo = void 0;
class Nodo {
    constructor(nombre) {
        this.nombre = nombre;
        this.hijos = [];
        this.valor = "";
        this.idNodo = 0;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    getHijos() {
        return this.hijos;
    }
    setHijos(hijos) {
        this.hijos = hijos;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
    getIdNodo() {
        return this.idNodo;
    }
    setIdNodo(id) {
        this.idNodo = id;
    }
    addHijo(hijo) {
        this.hijos.push(hijo);
    }
}
exports.Nodo = Nodo;
