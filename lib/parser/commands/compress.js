"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _common_imports_1 = require("./_common.imports");
/*
 -d   If given, decompression is done instead.
 -c   Write output on stdout, don't remove original.
 -b   Parameter limits the max number of bits/code.
 -f   Forces output file to be generated, even if one already.
      exists, and even if no space is saved by compressing.
      If -f is not used, the user will be prompted if stdin is.
      a tty, otherwise, the output file will not be overwritten.
 -v   Write compression statistics.
 -V   Output vesion and compile options.
 -r   Recursive. If a filename is a directory, descend

*/
var flags = {
    // keep: {
    //   name: "keep files",
    //   option: 'k',
    //   description: "keep (don't delete) input files",
    //   active: false
    // },
    force: {
        name: "force",
        option: 'f',
        description: "overwrite existing output files",
        active: false
    },
    decompress: {
        name: "decompress",
        option: 'd',
        description: "decompress instead of compress",
        active: false
    },
    stdout: {
        name: "stdout",
        option: 'c',
        description: "output to standard out",
        active: false
    },
    // quiet: {
    //   name: "quiet",
    //   option: 'q',
    //   longOption: 'quiet',
    //   description: "suppress noncritical error messages",
    //   active: false
    // },
    statistics: {
        name: "statistics",
        option: 'v',
        description: "overwrite existing output files",
        active: false
    },
    recursive: {
        name: "recursive",
        option: 'r',
        description: "Recursive. If a filename is a directory, descend",
        active: false
    },
};
var config = {
    flags: flags
};
var gzipData = new _common_imports_1.ParserData(config);
var optionsParser = _common_imports_1.$.optionParserFromConfig(config);
var CompressComponent = (function (_super) {
    __extends(CompressComponent, _super);
    function CompressComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exec = "compress";
        _this.files = [];
        return _this;
    }
    return CompressComponent;
}(_common_imports_1.CommandComponent));
exports.CompressComponent = CompressComponent;
function defaultComponentData() {
    var component = new CompressComponent();
    component.selectors = gzipData.componentSelectors;
    component.flags = gzipData.componentFlags;
    return component;
}
;
exports.parseCommand = _common_imports_1.common.commonParseCommand(optionsParser, defaultComponentData);
exports.parseComponent = _common_imports_1.common.commonParseComponent(gzipData.flagOptions, gzipData.selectorOptions);
exports.visualSelectorOptions = gzipData.visualSelectorOptions;
exports.componentClass = CompressComponent;
