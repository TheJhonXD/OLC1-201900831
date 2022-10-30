import { Expresion } from "../../abstractas/Expresion";
import { Instruction } from "../../abstractas/instruccion";

export class LowUp extends Instruction{
    constructor (public tipo:string, public valor:Expresion, line:number, column:number){
        super(line, column);
    }

    public ejecutar() {
        
    }
}