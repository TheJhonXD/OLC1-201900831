import { Instruction } from "../../abstractas/instruccion";

export class Round extends Instruction{
    public cont:number;
    public contaux:number;
    constructor(public valor:number, line:number, column:number) {
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

        code += this.createNodoGraph(this.cont, "<funcion>", "Round");
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Parametro>", this.valor.toString());
        code += this.unirNodo(this.cont, this.contaux);

        return code;
    }

}