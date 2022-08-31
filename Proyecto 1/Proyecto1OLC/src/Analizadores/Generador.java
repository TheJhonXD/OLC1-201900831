package Analizadores;

/**
 *
 * @author TheJhonX
 */
public class Generador {
    public static void main(String[] args){
        try{
            String ruta = "src/Analizadores/";
            String opcFlex[] = {ruta + "lex.jflex", "-d", ruta};
            jflex.Main.generate(opcFlex);
            
            String opcCup[] =  {"-destdir", ruta, "-parser", "Parser", "-symbols", "Simbolos", ruta + "parser.cup"};
            java_cup.Main.main(opcCup);
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}
