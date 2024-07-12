package AST;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import Instrucciones.Instruction;

/**
 *
 * @author TheJhonX
 */
public class DiagramaFlujo {

    public static Nodo ast;
    public static Instruction instr;
    public static ArrayList<String> lista;

    public DiagramaFlujo() {
        lista = new ArrayList<>();
    }

    public String EntradaSalida(Nodo nodo){
        StringBuilder graph = new StringBuilder();
        if (nodo.getNombre() == "Declaracion"){
            graph.append("\t").append("n" + nodo.getIdNodo()).append("[label=\"" + nodo.getNombre() + "\" shape=\"parallelogram\"];\n");
            lista.add("n" + nodo.getIdNodo());
        }else if (nodo.getNombre() == "Asignacion"){
            graph.append("\t").append("n" + nodo.getIdNodo()).append("[label=\"" + nodo.getNombre() + "\" shape=\"box\"];\n");
            lista.add("n" + nodo.getIdNodo());
        }
        return graph.toString();
    }

    public String INSTRUCCION(Nodo nodo){
        StringBuilder graph =  new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "Declaracion" || hijos.get(i).getNombre() == "Asignacion"){
                graph.append(EntradaSalida(hijos.get(i)));
            }
        }

        return graph.toString();
    }

    public String INSTRUCTIONS(Nodo nodo){
        StringBuilder graph =  new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "Instruction"){
                graph.append(INSTRUCCION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Instructions"){
                graph.append(INSTRUCTIONS(hijos.get(i)));
            }
        }

        return graph.toString();
    }

    public String GLOBAL(Nodo nodo){
        StringBuilder graph = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        graph.append("digraph G{ \n \tnode[style=\"rounded\" fontname=\"Helvetica\"] \n");
        graph.append("\t").append("n" + nodo.getIdNodo()).append("[label=\"Inicio\" shape=\"ellipse\"];\n");
        lista.add("n" + nodo.getIdNodo());
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "Instructions"){
                graph.append(INSTRUCTIONS(hijos.get(i)));
            }
        }
        for (int i=0; i<lista.size(); i++){
            if (i+1 != lista.size()){
                graph.append("\t").append(lista.get(i)).append(" -> ").append(lista.get(i+1));
            }
        }
        graph.append("\t").append("fin").append("[label=\"Fin\" shape=\"ellipse\"];\n");
        graph.append("\t").append(lista.get(lista.size() - 1)).append(" -> ").append("fin");
        graph.append("} \n");
        return graph.toString();
    }

    public void createASTGraph(Nodo nodo){
        try {
            String currentDir = System.getProperty("user.dir");
            String path = currentDir + File.separator + "reports" + File.separator;
            File directory = new File(path);
            if (!directory.exists()){
                if (directory.mkdirs()){
                    System.out.println("Directorio creado");
                }else{
                    System.out.println("Error al crear directorio");
                    return;
                }
            }
            FileWriter f = new FileWriter(path + "diagrama.dot");
            f.write(GLOBAL(nodo));
            f.close();
            String[] cmd = {"dot", "-Tsvg", path + "diagrama.dot", "-o", path + "diagrama.svg"};
            Runtime rt = Runtime.getRuntime();
            rt.exec(cmd);
        } catch (IOException e) {
            System.out.println("Ocurrió un error");
            System.out.println(e.getMessage());
        }
    }
    
    
}
