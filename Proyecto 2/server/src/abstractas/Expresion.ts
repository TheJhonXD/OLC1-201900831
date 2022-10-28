export abstract class Expresion{
    constructor(public line:number, public column:number) {
        this.line = line;
        this.column = column;
    }

    public abstract ejecutar():any;
}