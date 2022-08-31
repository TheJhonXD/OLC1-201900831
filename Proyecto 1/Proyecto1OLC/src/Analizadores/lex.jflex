package Analizadores;
import java_cup.runtime.*;

%%

%public 
%class Scanner
%cupsym Simbolos
%cup
%char
%column
%full
%ignorecase
%line
%unicode


num = ([0-9]+)
cadena = (\"[a-zA-Z]+\")
booleano = (Falso|Verdadero)
caracter = ('([a-zA-Z])'|'\$\{(6[5-9]|[7-8][0-9]|(90)|9[7-9]|1[0-1][0-9]|12[0-2])\}')


%%

<YYINITIAL>{

    "inicio"      { return new Symbol(Simbolos.tinicio, yycolumn, yyline, yytext());  }
    "fin"       { return new Symbol(Simbolos.tfin, yycolumn, yyline, yytext());     }

    "-"           { return new Symbol(Simbolos.trest, yycolumn, yyline, yytext());    }
    "+"           { return new Symbol(Simbolos.tsum, yycolumn, yyline, yytext());     }
    "/"           { return new Symbol(Simbolos.tdiv, yycolumn, yyline, yytext());     }
    "*"           { return new Symbol(Simbolos.tmul, yycolumn, yyline, yytext());     }
    "^"           { return new Symbol(Simbolos.tpot, yycolumn, yyline, yytext());     }
    "%"           { return new Symbol(Simbolos.tmod, yycolumn, yyline, yytext());     }

    {num}         { return new Symbol(Simbolos.tnum, yycolumn, yyline, yytext());     }
    {cadena}      { return new Symbol(Simbolos.tcadena, yycolumn, yyline, yytext());  }
    {booleano}    { return new Symbol(Simbolos.tbool, yycolumn, yyline, yytext());    }
    {caracter}    { return new Symbol(Simbolos.tchar, yycolumn, yyline, yytext());    }

}

[ \t\r\n\f]       { /* Espacios en blanco, se ignoran */	}

.   {
        System.out.println("Error Lexico: " + yytext() + " Linea " + (yyline + 1) + " Columna " + (yycolumn + 1));
    }