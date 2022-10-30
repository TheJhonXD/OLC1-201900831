import { Instruction } from "../abstractas/instruccion";
import { Statement } from "./Statement";
import { Assigment } from './Assignment';
import { Condicion } from './Condicion';
import { IncDec } from './Incdec';

export class CicloFor extends Instruction{
    constructor(public declaracion:Statement|Assigment, public condition:Condicion, public inc:IncDec|Assigment, public ins:any[], line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}