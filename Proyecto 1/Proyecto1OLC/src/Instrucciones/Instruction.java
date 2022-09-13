/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Instrucciones;

import Errores.ListaError;
import Analizadores.Parser;
import Analizadores.Scanner;
import java.io.BufferedReader;
import java.io.StringReader;

/**
 *
 * @author TheJhonX
 */
public class Instruction {
    public static ListaError list;
    public static Instruction instr;

    private Instruction(){

    }

    public void analize(String text){
        try {
            list = new ListaError();
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
        }
        return instr;
    }
    
    public static ListaError getListaError(){
        return list;
    }
    
    public void setListaError(ListaError list){
        Instruction.list = list;
    }

}
