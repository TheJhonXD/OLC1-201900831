import { Expresion } from '../abstractas/Expresion';
export class Aritmetica extends Expresion{
    public cont:number;
    constructor(private left:Expresion, private right:Expresion, private tipo:string, line:number, column:number) {
        super(line, column);
        this.cont = 0;
    }

    public ejecutar() {
        console.log("left: " + this.left + this.tipo + " right: " + this.right);
    }

    private createNodoGraph(cont:number, nodoName:string, contendio:string):string{
        return "\tn" + cont + "[label=\"" + nodoName +" " + contendio + "\"];\n";
    }

    private unirNodo(first:number, second:number){
        "\tn" + first + "->" + "n" + second + ";\n";
    }

    public getNodo(cont:number):string{
        this.cont = cont;
        let code:string = "";
        
        return code;
    }
}