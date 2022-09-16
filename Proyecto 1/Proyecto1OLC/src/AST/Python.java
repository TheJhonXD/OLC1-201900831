package AST;

/**
 *
 * @author TheJhonX
 */
public class Python {
    private Nodo ast;

    public Python(Nodo ast) {
        this.ast = ast;
    }

    public Nodo getAst() {
        return ast;
    }

    public void setAst(Nodo ast) {
        this.ast = ast;
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

    public void STATEMENT(){
        StringBuilder codePy = new StringBuilder();
        if (ast != null){
            
        }
    }
    
    
}
