import { Instruction } from '../abstractas/instruccion';

export class Statement extends Instruction{
    public scope:string;
    public cont:number;
    constructor(public tipo:string, public var_name:string[], line:number, column:number, public valor?:any){
        super(line, column);
        this.scope = "none";
        this.cont = 0;
    }

    public ejecutar() {
        console.log("Declaracion de tipo \"" + this.tipo + "\" nombre: \"" + this.var_name + "\"");
    }

    public setScope(entorno:string){
        this.scope = entorno;
    }

    private createNodoGraph(cont:number, nodoName:string, contendio:string):string{
        return "\tn" + cont + "[label=\"" + nodoName +" " + contendio + "\"];\n";
    }

    private unirNodo(first:number, second:number){
        return "\tn" + first + "->" + "n" + second + ";\n";
    }

    public getNodo(cont:number):string{
        this.cont = cont;
        let code:string = "";
        code += this.createNodoGraph(cont, "<Instruccion>", "Declaracion");
        cont++;
        code += this.createNodoGraph(cont, "<Nombre><Tipo>", this.var_name + ":" + this.tipo);
        code += this.unirNodo(this.cont, cont);
        cont++;
        if (this.valor != undefined){
            code += this.valor.getNodo(cont);
            code += this.unirNodo(this.cont, cont);
        }
        return code;
    }
}