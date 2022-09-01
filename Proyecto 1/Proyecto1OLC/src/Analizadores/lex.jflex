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
sgl_cmt = (\#.+)
ml_cmt = (\/\*[^*]*\*+([^\/\*][^\*]*\*+)*\/)


%%

<YYINITIAL>{

    ";"                 { return new Symbol(Simbolos.tpcoma, yycolumn, yyline, yytext());       }

    "inicio"            { return new Symbol(Simbolos.tinicio, yycolumn, yyline, yytext());      }
    "fin"               { return new Symbol(Simbolos.tfin, yycolumn, yyline, yytext());         }

    "-"                 { return new Symbol(Simbolos.trest, yycolumn, yyline, yytext());        }
    "+"                 { return new Symbol(Simbolos.tsum, yycolumn, yyline, yytext());         }
    "/"                 { return new Symbol(Simbolos.tdiv, yycolumn, yyline, yytext());         }
    "*"                 { return new Symbol(Simbolos.tmul, yycolumn, yyline, yytext());         }
    "potencia"          { return new Symbol(Simbolos.tpot, yycolumn, yyline, yytext());         }
    "mod"               { return new Symbol(Simbolos.tmod, yycolumn, yyline, yytext());         }
    "("                 { return new Symbol(Simbolos.tparA, yycolumn, yyline, yytext());        }
    ")"                 { return new Symbol(Simbolos.tparC, yycolumn, yyline, yytext());        }

    "mayor"             { return new Symbol(Simbolos.tmayor, yycolumn, yyline, yytext());       }
    "menor"             { return new Symbol(Simbolos.tmenor, yycolumn, yyline, yytext());       }
    "mayor_o_igual"     { return new Symbol(Simbolos.tmayor_igual, yycolumn, yyline, yytext()); }
    "menor_o_igual"     { return new Symbol(Simbolos.tmenor_igual, yycolumn, yyline, yytext()); }
    "es_igual"          { return new Symbol(Simbolos.tes_igual, yycolumn, yyline, yytext());    }
    "es_diferente"      { return new Symbol(Simbolos.tdifer, yycolumn, yyline, yytext());       }

    "or"                { return new Symbol(Simbolos.tor, yycolumn, yyline, yytext());          }
    "and"               { return new Symbol(Simbolos.tand, yycolumn, yyline, yytext());         }
    "not"               { return new Symbol(Simbolos.tnot, yycolumn, yyline, yytext());         }

    "ingresar"          { return new Symbol(Simbolos.tingresar, yycolumn, yyline, yytext());    }
    "como"              { return new Symbol(Simbolos.tcomo, yycolumn, yyline, yytext());        }
    "con_valor"         { return new Symbol(Simbolos.tcon_val, yycolumn, yyline, yytext());     }
    "="                 { return new Symbol(Simbolos.tigual, yycolumn, yyline, yytext());       }
    "_"                 { return new Symbol(Simbolos.tundersc, yycolumn, yyline, yytext());     }
    "->"                { return new Symbol(Simbolos.tarrow, yycolumn, yyline, yytext());       }

    "si"                { return new Symbol(Simbolos.tif, yycolumn, yyline, yytext());          }
    "entonces"          { return new Symbol(Simbolos.tthen, yycolumn, yyline, yytext());        }
    "fin_si"            { return new Symbol(Simbolos.tendif, yycolumn, yyline, yytext());       }
    "de_lo_contrario"   { return new Symbol(Simbolos.telse, yycolumn, yyline, yytext());        }
    "o_si"              { return new Symbol(Simbolos.telseif, yycolumn, yyline, yytext());      }

    {num}               { return new Symbol(Simbolos.tnum, yycolumn, yyline, yytext());         }
    {cadena}            { return new Symbol(Simbolos.tcadena, yycolumn, yyline, yytext());      }
    {booleano}          { return new Symbol(Simbolos.tbool, yycolumn, yyline, yytext());        }
    {caracter}          { return new Symbol(Simbolos.tchar, yycolumn, yyline, yytext());        }
    {sgl_cmt}           { return new Symbol(Simbolos.tsgl_cmt, yycolumn, yyline, yytext());     }
    {ml_cmt}            { return new Symbol(Simbolos.tml_cmt, yycolumn, yyline, yytext());      }

}

[ \t\r\n\f]       { /* Espacios en blanco, se ignoran */	}

.   {
        System.out.println("Error Lexico: " + yytext() + " Linea " + (yyline + 1) + " Columna " + (yycolumn + 1));
    }