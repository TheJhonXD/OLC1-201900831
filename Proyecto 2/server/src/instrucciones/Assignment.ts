import { Instruction } from "../abstractas/instruccion";

export class Assigment extends Instruction{
    public scope:string;
    public cont:number;
    public contaux:number;
    constructor(public var_name:string[], public valor:any, line:number, column:number){
        super(line, column);
        this.scope = "none";
        this.cont = 0;
        this.contaux = 0;
    }
    
    public ejecutar(env?:string) {
        //console.log("Asignacion con nombre: \"" + this.var_name + "\" linea " + this.line);
    }

    public setScope(entorno:string) {
        this.scope = entorno;
    }

    public getContador():number{
        return this.contaux;
    }

    private createNodoGraph(cont:number, nodoName:string, contendio:string):string{
        return "\tn" + cont + "[label=\"" + nodoName +"\\n" + contendio + "\"];\n";
    }

    private unirNodo(first:number, second:number){
        return "\tn" + first + "->" + "n" + second + ";\n";
    }

    public getNodo(cont:number):string{
        this.cont = cont;
        this.contaux = cont;
        let code:string = "";
        code += this.createNodoGraph(this.cont, "<Instruccion>", "Assignacion");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Nombre>", this.var_name.toString());
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;
        if (this.valor != undefined){
            if (typeof this.valor == "object"){
                code += this.valor.getNodo(this.contaux);
                code += this.unirNodo(this.cont, this.contaux);
                this.contaux = this.valor.getContador();
            }else{
                code += this.createNodoGraph(this.contaux, "", this.valor);
                code += this.unirNodo(this.cont, this.contaux);
            }
        }
        return code;
    }
}