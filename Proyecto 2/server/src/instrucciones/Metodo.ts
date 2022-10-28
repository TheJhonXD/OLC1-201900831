import { Instruction } from "../abstractas/instruccion";

export class Metodo extends Instruction{
    constructor(public tipo:string, public var_name:string, public instrucciones:any[], line:number, column:number){
        super(line, column);
    }

    public ejecutar() {
        console.log("Metodo con nombre \"" + this.var_name + "\" en la linea " + this.line);
    }
}