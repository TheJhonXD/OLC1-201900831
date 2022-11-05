import { Error_ } from '../Error/Error_';
import { Simbolo } from '../TSimbolos/TablaSimbolos';

export class Singleton{
    public static instr:Singleton;
    public static listaError:Error_[];
    public static ast:any[];
    public static astGraph:string;
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

    public getAstGraph(){
        return Singleton.astGraph;
    }

    public setAstGraph(ast:string){
        Singleton.astGraph = ast;
    }

    public getlistaError(){
        return Singleton.listaError;
    }

    public gettablaSimbolos(){
        return Singleton.tablaSimbolos;
    }

    public settablaSimbolos(lista:Simbolo[]){
        Singleton.tablaSimbolos = lista;
    }

    public TablaErrores(){
        let tabla = [];
        let tr = [];
        let cont = 1;
        for (const i of Singleton.listaError){
            tr.push(cont);
            tr.push(i.tipo);
            tr.push(i.mensaje);
            tr.push(i.line);
            tr.push(i.column);
            tabla.push(tr);
            tr = [];
            cont++;
        }
        return tabla;
    }

    public SymbolTable(){
        let tabla = [];
        let tr = [];
        for (const i of Singleton.tablaSimbolos){
            tr.push(i.id);
            tr.push(i.tipo);
            tr.push(i.tipoVar);
            tr.push(i.entorno);
            tr.push(i.line);
            tr.push(i.column);
            tabla.push(tr);
            tr = [];
        }
        return tabla;
    }
}