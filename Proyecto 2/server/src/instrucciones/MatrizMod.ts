import { Expresion } from "../abstractas/Expresion";
import { Instruction } from "../abstractas/instruccion";

export class VectorMod extends Instruction{
    public cont:number;
    public contaux:number;
    constructor(public var_name:string, public pos:any, public pos2:any, line:number, column:number, public valor:any) {
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

        code += this.createNodoGraph(this.cont, "<Matriz>", "Acceder posicion");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Nombre>", this.var_name);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Pos>", "");
        code += this.unirNodo(this.cont, this.contaux);
        let auxiliar = this.contaux;
        this.contaux++;
        //Pos1
        if (typeof this.pos == "object"){
            code += this.pos.getNodo(this.contaux);
            code += this.unirNodo(auxiliar, this.contaux);
            this.contaux = this.pos.getContador();
        }else{
            code += this.createNodoGraph(this.contaux, "", this.pos);
            code += this.unirNodo(auxiliar, this.contaux);
        }
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Pos2>", "");
        code += this.unirNodo(this.cont, this.contaux);
        auxiliar = this.contaux;
        this.contaux++;
        //Pos2
        if (typeof this.pos2 == "object"){
            code += this.pos2.getNodo(this.contaux);
            code += this.unirNodo(auxiliar, this.contaux);
            this.contaux = this.pos2.getContador();
        }else{
            code += this.createNodoGraph(this.contaux, "", this.pos2);
            code += this.unirNodo(auxiliar, this.contaux);
        }
        this.contaux++;

        code += this.createNodoGraph(this.contaux, "<Valor>", "");
        code += this.unirNodo(this.cont, this.contaux);
        auxiliar = this.contaux;
        if (typeof this.valor == "object"){
            code += this.valor.getNodo(this.contaux);
            code += this.unirNodo(auxiliar, this.contaux);
            this.contaux = this.valor.getContador();
        }else{
            code += this.createNodoGraph(this.contaux, "", this.valor);
            code += this.unirNodo(auxiliar, this.contaux);
        }

        return code;
    }

}