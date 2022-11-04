export abstract class Instruction{

    constructor(public line:number, public column:number){
        this.line = line;
        this.column = column;
    }

    public abstract ejecutar(env?:string):any;

}