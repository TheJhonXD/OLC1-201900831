import { Expresion } from "../abstractas/Expresion";
import { Instruction } from "../abstractas/instruccion";

export class VectorMod extends Instruction{
    constructor(public var_name:string, public pos:Expresion, public pos2:Expresion, line:number, column:number, public valorV?:VectorMod, public valor?:Expresion) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}