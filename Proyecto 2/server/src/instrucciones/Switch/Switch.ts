import { Expresion } from "../../abstractas/Expresion";
import { Instruction } from "../../abstractas/instruccion";
import { Case } from "./Case";
import { Default } from './Default';

export class Switch extends Instruction{
    public cont:number;
    public contaux:number;
    constructor(public valor:any, public casos:Case[], line:number, column:number, public defec?:Default) {
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

        code += this.createNodoGraph(this.cont, "<Instruccion>", "Switch");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Valor>", "");
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

        //Casos
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "Casos", "");
        code += this.unirNodo(this.cont, this.contaux);
        auxiliar = this.contaux;
        for (const c of this.casos) {
            try {
                code += c.getNodo(this.contaux + 1);
                code += this.unirNodo(auxiliar, this.contaux + 1);
                this.contaux = c.getContador();
                this.contaux++;
            } catch (error) {
                console.log(error);   
            }
        }
        this.contaux++;
        //Default
        if (this.defec != undefined){
            code += this.defec.getNodo(this.contaux);
            code += this.unirNodo(this.cont, this.contaux);
            this.contaux = this.defec.getContador();
        }

        return code;
    }
}