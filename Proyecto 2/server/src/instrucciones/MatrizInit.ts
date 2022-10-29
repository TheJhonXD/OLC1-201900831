import { Instruction } from "../abstractas/instruccion";

export class MatrizInit extends Instruction{
    constructor(public tipo:string, public var_name:string, public first_valor:any[], public second_valor:any[], line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}