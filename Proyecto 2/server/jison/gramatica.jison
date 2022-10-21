%{
  //Declarciones y tambien las importaciones
%}

%lex
%options case-insensitive


integer  [0-9]+      
str   "\""[^\"]*"\""   
bool    "true"|"false"    
character  (\'([a-zA-Z]|[!-[]|[\]-¿]|\\(\'|[n]|[t]|[r]|\\)|[ ])\')

%%

\s+                   /* skip whitespace */
[ \r\t]+              /* skip whitespace */
\n                    /* skip whitespace */
(\/\/.+)                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas


{integer}                                               return 'entero' 
{bool}                                                  return 'logico'
{character}                                             return 'caracter'
{str}                                                   return 'cadena' 


"."                                                     return 'punto'

"int"                                                   return 'int'
"double"                                                return 'double'
"boolean"                                               return 'boolean'
"char"                                                  return 'char'
"string"                                                return 'string'

"+"                                                     return 'mas'
"-"                                                     return 'menos'
"*"                                                     return 'multi'
"/"                                                     return 'div'
"^"                                                     return 'pot'
"%"                                                     return 'mod'

">"                                                     return 'mayor'
"<"                                                     return 'menor'
">="                                                    return 'mayor_igual'
"{menor}"                                               return 'menor_igual'
"=="                                                    return 'igual_a'
"!="                                                    return 'diferente'
"?"                                                     return 'qn_C'
":"                                                     return 'colon'

"||"                                                    return 'or'
"&&"                                                    return 'and'
"!"                                                     return 'not'

"("                                                     return 'parA'
")"                                                     return 'parC'

";"                                                     return 'ptcoma'
"{"                                                     return 'llaveA'
"}"                                                     return 'llaveC'
"["                                                     return 'corA'
"]"                                                     return 'corC'

"new"                                                   return 'nuevo'

"if"                                                    return 'if'
"else"                                                  return 'else'
"elif"                                                  return 'elif'

"switch"                                                return 'switch'
"case"                                                  return 'case'
"default"                                               return 'default'

"="                                                     return 'igual'
(([a-zA-Z])([a-zA-Z]|[0-9]|\_)*)                        return 'var_name'
","                                                     return 'coma'

<<EOF>>		                                            return 'EOF'


.   { 
        console.error("Error lexico: " + yytext + " en la linea: " + yylloc.first_line + " columna: " + yylloc.first_column)
    }


/lex

%left 'or'
%left 'and'
%right 'not'
%left 'igual_a' 'diferente' 'menor' 'menor_igual' 'mayor' 'mayor_igual'
%left 'mas' 'menos'
%left 'multi' 'div'
%left 'pot' 'mod'
%left 'parA' 'parC'
%left 'umenos'

%start S

%%

S : INSTRUCTIONS EOF { console.log("Analisis terminado") };

INSTRUCTIONS : INSTRUCTIONS INSTRUCTION
    | INSTRUCTION
;

INSTRUCTION : STATEMENT 'ptcoma'
    | ASSIGNMENT 'ptcoma'
    | var_name INCDEC 'ptcoma'
    | VECTOR 'ptcoma'
    | VECTORMOD 'ptcoma'
    | IF
    | SWITCH
    | error { console.error('Error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ' columna: ' + this._$.first_column);}
    //| error 'llaveC' { console.error('Error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ' columna: ' + this._$.first_column);}
;

/* DECLARACION */
STATEMENT : TIPO ID
    | TIPO ID 'igual' EXPRESSION
;

TIPO : 'int'
    | 'double'
    | 'boolean'
    | 'char'
    | 'string'
;

ID : ID 'coma' 'var_name'
    | 'var_name'
;

EXPRESSION : 'menos' EXPRESSION %prec 'umenos'
    | EXPRESSION 'mas' EXPRESSION
    | EXPRESSION 'menos' EXPRESSION
    | EXPRESSION 'multi' EXPRESSION
    | EXPRESSION 'div' EXPRESSION
    | EXPRESSION 'pot' EXPRESSION
    | EXPRESSION 'mod' EXPRESSION
    | EXPRESSION INCDEC
    | GETVALVECTOR
    | parA EXPRESSION parC
    | EXP
    | CASTING
    | INCDEC
;

EXP : 'entero'
    | 'logico'
    | 'caracter'
    | 'cadena'
    | 'var_name'
    | DECIMAL
;

DECIMAL : 'entero' 'punto' 'entero';

/* ASIGNACION */
ASSIGNMENT : ID 'igual' EXPRESSION;

/* CASTEO */
CASTING : 'parA' TIPO 'parC' EXPRESSION;

/* INCREMENTO Y DECREMENTO */
INCDEC : 'mas' 'mas'
    | 'menos' 'menos'
;

/* VECTORES */
VECTOR : TIPO 'corA' 'corC' 'var_name' 'igual' 'nuevo' TIPO 'corA' EXPRESSION 'corC'
    | TIPO 'corA' 'corC' 'corA' 'corC' 'var_name' 'igual' 'nuevo' TIPO 'corA' EXPRESSION 'corC' 'corA' EXPRESSION 'corC'
    | TIPO 'corA' 'corC' 'var_name' 'igual' 'llaveA' VECTORVAL 'llaveC'
    | TIPO 'corA' 'corC' 'corA' 'corC' 'var_name' 'igual' 'llaveA' 'llaveA' VECTORVAL 'llaveC' 'coma' 'llaveA' VECTORVAL 'llaveC' 'llaveC'
;

VECTORVAL : VECTORVAL 'coma' EXP
    | EXP
;

//Obtener el valor de una pos del vector
GETVALVECTOR : var_name 'corA' EXPRESSION 'corC'
    | var_name 'corA' EXPRESSION 'corC' 'corA' EXPRESSION 'corC'
;

/* MODIFICACION VECTORES */
VECTORMOD : 'var_name' 'corA' EXPRESSION 'corC' 'igual' VALVECTORMOD
    | 'var_name' 'corA' EXPRESSION 'corC' 'corA' EXPRESSION 'corC' 'igual' VALVECTORMOD
;

VALVECTORMOD : EXPRESSION
    | VECTORMOD
;

/* CONDICIONAL */

IF : 'if' 'parA' CONDITION 'parC' 'llaveA' INSTRUCTIONS 'llaveC' ANIDADO ELSE
    //| error {console.error('Error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ' columna: ' + this._$.first_column);}
;

ANIDADO : ANIDADO ELIF
    | //empty
;

ELIF : 'elif' 'parA' CONDITION 'parC' 'llaveA' INSTRUCTIONS 'llaveC';

ELSE : 'else' 'llaveA' INSTRUCTIONS 'llaveC'
    | //empty
;

CONDITION : CONDITION 'or' CONDITION
    | CONDITION 'and' CONDITION
    | 'not' CONDITION
    | REL
;

REL : EXPRESSION OP_REL EXPRESSION
    | EXPRESSION
;

OP_REL : 'mayor'
    | 'menor'
    | 'mayor' 'igual'
    | 'menor' 'igual'
    | 'igual_a'
    | 'diferente'
;

/* SWITCH */
SWITCH : 'switch' 'parA' EXPRESSION 'parC' 'llaveA' CASELIST 'llaveC'
    | 'switch' 'parA' EXPRESSION 'parC' 'llaveA' CASELIST DEFAULT 'llaveC'
    | 'switch' 'parA' EXPRESSION 'parC' 'llaveA' DEFAULT 'llaveC'
;

CASELIST : CASELIST CASE
    | CASE
;

CASE : 'case' EXPRESSION 'colon' INSTRUCTIONS;

DEFAULT : 'default' 'colon' INSTRUCTIONS;