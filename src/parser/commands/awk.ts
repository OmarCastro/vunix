
/*
-f arqprog              --file=arqprog
-F fs                   --field-separator=fs
-v var=val              --assign=var=val
*/



import $ = require("../utils/optionsParser");
import parserModule = require("../utils/parserData");
import common = require("./_init");

var config = {
  parameters:{
    separator:{
      name:'field separator',
      option: 'F',
      type: "string",
      description:"filter entries by anything other than the content",
      defaultValue: ""
    }
  }
}
var awkData = new parserModule.ParserData(config);


var optionsParser = { 
  shortOptions:{
    F : $.setParameter(config.parameters.separator.name)
  },
  longOptions:{
    "field-separator" : $.sameAs('F')  
  }
}
$.generate(optionsParser)

function defaultComponentData(){
  return{
    type:'command',
    exec:"awk",
    parameters:awkData.componentParameters,
    script: ""
  }
}

export var parseCommand = common.commonParseCommand(optionsParser,defaultComponentData,{
    string: (component, str) => {
        component.script = str;
      }
    })

export var parseComponent = common.commonParseComponent(awkData.flagOptions, awkData.selectorOptions,awkData.parameterOptions, (component,exec,flags,files,parameters) => {
  var script = component.script.replace('\"',"\\\"");
  if(script){
    script = (/^[\n\ ]+$/.test(script)) ? '"'+script+'"' : '""';
  }
  exec.concat(parameters,script).join(' ');
  })

export var VisualSelectorOptions = awkData.visualSelectorOptions;