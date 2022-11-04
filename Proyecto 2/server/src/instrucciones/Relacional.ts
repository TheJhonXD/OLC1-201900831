import { Expresion } from "../abstractas/Expresion";

export class Relacional extends Expresion{
    public cont:number;
    public contaux:number;
    constructor(public left:any, public right:any, public rel:string, line:number, column:number) {
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

        code += this.createNodoGraph(this.contaux, "", this.rel);
        this.contaux++;
        if (typeof this.left == "object"){
            code += this.left.getNodo(this.contaux);
            code += this.unirNodo(this.cont, this.contaux);
            this.contaux = this.left.getContador();
        }else{
            code += this.createNodoGraph(this.contaux, "", this.left);
            code += this.unirNodo(this.cont, this.contaux);
        }
        this.contaux++;
        if (typeof this.right == "object"){
            code += this.right.getNodo(this.contaux);
            code += this.unirNodo(this.cont, this.contaux);
            this.contaux = this.right.getContador();
        }else{
            code += this.createNodoGraph(this.contaux, "", this.right);
            code += this.unirNodo(this.cont, this.contaux);
        }

        return code;
    }
}