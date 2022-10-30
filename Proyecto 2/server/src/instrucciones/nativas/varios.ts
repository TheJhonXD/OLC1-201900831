import { Instruction } from "../../abstractas/instruccion";
import { Expresion } from '../../abstractas/Expresion';

export class Varios extends Instruction{
    constructor(public name:string, public valor:Expresion, line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}