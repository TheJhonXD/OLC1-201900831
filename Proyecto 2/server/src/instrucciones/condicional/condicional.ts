import { Instruction } from "../../abstractas/instruccion";
import { C_If } from "./If";
import { C_Elif } from './elif';
import { C_Else } from './else';

export class Condicional extends Instruction{
    public cont:number;
    public contaux:number;
    constructor(public cif:C_If, line:number, column:number, public celif?:C_Elif[], public celse?:C_Else) {
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

        code += this.createNodoGraph(this.cont, "<Instruccion>", "Condicional");
        this.contaux++;
        code += this.cif.getNodo(this.contaux);
        code += this.unirNodo(this.cont, this.contaux);
        let auxiliar = this.contaux - 1;
        this.contaux = this.cif.getContador();
        //Lista de elifs
        if (this.celif != undefined){
            try {
                for (const celifaux of this.celif){
                    code += celifaux.getNodo(this.contaux + 1);
                    code += "\tn" + auxiliar + "->" + "n" + (this.contaux + 1) + ";\n";
                    this.contaux = celifaux.getContador();
                    this.contaux++;
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (this.celse != undefined){
            code += this.celse.getNodo(this.contaux + 1);
            code += this.unirNodo(auxiliar, this.contaux + 1);
            this.contaux = this.celse.getContador();
        }

        return code;
    }

}