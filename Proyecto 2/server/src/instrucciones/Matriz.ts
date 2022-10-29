import { Instruction } from "../abstractas/instruccion";

export class Matriz extends Instruction{
    constructor(public tipo:string, public var_name:string, line:number, column:number, public first_valor:any, public second_valor:any) {
        super(line, column);
    }

    public ejecutar() {
        
    }
}