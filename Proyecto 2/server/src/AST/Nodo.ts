export class Nodo{

    private hijos:any[];
    private valor:string;
    private idNodo:number;

    constructor(public nombre:string){
        this.hijos = [];
        this.valor = "";
        this.idNodo = 0;
    }

    public getNombre():string{
        return this.nombre;
    }

    public setNombre(nombre:string){
        this.nombre = nombre;
    }

    public getHijos():any[]{
        return this.hijos;
    }

    public setHijos(hijos:any[]){
        this.hijos = hijos;
    }

    public getValor():string{
        return this.valor;
    }

    public setValor(valor:string){
        this.valor = valor;
    }

    public getIdNodo():number{
        return this.idNodo;
    }

    public setIdNodo(id:number){
        this.idNodo = id;
    }

    public addHijo(hijo:Nodo){
        this.hijos.push(hijo);
    }
}