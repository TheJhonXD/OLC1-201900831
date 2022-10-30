import { Instruction } from "../../abstractas/instruccion";

export class Default extends Instruction{
    constructor(public ins:any[], line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}