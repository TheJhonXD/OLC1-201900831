import { Instruction } from "../abstractas/instruccion";
import { Expresion } from '../abstractas/Expresion';

export class Vector extends Instruction{
    constructor(public tipo:string, public var_name:string, line:number, column:number, public valor?:Expresion, public listval?:any[]){
        super(line, column);
    }

    public ejecutar() {
        
    }
}