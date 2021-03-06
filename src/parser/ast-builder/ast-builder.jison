/*

examples:

cat txt.txt | grep ola | tee >(sort | cat) >(gzip > ok)

[["cat","txt.txt"],["grep","ola"],["tee",["inFromProc",[["sort"],["cat"]]],["inFromProc",[["gzip",["outTo","ok"]]]]]]

diff <(zcat man.txt.gz) <(zcat man2.txt.gz)

[["diff",["outToProc",[["zcat","man.txt.gz"]]],["outToProc",[["zcat","man2.txt.gz"]]]]]


tree:

[commandline] 
[[command][command]] = "command | command"


*/

/* lexical grammar */
%lex
%%
"&>"                  return '&>'
"2>&1"                return '2>&1'
"2>"                  return '2>'
">("                  return '>('
"<("                  return '<('
"<"                   return '<'
">"                   return '>'
"("                   return '('
")"                   return ')'
\s"`"                 return 's`'
"`"                   return '`'
\"(\\.|[^\"])*\"          return 'STR'
\'(\\.|[^\'])*\'          return 'STR2'
([^\|\ \n\(\)\>\<\`$]|(\\[\ \(\)<>]))+ return 'USTR'
"|"                   return '|'
<<EOF>>               return 'EOF'
\s+                   /*ignore*/
.                     return 'INVALID'

/lex

%start unixcode

%% /* language grammar */

unixcode
   : commandline 'EOF' { return $1; };

commandline
    : commandline '|' command {$1.push(@3);$$ = $1;}
    | command {$$ = [$1];}
    ;

command
   : auxcommand
     {@$.exec = $1.exec;@$.args = $1.args; $$ = @$};

auxcommand
    : command argsWithCommSub
        {$1.args.push($2);$$ = $1;}
    | exec
        {$$ = {exec: $1, args:[]};}
    ;

aux_commandline
    : aux_commandline '|' aux_command {$1.push($3);$$ = $1;}
    | aux_command {$$ = [$1];}
    ;


aux_command
   : aux_auxcommand
     {@$.exec = $1.exec;@$.args = $1.args; $$ = @$};

aux_auxcommand
    : aux_command args
        {$1.args.push($2);$$ = $1;}
    | exec
        {$$ = {exec: $1, args:[]};}
    ;

argsWithCommSub
   : args
   | 's`' aux_commandline '`' {$$ = ["commandSubstitution",$2];};

args
  : psubstitution
  | '>'  outfile {$$ = ["outTo"+$2[0],$2[1]];}
  | '2>' outfile {$$ = ["errTo"+$2[0],$2[1]];}
  | '&>' outfile {$$ = ["out&errTo"+$2[0],$2[1]];}   
  | '<'  infile {$$ = ["inFrom"+$2[0],$2[1]];}
  | '2>&1' {$$ = ["errToOut"];}
  | str;

file : psubstitution | str;

outfile 
  : proc_sub_out {$$ = ["Process",$1[1]];} 
  | str {$$ = ["File",$1];};

infile 
  : proc_sub_in {$$ = ["Process",$1[1]];} 
  | str {$$ = ["File",$1];} ;

psubstitution : proc_sub_out | proc_sub_in;
proc_sub_out : '>(' commandline ')' {$$ = ["outToProcess",$2];};
proc_sub_in : '<(' commandline ')' {$$ = ["inFromProcess",$2];};

exec:str;

str
  : USTR {$$ = yytext.replace(/\\/g,"")}
  | STR {$$ = yytext.slice(1,-1).replace(/\\\"/g,'"')}
  | STR2 {$$ = yytext.slice(1,-1).replace(/\\\'/g,"'")};