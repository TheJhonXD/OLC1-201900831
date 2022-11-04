import { Error_ } from '../Error/Error_';
import { Simbolo } from '../TSimbolos/TablaSimbolos';

export class Singleton{
    public static instr:Singleton;
    public static listaError:Error_[];
    public static ast:any[];
    public static tablaSimbolos:Simbolo[];
    constructor(){
    }

    public analize(texto:string){
        try {
            
        } catch (error) {
            
        }
    }

    public static getInstance():Singleton{
        if (Singleton.instr == null){
            Singleton.instr = new Singleton();
            Singleton.listaError = [];
            Singleton.ast = [];
            Singleton.tablaSimbolos = [];
        }
        return Singleton.instr;
    }

    public limpiar(){
        Singleton.listaError = [];
        Singleton.ast = [];
        Singleton.tablaSimbolos = [];
    }

    public getAst(){
        return Singleton.ast;
    }

    public setAst(ast_:any[]){
        Singleton.ast = ast_;
    }

    public getlistaError(){
        return Singleton.listaError;
    }

    public gettablaSimbolos(){
        return Singleton.tablaSimbolos;
    }
}