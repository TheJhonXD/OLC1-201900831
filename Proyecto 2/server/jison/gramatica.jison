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
//([0-9]+(["."][0-9]+))                                   return 'decimal';
"."                                                     return 'punto';
((t|T)rue|(f|F)alse)                                    return 'logico';
(\'([a-zA-Z]|[!-[]|[\]-¿]|(\\(\'|n|t|r|\\))|[ ])\')     return 'caracter';
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
"!="                                                    return 'diferente';
"?"                                                     return 'qn_C';
":"                                                     return 'colon';

//Operadores logicos
"||"                                                    return 'or';
"&&"                                                    return 'and';
"!"                                                     return 'not';

//Signos de agrupación
"("                                                     return 'parA';
")"                                                     return 'parC';

//Finalización y encapsulamiento
";"                                                     return 'ptcoma';
"{"                                                     return 'llaveA';
"}"                                                     return 'llaveC';

//Declaracion y asignacion
"="                                                     return 'igual';
(([a-zA-Z])([a-zA-Z]|[0-9]|\_)*)                        return 'var_name';
","                                                     return 'coma';


//Espacios en blanco
[ \r\t]+        {/* Estos caracteres se omiten */}

//Salto de línea
\n              { /* Este caracter se omite */ }

//[a-zA-z]+       { return 'palabra'; }

<<EOF>>         return 'EOF';

.               { console.error("Error lexico: " + yytext + " en la linea: " + yylloc.first_line + " columna: " + yylloc.first_column); }

/lex

/* PRECEDENCIA */
%left 'or'
%left 'and'
%right 'not'
%left 'igual_a' 'diferente' 'menor' 'menor_igual' 'mayor' 'mayor_igual'
%left 'mas' 'menos'
%left 'multi' 'div'
%left 'pot' 'mod'
%left 'parA' 'parC'
%left umenos

%start S

%%

/* --------------------------------- Gramatica del lenguaje --------------------------------- */

S : INSTRUCTIONS EOF { console.log("Analisis terminado") };

INSTRUCTIONS : INSTRUCTIONS INSTRUCTION
    | INSTRUCTION
;

INSTRUCTION : STATEMENT ptcoma
    | ASSIGNMENT ptcoma
    | error { console.error('Error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ' columna: ' + this._$.first_column);}
;

/* DECLARACION */
STATEMENT : TIPO ID
    | TIPO ID igual EXPRESSION
;

TIPO : int
    | double
    | boolean
    | char
    | string
;

ID : ID coma var_name
    | var_name
;

EXPRESSION : menos EXPRESSION %prec umenos
    | EXPRESSION mas EXPRESSION
    | EXPRESSION menos EXPRESSION
    | EXPRESSION multi EXPRESSION
    | EXPRESSION div EXPRESSION
    | EXPRESSION pot EXPRESSION
    | EXPRESSION mod EXPRESSION
    | parA EXPRESSION parC
    | entero
    | DECIMAL
    | logico
    | caracter
    | cadena
    | var_name
    | CASTING
;

DECIMAL : entero punto entero;

/* ASIGNACION */
ASSIGNMENT : ID igual EXPRESSION;

/* CASTEO */
CASTING : parA TIPO parC EXPRESSION;