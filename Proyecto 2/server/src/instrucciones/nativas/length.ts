import { Instruction } from "../../abstractas/instruccion";
import { Expresion } from '../../abstractas/Expresion';

export class Length extends Instruction{
    constructor(public valor:Expresion, line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}