import { Instruction } from "../abstractas/instruccion";
import { Statement } from "./Statement";
import { Assigment } from './Assignment';
import { Condicion } from './Condicion';
import { IncDec } from './Incdec';

export class CicloFor extends Instruction{
    public cont:number;
    public contaux:number;
    constructor(public declaracion:Statement|Assigment, public condition:any, public inc:IncDec|Assigment, public ins:any[], line:number, column:number) {
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

        code += this.createNodoGraph(this.cont, "<Instruccion>", "For");
        //Variable
        this.contaux++;
        code += this.declaracion.getNodo(this.contaux);
        code += this.unirNodo(this.cont, this.contaux);
        this.contaux = this.declaracion.getContador();

        //condicion
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Condicion>", "");
        code += this.unirNodo(this.cont, this.contaux);
        let auxiliar = this.contaux;
        this.contaux++;
        if (typeof this.condition == "object"){
            code += this.condition.getNodo(this.contaux);
            code += this.unirNodo(auxiliar, this.contaux);
            this.contaux = this.condition.getContador();
        }else{
            code += this.createNodoGraph(this.contaux, "", this.condition);
            code += this.unirNodo(auxiliar, this.contaux);
        }

        //incremento decremento
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Salto>", "");
        code += this.unirNodo(this.cont, this.contaux);
        auxiliar = this.contaux;
        this.contaux++;
        code += this.inc.getNodo(this.contaux);
        code += this.unirNodo(auxiliar, this.contaux);
        this.contaux = this.inc.getContador();

        //Instrucciones
        this.contaux++;
        code += this.createNodoGraph(this.contaux, "<Lista instrucciones>", "");
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