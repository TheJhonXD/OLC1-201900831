import { Expresion } from '../abstractas/Expresion';
import { Instruction } from '../abstractas/instruccion';

export class Statement extends Instruction{
    public scope:string;
    public cont:number;
    public contaux:number;
    constructor(public tipo:string, public var_name:string[], line:number, column:number, public valor?:any){
        super(line, column);
        this.scope = "none";
        this.cont = 0;
        this.contaux = 0;
    }

    public ejecutar() {
        console.log("Declaracion de tipo \"" + this.tipo + "\" nombre: \"" + this.var_name + "\"");
    }

    public setScope(entorno:string){
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
        code += this.createNodoGraph(this.contaux, "<Instruccion>", "Declaracion");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Nombre><Tipo>", this.var_name + ":" + this.tipo);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;
        if (this.valor != undefined){
            if (typeof this.valor == 'object'){
                code += this.valor.getNodo(this.contaux);
            }else{
                code += this.createNodoGraph(this.contaux, "", this.valor);
            }
            code += this.unirNodo(this.cont, this.contaux);
        }
        return code;
    }
}