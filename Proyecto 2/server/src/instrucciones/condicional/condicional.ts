import { Instruction } from "../../abstractas/instruccion";
import { C_If } from "./If";
import { C_Elif } from './elif';
import { C_Else } from './else';

export class Condicional extends Instruction{
    constructor(public cif:C_If, line:number, column:number, public celif?:C_Elif[], public celse?:C_Else) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}