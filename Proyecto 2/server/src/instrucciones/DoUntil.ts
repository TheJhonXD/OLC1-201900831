import { Instruction } from '../abstractas/instruccion';
import { Condicion } from './Condicion';
export class DoUntil extends Instruction{
    constructor(public ins:any[], public condition:Condicion, line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}