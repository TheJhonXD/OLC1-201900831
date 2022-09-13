/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Errores;

import java.util.ArrayList;

/**
 *
 * @author TheJhonX
 */
public class ListaError extends ArrayList<Error_>{

    public ListaError() {
        super();
    }
    
    public void addError(Error_ error){
        this.add(error);
    }
}
