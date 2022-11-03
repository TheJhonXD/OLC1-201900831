%{
    const {Statement} = require('../instrucciones/Statement.js');
    const {Assigment} = require('../instrucciones/Assignment.js');
    const {Funcion} = require('../instrucciones/Funcion.js');
    const {Metodo} = require('../instrucciones/Metodo.js');
    const {Aritmetica} = require('../Expresion/Aritmetica.js');
    const {IncDec} = require('../instrucciones/Incdec.js');
    const {Casteo} = require('../Expresion/Casteo.js');
    const {Vector} = require('../instrucciones/Vector.js');
    const {Matriz} = require('../instrucciones/Matriz.js');
    const {MatrizInit} = require('../instrucciones/MatrizInit.js');
    const {VectorMod} = require('../instrucciones/VectorMod.js');
    const {MatrizMod} = require('../instrucciones/MatrizMod.js');
    const {Condicional} = require('../instrucciones/condicional/condicional.js');
    const {C_If} = require('../instrucciones/condicional/If.js');
    const {C_Elif} = require('../instrucciones/condicional/elif.js');
    const {C_Else} = require('../instrucciones/condicional/else.js');
    const {Condicion} = require('../instrucciones/Condicion.js');
    const {Relacional} = require('../instrucciones/Relacional.js');
    const {Switch} = require('../instrucciones/Switch/Switch.js');
    const {Case} = require('../instrucciones/Switch/Case.js');
    const {Default} = require('../instrucciones/Switch/Default.js');
    const {Mientras} = require('../instrucciones/While.js');
    const {CicloFor} = require('../instrucciones/For.js');
    const {DoWhile} = require('../instrucciones/DoWhile.js');
    const {DoUntil} = require('../instrucciones/DoUntil.js');
    const {Llamar} = require('../instrucciones/llamar.js');
    const {Print} = require('../instrucciones/nativas/print.js');
    const {LowUp} = require('../instrucciones/nativas/lowup.js');
    const {Round} = require('../instrucciones/nativas/round.js');
    const {Length} = require('../instrucciones/nativas/length.js');
    const {Varios} = require('../instrucciones/nativas/varios.js');
    const {Push} = require('../instrucciones/nativas/push.js');
    const {Pop} = require('../instrucciones/nativas/pop.js');
    const {Run} = require('../instrucciones/Run.js');
    const {OpTernario} = require('../instrucciones/OpTernario.js');
    const {Nodo} = require('../AST/Nodo.js');
    let cont = 1;
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

S : INSTRUCTIONS EOF { 
        console.log("Analisis terminado"); 
        return $1; 
    }
;

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
    | EXPRESSION 'mas' EXPRESSION { $$ = new Aritmetica($1, $3, $2, @1.first_line, @1.first_column); }
    | EXPRESSION 'menos' EXPRESSION { $$ = new Aritmetica($1, $3, $2, @1.first_line, @1.first_column); }
    | EXPRESSION 'multi' EXPRESSION { $$ = new Aritmetica($1, $3, $2, @1.first_line, @1.first_column); }
    | EXPRESSION 'div' EXPRESSION { $$ = new Aritmetica($1, $3, $2, @1.first_line, @1.first_column); }
    | EXPRESSION 'pot' EXPRESSION { $$ = new Aritmetica($1, $3, $2, @1.first_line, @1.first_column); }
    | EXPRESSION 'mod' EXPRESSION { $$ = new Aritmetica($1, $3, $2, @1.first_line, @1.first_column); }
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

IF : 'if' 'parA' CONDITION 'parC' 'llaveA' INSTRUCTIONS 'llaveC' ANIDADO ELSE {
        $$ = new Condicional(new C_If($3, $6, @1.first_line, @1.first_column), @1.first_line, @1.first_column, $8, $9);
    }
    | 'if' 'parA' CONDITION 'parC' 'llaveA' INSTRUCTIONS 'llaveC' ELSE {
        $$ = new Condicional(new C_If($3, $6, @1.first_line, @1.first_column), @1.first_line, @1.first_column, undefined, $8);
    }
;

ANIDADO : ANIDADO ELIF { $1.push($2); $$ = $1; }
    | ELIF { $$ = [$1]; }
;

ELIF : 'elif' 'parA' CONDITION 'parC' 'llaveA' INSTRUCTIONS 'llaveC' {
    $$ = new C_Elif($3, $6, @1.first_line, @1.first_column);
}
;

ELSE : 'else' 'llaveA' INSTRUCTIONS 'llaveC' {
        $$ = new C_Else($3, @1.first_line, @1.first_column);
    }
    | //empty
;

CONDITION : CONDITION 'or' CONDITION {
        $$ = new Condicion($1, $3, $2, @1.first_line, @1.first_column);
    }
    | CONDITION 'and' CONDITION {
        $$ = new Condicion($1, $3, $2, @1.first_line, @1.first_column);
    }
    | 'not' CONDITION {
        $$ = new Condicion(" ", $3, $2, @1.first_line, @1.first_column);
    }
    | REL { $$ = $1; }
;

REL : EXPRESSION OP_REL EXPRESSION {
        $$ = new Relacional($1, $3, $2, @1.first_line, @1.first_column);
    }
    | EXPRESSION { $$ = $1; }
;

OP_REL : 'mayor' { $$ = $1; }
    | 'menor' { $$ = $1; }
    | 'mayor' 'igual' { $$ = $1+$2; }
    | 'menor' 'igual' { $$ = $1+$2; }
    | 'igual_a' { $$ = $1; }
    | 'diferente' { $$ = $1; }
;

/* SWITCH */
SWITCH : 'switch' 'parA' EXPRESSION 'parC' 'llaveA' CASELIST 'llaveC' {
        $$ = new Switch($3, $6, @1.first_line, @1.first_column);
    }
    | 'switch' 'parA' EXPRESSION 'parC' 'llaveA' CASELIST DEFAULT 'llaveC' {
        $$ = new Switch($3, $6, @1.first_line, @1.first_column, $7);
    }
    | 'switch' 'parA' EXPRESSION 'parC' 'llaveA' DEFAULT 'llaveC' {
        $$ = new Switch($3, undefined, @1.first_line, @1.first_column, $6);
    }
;

CASELIST : CASELIST CASE { $1.push($2); $$ = $1; }
    | CASE { $$ = [$1]; }
;

CASE : 'case' EXPRESSION 'colon' INSTRUCTIONS {
    $$ = new Case($2, $4, @1.first_line, @1.first_column);
}
;

DEFAULT : 'default' 'colon' INSTRUCTIONS {
    $$ = new Default($3, @1.first_line, @1.first_column);
}
;

/* WHILE */
WHILE : 'while' 'parA' CONDITION 'parC' 'llaveA' INSTRUCTIONS 'llaveC' {
    $$ = new Mientras($3, $6, @1.first_line, @1.first_column);
}
;

/* FOR */
FOR : 'for' 'parA' STATEMENT 'ptcoma' CONDITION 'ptcoma' ACTUALIZATION 'parC' 'llaveA' INSTRUCTIONS 'llaveC' {
        $$ = new CicloFor($3, $5, $7, $10, @1.first_line, @1.first_column);
    }
    | 'for' 'parA' ASSIGNMENT 'ptcoma' CONDITION 'ptcoma' ACTUALIZATION 'parC' 'llaveA' INSTRUCTIONS 'llaveC' {
        $$ = new CicloFor($3, $5, $7, $10, @1.first_line, @1.first_column);
    }
;

ACTUALIZATION : INCREDECRE { $$ = $1; }
    | ASSIGNMENT { $$ = $1; }
;

/* DO WHILE */
DOWHILE : 'do' 'llaveA' INSTRUCTIONS 'llaveC' 'while' 'parA' CONDITION 'parC' {
    $$ = new DoWhile($3, $7, @1.first_line, @1.first_column);
}
;

/* DO UNTIL */
DOUNTIL : 'do' 'llaveA' INSTRUCTIONS 'llaveC' 'until' 'parA' CONDITION 'parC' {
    $$ = new DoUntil($3, $7, @1.first_line, @1.first_column);
}
;

TRANSFER : 'break' { $$ = $1; }
    | 'continue' { $$ = $1; }
;

RETURN : 'retornar' EXPRESSION { $$ = $1; }
    | 'retornar' { $$ = $1; }
;

/* FUNCIONES */
FUNC : 'var_name' 'parA' PARAMS 'parC' 'colon' TIPO 'llaveA' INSTRUCTIONS { $$ = new Funcion($6, $1, $8, @1.first_line, @1.first_column, $3); }
    | 'var_name' 'parA' 'parC' 'colon' TIPO 'llaveA' INSTRUCTIONS { $$ = new Funcion($5, $1, $7, @1.first_line, @1.first_column); }
;


PARAMETROS : PARAMS { $$ = $1; }
    | //empty
;

PARAMS : PARAMS 'coma' TIPO 'var_name' { $1.push($3 + "," + $4); $$ = $1; }
    | TIPO 'var_name' { $$ = [$1 + "," + $2] }
;

/* METODOS */
METHOD : 'var_name' 'parA' PARAMS 'parC' 'colon' 'void' 'llaveA' INSTRUCTIONS { $$ = new Metodo($6, $1, $8, @1.first_line, @1.first_column, $3); }
    | 'var_name' 'parA' 'parC' 'colon' 'void' 'llaveA' INSTRUCTIONS { $$ = new Metodo($5, $1, $7, @1.first_line, @1.first_column); }
    | 'var_name' 'parA' PARAMS 'parC' 'llaveA' INSTRUCTIONS { $$ = new Metodo("none", $1, $6, @1.first_line, @1.first_column, $3); }
    | 'var_name' 'parA' 'parC' 'llaveA' INSTRUCTIONS { $$ = new Metodo("none", $1, $5, @1.first_line, @1.first_column); }
;

/* LLAMADA */

CALL : 'var_name' 'parA' PARAMSCALL 'parC' {
        $$ = new Llamar($1, @1.first_line, @1.first_column, $3);
    }
    | 'var_name' 'parA' 'parC' {
        $$ = new Llamar($1, @1.first_line, @1.first_column);
    }
;

PARAMSCALL : PARAMSCALL 'coma' EXPRESSION { $1.push($3); $$ = $1;}
    | EXPRESSION { $$ = [$1]; }
;

/* PRINT Y PRINTLN*/
PRINT : 'print' 'parA' EXPRESSION 'parC' {
    $$ = new Print($1, $3, @1.first_line, @1.first_column);
}
;

PRINTLN : 'println' 'parA' EXPRESSION 'parC' {
    $$ = new Print($1, $3, @1.first_line, @1.first_column);
}
;

TOLOWER : 'tolower' 'parA' EXPRESSION 'parC' {
    $$ = new LowUp($1, $3, @1.first_line, @1.first_column);
}
;

TOUPPER : 'toupper' 'parA' EXPRESSION 'parC' {
    $$ = new LowUp($1, $3, @1.first_line, @1.first_column);
}
;

ROUND : 'round' 'parA' 'integer' 'parC' {
        $$ = new Round($3, @1.first_line, @1.first_column);
    }
    | 'round' 'parA' DECIMAL 'parC' { $$ = new Round($3, @1.first_line, @1.first_column); }
;

LENGTH : 'length' 'parA' EXPRESSION 'parC' { $$ = new Length($3, @1.first_line, @1.first_column); }
;

TYPEOF : 'typeof' 'parA' EXPRESSION 'parC' { $$ = new Varios($1, $3, @1.first_line, @1.first_column); }
;

TOSTRING : 'tostring' 'parA' EXPRESSION 'parC' { $$ = new Varios($1, $3, @1.first_line, @1.first_column); }
;

TOCHARARRAY : 'tochararray' 'parA' EXPRESSION 'parC' { $$ = new Varios($1, $3, @1.first_line, @1.first_column); }
;

PUSH : 'var_name' 'punto' 'push' 'parA' EXPRESSION 'parC' {
    $$ = new Push($1, $5, @1.first_line, @1.first_column);
}
;

POP : 'var_name' 'punto' 'pop' 'parA' 'parC' {
    $$ = new Pop($1, @1.first_line, @1.first_column);
}
;

RUN : 'run' CALL { $$ = new Run($2, @1.first_line, @1.first_column); }
; 

OPTERNARIO : CONDITION 'qn_C' EXPRESSION 'colon' EXPRESSION {
    $$ = new OpTernario($1, $3, $5, @1.first_line, @1.first_column);
}
;