import { Instruction } from "../abstractas/instruccion";

export class Assigment extends Instruction{
    public scope:string;
    public cont:number;
    constructor(public var_name:string[], public valor:any, line:number, column:number){
        super(line, column);
        this.scope = "none";
        this.cont = 0;
    }
    
    public ejecutar() {
        console.log("Asignacion con nombre: \"" + this.var_name + "\" linea " + this.line);
    }

    public setScope(entorno:string) {
        this.scope = entorno;
    }

    private createNodoGraph(cont:number, nodoName:string, contendio:string):string{
        return "\tn" + cont + "[label=\"" + nodoName +" " + contendio + "\"];\n";
    }

    private unirNodo(first:number, second:number){
        "\tn" + first + "->" + "n" + second + ";\n";
    }

    public getNodo(cont:number):string{
        this.cont = cont;
        let code:string = "";
        code += this.createNodoGraph(cont, "<Instruccion>", "Declaracion");
        cont++;
        code += this.createNodoGraph(cont, "<Nombre>", this.var_name.toString());
        code += this.unirNodo(this.cont, cont);
        cont++;
        if (this.valor != undefined){
            code += this.valor.getNodo(cont);
            code += this.unirNodo(this.cont, cont);
        }
        return code;
    }
}