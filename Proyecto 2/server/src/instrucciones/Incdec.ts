import { Instruction } from "../abstractas/instruccion";

export class IncDec extends Instruction{
    constructor(public var_name:string, public operador:string, line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}