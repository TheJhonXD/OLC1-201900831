package AST;

import java.awt.Desktop;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import Errores.ListaError;

/**
 *
 * @author TheJhonX
 */
public class TablaError {
    private ListaError lista;

    public TablaError() {

    }

    public String createHtmlTable(ListaError list){
        StringBuilder html = new StringBuilder();

        html.append("<!DOCTYPE html>\n<html lang=\"es\">\n<head>");
        html.append("\n\t<meta charset=\"UTF-8\">\n\t<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t<link rel=\"stylesheet\" href=\"style.css\">\n\t<title>Tabla de errores</title>\n</head>\n");
        html.append("<body>\n\t<table>\n\t\t<div><p>Tabla de errores</p></div>\n");
        
        html.append("\t\t<thead>\n\t\t\t<tr>\n\t\t\t\t<th>No</th>\n\t\t\t\t<th>Tipo</th>\n\t\t\t\t<th>Descripcion</th>\n\t\t\t\t<th>Linea</th>\n\t\t\t\t<th>Columna</th>\n\t\t\t</tr>\n\t\t</thead>\n");
        
        for (int i=0; i<list.size(); i++){
            html.append("\t\t<tr>\n");
            html.append("\t\t\t<td>").append(i+1).append("</td>\n");
            html.append("\t\t\t<td>").append(list.get(i).getType()).append("</td>\n");
            html.append("\t\t\t<td>").append(list.get(i).getMessage()).append("</td>\n");
            html.append("\t\t\t<td>").append(list.get(i).getLine()).append("</td>\n");
            html.append("\t\t\t<td>").append(list.get(i).getColumn()).append("</td>\n");
            html.append("\t\t</tr>\n");
        }

        html.append("\n\t</table>\n</body>\n</html>");

        return html.toString();
    }

    public void createHtmlFile(ListaError list){
        try {
            String path = "C:\\Users\\TheJhonX\\Desktop\\AST\\";
            FileWriter f = new FileWriter(path + "Tabla.html");
            f.write(createHtmlTable(list));
            f.close();

            File file = new File(path + "Tabla.html");
            if (file.exists()){
                Desktop.getDesktop().open(file);
            }
        } catch (IOException e) {
            System.out.println("Ocurrió un error creando la tabla");
            System.out.println(e.getMessage());
        }
    }
    
    
}
