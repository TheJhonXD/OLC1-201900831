import { Instruction } from "../abstractas/instruccion";
import { Llamar } from "./llamar";

export class Run extends Instruction{
    public cont:number;
    public contaux:number;
    constructor(public llamada:Llamar, line:number, column:number){
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

        code += this.createNodoGraph(this.cont, "<Instruccion>", "Run");
        this.contaux++;
        code += this.llamada.getNodo(this.contaux);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux = this.llamada.getContador();
        return code;
    }

}