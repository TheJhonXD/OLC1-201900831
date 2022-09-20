package Analizadores;
import java_cup.runtime.*;
import Errores.*;
import Instrucciones.*;

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


num = ([0-9]+([.][0-9]+)?)
cadena = (\"(.*|[^\"]+)\")
booleano = (Falso|Verdadero)
caracter = ('([a-zA-Z])'|'\$\{(6[5-9]|[7-8][0-9]|(90)|9[7-9]|1[0-1][0-9]|12[0-2])\}')
sgl_cmt = (\/\/.+)
ml_cmt = (\/\*[^*]*\*+([^\/\*][^\*]*\*+)*\/)
var_name = (\_([a-zA-Z])([a-zA-Z]|[0-9]|\_)*\_)
letras = ([a-zA-Z])

%%

<YYINITIAL>{

    ";"                 { return new Symbol(Simbolos.tpcoma, yycolumn, yyline, yytext());       }

    "inicio"            { return new Symbol(Simbolos.tinicio, yycolumn, yyline, yytext());      }
    "fin"               { return new Symbol(Simbolos.tfin, yycolumn, yyline, yytext());         }

    "numero"            { return new Symbol(Simbolos.tint, yycolumn, yyline, yytext());         }
    "cadena"            { return new Symbol(Simbolos.tstring, yycolumn, yyline, yytext());      }
    "Boolean"           { return new Symbol(Simbolos.tbool, yycolumn, yyline, yytext());        }
    "Caracter"          { return new Symbol(Simbolos.tchar, yycolumn, yyline, yytext());        }

    "-"                 { return new Symbol(Simbolos.trest, yycolumn, yyline, yytext());        }
    "+"                 { return new Symbol(Simbolos.tsum, yycolumn, yyline, yytext());         }
    "/"                 { return new Symbol(Simbolos.tdiv, yycolumn, yyline, yytext());         }
    "*"                 { return new Symbol(Simbolos.tmul, yycolumn, yyline, yytext());         }
    "potencia"          { return new Symbol(Simbolos.tpot, yycolumn, yyline, yytext());         }
    "mod"               { return new Symbol(Simbolos.tmod, yycolumn, yyline, yytext());         }
    "("                 { return new Symbol(Simbolos.tparA, yycolumn, yyline, yytext());        }
    ")"                 { return new Symbol(Simbolos.tparC, yycolumn, yyline, yytext());        }
    "["                 { return new Symbol(Simbolos.tcorA, yycolumn, yyline, yytext());        }
    "]"                 { return new Symbol(Simbolos.tcorC, yycolumn, yyline, yytext());        }

    "mayor"             { return new Symbol(Simbolos.tmayor, yycolumn, yyline, yytext());       }
    "menor"             { return new Symbol(Simbolos.tmenor, yycolumn, yyline, yytext());       }
    "mayor_o_igual"     { return new Symbol(Simbolos.tmayor_igual, yycolumn, yyline, yytext()); }
    "menor_o_igual"     { return new Symbol(Simbolos.tmenor_igual, yycolumn, yyline, yytext()); }
    "es_igual"          { return new Symbol(Simbolos.tes_igual, yycolumn, yyline, yytext());    }
    "es_diferente"      { return new Symbol(Simbolos.tdifer, yycolumn, yyline, yytext());       }
    "_"                 { return new Symbol(Simbolos.tunder, yycolumn, yyline, yytext());       }

    "or"                { return new Symbol(Simbolos.tor, yycolumn, yyline, yytext());          }
    "and"               { return new Symbol(Simbolos.tand, yycolumn, yyline, yytext());         }
    "not"               { return new Symbol(Simbolos.tnot, yycolumn, yyline, yytext());         }

    "ingresar"          { return new Symbol(Simbolos.tingresar, yycolumn, yyline, yytext());    }
    "como"              { return new Symbol(Simbolos.tcomo, yycolumn, yyline, yytext());        }
    "con_valor"         { return new Symbol(Simbolos.tcon_val, yycolumn, yyline, yytext());     }
    ","                 { return new Symbol(Simbolos.tcoma, yycolumn, yyline, yytext());        }
    "->"                { return new Symbol(Simbolos.tarrow, yycolumn, yyline, yytext());       }

    "si"                { return new Symbol(Simbolos.tif, yycolumn, yyline, yytext());          }
    "entonces"          { return new Symbol(Simbolos.tthen, yycolumn, yyline, yytext());        }
    "fin_si"            { return new Symbol(Simbolos.tendif, yycolumn, yyline, yytext());       }
    "de_lo_contrario"   { return new Symbol(Simbolos.telse, yycolumn, yyline, yytext());        }
    "o_si"              { return new Symbol(Simbolos.telseif, yycolumn, yyline, yytext());      }

    "segun"             { return new Symbol(Simbolos.tsegun, yycolumn, yyline, yytext());       }
    "hacer"             { return new Symbol(Simbolos.tdo, yycolumn, yyline, yytext());          }
    "fin_segun"         { return new Symbol(Simbolos.tfin_segun, yycolumn, yyline, yytext());   }
    "¿"                 { return new Symbol(Simbolos.tQn_A, yycolumn, yyline, yytext());        }
    "?"                 { return new Symbol(Simbolos.tQn_C, yycolumn, yyline, yytext());        }
    
    "para"              { return new Symbol(Simbolos.tfor, yycolumn, yyline, yytext());         }
    "hasta"             { return new Symbol(Simbolos.thasta, yycolumn, yyline, yytext());       }
    "fin_para"          { return new Symbol(Simbolos.tfin_for, yycolumn, yyline, yytext());     }
    "con_incremental"   { return new Symbol(Simbolos.tincrease, yycolumn, yyline, yytext());    }

    "mientras"          { return new Symbol(Simbolos.twhile, yycolumn, yyline, yytext());       }
    "fin_mientras"      { return new Symbol(Simbolos.tend_while, yycolumn, yyline, yytext());   }

    "repetir"           { return new Symbol(Simbolos.trepeat, yycolumn, yyline, yytext());      }
    "hasta_que"         { return new Symbol(Simbolos.tuntil, yycolumn, yyline, yytext());       }

    "retornar"          { return new Symbol(Simbolos.treturn, yycolumn, yyline, yytext());      }

    "metodo"            { return new Symbol(Simbolos.tmetodo, yycolumn, yyline, yytext());      }
    "fin_metodo"        { return new Symbol(Simbolos.tfin_metodo, yycolumn, yyline, yytext());  }
    "con_parametros"    { return new Symbol(Simbolos.tparams, yycolumn, yyline, yytext());      }

    "funcion"           { return new Symbol(Simbolos.tfuncion, yycolumn, yyline, yytext());     }
    "fin_funcion"       { return new Symbol(Simbolos.tfin_funcion, yycolumn, yyline, yytext()); }

    "ejecutar"          { return new Symbol(Simbolos.texec, yycolumn, yyline, yytext());        }
    "imprimir"         { return new Symbol(Simbolos.tprint, yycolumn, yyline, yytext());       }
    "imprimir_nl"      { return new Symbol(Simbolos.tprintln, yycolumn, yyline, yytext());     }


    {num}               { return new Symbol(Simbolos.tnum, yycolumn, yyline, yytext());         }
    {cadena}            { return new Symbol(Simbolos.tcadena, yycolumn, yyline, yytext());      }
    {booleano}          { return new Symbol(Simbolos.tboolean, yycolumn, yyline, yytext());     }
    {caracter}          { return new Symbol(Simbolos.tcaracter, yycolumn, yyline, yytext());    }
    {sgl_cmt}           {                    /* Espacios en blanco, se ignoran */               }
    {ml_cmt}            {                 /* Espacios en blanco, se ignoran */                  }
    {var_name}          { return new Symbol(Simbolos.tvar_name, yycolumn, yyline, yytext());    }
    {letras}            { return new Symbol(Simbolos.tletras, yycolumn, yyline, yytext());      }

}

[ \t\r\n\f]       { /* Espacios en blanco se ignoran */	}

.   {
        //System.out.println("Error Lexico: " + yytext() + " Linea " + (yyline + 1) + " Columna " + (yycolumn + 1));
        Instruction.list.addError(new Error_("Token no valido: " + yytext(), "Lexico", yyline + 1, yycolumn + 1));
    }