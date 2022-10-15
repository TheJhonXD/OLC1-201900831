%{
    //Codigo javascript
%}


/* --------------------------------- Analisis léxico --------------------------------- */
%lex

%options case-insensitive

%%

//Comentarios
(\/\*[^*]*\*+([^\/\*][^\*]*\*+)*\/) { /* COMENTARIO MULTILINEA SE IGNORA */ }

(\/\/.+)                            { /* COMENTARIO DE UNA SOLA LINEA SE IGNORA */ }

//Tipos
([0-9]+)                                                return 'entero';
([0-9]+[.][0-9]+)                                       return 'decimal';
((t|T)rue|(f|F)alse)                                    return 'logico';
('([a-zA-Z]|[!-[]|[\]-¿]|(\\(\'|n|t|r|\\))|[ ])')       return 'caracter';
(\"(.*|[^\"]+)\")                                       return 'cadena';

//Tipos de datos
"int"                                                   return 'int';
"double"                                                return 'double';
"boolean"                                               return 'boolean';
"char"                                                  return 'char';
"string"                                                return 'string';

//Operadores aritmeticos
"+"                                                     return 'mas';
"-"                                                     return 'menos';
"*"                                                     return 'multi';
"/"                                                     return 'div';
"^"                                                     return "pot";
"%"                                                     return "mod";

//Operadores relacionales
">"                                                     return 'mayor';
"<"                                                     return 'menor';
">="                                                    return 'mayor_igual';
"<="                                                    return 'menor_igual';
"=="                                                    return 'igual_a';
"!="                                                    return "diferente";
"?"                                                     return "qn_C";
":"                                                     return "colon";

//Operadores logicos
"||"                                                    return "or";
"&&"                                                    return "and";
"!"                                                     return "not";

//Signos de agrupación
"("                                                     return "parA";
")"                                                     return "parC";

//Finalización y encapsulamiento
";"                                                     return "ptcoma";
"{"                                                     return "llaveA";
"}"                                                     return "llaveC";

//Asignacion
"="                                                     return "igual";


","             { console.log("Reconoció un simbolo reservado. Con lexema: " + yytext); return 'coma'; }
"inicio"        { console.log("Reconoció un simbolo reservado. Con lexema: " + yytext); return 'inicio'; }

[ \r\t]+        {/* Estos caracteres se omiten */}

\n              { /* Este caracter se omite */ }

[a-zA-z]+       { console.log("Reconoció una palabra, con lexema: " + yytext); return 'palabra'; }

<<EOF>>         return 'EOF';

.               { console.error("Error lexico: " + yytext + " en la linea: " + yylloc.first_line + " columna: " + yylloc.first_column); }

/lex

/* PRECEDENCIA */
%left 'mas' 'menos'
%left 'multi' 'div'
%left 'pot'
%left UMENOS

%start INIT

%%

/* --------------------------------- Gramatica del lenguaje --------------------------------- */
INIT : inicio BLOQUE EOF { console.log("analisis terminado"); } 
    | error EOF   {console.error("Error sintactico"+ yytext + " en la linea: " + this._$.first_line + " columna: " + this._$.first_column);}
;

BLOQUE : BLOQUE coma palabra
    | palabra
;