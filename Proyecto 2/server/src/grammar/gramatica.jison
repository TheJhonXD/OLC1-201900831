%{
    const {Statement} = require('../instrucciones/Statement.ts');
    const {Assigment} = require('../instrucciones/Assignment.ts');
    const {Funcion} = require('../instrucciones/Funcion.ts');
    const {Metodo} = require('../instrucciones/Metodo.ts');
    const {Aritmetica} = require('../Expresion/Aritmetica.ts');
    const {IncDec} = require('../instrucciones/Incdec.ts');
    const {Casteo} = require('../Expresion/Casteo.ts');
    const {Vector} = require('../instrucciones/Vector.ts');
    const {Matriz} = require('../instrucciones/Matriz.ts');
    const {MatrizInit} = require('../instrucciones/MatrizInit.ts');
    const {VectorMod} = require('../instrucciones/VectorMod.ts');
    const {MatrizMod} = require('../instrucciones/MatrizMod.ts');
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

"while"                                                 return 'while'
"do"                                                    return 'do'
"until"                                                 return 'until'
"for"                                                   return 'for'
"break"                                                 return 'break'
"continue"                                              return 'continue'
"return"                                                return 'retornar'

"void"                                                  return 'void'

"print"                                                 return 'print'
"println"                                               return 'println'

"tolower"                                               return 'tolower'
"toupper"                                               return 'toupper'
"round"                                                 return 'round'
"length"                                                return 'length'
"typeof"                                                return 'typeof'
"tostring"                                              return 'tostring'
"tochararray"                                           return 'tochararray'
"push"                                                  return 'push'
"pop"                                                   return 'pop'
"run"                                                   return 'run'

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
%left umenos

%start S

%%

S : INSTRUCTIONS EOF { console.log("Analisis terminado"); return $1; };

INSTRUCTIONS : INSTRUCTIONS INSTRUCTION { $1.push($2); $$ = $1; }
    | INSTRUCTION { $$ = [$1]; }
;

INSTRUCTION : STATEMENT 'ptcoma' { $$ = $1; }
    | ASSIGNMENT 'ptcoma' { $$ = $1; }
    | INCREDECRE 'ptcoma' { $$ = $1; }
    | VECTOR 'ptcoma' { $$ = $1; }
    | VECTORMOD 'ptcoma' { $$ = $1; }
    | IF { $$ = $1; }
    | SWITCH { $$ = $1; }
    | WHILE { $$ = $1; }
    | FOR { $$ = $1; }
    | DOWHILE 'ptcoma' { $$ = $1; }
    | DOUNTIL 'ptcoma' { $$ = $1; }
    | TRANSFER 'ptcoma' { $$ = $1; }
    | RETURN 'ptcoma' { $$ = $1; }
    | FUNC 'llaveC' { $$ = $1; }
    | METHOD 'llaveC' { $$ = $1; }
    | CALL 'ptcoma' { $$ = $1; }
    | PRINT 'ptcoma' { $$ = $1; }
    | PRINTLN 'ptcoma' { $$ = $1; }
    | PUSH 'ptcoma' { $$ = $1; }
    | POP 'ptcoma' { $$ = $1; }
    | RUN 'ptcoma' { $$ = $1; }
    | error { console.error('Error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ' columna: ' + this._$.first_column);}
    //| error 'llaveC' { console.error('Error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ' columna: ' + this._$.first_column);}
;

// SINSCOPE : STATEMENT 'ptcoma'
//     | ASSIGNMENT 'ptcoma'
//     | var_name INCDEC 'ptcoma'
//     | VECTOR 'ptcoma'
//     | VECTORMOD 'ptcoma'
// ;

// CONTROL : IF
//     | SWITCH
//     | WHILE
//     | FOR
//     | DOWHILE 'ptcoma'
//     | DOUNTIL 'ptcoma'
//     | TRANSFER 'ptcoma'
//     | RETURN 'ptcoma'
// ;

/* DECLARACION */
STATEMENT : TIPO ID { $$ = new Statement($1, $2, @1.first_line, @1.first_column); }
    | TIPO ID 'igual' EXPRESSION { $$ = new Statement($1, $2, @1.first_line, @1.first_column, $4); }
    | TIPO ID 'igual' OPTERNARIO { $$ = new Statement($1, $2, @1.first_line, @1.first_column, $4); }
;

TIPO : 'int' { $$ = $1; }
    | 'double' { $$ = $1; }
    | 'boolean' { $$ = $1; }
    | 'char' { $$ = $1; }
    | 'string' { $$ = $1; }
;

ID : ID 'coma' 'var_name' { $1.push($3); $$ = $1; }
    | 'var_name' { $$ = [$1]; }
;

EXPRESSION : 'menos' EXPRESSION %prec 'umenos'
    | EXPRESSION 'mas' EXPRESSION { $$ = new Aritmetica($1, $3, "suma", @1.first_line, @1.first_column); }
    | EXPRESSION 'menos' EXPRESSION { $$ = new Aritmetica($1, $3, "resta", @1.first_line, @1.first_column); }
    | EXPRESSION 'multi' EXPRESSION { $$ = new Aritmetica($1, $3, "multiplicacion", @1.first_line, @1.first_column); }
    | EXPRESSION 'div' EXPRESSION { $$ = new Aritmetica($1, $3, "division", @1.first_line, @1.first_column); }
    | EXPRESSION 'pot' EXPRESSION { $$ = new Aritmetica($1, $3, "potencia", @1.first_line, @1.first_column); }
    | EXPRESSION 'mod' EXPRESSION { $$ = new Aritmetica($1, $3, "modulo", @1.first_line, @1.first_column); }
    | EXPRESSION INCDEC { $$ = $1; }
    | GETVALVECTOR { $$ = $1; }
    | parA EXPRESSION parC { $$ = $2; }
    | EXP { $$ = $1; }
    | CASTING { $$ = $1; }
    | INCDEC { $$ = $1; }
    | CALL { $$ = $1; }
    | TOLOWER { $$ = $1; }
    | TOUPPER { $$ = $1; }
    | ROUND { $$ = $1; }
    | LENGTH { $$ = $1; }
    | TOSTRING { $$ = $1; }
    | TOCHARARRAY { $$ = $1; }
    | TYPEOF { $$ = $1; }
;

EXP : 'entero' { $$ = $1; }
    | 'logico' { $$ = $1; }
    | 'caracter' { $$ = $1; }
    | 'cadena' { $$ = $1; }
    | 'var_name' { $$ = $1; }
    | DECIMAL { $$ = $1; }
;

DECIMAL : 'entero' 'punto' 'entero' { $$ = $1+$2+$3; }
;

/* ASIGNACION */
ASSIGNMENT : ID 'igual' EXPRESSION { $$ = new Assigment($1, $3, @1.first_line, @1.first_column); }
    | ID 'igual' OPTERNARIO { $$ = new Assigment($1, $3, @1.first_line, @1.first_column); }
;

/* CASTEO */
CASTING : 'parA' TIPO 'parC' EXPRESSION { $$ = new Casteo($2, $4, @1.first_line, @1.first_column); }
;

/* INCREMENTO Y DECREMENTO */
INCREDECRE : 'var_name' INCDEC { $$ = new IncDec($1, $2, @1.first_line, @1.first_column); }
;

INCDEC : 'mas' 'mas' { $$ = '++'; }
    | 'menos' 'menos' { $$ = '--'; }
;

/* VECTORES */
VECTOR : TIPO 'corA' 'corC' 'var_name' 'igual' 'nuevo' TIPO 'corA' EXPRESSION 'corC' {
        $$ = new Vector($1, $4, @1.first_line, @1.first_column, $9);
    }
    | TIPO 'corA' 'corC' 'corA' 'corC' 'var_name' 'igual' 'nuevo' TIPO 'corA' EXPRESSION 'corC' 'corA' EXPRESSION 'corC' {
        $$ = new Matriz($1, $6, @1.first_line, @1.first_column, $11, $14);
    }
    | TIPO 'corA' 'corC' 'var_name' 'igual' 'llaveA' VECTORVAL 'llaveC' {
        $$ = new Vector($1, $4, @1.first_line, @1.first_column, $7);
    }
    | TIPO 'corA' 'corC' 'corA' 'corC' 'var_name' 'igual' 'llaveA' 'llaveA' VECTORVAL 'llaveC' 'coma' 'llaveA' VECTORVAL 'llaveC' 'llaveC' {
        $$ = new MatrizInit($1, $6, $10, $14, @1.first_line, @1.first_column);
    }
    | TIPO 'corA' 'corC' 'var_name' 'igual' EXPRESSION {
        $$ = new Vector($1, $4, @1.first_line, @1.first_column, $6);
    }
;

VECTORVAL : VECTORVAL 'coma' EXP { $1.push($3); $$ = $1; }
    | EXP { $$ = [$1]; }
;

//Obtener el valor de una pos del vector
GETVALVECTOR : var_name 'corA' EXPRESSION 'corC' { $$ = $1 + "[" + $3 + "]"; }
    | var_name 'corA' EXPRESSION 'corC' 'corA' EXPRESSION 'corC' { $$ = $1 + "[" + $3 + "]" + "[" + $6 + "]"; }
;

/* MODIFICACION VECTORES */
VECTORMOD : 'var_name' 'corA' EXPRESSION 'corC' 'igual' VALVECTORMOD {
        $$ = new VectorMod($1, $3, @1.first_line, @1.first_column, $6);
    }
    | 'var_name' 'corA' EXPRESSION 'corC' 'corA' EXPRESSION 'corC' 'igual' VALVECTORMOD {
        $$ = new MatrizMod($1, $3, $6, @1.first_line, @1.first_column, $9);
    }
;

VALVECTORMOD : EXPRESSION { $$ = $1; }
    | VECTORMOD { $$ = $1; }
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

/* WHILE */
WHILE : 'while' 'parA' CONDITION 'parC' 'llaveA' INSTRUCTIONS 'llaveC';

/* FOR */
FOR : 'for' 'parA' STATEMENT 'ptcoma' CONDITION 'ptcoma' ACTUALIZATION 'parC' 'llaveA' INSTRUCTIONS 'llaveC'
    | 'for' 'parA' ASSIGNMENT 'ptcoma' CONDITION 'ptcoma' ACTUALIZATION 'parC' 'llaveA' INSTRUCTIONS 'llaveC'
;

ACTUALIZATION : var_name INCDEC
    | ASSIGNMENT
;

/* DO WHILE */
DOWHILE : 'do' 'llaveA' INSTRUCTIONS 'llaveC' 'while' 'parA' CONDITION 'parC';

/* DO UNTIL */
DOUNTIL : 'do' 'llaveA' INSTRUCTIONS 'llaveC' 'until' 'parA' CONDITION 'parC';

TRANSFER : 'break'
    | 'continue'
;

RETURN : 'retornar' EXPRESSION
    | 'retornar'
;

/* FUNCIONES */
FUNC : 'var_name' 'parA' PARAMS 'parC' 'colon' TIPO 'llaveA' INSTRUCTIONS { $$ = new Funcion($6, $1, $8, @1.first_line, @1.first_column); }
    | 'var_name' 'parA' 'parC' 'colon' TIPO 'llaveA' INSTRUCTIONS { $$ = new Funcion($5, $1, $7, @1.first_line, @1.first_column); }
;


PARAMETROS : PARAMS
    | //empty
;

PARAMS : PARAMS 'coma' TIPO 'var_name'
    | TIPO 'var_name'
;

/* METODOS */
METHOD : 'var_name' 'parA' PARAMS 'parC' 'colon' 'void' 'llaveA' INSTRUCTIONS { $$ = new Metodo($6, $1, $8, @1.first_line, @1.first_column); }
    | 'var_name' 'parA' 'parC' 'colon' 'void' 'llaveA' INSTRUCTIONS { $$ = new Metodo($5, $1, $7, @1.first_line, @1.first_column); }
    | 'var_name' 'parA' PARAMS 'parC' 'llaveA' INSTRUCTIONS { $$ = new Metodo("none", $1, $6, @1.first_line, @1.first_column); }
    | 'var_name' 'parA' 'parC' 'llaveA' INSTRUCTIONS { $$ = new Metodo("none", $1, $5, @1.first_line, @1.first_column); }
;

/* LLAMADA */

CALL : 'var_name' 'parA' PARAMSCALL 'parC'
    | 'var_name' 'parA' 'parC'
;

PARAMSCALL : PARAMSCALL 'coma' EXPRESSION
    | EXPRESSION
;

/* PRINT Y PRINTLN*/
PRINT : 'print' 'parA' EXPRESSION 'parC';

PRINTLN : 'println' 'parA' EXPRESSION 'parC';

TOLOWER : 'tolower' 'parA' EXPRESSION 'parC';

TOUPPER : 'toupper' 'parA' EXPRESSION 'parC';

ROUND : 'round' 'parA' 'integer' 'parC'
    | 'round' 'parA' DECIMAL 'parC'
;

LENGTH : 'length' 'parA' EXPRESSION 'parC';

TYPEOF : 'typeof' 'parA' EXPRESSION 'parC';

TOSTRING : 'tostring' 'parA' EXPRESSION 'parC';

TOCHARARRAY : 'tochararray' 'parA' EXPRESSION 'parC';

PUSH : 'var_name' 'punto' 'push' 'parA' EXPRESSION 'parC';

POP : 'var_name' 'punto' 'pop' 'parA' 'parC';

RUN : 'run' CALL; 

OPTERNARIO : CONDITION 'qn_C' EXPRESSION 'colon' EXPRESSION;