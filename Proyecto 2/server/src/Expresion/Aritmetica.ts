import { Expresion } from '../abstractas/Expresion';
export class Aritmetica extends Expresion{
    constructor(private left:Expresion, private right:Expresion, private tipo:string, line:number, column:number) {
        super(line, column);
    }

    public ejecutar() {
        console.log("left: " + this.left + this.tipo + " right: " + this.right);
    }
}