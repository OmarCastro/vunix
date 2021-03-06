"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var optionsParser = require("../parser-configuration/optionsParser");
var iterator_class_1 = require("./iterator.class");
var parser = require("../parser");
var sanitizer = require("./sanitizer");
var graph_1 = require("../../graph");
var math_1 = require("../../math");
function typeOf(arg) {
    if (arg instanceof Array) {
        return arg[0];
    }
    if (typeof arg === 'string' && arg.lastIndexOf("--", 0) === 0) {
        return 'longOption';
    }
    if (typeof arg === 'string' && arg.lastIndexOf("-", 0) === 0) {
        return 'shortOptions';
    }
    return 'string';
}
exports.typeOf = typeOf;
/*getComponentById = function(visualData, id){
  var i$, ref$, len$, x;
  for (i$ = 0, len$ = (ref$ = visualData.components).length; i$ < len$; ++i$) {
    x = ref$[i$];
    if (x.id === id) {
      return x;
    }
  }
  return null;
};*/
/**
  Adds a file component to the
*/
function addFileComponent(componentData, connections, filename, id) {
    var newComponent = new graph_1.FileComponent(filename);
    newComponent.id = id;
    var inputPort = "file" + (componentData.files.length);
    connections.push(new graph_1.Connection(newComponent, 'output', componentData, inputPort));
    componentData.files.push(filename);
    return newComponent;
}
exports.addFileComponent = addFileComponent;
;
/*var commonNodeParsing = {
  string: function(options){
    return addFileComponent(options, options.iterator.current);
  },
  shortOptions: function(options){
    return addFileComponent(options, options.iterator.current);
  },
  longOption: function(options){
    return addFileComponent(options, options.iterator.current);
  }
};*/
/**
  Algorthm commonly used to parse commands
*/
function commonParseCommand(optionsParserData, defaultComponentData, argNodeParsing) {
    return function (argsNode, parser, tracker, previousCommand) {
        var stdoutRedirection, stderrRedirection, argNode, newComponent, inputPort, subresult, ref$, y;
        var componentData = defaultComponentData();
        var boundaries = [];
        if (previousCommand) {
            boundaries.push(previousCommand[0]);
        }
        var result = new graph_1.Graph();
        result.components = [componentData];
        result.firstMainComponent = componentData;
        var iter = new iterator_class_1.Iterator(argsNode);
        while (iter.hasNext()) {
            var argNode = iter.next();
            switch (typeOf(argNode)) {
                case 'shortOptions':
                    optionsParser.parseShortOptions(optionsParserData, componentData, iter);
                    break;
                case 'longOption':
                    optionsParser.parseLongOptions(optionsParserData, componentData, iter);
                    break;
                case 'string':
                    var addfile = true;
                    if (argNodeParsing && argNodeParsing.string) {
                        addfile = argNodeParsing.string(componentData, argNode) == "continue";
                    }
                    if (addfile) {
                        newComponent = addFileComponent(componentData, result.connections, argNode, tracker.id++);
                        result.components.push(newComponent);
                        boundaries.push(math_1.Boundary.createFromComponent(newComponent));
                    }
                    break;
                case 'inFromProcess':
                    subresult = parser.parseAST(argNode[1], tracker);
                    boundaries.push(math_1.Boundary.createFromComponents(subresult.components));
                    result.expand(subresult);
                    inputPort = "file" + componentData.files.length;
                    var subComponents = subresult.components;
                    for (var i = subComponents.length - 1; i >= 0; i--) {
                        if (subComponents[i].id == tracker.id - 1) {
                            result.connections.push(new graph_1.Connection(subComponents[i], 'output', componentData, inputPort));
                            break;
                        }
                    }
                    componentData.files.push(["pipe", tracker.id - 1]);
                    break;
                case 'outToFile':
                    newComponent = new graph_1.FileComponent(argNode[1]);
                    newComponent.id = tracker.id;
                    result.connections.push(new graph_1.Connection(componentData, 'output', newComponent, 'input'));
                    tracker.id++;
                    result.components.push(newComponent);
                    stdoutRedirection = newComponent;
                    break;
                case 'errToFile':
                    newComponent = new graph_1.FileComponent(argNode[1]);
                    newComponent.id = tracker.id;
                    result.connections.push(new graph_1.Connection(componentData, 'error', newComponent, 'input'));
                    tracker.id++;
                    result.components.push(newComponent);
                    stderrRedirection = newComponent;
            }
        }
        var bbox = math_1.Boundary.arrangeLayout(boundaries);
        componentData.position = bbox[1];
        componentData.id = tracker.id;
        if (stdoutRedirection) {
            var position = stdoutRedirection.position;
            position.x = bbox[1].x + 400;
            position.y = bbox[1].y;
        }
        if (stderrRedirection) {
            y = stdoutRedirection ? 100 : 0;
            stderrRedirection.position = {
                x: bbox[1].x + 400,
                y: bbox[1].y + y
            };
        }
        //result.connections = result.connections.concat(connections.toConnectionList());
        tracker.id++;
        return [bbox[0], result];
    };
}
exports.commonParseCommand = commonParseCommand;
;
function parseFlagsAndSelectors(component, options) {
    var key, selectors, value, flag, flags, that, val;
    var flagOptions = options.flagOptions;
    var selectorOptions = options.selectorOptions;
    var sFlags = [];
    var lFlags = [];
    var resultSFlags;
    var resultLFlags;
    for (key in flags = component.flags) {
        value = flags[key];
        if (value) {
            flag = flagOptions[key];
            /* istanbul ignore if */
            if (!flag) {
                throw [key, "doesn't exist in ", flagOptions].join('');
            }
            else
                sFlags.push(flag);
        }
    }
    if (component.selectors) {
        for (key in selectors = component.selectors) {
            value = selectors[key];
            var optionValue = selectorOptions[key][value.name];
            if (optionValue != null) {
                /* istanbul ignore if */
                if (!optionValue) {
                    throw [key, ".", value, "doesn't exist in ", selectorOptions].join('');
                }
                else if (value.type == "numeric parameter") {
                    lFlags.push("-" + optionValue + value.value);
                }
                else if (optionValue[0] !== '-') {
                    sFlags.push(optionValue);
                }
                else {
                    lFlags.push(optionValue);
                }
            }
        }
    }
    var containsSFlags = sFlags.length > 0;
    var containsLFlags = lFlags.length > 0;
    if (containsSFlags && containsLFlags) {
        return "-" + sFlags.join('') + " " + lFlags.join(' ');
    }
    else if (containsSFlags) {
        return "-" + sFlags.join('');
    }
    else if (containsLFlags) {
        return lFlags.join(' ');
    }
    else
        return "";
}
;
/**
  Algorthm commonly used to parse components

  the parsing of the flags and selectos are on a different function "parseFlagsAndSelectors"
*/
function commonParseComponent(flagOptions, selectorOptions, parameterOptions, beforeJoin) {
    var options;
    options = {
        flagOptions: flagOptions,
        selectorOptions: selectorOptions,
        parameterOptions: parameterOptions
    };
    return function (component, visualData, componentIndex, mapOfParsedComponents) {
        var exec = [component.exec];
        var flags = parseFlagsAndSelectors(component, options);
        var parameters = [];
        var Componentparameters = component.parameters;
        var result;
        mapOfParsedComponents[component.id] = true;
        for (var key in Componentparameters) {
            var value = Componentparameters[key];
            var option = parameterOptions[key];
            if (option && value) {
                var parameterOption = parameterOptions[key];
                if (parameterOption[0] == "-") {
                    result = parameterOption;
                }
                else {
                    result = "-" + parameterOption;
                }
                var sanitizedVal = sanitizer.sanitizeArgument(value);
                if (parameterOption[0] == "-" || sanitizer.sanitizedWithSingleQuotes(sanitizedVal)) {
                    result += " ";
                }
                result += sanitizedVal;
                parameters.push(result);
            }
            else if (value) {
                parameters.push(sanitizer.sanitizeArgument(value));
            }
        }
        console.log(":::parameters:::", parameters);
        var files = !component.files ? [] : component.files.map(function (file) {
            if (file instanceof Array) {
                var subCommand = parser.parseVisualDatafromComponent(componentIndex.components[file[1]], visualData, componentIndex, mapOfParsedComponents);
                return "<(" + subCommand + ")";
            }
            else
                return sanitizer.sanitizeArgument(file);
        });
        if (parameters.length > 0) {
            parameters = parameters.join(' ');
        }
        if (beforeJoin) {
            return beforeJoin(component, exec, flags, files, parameters);
        }
        else {
            if (flags) {
                exec = exec.concat(flags);
            }
            if (parameters) {
                exec = exec.concat(parameters);
            }
            if (files) {
                exec = exec.concat(files);
            }
            return exec.join(' ');
        }
    };
}
exports.commonParseComponent = commonParseComponent;
;
exports.select = optionsParser.select;
exports.switchOn = optionsParser.switchOn;
