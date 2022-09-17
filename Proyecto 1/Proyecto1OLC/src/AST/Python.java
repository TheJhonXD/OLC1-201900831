package AST;

import java.io.FileWriter;
import java.util.ArrayList;

/**
 *
 * @author TheJhonX
 */
public class Python {
    private Nodo ast;
    private String code;

    public Python() {
        
    }

    public Nodo getAst() {
        return ast;
    }

    public void setAst(Nodo ast) {
        this.ast = ast;
    }

    public String replaceLast(String find, String replace, String string) {
        int lastIndex = string.lastIndexOf(find);
        
        if (lastIndex == -1) {
            return string;
        }
        
        String beginString = string.substring(0, lastIndex);
        String endString = string.substring(lastIndex + find.length());
        
        return beginString + replace + endString;
    }

    public Nodo getNodeByName(Nodo nodo, String name){
        for (int i=0; i<nodo.getHijos().size(); i++){
            if (nodo.getHijos().get(i).getNombre() == name){
                return nodo.getHijos().get(i);
            }else{
                getNodeByName(nodo.getHijos().get(i), name);
            }
        }
        return null;
    }

    public String EXPRESSION(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "Expresion"){
                code.append(EXPRESSION(hijos.get(i)));
            }else{
                if (hijos.get(i).getNombre() == "tcadena"){
                    code.append("\"").append(hijos.get(i).getValor()).append("\"");
                }else if (hijos.get(i).getNombre() == "Operador"){
                    if (hijos.get(i).getValor().toLowerCase().equals("mod")){
                        code.append("%");
                    }else if (hijos.get(i).getValor().toLowerCase().equals("potencia")){
                        code.append("**");
                    }else{
                        code.append(hijos.get(i).getValor());
                    }
                }else if (hijos.get(i).getNombre() == "tvar_name"){
                    String aux = hijos.get(i).getValor();
                    aux = aux.replaceFirst("_", "");
                    aux = replaceLast("_", "", aux);
                    code.append(aux);
                }else{
                    code.append(hijos.get(i).getValor());
                }
            }
        }
        return code.toString();
    }

    public String OP_RELACIONAL(Nodo nodo){
        StringBuilder code = new StringBuilder();
        if (nodo.getValor().toLowerCase().equals("mayor")){
            code.append(">");
        }else if (nodo.getValor().toLowerCase().equals("menor")){
            code.append("<");
        }else if (nodo.getValor().toLowerCase().equals("mayor_o_igual")){
            code.append(">=");
        }else if (nodo.getValor().toLowerCase().equals("menor_o_igual")){
            code.append("<=");
        }else if (nodo.getValor().toLowerCase().equals("es_igual")){
            code.append("==");
        }else if (nodo.getValor().toLowerCase().equals("es_diferente")){
            code.append("!=");
        }
        return code.toString();
    }

    public String REL(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "Rel"){
                code.append(REL(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Expresion"){
                code.append(EXPRESSION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Op_Relacional"){
                code.append(OP_RELACIONAL(hijos.get(i)));
            }else{
                if (hijos.get(i).getNombre() == "tcadena"){
                    code.append("\"").append(hijos.get(i).getValor()).append("\"");
                }else if (hijos.get(i).getNombre() == "tvar_name"){
                    String aux = hijos.get(i).getValor();
                    aux = aux.replaceFirst("_", "");
                    aux = replaceLast("_", "", aux);
                    code.append(aux);
                }else{
                    code.append(hijos.get(i).getValor());
                }
            }
        }
        return code.toString();
    }

    public String LISTREL(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "Rel"){
                code.append(REL(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Lista_valores"){
                code.append(LISTREL(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Expresion"){
                code.append(EXPRESSION(hijos.get(i)));
            }else{
                if (hijos.get(i).getNombre() == "tcadena"){
                    code.append("\"").append(hijos.get(i).getValor()).append("\"");
                }else if (hijos.get(i).getNombre() == "tvar_name"){
                    String aux = hijos.get(i).getValor();
                    aux = aux.replaceFirst("_", "");
                    aux = replaceLast("_", "", aux);
                    code.append(aux);
                }else{
                    code.append(hijos.get(i).getValor());
                }
            }
        }
        return code.toString();
    }

    public String VAR(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "id"){
                String aux = hijos.get(i).getValor();
                aux = aux.replaceFirst("_", "");
                aux = replaceLast("_", "", aux);
                code.append(aux);
            }else if (hijos.get(i).getNombre() == "Var"){
                code.append(VAR(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tcoma"){
                code.append(hijos.get(i).getValor()).append(" ");
            }
        }
        return code.toString();
    }

    public String STATEMENT(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "Rel"){
                code.append(REL(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Lista_valores"){
                code.append(LISTREL(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Expresion"){
                code.append(EXPRESSION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Var"){
                code.append(VAR(hijos.get(i)));
                code.append(" = ");
            }else{
                if (hijos.get(i).getNombre() == "id"){
                    String aux = hijos.get(i).getValor();
                    aux = aux.replaceFirst("_", "");
                    aux = replaceLast("_", "", aux);
                    code.append(aux).append(" = ");
                }else if (hijos.get(i).getNombre() == "tvar_name"){
                    String aux = hijos.get(i).getValor();
                    aux = aux.replaceFirst("_", "");
                    aux = replaceLast("_", "", aux);
                    code.append(aux);
                }else if (hijos.get(i).getNombre() == "tnum"){
                    code.append(hijos.get(i).getValor());
                }else if (hijos.get(i).getNombre() == "tcadena"){
                    code.append("\"").append(hijos.get(i).getValor()).append("\"");
                }else if (hijos.get(i).getNombre() == "tboolean"){
                    code.append(hijos.get(i).getValor());
                }else if (hijos.get(i).getNombre() == "tcaracter"){
                    code.append(hijos.get(i).getValor());
                }else if (hijos.get(i).getNombre() == "tpcoma"){
                    code.append("\n");
                }
                // code.append(hijos.get(i).getValor());
            }
        }
        return code.toString();
    }

    public String ASSIGMENT(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "Var"){
                code.append(VAR(hijos.get(i)));
                code.append(" = ");
            }else if (hijos.get(i).getNombre() == "tarrow"){
                code.append(" = ");
            }else if (hijos.get(i).getNombre() == "Lista_valores"){
                code.append(LISTREL(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Rel"){
                code.append(REL(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Expresion"){
                code.append(EXPRESSION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tcadena"){
                code.append("\"").append(hijos.get(i).getValor()).append("\"");
            }else if (hijos.get(i).getNombre() == "id"){
                String aux = hijos.get(i).getValor();
                aux = aux.replaceFirst("_", "");
                aux = replaceLast("_", "", aux);
                code.append(aux);
            }else if (hijos.get(i).getNombre() == "tpcoma"){
                code.append("\n");
            }else if (hijos.get(i).getNombre() == "tvar_name"){
                String aux = hijos.get(i).getValor();
                aux = aux.replaceFirst("_", "");
                aux = replaceLast("_", "", aux);
                code.append(aux);
            }else{
                code.append(hijos.get(i).getValor());
            }
        }
        return code.toString();
    }

    public String CONDITION(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "Condicion"){
                code.append(CONDITION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tor"){
                code.append(" or ");
            }else if (hijos.get(i).getNombre() == "tand"){
                code.append(" and ");
            }else if (hijos.get(i).getNombre() == "tnot"){
                code.append(" not ");
            }else if (hijos.get(i).getNombre() == "tparA"){
                code.append("(");
            }else if (hijos.get(i).getNombre() == "tparC"){
                code.append(")");
            }else if (hijos.get(i).getNombre() == "Rel"){
                code.append(REL(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tvar_name"){
                String aux = hijos.get(i).getValor();
                aux = aux.replaceFirst("_", "");
                aux = replaceLast("_", "", aux);
                code.append(aux);
            }else if (hijos.get(i).getNombre() == "tnum"){
                code.append(hijos.get(i).getValor());
            }else if (hijos.get(i).getNombre() == "tcadena"){
                code.append("\"").append(hijos.get(i).getValor()).append("\"");
            }else if (hijos.get(i).getNombre() == "tboolean"){
                code.append(hijos.get(i).getValor());
            }else if (hijos.get(i).getNombre() == "tcaracter"){
                code.append(hijos.get(i).getValor());
            }
        }
        return code.toString();
    }

    public String CONDITIONALS(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "Condicionales"){
                code.append(CONDITIONALS(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "telseif"){
                code.append("elif ");
            }else if (hijos.get(i).getNombre() == "tthen"){
                code.append(":\n");
            }else if (hijos.get(i).getNombre() == "Condicion"){
                code.append(CONDITION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Instructions"){
                code.append("\t").append(INSTRUCTIONS(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Instruction"){
                code.append("\t").append(INSTRUCTION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "telse"){
                code.append("else:\n");
            }
        }
        return code.toString();
    }

    public String CONDITIONAL(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "tif"){
                code.append("if ");
            }else if (hijos.get(i).getNombre() == "Condicion"){
                code.append(CONDITION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tthen"){
                code.append(":\n");
            }else if (hijos.get(i).getNombre() == "Instructions"){
                code.append("\t").append(INSTRUCTIONS(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Instruction"){
                code.append("\t").append(INSTRUCTION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "telse"){
                code.append("else:\n");
            }else if (hijos.get(i).getNombre() == "Condicionales"){
                code.append(CONDITIONALS(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tendif"){
                code.append("\n");
            }
        }
        return code.toString();
    }

    public String SWITCH(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "tsegun"){
                code.append("if ");
            }else if (hijos.get(i).getNombre() == "Rel"){
                code.append(REL(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Expresion"){
                code.append(EXPRESSION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tvar_name"){

            }else if (hijos.get(i).getNombre() == "tnum"){

            }else if (hijos.get(i).getNombre() == "tcadena"){

            }else if (hijos.get(i).getNombre() == "tboolean"){

            }else if (hijos.get(i).getNombre() == "tcaracter"){
                //TODO: Comprobar si concatena parentesis
            }
        }
        return code.toString();
    }

    public String INSTRUCTION(Nodo nodo){
        StringBuilder code = new StringBuilder();
        if (nodo.getHijos().get(0).getNombre() == "Declaracion"){
            code.append(STATEMENT(nodo.getHijos().get(0)));
        }else if (nodo.getHijos().get(0).getNombre() == "Asignacion"){
            code.append(ASSIGMENT(nodo.getHijos().get(0)));
        }else if (nodo.getHijos().get(0).getNombre() == "Condicional"){
            code.append(CONDITIONAL(nodo.getHijos().get(0)));
        }else if (nodo.getHijos().get(0).getNombre() == "Switch"){
            code.append(SWITCH(nodo.getHijos().get(0)));
        }
        return code.toString();
    }

    public String INSTRUCTIONS(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "Instruction"){
                code.append(INSTRUCTION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Instructions"){
                code.append(INSTRUCTIONS(hijos.get(i)));
            }
        }
        return code.toString();
    }

    public String GLOBAL(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "Instructions"){
                code.append(INSTRUCTIONS(hijos.get(i)));
            }
        }
        return code.toString();
    }

    public void createPyFile(String texto){
        try {
            String path = "C:\\Users\\TheJhonX\\Desktop\\AST\\";
            FileWriter f = new FileWriter(path + "prueba.py");
            f.write(texto);
            f.close();
            
        } catch (Exception e) {
            System.out.println("Ocurrio un error creando archivo .py");
            System.out.println(e.getMessage());
        }
    }
    
    
}
