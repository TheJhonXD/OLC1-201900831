import { Instruction } from "../../abstractas/instruccion";
import { Expresion } from '../../abstractas/Expresion';

export class Push extends Instruction{
    constructor(public var_name:string, public valor:Expresion, line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}