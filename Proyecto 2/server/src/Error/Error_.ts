export class Error_{
    public num:number
    constructor(public tipo:string, public mensaje:string, public line:number, public column:number){
        this.num = 1;
    }

    public incNum(){
        this.num++;
    }

}