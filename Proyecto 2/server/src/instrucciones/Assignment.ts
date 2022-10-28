import { Instruction } from "../abstractas/instruccion";

export class Assigment extends Instruction{
    public scope:string;
    constructor(public var_name:string[], public valor:any, line:number, column:number){
        super(line, column);
        this.scope = "none";
    }
    
    public ejecutar() {
        console.log("Asignacion con nombre: \"" + this.var_name + "\" linea " + this.line);
    }

    public setScope(entorno:string) {
        this.scope = entorno;
    }
}