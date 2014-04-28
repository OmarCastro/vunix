/* parser generated by jison 0.4.13 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"unixcode":3,"commandline":4,"EOF":5,"|":6,"command":7,"auxcommand":8,"argsWithCommSub":9,"exec":10,"aux_commandline":11,"aux_command":12,"aux_auxcommand":13,"args":14,"s`":15,"`":16,"psubstitution":17,">":18,"outfile":19,"2>":20,"&>":21,"<":22,"infile":23,"2>&1":24,"str":25,"file":26,"proc_sub_out":27,"proc_sub_in":28,">(":29,")":30,"<(":31,"USTR":32,"STR":33,"STR2":34,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"|",15:"s`",16:"`",18:">",20:"2>",21:"&>",22:"<",24:"2>&1",29:">(",30:")",31:"<(",32:"USTR",33:"STR",34:"STR2"},
productions_: [0,[3,2],[4,3],[4,1],[7,1],[8,2],[8,1],[11,3],[11,1],[12,1],[13,2],[13,1],[9,1],[9,3],[14,1],[14,2],[14,2],[14,2],[14,2],[14,1],[14,1],[26,1],[26,1],[19,1],[19,1],[23,1],[23,1],[17,1],[17,1],[27,3],[28,3],[10,1],[25,1],[25,1],[25,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 2:$$[$0-2].push(_$[$0]);this.$ = $$[$0-2];
break;
case 3:this.$ = [$$[$0]];
break;
case 4:this._$.exec = $$[$0].exec;this._$.args = $$[$0].args; this.$ = this._$
break;
case 5:$$[$0-1].args.push($$[$0]);this.$ = $$[$0-1];
break;
case 6:this.$ = {exec: $$[$0], args:[]};
break;
case 7:$$[$0-2].push($$[$0]);this.$ = $$[$0-2];
break;
case 8:this.$ = [$$[$0]];
break;
case 9:this._$.exec = $$[$0].exec;this._$.args = $$[$0].args; this.$ = this._$
break;
case 10:$$[$0-1].args.push($$[$0]);this.$ = $$[$0-1];
break;
case 11:this.$ = {exec: $$[$0], args:[]};
break;
case 13:this.$ = ["commandSubstitution",$$[$0-1]];
break;
case 15:this.$ = ["outTo"+$$[$0][0],$$[$0][1]];
break;
case 16:this.$ = ["errTo"+$$[$0][0],$$[$0][1]];
break;
case 17:this.$ = ["out&errTo"+$$[$0][0],$$[$0][1]];
break;
case 18:this.$ = ["inFrom"+$$[$0][0],$$[$0][1]];
break;
case 19:this.$ = ["errToOut"];
break;
case 23:this.$ = ["Process",$$[$0][1]];
break;
case 24:this.$ = ["File",$$[$0]];
break;
case 25:this.$ = ["Process",$$[$0][1]];
break;
case 26:this.$ = ["File",$$[$0]];
break;
case 29:this.$ = ["outToProcess",$$[$0-1]];
break;
case 30:this.$ = ["inFromProcess",$$[$0-1]];
break;
case 32:this.$ = yytext.replace(/\\/g,"")
break;
case 33:this.$ = yytext.slice(1,-1).replace(/\\\"/g,'"')
break;
case 34:this.$ = yytext.slice(1,-1).replace(/\\\'/g,"'")
break;
}
},
table: [{3:1,4:2,7:3,8:4,10:5,25:6,32:[1,7],33:[1,8],34:[1,9]},{1:[3]},{5:[1,10],6:[1,11]},{5:[2,3],6:[2,3],9:12,14:13,15:[1,14],17:15,18:[1,16],20:[1,17],21:[1,18],22:[1,19],24:[1,20],25:21,27:22,28:23,29:[1,24],30:[2,3],31:[1,25],32:[1,7],33:[1,8],34:[1,9]},{5:[2,4],6:[2,4],15:[2,4],18:[2,4],20:[2,4],21:[2,4],22:[2,4],24:[2,4],29:[2,4],30:[2,4],31:[2,4],32:[2,4],33:[2,4],34:[2,4]},{5:[2,6],6:[2,6],15:[2,6],18:[2,6],20:[2,6],21:[2,6],22:[2,6],24:[2,6],29:[2,6],30:[2,6],31:[2,6],32:[2,6],33:[2,6],34:[2,6]},{5:[2,31],6:[2,31],15:[2,31],16:[2,31],18:[2,31],20:[2,31],21:[2,31],22:[2,31],24:[2,31],29:[2,31],30:[2,31],31:[2,31],32:[2,31],33:[2,31],34:[2,31]},{5:[2,32],6:[2,32],15:[2,32],16:[2,32],18:[2,32],20:[2,32],21:[2,32],22:[2,32],24:[2,32],29:[2,32],30:[2,32],31:[2,32],32:[2,32],33:[2,32],34:[2,32]},{5:[2,33],6:[2,33],15:[2,33],16:[2,33],18:[2,33],20:[2,33],21:[2,33],22:[2,33],24:[2,33],29:[2,33],30:[2,33],31:[2,33],32:[2,33],33:[2,33],34:[2,33]},{5:[2,34],6:[2,34],15:[2,34],16:[2,34],18:[2,34],20:[2,34],21:[2,34],22:[2,34],24:[2,34],29:[2,34],30:[2,34],31:[2,34],32:[2,34],33:[2,34],34:[2,34]},{1:[2,1]},{7:26,8:4,10:5,25:6,32:[1,7],33:[1,8],34:[1,9]},{5:[2,5],6:[2,5],15:[2,5],18:[2,5],20:[2,5],21:[2,5],22:[2,5],24:[2,5],29:[2,5],30:[2,5],31:[2,5],32:[2,5],33:[2,5],34:[2,5]},{5:[2,12],6:[2,12],15:[2,12],18:[2,12],20:[2,12],21:[2,12],22:[2,12],24:[2,12],29:[2,12],30:[2,12],31:[2,12],32:[2,12],33:[2,12],34:[2,12]},{10:30,11:27,12:28,13:29,25:6,32:[1,7],33:[1,8],34:[1,9]},{5:[2,14],6:[2,14],15:[2,14],16:[2,14],18:[2,14],20:[2,14],21:[2,14],22:[2,14],24:[2,14],29:[2,14],30:[2,14],31:[2,14],32:[2,14],33:[2,14],34:[2,14]},{19:31,25:33,27:32,29:[1,24],32:[1,7],33:[1,8],34:[1,9]},{19:34,25:33,27:32,29:[1,24],32:[1,7],33:[1,8],34:[1,9]},{19:35,25:33,27:32,29:[1,24],32:[1,7],33:[1,8],34:[1,9]},{23:36,25:38,28:37,31:[1,25],32:[1,7],33:[1,8],34:[1,9]},{5:[2,19],6:[2,19],15:[2,19],16:[2,19],18:[2,19],20:[2,19],21:[2,19],22:[2,19],24:[2,19],29:[2,19],30:[2,19],31:[2,19],32:[2,19],33:[2,19],34:[2,19]},{5:[2,20],6:[2,20],15:[2,20],16:[2,20],18:[2,20],20:[2,20],21:[2,20],22:[2,20],24:[2,20],29:[2,20],30:[2,20],31:[2,20],32:[2,20],33:[2,20],34:[2,20]},{5:[2,27],6:[2,27],15:[2,27],16:[2,27],18:[2,27],20:[2,27],21:[2,27],22:[2,27],24:[2,27],29:[2,27],30:[2,27],31:[2,27],32:[2,27],33:[2,27],34:[2,27]},{5:[2,28],6:[2,28],15:[2,28],16:[2,28],18:[2,28],20:[2,28],21:[2,28],22:[2,28],24:[2,28],29:[2,28],30:[2,28],31:[2,28],32:[2,28],33:[2,28],34:[2,28]},{4:39,7:3,8:4,10:5,25:6,32:[1,7],33:[1,8],34:[1,9]},{4:40,7:3,8:4,10:5,25:6,32:[1,7],33:[1,8],34:[1,9]},{5:[2,2],6:[2,2],9:12,14:13,15:[1,14],17:15,18:[1,16],20:[1,17],21:[1,18],22:[1,19],24:[1,20],25:21,27:22,28:23,29:[1,24],30:[2,2],31:[1,25],32:[1,7],33:[1,8],34:[1,9]},{6:[1,42],16:[1,41]},{6:[2,8],14:43,16:[2,8],17:15,18:[1,16],20:[1,17],21:[1,18],22:[1,19],24:[1,20],25:21,27:22,28:23,29:[1,24],31:[1,25],32:[1,7],33:[1,8],34:[1,9]},{6:[2,9],16:[2,9],18:[2,9],20:[2,9],21:[2,9],22:[2,9],24:[2,9],29:[2,9],31:[2,9],32:[2,9],33:[2,9],34:[2,9]},{6:[2,11],16:[2,11],18:[2,11],20:[2,11],21:[2,11],22:[2,11],24:[2,11],29:[2,11],31:[2,11],32:[2,11],33:[2,11],34:[2,11]},{5:[2,15],6:[2,15],15:[2,15],16:[2,15],18:[2,15],20:[2,15],21:[2,15],22:[2,15],24:[2,15],29:[2,15],30:[2,15],31:[2,15],32:[2,15],33:[2,15],34:[2,15]},{5:[2,23],6:[2,23],15:[2,23],16:[2,23],18:[2,23],20:[2,23],21:[2,23],22:[2,23],24:[2,23],29:[2,23],30:[2,23],31:[2,23],32:[2,23],33:[2,23],34:[2,23]},{5:[2,24],6:[2,24],15:[2,24],16:[2,24],18:[2,24],20:[2,24],21:[2,24],22:[2,24],24:[2,24],29:[2,24],30:[2,24],31:[2,24],32:[2,24],33:[2,24],34:[2,24]},{5:[2,16],6:[2,16],15:[2,16],16:[2,16],18:[2,16],20:[2,16],21:[2,16],22:[2,16],24:[2,16],29:[2,16],30:[2,16],31:[2,16],32:[2,16],33:[2,16],34:[2,16]},{5:[2,17],6:[2,17],15:[2,17],16:[2,17],18:[2,17],20:[2,17],21:[2,17],22:[2,17],24:[2,17],29:[2,17],30:[2,17],31:[2,17],32:[2,17],33:[2,17],34:[2,17]},{5:[2,18],6:[2,18],15:[2,18],16:[2,18],18:[2,18],20:[2,18],21:[2,18],22:[2,18],24:[2,18],29:[2,18],30:[2,18],31:[2,18],32:[2,18],33:[2,18],34:[2,18]},{5:[2,25],6:[2,25],15:[2,25],16:[2,25],18:[2,25],20:[2,25],21:[2,25],22:[2,25],24:[2,25],29:[2,25],30:[2,25],31:[2,25],32:[2,25],33:[2,25],34:[2,25]},{5:[2,26],6:[2,26],15:[2,26],16:[2,26],18:[2,26],20:[2,26],21:[2,26],22:[2,26],24:[2,26],29:[2,26],30:[2,26],31:[2,26],32:[2,26],33:[2,26],34:[2,26]},{6:[1,11],30:[1,44]},{6:[1,11],30:[1,45]},{5:[2,13],6:[2,13],15:[2,13],18:[2,13],20:[2,13],21:[2,13],22:[2,13],24:[2,13],29:[2,13],30:[2,13],31:[2,13],32:[2,13],33:[2,13],34:[2,13]},{10:30,12:46,13:29,25:6,32:[1,7],33:[1,8],34:[1,9]},{6:[2,10],16:[2,10],18:[2,10],20:[2,10],21:[2,10],22:[2,10],24:[2,10],29:[2,10],31:[2,10],32:[2,10],33:[2,10],34:[2,10]},{5:[2,29],6:[2,29],15:[2,29],16:[2,29],18:[2,29],20:[2,29],21:[2,29],22:[2,29],24:[2,29],29:[2,29],30:[2,29],31:[2,29],32:[2,29],33:[2,29],34:[2,29]},{5:[2,30],6:[2,30],15:[2,30],16:[2,30],18:[2,30],20:[2,30],21:[2,30],22:[2,30],24:[2,30],29:[2,30],30:[2,30],31:[2,30],32:[2,30],33:[2,30],34:[2,30]},{6:[2,7],14:43,16:[2,7],17:15,18:[1,16],20:[1,17],21:[1,18],22:[1,19],24:[1,20],25:21,27:22,28:23,29:[1,24],31:[1,25],32:[1,7],33:[1,8],34:[1,9]}],
defaultActions: {10:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined') {
        this.lexer.yylloc = {};
    }
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === 'function') {
        this.parseError = this.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || EOF;
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: this.lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: this.lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                this.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.2.1 */
var lexer = (function(){
var lexer = {

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input) {
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 21
break;
case 1:return 24
break;
case 2:return 20
break;
case 3:return 29
break;
case 4:return 31
break;
case 5:return 22
break;
case 6:return 18
break;
case 7:return '('
break;
case 8:return 30
break;
case 9:return 15
break;
case 10:return 16
break;
case 11:return 33
break;
case 12:return 34
break;
case 13:return 32
break;
case 14:return 6
break;
case 15:return 5
break;
case 16:/*ignore*/
break;
case 17:return 'INVALID'
break;
}
},
rules: [/^(?:&>)/,/^(?:2>&1\b)/,/^(?:2>)/,/^(?:>\()/,/^(?:<\()/,/^(?:<)/,/^(?:>)/,/^(?:\()/,/^(?:\))/,/^(?:\s`)/,/^(?:`)/,/^(?:"(\\.|[^\"])*")/,/^(?:'(\\.|[^\'])*')/,/^(?:([^\|\ \n\(\)\>\<\`$]|(\\[\ \(\)<>]))+)/,/^(?:\|)/,/^(?:$)/,/^(?:\s+)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"inclusive":true}}
};
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}