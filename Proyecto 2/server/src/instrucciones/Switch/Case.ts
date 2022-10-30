import { Instruction } from "../../abstractas/instruccion";
import { Expresion } from '../../abstractas/Expresion';

export class Case extends Instruction{
    constructor (public valor:Expresion, public ins:any[], line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}