import { Instruction } from "../abstractas/instruccion";

export class IncDec extends Instruction{
    public cont:number;
    public contaux:number;
    constructor(public var_name:string, public operador:string, line:number, column:number) {
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

        if (this.operador == "++"){
            code += this.createNodoGraph(this.cont, "Instruccion", "Incremento");
        }else{
            code += this.createNodoGraph(this.cont, "Instruccion", "Decremento");
        }
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "", this.var_name);
        code += this.unirNodo(this.cont, this.contaux);

        return code;
    }

}