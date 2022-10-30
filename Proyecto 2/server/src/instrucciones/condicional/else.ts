import { Instruction } from "../../abstractas/instruccion";

export class C_Else extends Instruction{
    constructor(public ins:any[], line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}