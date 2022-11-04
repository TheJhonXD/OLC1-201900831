import { Expresion } from '../abstractas/Expresion';
export class Casteo extends Expresion{
    public cont:number;
    public contaux:number;
    constructor(public tipo:string, public valor:any, line:number, column:number) {
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

        code += this.createNodoGraph(this.cont, "<Casteo>", this.tipo);
        this.contaux++;
        if (typeof this.valor == "object"){
            code += this.valor.getNodo();
            code += this.unirNodo(this.cont, this.contaux);
            this.contaux = this.valor.getContador();
        }else{
            code += this.createNodoGraph(this.contaux, "", this.valor);
            code += this.unirNodo(this.cont, this.contaux);
        }
        return code;
    }
}