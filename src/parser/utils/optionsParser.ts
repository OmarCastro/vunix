
class Iterator{
  public index:number = 0;
  public argList:any[];
  public length:number;
  public current:any;

  public constructor(ArgList:any[]){
    this.argList = ArgList;
    this.length = ArgList.length;
    this.current = ArgList[0];
  }

  public hasNext(){ return this.index !== this.length }
  public next(){return this.current = this.argList[this.index++] }
  public rest(){return this.argList.slice(this.index) }
}

export var parseShortOptions = (options,componentData,argsNodeIterator) => {
  var option,
      shortOptions = options.shortOptions,
      iter = new Iterator(argsNodeIterator.current.slice(1))
  while(option = iter.next()){
    var arg = shortOptions[option]
    if(arg && arg(componentData,argsNodeIterator,iter)){ break }
  }
}

export var parseLongOptions = function(options, componentData, argsNodeIterator){
    var longOptions, optionStr, indexOfSep, iter, optionKey, arg;
    longOptions = options.longOptions;
    optionStr = argsNodeIterator.current.slice(2);
    indexOfSep = optionStr.indexOf('=');
    if (indexOfSep > -1) {
      iter = new Iterator(optionStr);
      iter.index = indexOfSep + 1;
      optionKey = optionStr.slice(0, indexOfSep);
      arg = longOptions[optionKey];
      if (!arg) {
        arg = longOptions[optionStr];
      }
      if (arg) {
        return arg(componentData, argsNodeIterator, iter);
      }
    } else {
      arg = longOptions[optionStr];
      if (arg) {
        return arg(componentData);
      }
    }
  };
  /**
    activates flags (flags)
  */
export var switchOn = function(...flags:any[]){
    return function(Component, state, substate){
      flags.forEach(flag => {Component.flags[flag] = true});
      return false;
    };
  };
  /**
    set parameter (param)
  */
export var setParameter = function(param){
    var paramFn:any = function(Component, state, substate){
      var hasNext, parameter;
      hasNext = substate.hasNext();
      parameter = hasNext
        ? substate.rest()
        : state.next();
      Component.parameters[param] = parameter;
      return true;
    };
    paramFn
    paramFn.ptype = 'param';
    paramFn.param = param;
    return paramFn
  };
  /**
    set the selector _key_ with the value _value_
  */
export var select = function(key:string, value:string){
    return function(Component){
      Component.selectors[key] = value;
    };
  };

/**
  function to ignore errors when using this option
*/
export function ignore(){};


export var selectParameter = function(key, value){
    var paramFn:any = function(Component, state, substate){
      var parameselectParameterter;
      parameselectParameterter = substate.hasNext()
        ? substate.rest()
        : state.next();
      Component.selectors[key] = [value];
      return true;
    };
    paramFn
    paramFn.ptype = 'param'
    return paramFn;
  };

export var selectIfUnselected = function(key, value, ...selections:any[]){
  return function(Component){
    var selectorValue = Component.selectors[key];
    if(selections.every(value => { return selectorValue !== value } )){
      Component.selectors[key] = value;
    } else {
      return false
    }
  }
};

export var sameAs = function(option){ return ['same', option] }


export function generateSelectors(options){
  var selectors:any = {};
  var selectorType:any = {};
  var selectorOptions:any = {};
  var VisualSelectorOptions:any = {};
  var subkey:string;
  var key:string;
  var subkeys:{[s:string]:any};
  for (key in options) {
    subkeys = options[key];
    selectors[key] = key;
    var keySelectorType = selectorType[key] = {};
    var keySelectorOption = selectorOptions[key] = {};
    var VisualSelectorOption = VisualSelectorOptions[key] = [];
    for (subkey in subkeys) {
      var value = subkeys[subkey];
      keySelectorType[subkey.replace(" ","_")] = subkey;
      keySelectorOption[subkey] = value;
      VisualSelectorOption.push(value);
    }
  }
  return {
    selectors: selectors,
    selectorType: selectorType,
    selectorOptions: selectorOptions,
    VisualSelectorOptions: VisualSelectorOptions
  };
};

export function generate(parser){
  var key, val
  var longOptions = parser.longOptions,
      shortOptions = parser.shortOptions;
  for (key in longOptions) {
    val = longOptions[key];
    if (val[0] === 'same') {
      longOptions[key] = shortOptions[val[1]]
    }
  }
}