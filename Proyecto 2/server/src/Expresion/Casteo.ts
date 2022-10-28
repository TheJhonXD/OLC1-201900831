import { Expresion } from '../abstractas/Expresion';
export class Casteo extends Expresion{
    constructor(public tipo:string, public valor:Expresion, line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}