"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sanitizeCommand(commandString) {
    return commandString.split("'").join("'\"'\"'");
}
exports.sanitizeCommand = sanitizeCommand;
function sanitizeArgument(commandArg) {
    if (/[\ #\$\`\'\"\\]/.test(commandArg)) {
        return "'" + sanitizeCommand(commandArg) + "'";
    }
    else
        return commandArg;
}
exports.sanitizeArgument = sanitizeArgument;
function sanitizedWithSingleQuotes(commandArg) {
    return commandArg[0] == commandArg[commandArg.length - 1]
        && commandArg[0] == "'";
}
exports.sanitizedWithSingleQuotes = sanitizedWithSingleQuotes;
