import { Instruction } from "../../abstractas/instruccion";
import { Expresion } from '../../abstractas/Expresion';

export class Pop extends Instruction{
    constructor(public var_name:string, line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}