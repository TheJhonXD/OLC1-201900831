import { Instruction } from "../abstractas/instruccion";

export class MatrizInit extends Instruction{
    public cont:number;
    public contaux:number;
    constructor(public tipo:string, public var_name:string, public first_valor:any[], public second_valor:any[], line:number, column:number) {
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

        code += this.createNodoGraph(this.cont, "<Instruccion>", "Matriz");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Tipo>", this.tipo);
        code += this.unirNodo(this.cont, this.contaux);
        
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Nombre>", this.var_name);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;

        //Firts valor
        code += this.createNodoGraph(this.contaux, "<Valores 1>", this.first_valor.toString());
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Valores 2>", this.second_valor.toString());
        code += this.unirNodo(this.cont, this.contaux);
        return code;
    }
}