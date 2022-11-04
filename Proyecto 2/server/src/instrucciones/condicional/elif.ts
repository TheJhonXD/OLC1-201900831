import { Instruction } from "../../abstractas/instruccion";

export class C_Elif extends Instruction{
    public cont:number;
    public contaux:number;
    constructor(public condicion:any, public ins:any[], line:number, column:number) {
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

        code += this.createNodoGraph(this.cont, "", "ELIF");
        this.contaux++;
        //Nodo condicion
        code += this.createNodoGraph(this.contaux, "<Condicion>", "");
        code += this.unirNodo(this.cont, this.contaux);
        let auxiliar = this.contaux;
        this.contaux++;
        if (typeof this.condicion == "object"){
            code += this.condicion.getNodo(this.contaux);
            code += this.unirNodo(auxiliar, this.contaux);
            this.contaux = this.condicion.getContador();
        }else{
            code += this.createNodoGraph(this.contaux, "", this.condicion);
            code += this.unirNodo(auxiliar, this.contaux);
        }
        this.contaux++;
        //Nodo instrucciones
        code += this.createNodoGraph(this.contaux, "<Lista Instrucciones>", "");
        code += this.unirNodo(this.cont, this.contaux);
        auxiliar = this.contaux;
        for (const ins of this.ins) {
            try {
                if (typeof ins == "object"){
                    code += ins.getNodo(this.contaux + 1);
                    code += this.unirNodo(auxiliar, this.contaux + 1);
                    this.contaux = ins.getContador();
                }
                this.contaux++;
            } catch (error) {
                console.log(error);
                
            }
        }
        return code;
    }

}