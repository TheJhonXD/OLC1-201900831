import { Expresion } from "../abstractas/Expresion";

export class Condicion extends Expresion{
    constructor(public left:any, public right:any, public op:string, line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}