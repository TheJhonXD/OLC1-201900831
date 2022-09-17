/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Instrucciones;

import Errores.ListaError;
import AST.Nodo;
import Analizadores.Parser;
import Analizadores.Scanner;
import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringReader;

/**
 *
 * @author TheJhonX
 */
public class Instruction {
    public static ListaError list;
    public static Nodo ast;
    public static Instruction instr;

    private Instruction(){

    }

    public void analize(String text){
        try {
            list = new ListaError();
            ast = new Nodo("global");
            Scanner scanner = new Scanner(new BufferedReader(new StringReader(text)));
            Parser parser = new Parser(scanner);
            parser.parse();
            System.out.println("Fin analisis");
        } catch (Exception e) {
            System.out.println("Algo salió mal");
        }
    }
    
    public static Instruction getInstance(){
        if (instr == null){
            instr = new Instruction();
            list = new ListaError();
            ast = new Nodo("global");
        }
        return instr;
    }
    
    public static ListaError getListaError(){
        return list;
    }
    
    public void setListaError(ListaError list){
        Instruction.list = list;
    }

    public String getGraphNodo(Nodo nodo){
        StringBuilder graph = new StringBuilder();
        if (nodo != null){
            for (int i=0; i<nodo.getHijos().size(); i++){
                graph.append("\t").append("n" + nodo.getHijos().get(i).getIdNodo()).append("[label=\"" + nodo.getHijos().get(i).getNombre() + " = " + nodo.getHijos().get(i).getValor() + "\"];\n");
                graph.append(getGraphNodo(nodo.getHijos().get(i)));
                graph.append("\t").append("n" + nodo.getIdNodo()).append("->" + "n" + nodo.getHijos().get(i).getIdNodo()).append(";\n");
            }
            //System.out.println(nodo.getNombre());
        }
        return graph.toString();
    }

    public String getDot(Nodo nodo){
        StringBuilder graph = new StringBuilder();
        graph.append("digraph G{ \n \tnode[shape=\"box\" style=\"rounded\" fontname=\"Helvetica\"] \n");
        try{
            if (instr != null){
                graph.append("\t").append("n" + nodo.getIdNodo()).append("[label=\"Global\"];\n");
                graph.append(getGraphNodo(nodo));
            }
        } catch (Exception e){
            System.out.println("ERROR: " + e.getMessage());
        }
        graph.append("} \n");
        return graph.toString();
    }

    public void createASTGraph(Nodo nodo){
        try {
            String path = "C:\\Users\\TheJhonX\\Desktop\\AST\\";
            FileWriter f = new FileWriter(path + "ast.dot");
            f.write(getDot(nodo));
            f.close();
            String[] cmd = {"dot", "-Tsvg", path + "ast.dot", "-o", path + "grafo.svg"};
            Runtime rt = Runtime.getRuntime();
            rt.exec(cmd);
        } catch (IOException e) {
            System.out.println("Ocurrió un error");
            System.out.println(e.getMessage());
        }
    }

}
