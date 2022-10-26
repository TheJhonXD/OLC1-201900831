import { Instruction } from '../abstractas/instruccion';

export class Statement extends Instruction{
    constructor(line:number, column:number){
        super(line, column);
    }

    public ejecutar() {
        console.log("Encontre una declaracion");
    }
}