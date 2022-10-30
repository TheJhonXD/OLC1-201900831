import { Instruction } from "../abstractas/instruccion";
import { Condicion } from "./Condicion";

export class Mientras extends Instruction{
    constructor(public condition:Condicion, public ins:any[], line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}