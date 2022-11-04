import { Instruction } from "../abstractas/instruccion";
import { Condicion } from "./Condicion";
import { Llamar } from "./llamar";
import { Expresion } from '../abstractas/Expresion';

export class OpTernario extends Instruction{
    public cont:number;
    public contaux:number;
    constructor(public condition:any, public first_valor:any, public second_valor:any, line:number, column:number){
        super(line, column);
        this.cont = 0;
        this.contaux = 0;
    }

    public ejecutar() {
        
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

        code += this.createNodoGraph(this.cont, "<>", "Operador Ternario");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Condicion>", "");
        code += this.unirNodo(this.cont, this.contaux);
        let auxiliar = this.contaux;
        this.contaux++;
        //Condicion
        if (typeof this.condition == "object"){
            code += this.condition.getNodo(this.contaux);
            code += this.unirNodo(auxiliar, this.contaux);
            this.contaux = this.condition.getContador();
        }else{
            code += this.createNodoGraph(this.contaux, "", this.condition);
            code += this.unirNodo(auxiliar, this.contaux);
        }

        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<True>", "");
        code += this.unirNodo(this.cont, this.contaux);
        auxiliar = this.contaux;
        //Primer valor
        this.contaux++;
        if (typeof this.first_valor == "object"){
            code += this.first_valor.getNodo(this.contaux);
            code += this.unirNodo(auxiliar, this.contaux);
            this.contaux = this.first_valor.getContador();
        }else{
            code += this.createNodoGraph(this.contaux, "", this.first_valor);
            code += this.unirNodo(auxiliar, this.contaux);
        }

        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<False>", "");
        code += this.unirNodo(this.cont, this.contaux);
        auxiliar = this.contaux;
        //Segundo valor
        this.contaux++;
        if (typeof this.second_valor == "object"){
            code += this.second_valor.getNodo(this.contaux);
            code += this.unirNodo(auxiliar, this.contaux);
            this.contaux = this.second_valor.getContador();
        }else{
            code += this.createNodoGraph(this.contaux, "", this.second_valor);
            code += this.unirNodo(auxiliar, this.contaux);
        }

        return code;
    }

}