import { Instruction } from "../../abstractas/instruccion";

export class Round extends Instruction{
    constructor(public valor:number, line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}