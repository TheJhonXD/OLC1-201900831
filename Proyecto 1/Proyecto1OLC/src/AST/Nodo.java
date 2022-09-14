package AST;

import java.util.ArrayList;

/**
 *
 * @author TheJhonX
 */
public class Nodo {
    private String nombre;
    private ArrayList<Nodo> hijos;
    private String valor;
    private int idNodo; 

    public Nodo(String nombre) {
        this.nombre = nombre;
        hijos = new ArrayList<>();
        this.idNodo = 0;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public ArrayList<Nodo> getHijos() {
        return hijos;
    }

    public void setHijos(ArrayList<Nodo> hijos) {
        this.hijos = hijos;
    }

    public String getValor() {
        return valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public int getIdNodo() {
        return idNodo;
    }

    public void setIdNodo(int idNodo) {
        this.idNodo = idNodo;
    }
    
    public void addHijo(Nodo hijo){
        hijos.add(hijo);
    }
    
    
}
