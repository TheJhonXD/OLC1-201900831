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
                    code.append(hijos.get(i).getNombre().toUpperCase().charAt(0)).append(hijos.get(i).getNombre().substring(1, hijos.get(i).getNombre().length()).toLowerCase());
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
                code.append(hijos.get(i).getNombre().toUpperCase().charAt(0)).append(hijos.get(i).getNombre().substring(1, hijos.get(i).getNombre().length()).toLowerCase());
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

    public String DEFAULT(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "telse"){
                code.append("else");
            }else if (hijos.get(i).getNombre() == "tthen"){
                code.append(":\n");
            }else if (hijos.get(i).getNombre() == "Instructions"){
                code.append("\t").append(INSTRUCTIONS(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Instruction"){
                code.append("\t").append(INSTRUCTION(hijos.get(i)));
            }
        }
        return code.toString();
    }

    public String C(Nodo nodo, String aux){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "Caso"){
                code.append(C(hijos.get(i), aux));
            }else if (hijos.get(i).getNombre() == "tnum"){
                code.append("elif ").append(aux).append(" == ").append(hijos.get(i).getValor());
            }else if (hijos.get(i).getNombre() == "tcaracter"){
                code.append("elif ").append(aux).append(" == ").append(hijos.get(i).getValor());
            }else if (hijos.get(i).getNombre() == "tcadena"){
                code.append("elif ").append(aux).append(" == ").append("\"").append(hijos.get(i).getValor()).append("\"");
            }else if (hijos.get(i).getNombre() == "tthen"){
                code.append(":\n");
            }else if (hijos.get(i).getNombre() == "Instructions"){
                code.append("\t").append(INSTRUCTIONS(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Instruction"){
                code.append("\t").append(INSTRUCTION(hijos.get(i)));
            }
        }
        return code.toString();
    }

    public String CASE(Nodo nodo, String aux){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "Casos"){
                code.append(CASE(hijos.get(i), aux));
            }else if (hijos.get(i).getNombre() == "Caso"){
                code.append(C(hijos.get(i), aux));
            }
        }
        return code.toString();
    }

    public String SWITCH(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        StringBuilder aux = new StringBuilder();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "tsegun"){
                // code.append("if ");
            }else if (hijos.get(i).getNombre() == "Switch"){
                aux.append(SWITCH(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Expresion"){
                aux.append(EXPRESSION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tvar_name"){
                String aux2 = hijos.get(i).getValor();
                aux2 = aux2.replaceFirst("_", "");
                aux2 = replaceLast("_", "", aux2);
                aux.append(aux2);
            }else if (hijos.get(i).getNombre() == "tnum"){
                aux.append(hijos.get(i).getValor());
            }else if (hijos.get(i).getNombre() == "tcadena"){
                aux.append("\"").append(hijos.get(i).getValor()).append("\"");
            }else if (hijos.get(i).getNombre() == "tboolean"){
                code.append(hijos.get(i).getNombre().toUpperCase().charAt(0)).append(hijos.get(i).getNombre().substring(1, hijos.get(i).getNombre().length()).toLowerCase());
            }else if (hijos.get(i).getNombre() == "tcaracter"){
                aux.append(hijos.get(i).getValor());
                //TODO: Comprobar si concatena parentesis
            }else if (hijos.get(i).getNombre() == "tdo"){
                // code.append(aux.toString()).append(":\n");
            }else if (hijos.get(i).getNombre() == "Casos"){
                code.append(CASE(hijos.get(i), aux.toString()));
            }else if (hijos.get(i).getNombre() == "Default"){
                code.append(DEFAULT(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tfin_segun"){
                code.append("\n");
            }
        }
        return code.toString().substring(2, code.toString().length());
    }

    public String INCREASE(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "Expresion"){
                code.append(EXPRESSION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tvar_name"){
                String aux2 = hijos.get(i).getValor();
                aux2 = aux2.replaceFirst("_", "");
                aux2 = replaceLast("_", "", aux2);
                code.append(aux2);
            }else if (hijos.get(i).getNombre() == "tnum"){
                code.append(hijos.get(i).getValor());
            }
        }
        return code.toString();
    }

    public String INSTRUCCIONES(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "Instructions"){
                code.append(INSTRUCTIONS(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Instruction"){
                code.append(INSTRUCTION(hijos.get(i)));
            }
        }
        return code.toString();
    }

    public String FOR(Nodo nodo){
        StringBuilder code = new StringBuilder();
        boolean flag = false;
        boolean flag2 = false;
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "For"){
                code.append(FOR(hijos.get(i)));
            }else if (hijos.get(i). getNombre() == "tfor"){
                code.append("for ");
            }else if (hijos.get(i).getNombre() == "tvar_name"){
                String aux2 = hijos.get(i).getValor();
                aux2 = aux2.replaceFirst("_", "");
                aux2 = replaceLast("_", "", aux2);
                code.append(aux2);
            }else if (hijos.get(i).getNombre() == "tarrow"){
                code.append(" in ");
            }else if (hijos.get(i).getNombre() == "Expresion"){
                flag2 = true;
                if (!flag){
                    code.append("range(").append(EXPRESSION(hijos.get(i))).append(", ");
                }else{
                    code.append(EXPRESSION(hijos.get(i)));
                }
            }else if (hijos.get(i).getNombre() == "tnum"){
                code.append(hijos.get(i).getValor());
            }else if (hijos.get(i).getNombre() == "tdo"){
                if (flag){
                    code.append("):\n");
                }else{
                    code.append(":\n");
                }
            }else if (hijos.get(i).getNombre() == "Incremento"){
                code.append(", ").append(INCREASE(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Instrucciones"){
                code.append("\t").append(INSTRUCCIONES(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tfin_for"){
                code.append("\n");
            }
        }
        return code.toString();
    }

    public String WHILE(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "twhile"){
                code.append("while ");
            }else if (hijos.get(i).getNombre() == "While"){
                code.append(WHILE(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Condicion"){
                code.append(CONDITION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tdo"){
                code.append(":\n");
            }else if (hijos.get(i).getNombre() == "Instrucciones"){
                code.append("\t").append(INSTRUCCIONES(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tend_while"){
                code.append("\n");
            }
        }
        return code.toString();
    }

    public String REPETIR(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        code.append("valor = true\n");
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "trepeat"){
                code.append("while valor == true:");
            }else if (hijos.get(i).getNombre() == "Repetir"){
                code.append(REPETIR(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Instrucciones"){
                code.append("\t").append(INSTRUCCIONES(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Condicion"){
                code.append("if ").append(CONDITION(hijos.get(i))).append(":\n").append("\t").append("valor = false\n");
            }
        }
        code.append("\t").append("if valor == false:\n").append("\t").append("break");
        code.append("\n");
        return code.toString();
    }

    public String RETURN(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "treturn"){
                code.append("return ");
            }else if (hijos.get(i).getNombre() == "Condicion"){
                code.append(CONDITION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tpcoma"){
                code.append("\n");
            }
        }
        return code.toString();
    }

    public String PARAMETRO(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "tvar_name"){
                String aux2 = hijos.get(i).getValor();
                aux2 = aux2.replaceFirst("_", "");
                aux2 = replaceLast("_", "", aux2);
                code.append(aux2);
            }
        }
        return code.toString();
    }

    public String LISTAPARAMETROS(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "ListaParametros"){
                code.append(LISTAPARAMETROS(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Parametro"){
                code.append(PARAMETRO(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tcoma"){
                code.append(", ");
            }
        }
        return code.toString();
    }

    public String PARAMS(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "ListaParametros"){
                code.append(LISTAPARAMETROS(hijos.get(i)));
            }
        }
        return code.toString();
    }

    public String METODO(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "tmetodo"){
                code.append("def ");
            }else if (hijos.get(i).getNombre() == "tvar_name"){
                String aux2 = hijos.get(i).getValor();
                aux2 = aux2.replaceFirst("_", "");
                aux2 = replaceLast("_", "", aux2);
                code.append(aux2).append(" (");
            }else if (hijos.get(i).getNombre() == "Parametros"){
                code.append(PARAMS(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Instructions"){
                code.append("):\n").append("\t").append(INSTRUCTIONS(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Instruction"){
                code.append("):\n").append("\t").append(INSTRUCTION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tfin_metodo"){
                code.append("\n");
            }
        }
        return code.toString();
    }

    public String FUNCION(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "tfuncion"){
                code.append("def ");
            }else if (hijos.get(i).getNombre() == "tvar_name"){
                String aux2 = hijos.get(i).getValor();
                aux2 = aux2.replaceFirst("_", "");
                aux2 = replaceLast("_", "", aux2);
                code.append(aux2).append(" (");
            }else if (hijos.get(i).getNombre() == "Parametros"){
                code.append(PARAMS(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Instructions"){
                code.append("):\n").append("\t").append(INSTRUCTIONS(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Instruction"){
                code.append("):\n").append("\t").append(INSTRUCTION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Return"){
                code.append(RETURN(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tfin_funcion"){
                code.append("\n");
            }
        }
        return code.toString();
    }

    public String PARAMETROS(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "ParamExec"){
                code.append(PARAMETROS(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Expresion"){
                code.append(EXPRESSION(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tvar_name"){
                String aux2 = hijos.get(i).getValor();
                aux2 = aux2.replaceFirst("_", "");
                aux2 = replaceLast("_", "", aux2);
                code.append(aux2);
            }else if (hijos.get(i).getNombre() == "tnum"){
                code.append(hijos.get(i).getValor());
            }else if (hijos.get(i).getNombre() == "tcadena"){
                code.append("\"").append(hijos.get(i).getValor()).append("\"");
            }else if (hijos.get(i).getNombre() == "tboolean"){
                code.append(hijos.get(i).getNombre().toUpperCase().charAt(0)).append(hijos.get(i).getNombre().substring(1, hijos.get(i).getNombre().length()).toLowerCase());
            }else if (hijos.get(i).getNombre() == "tcaracter"){
                code.append(hijos.get(i).getValor());
            }else if (hijos.get(i).getNombre() == "tcoma"){
                code.append(", ");
            }
        }
        return code.toString();
    }

    public String EXEC(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "tvar_name"){
                String aux2 = hijos.get(i).getValor();
                aux2 = aux2.replaceFirst("_", "");
                aux2 = replaceLast("_", "", aux2);
                code.append(aux2);
            }else if (hijos.get(i).getNombre() == "tparA"){
                code.append("(");
            }else if (hijos.get(i).getNombre() == "tparC"){
                code.append(")");
            }else if (hijos.get(i).getNombre() == "tpcoma"){
                code.append("\n");
            }else if (hijos.get(i).getNombre() == "ParamExec"){
                code.append(PARAMETROS(hijos.get(i)));
            }
        }
        return code.toString();
    }

    public String PRINT(Nodo nodo){
        StringBuilder code = new StringBuilder();
        ArrayList<Nodo> hijos = nodo.getHijos();
        for (int i=0; i<hijos.size(); i++){
            if (hijos.get(i).getNombre() == "tprint" || hijos.get(i).getNombre() == "tprintln"){
                code.append("print(");
            }else if (hijos.get(i).getNombre() == "Rel"){
                code.append(REL(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "Exec"){
                code.append(EXEC(hijos.get(i)));
            }else if (hijos.get(i).getNombre() == "tvar_name"){
                String aux2 = hijos.get(i).getValor();
                aux2 = aux2.replaceFirst("_", "");
                aux2 = replaceLast("_", "", aux2);
                code.append(aux2);
            }else if (hijos.get(i).getNombre() == "tnum"){
                code.append(hijos.get(i).getValor());
            }else if (hijos.get(i).getNombre() == "tcadena"){
                code.append("\"").append(hijos.get(i).getValor()).append("\"");
            }else if (hijos.get(i).getNombre() == "tboolean"){
                code.append(hijos.get(i).getNombre().toUpperCase().charAt(0)).append(hijos.get(i).getNombre().substring(1, hijos.get(i).getNombre().length()).toLowerCase());
            }else if (hijos.get(i).getNombre() == "tcaracter"){
                code.append(hijos.get(i).getValor());
            }else if (hijos.get(i).getNombre() == "tpcoma"){
                code.append(")\n");
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
        }else if (nodo.getHijos().get(0).getNombre() == "For"){
            code.append(FOR(nodo.getHijos().get(0)));
        }else if (nodo.getHijos().get(0).getNombre() == "While"){
            code.append(WHILE(nodo.getHijos().get(0)));
        }else if (nodo.getHijos().get(0).getNombre() == "Repetir"){
            code.append(REPETIR(nodo.getHijos().get(0)));
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
