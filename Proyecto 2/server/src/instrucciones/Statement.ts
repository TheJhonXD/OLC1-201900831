import { Instruction } from '../abstractas/instruccion';

export class Statement extends Instruction{
    public scope:string;
    constructor(public tipo:string, public var_name:string[], line:number, column:number, public valor?:any){
        super(line, column);
        this.scope = "none";
    }

    public ejecutar() {
        console.log("Declaracion de tipo \"" + this.tipo + "\" nombre: \"" + this.var_name + "\"");
    }

    public setScope(entorno:string){
        this.scope = entorno;
    }
}