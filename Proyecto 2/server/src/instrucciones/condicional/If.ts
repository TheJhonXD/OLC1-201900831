import { Instruction } from "../../abstractas/instruccion";

export class C_If extends Instruction{
    constructor(public condicion:any, public ins:any[], line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}