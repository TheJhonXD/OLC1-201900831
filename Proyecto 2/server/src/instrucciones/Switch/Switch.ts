import { Expresion } from "../../abstractas/Expresion";
import { Instruction } from "../../abstractas/instruccion";
import { Case } from "./Case";

export class Switch extends Instruction{
    constructor(public valor:Expresion, public casos:Case[], line:number, column:number, public defec?:any) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}