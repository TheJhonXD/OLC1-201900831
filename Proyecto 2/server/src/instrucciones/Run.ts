import { Instruction } from "../abstractas/instruccion";
import { Llamar } from "./llamar";

export class Run extends Instruction{
    constructor(public llamda:Llamar, line:number, column:number){
        super(line, column);
    }

    public ejecutar() {
        
    }
}