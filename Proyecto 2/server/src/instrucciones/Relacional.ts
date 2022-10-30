import { Expresion } from "../abstractas/Expresion";

export class Relacional extends Expresion{
    constructor(public left:Expresion, public right:Expresion, public rel:string, line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}