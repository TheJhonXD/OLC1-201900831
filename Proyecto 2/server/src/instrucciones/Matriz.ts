import { Instruction } from "../abstractas/instruccion";

export class Matriz extends Instruction{
    public cont:number;
    public contaux:number;
    constructor(public tipo:string, public var_name:string, line:number, column:number, public first_valor:any, public second_valor:any) {
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
        code += this.createNodoGraph(this.contaux, "<Tamaño 1>", "");
        code += this.unirNodo(this.cont, this.contaux);
        let auxiliar = this.contaux;
        this.contaux++;
        if (typeof this.first_valor == "object"){
            code += this.first_valor.getNodo(this.contaux);
            code += this.unirNodo(auxiliar, this.contaux);
            this.contaux = this.first_valor.getContador();
        }else{
            code += this.createNodoGraph(this.contaux, "", this.first_valor);
            code += this.unirNodo(auxiliar, this.contaux);
        }
        //Second valor
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Tamaño 2>", "");
        code += this.unirNodo(this.cont, this.contaux);
        auxiliar = this.contaux;
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