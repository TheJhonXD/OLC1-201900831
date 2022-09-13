package Errores;

/**
 *
 * @author TheJhonX
 */
public class Error_ {
    private String message;
    private String type;
    private int line;
    private int column;

    public Error_(String message, String type, int line, int column) {
        this.message = message;
        this.type = type;
        this.line = line;
        this.column = column;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getLine() {
        return line;
    }

    public void setLine(int line) {
        this.line = line;
    }

    public int getColumn() {
        return column;
    }

    public void setColumn(int column) {
        this.column = column;
    }
    
    
}
