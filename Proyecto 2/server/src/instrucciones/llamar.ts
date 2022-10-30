import { Instruction } from "../abstractas/instruccion";
import { Expresion } from '../abstractas/Expresion';

export class Llamar extends Instruction{
    constructor(public var_name:string, line:number, column:number, public param?:Expresion[]) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}