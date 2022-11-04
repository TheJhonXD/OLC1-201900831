import { Instruction } from "../abstractas/instruccion";
import { Expresion } from '../abstractas/Expresion';

export class Vector extends Instruction{
    public cont:number;
    public contaux:number;
    constructor(public tipo:string, public var_name:string, line:number, column:number, public valor?:any, public listval?:any[]){
        super(line, column);
        this.cont = 0;
        this.contaux = 0;
    }

    public ejecutar(env?:string) {
        
    }

    public getContador():number{
        return this.contaux;
    }

    private createNodoGraph(cont:number, nodoName:string, contendio:string):string{
        return "\tn" + cont + "[label=\"" + nodoName +"\\n" + contendio + "\"];\n";
    }

    private unirNodo(first:number, second:number):string{
        return "\tn" + first + "->" + "n" + second + ";\n";
    }

    public getNodo(cont:number):string{
        this.cont = cont;
        this.contaux = cont;
        let code:string = "";

        code += this.createNodoGraph(this.cont, "<Instruccion>", "Vector");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Tipo>", this.tipo);
        code += this.unirNodo(this.cont, this.contaux);
        
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Nombre>", this.var_name);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;

        if (this.valor != undefined){
            code += this.createNodoGraph(this.contaux, "<Tamaño>", "");
            code += this.unirNodo(this.cont, this.contaux);
            let auxiliar = this.contaux;
            this.contaux++;
            if (typeof this.valor == "object"){
                code += this.valor.getNodo(this.contaux);
                code += this.unirNodo(auxiliar, this.contaux);
                this.contaux = this.valor.getContador();
            }else{
                code += this.createNodoGraph(this.contaux, "", this.valor);
                code += this.unirNodo(auxiliar, this.contaux);
            }
        }else if (this.listval != undefined){
            code += this.createNodoGraph(this.contaux, "<Valores>", this.listval.toString());
            code += this.unirNodo(this.cont, this.contaux);
        }

        return code;
    }
}