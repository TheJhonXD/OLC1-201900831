import { Instruction } from "../abstractas/instruccion";
import { Condicion } from "./Condicion";
import { Llamar } from "./llamar";
import { Expresion } from '../abstractas/Expresion';

export class OpTernario extends Instruction{
    constructor(public condition:Condicion, public first_valor:Expresion, public second_valor:Expresion, line:number, column:number){
        super(line, column);
    }

    public ejecutar() {
        
    }
}