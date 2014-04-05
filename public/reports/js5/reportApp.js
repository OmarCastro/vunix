/**
  gets the first supported proprieties in CSS
  used to resolve prefixes

  @param {Array.<string>} proparray - a list of arrays
  @return{string} the supported proprierty
*/
var cssTransform, listOfImplementedCommands, SelectionOptions;
function getCSSSupportedProp(proparray){
  var root, i$, len$, i;
  root = document.documentElement;
  for (i$ = 0, len$ = proparray.length; i$ < len$; ++i$) {
    i = proparray[i$];
    if (i in root.style) {
      return i;
    }
  }
}
cssTransform = getCSSSupportedProp(['transform', 'WebkitTransform', 'MsTransform']);
listOfImplementedCommands = ['awk', 'cat', 'grep', 'bunzip2', 'bzcat', 'bzip2', 'compress', 'ls', 'gzip', 'gunzip', 'zcat'];
function isImplemented(data){
  return listOfImplementedCommands.indexOf(data.exec >= 0);
}
function closestParentWithClass(element, classStr){
  var parent;
  parent = element.parentElement;
  while (parent !== document.body) {
    if (angular.element(parent).hasClass(classStr)) {
      return parent;
    } else {
      parent = parent.parentElement;
    }
  }
  return null;
}
SelectionOptions = shellParser.VisualSelectorOptions;
var examplesControllerData, visual2textControllerData, dataFlowExamples, AST_tests, app;
examplesControllerData = [
  {
    title: "awk",
    command: "awk --field-separator=fs 'print fs'"
  }, {
    title: "cat",
    command: "cat -s -A cat.txt grep.txt"
  }, {
    title: "grep",
    command: "grep -E ola my.txt"
  }, {
    title: "bzip2",
    command: "bzip2 file1.txt"
  }, {
    title: "bzcat",
    command: "bzcat file1.txt.bz2"
  }, {
    title: "bunzip2",
    command: "bunzip2 file1.txt.bz2"
  }, {
    title: "ls",
    command: "ls -BartIsACoolGuy"
  }, {
    title: "gzip",
    command: "gzip file1.txt.gz"
  }, {
    title: "gunzip",
    command: "gunzip file1.txt.gz"
  }, {
    title: "zcat",
    command: "zcat file1.txt.gz"
  }, {
    title: "compress",
    command: "compress file1.txt.gz"
  }, {
    title: "head",
    command: "head file1.txt"
  }, {
    title: "tail",
    command: "tail file1.txt"
  }
];
visual2textControllerData = [
  {
    title: 'cat',
    command: 'cat -s -A cat.txt grep.txt'
  }, {
    title: 'grep',
    command: 'grep -E "we are the champions" queens_lyrics.txt'
  }, {
    title: "bzip2",
    command: "bzip2 file1.txt"
  }, {
    title: "bzcat",
    command: "bzcat file1.txt.bz2"
  }, {
    title: "bunzip2",
    command: "bunzip2 file1.txt.bz2"
  }, {
    title: "ls",
    command: "ls -BartIsACoolGuy"
  }, {
    title: "gzip",
    command: "gzip file1.txt.gz"
  }, {
    title: "gunzip",
    command: "gunzip file1.txt.gz"
  }, {
    title: "zcat",
    command: "zcat file1.txt.gz"
  }, {
    title: "compress",
    command: "compress file1.txt.gz"
  }, {
    title: "head",
    command: "head file1.txt"
  }, {
    title: "tail",
    command: "tail file1.txt"
  }
];
dataFlowExamples = [
  {
    title: "single",
    command: "cat -A"
  }, {
    title: "single2",
    command: "ls -IAmACoolGuy"
  }, {
    title: "redirections",
    command: "cat file1.txt > file2.txt 2> file3.txt"
  }, {
    title: "pipe",
    command: "grep 2004 | cat uselessUseOfCat.txt | grep \"oh really\" | grep \"yes really\" | cat | cat | gzip"
  }, {
    title: "process substitution",
    command: "cat <(grep 2004 events.txt) <(grep 1958 ye_olde_events.txt)"
  }, {
    title: "tee",
    command: "cat | tee >(cat) >(cat) | cat"
  }, {
    title: "tee tree",
    command: "cat | tee >(cat | tee >(cat) >(cat)) >(cat | tee >(cat) >(cat) | cat) | cat"
  }, {
    title: "process substitution tree",
    command: "cat <(cat <(grep \"cat\" cat.cat.txt) <(grep t2 txt.txt)) <(grep 1 min.txt) <(grep 2 max.txt) | cat - <(cat min.txt)"
  }, {
    title: "p.subst. + tee + pipe",
    command: "grep 'knights of ni' <(cat <(grep txt | tee >(bzip2) | cat) - <(grep t2 ni.txt))"
  }, {
    title: "a long workflow",
    command: "grep 'for test purposes only' <(cat - <(grep 1 txt.txt) <(grep t2 txt2.txt)) <(grep 2 txt.txt) <(grep 3 txt2.txt) | cat - <(cat <(grep txt) <(grep t2)) | cat | grep 'its complex alright' <(cat <(grep txt | tee >(bzip2) | cat) - <(grep t2 ni.txt)) | tee >(bzip2) >(grep mimi <(cat ni.txt) | cat | tee >(cat | gzip) | bzip2) | grep | tee >(bzip2) | gzip"
  }
];
AST_tests = [
  {
    title: "basic test",
    command: "cat -s -A file1.txt file2.txt",
    asserts: ['equals(ast.length,1) // ast is the result of the AST tree', 'equals(ast[0].exec,"cat")', 'equals(ast[0].args,["-s","-A","file1.txt","file2.txt"])']
  }, {
    title: "failure test",
    command: "cat -s -A file1.txt file2.txt",
    asserts: ['equals(ast[0].exec,"catt")     // should fail', 'equals(ast[0].exec,"cat")                                // should pass', 'equals(ast[0].args,["-s","-A","file1.txt"])              // should fail', 'equals(ast[0].args,["-s","-A","file1.txt","file2.txt"])  // should pass']
  }, {
    title: "redirection",
    command: "grep line < file1.txt > file2.txt 2> file3.txt &> file4.txt",
    asserts: ['equals(ast[0].exec,"grep")', 'equals(ast[0].args[1],["inFrom","file1.txt"])', 'equals(ast[0].args[2],["outTo","file2.txt"])', 'equals(ast[0].args[3],["errTo","file3.txt"])', 'equals(ast[0].args[4],["out&errTo","file4.txt"])']
  }, {
    title: "quoted arguments",
    command: "cat \"in a galaxy.txt\" 'far far away.txt'",
    asserts: ['equals(ast[0].exec,"cat")', 'equals(ast[0].args,["in a galaxy.txt","far far away.txt"])']
  }, {
    title: "process substitution output",
    command: "tee >(grep line2 > file1.txt) >(grep line > file2.txt)",
    asserts: ['equals(ast[0].exec,"tee")', 'equals(ast[0].args[0][0],"outToProcess")', 'equals(ast[0].args[1][0],"outToProcess")']
  }, {
    title: "process substitution input",
    command: "diff <(zcat file1.txt.gz) <(zcat file2.txt.gz)",
    asserts: ['equals(ast[0].exec,"diff")', 'equals(ast[0].args[0][0],"inFromProcess")', 'equals(ast[0].args[1][0],"inFromProcess")']
  }, {
    title: "pipes",
    command: "cat file1.txt | grep line",
    asserts: ['equals(ast.length,2)', 'equals(ast[0].exec,"cat")', 'equals(ast[1].exec,"grep")', 'equals(ast[0].args,["file1.txt"])', 'equals(ast[1].args,["line"])']
  }, {
    title: "complex command",
    command: "ls parser/commands/dev/   | parallel 'find parser/commands/dev/{} -newer parser/commands/v/{.}.js' | parallel 'basename {}'",
    asserts: ['equals(ast.length,3)', 'equals(ast[0].exec,"ls")', 'equals(ast[1].exec,"parallel")', 'equals(ast[2].exec,ast[1].exec)', 'equals(ast[0].args,["parser/commands/dev/"])', 'equals(ast[1].args,["find parser/commands/dev/{} -newer parser/commands/v/{.}.js"])', 'equals(ast[2].args,["basename {}"])']
  }
];
app = angular.module('report', ['ui.bootstrap']);
app.controller('examples', function($scope){
  var examples, results, res$, i$, len$, index, example, AST, visualData, x$;
  $scope.options = SelectionOptions;
  examples = examplesControllerData;
  res$ = [];
  for (i$ = 0, len$ = examples.length; i$ < len$; ++i$) {
    index = i$;
    example = examples[i$];
    AST = shellParser.generateAST(example.command);
    visualData = shellParser.parseAST(AST);
    AST = JSON.stringify(AST, undefined, 2);
    res$.push({
      id: index,
      title: example.title,
      command: example.command,
      AST: AST,
      visualData: visualData,
      JSONVisualData: JSON.stringify(visualData, undefined, 2)
    });
  }
  results = res$;
  x$ = $scope;
  x$.TransformResults = results;
  x$.tab = results[0].id;
  x$.updateTab = function(id){
    return $scope.tab = id;
  };
  x$.isImplemented = isImplemented;
  return x$;
});
app.controller('visual2text', function($scope){
  var examples, results, i$, len$, i, example, AST, visualData;
  $scope.updateTab = function(id){
    return $scope.tab = id;
  };
  $scope.isImplemented = isImplemented;
  $scope.options = SelectionOptions;
  examples = visual2textControllerData;
  results = [];
  $scope.TransformResults = results;
  for (i$ = 0, len$ = examples.length; i$ < len$; ++i$) {
    i = i$;
    example = examples[i$];
    example = examples[i];
    AST = shellParser.generateAST(example.command);
    visualData = shellParser.parseAST(AST);
    results.push({
      id: i,
      title: example.title,
      command: example.command,
      visualData: visualData
    });
    (fn$.call(this, i, i, example));
  }
  return $scope.tab = results[0].id;
  function fn$(indx, i, example){
    $scope.$watch("TransformResults[" + indx + "].visualData.components", function(newValue){
      return results[indx].command = shellParser.parseVisualData(results[indx].visualData);
    }, true);
  }
});
app.controller('ASTTester', function($scope){
  var tests, testResults, res$, i$, len$, index, test, ast, results, res1$, j$, ref$, len1$, assert, result;
  $scope.updateTab = function(id){
    return $scope.tab = id;
  };
  tests = AST_tests;
  res$ = [];
  for (i$ = 0, len$ = tests.length; i$ < len$; ++i$) {
    index = i$;
    test = tests[i$];
    ast = shellParser.generateAST(test.command);
    res1$ = [];
    for (j$ = 0, len1$ = (ref$ = test.asserts).length; j$ < len1$; ++j$) {
      assert = ref$[j$];
      result = new Function('ast', 'equals', 'return ' + assert)(angular.copy(ast), angular.equals);
      res1$.push({
        command: assert,
        result: result,
        'class': result === true ? 'passed' : 'failed'
      });
    }
    results = res1$;
    res$.push({
      id: index,
      title: test.title,
      command: test.command,
      ast: JSON.stringify(ast, void 8, 2),
      results: results
    });
  }
  testResults = res$;
  $scope.testResults = testResults;
  return $scope.tab = testResults[0].id;
});
app.controller('ast-playground', function($scope){
  $scope.builder = {
    code: '',
    result: '',
    error: false
  };
  return $scope.generateAST = function(){
    var builder, err;
    builder = $scope.builder;
    if (builder.code === '') {
      return builder.result = '';
    }
    try {
      builder.result = JSON.stringify(shellParser.generateAST(builder.code), void 8, 2);
      return builder.error = false;
    } catch (e$) {
      err = e$;
      builder.error = true;
      return builder.result = 'compilation error \n' + err.message.split('\n').slice(1, 3).join('\n');
    }
  };
});
app.controller('visual-playground', function($scope){
  var emptyresult, x$, translateX, translateY, startX, startY;
  emptyresult = {
    components: [],
    connections: []
  };
  $scope.generateAST = function(){
    var builder, err;
    builder = $scope.builder;
    if (builder.code === '') {
      return builder.result = emptyresult;
    }
    try {
      builder.result = shellParser.parseCommand(builder.code);
      return builder.error = false;
    } catch (e$) {
      err = e$;
      builder.error = 'compilation error \n' + err.stack;
      return builder.result = emptyresult;
    }
  };
  x$ = $scope;
  x$.screenHeight = window.screen.availHeight;
  x$.options = SelectionOptions;
  x$.isImplemented = isImplemented;
  x$.builder = {
    code: '',
    result: emptyresult,
    error: false
  };
  translateX = 0;
  translateY = 0;
  startX = 0;
  return startY = 0;
});
app.controller('data-flow', function($scope){
  var emptyresult, connectors, examples, results, i$, len$, index, example, translateX, translateY, startX, startY, parseExample, x$;
  emptyresult = {
    components: [],
    connections: []
  };
  $scope.options = SelectionOptions;
  connectors = [];
  examples = dataFlowExamples;
  results = [];
  for (i$ = 0, len$ = examples.length; i$ < len$; ++i$) {
    index = i$;
    example = examples[i$];
    results.push({
      id: index,
      inputCommand: example.command,
      title: example.title,
      command: example.command,
      visualData: emptyresult,
      parsed: false
    });
    (fn$.call(this, index, index, example));
  }
  translateX = 0;
  translateY = 0;
  startX = 0;
  startY = 0;
  parseExample = function(num){
    var result, AST, visualData, x$;
    result = $scope.TransformResults[num];
    if (result.parsed) {
      return;
    }
    AST = shellParser.generateAST(result.command);
    visualData = shellParser.parseAST(AST);
    x$ = result;
    x$.visualData = visualData;
    x$.parsed = true;
    return x$;
  };
  x$ = $scope;
  x$.screenHeight = window.screen.availHeight;
  x$.TransformResults = results;
  x$.screenHeight = window.screen.availHeight;
  x$.tab = results[0].id;
  x$.updateTab = function(id){
    parseExample(id);
    return $scope.tab = id;
  };
  x$.isImplemented = isImplemented;
  return parseExample(0);
  function fn$(indx, index, example){
    $scope.$watch("TransformResults[" + indx + "].visualData", function(newValue){
      if (!results[indx].parsed) {
        return;
      }
      return results[indx].command = shellParser.parseVisualData(results[indx].visualData);
    }, true);
  }
});
app.directive("connector", function($document){
  return {
    scope: true,
    link: function(scope, element, attr){
      var StartPortOffset, EndPortOffset, startPosition, endPosition, startComponent, endComponent, dataedge, elem, $graphElement, resultScope, graphElement, i$, ref$, len$, component, setEdgePath, update;
      dataedge = scope.$parent.edge;
      elem = element[0];
      $graphElement = element.closest('[graph-model]');
      resultScope = $graphElement.scope();
      graphElement = $graphElement[0];
      for (i$ = 0, len$ = (ref$ = resultScope.visualData.components).length; i$ < len$; ++i$) {
        component = ref$[i$];
        if (component.id === dataedge.startNode) {
          startComponent = component;
          startPosition = component.position;
          break;
        }
      }
      for (i$ = 0, len$ = (ref$ = resultScope.visualData.components).length; i$ < len$; ++i$) {
        component = ref$[i$];
        if (component.id === dataedge.endNode) {
          endComponent = component;
          endPosition = component.position;
          break;
        }
      }
      setEdgePath = function(iniX, iniY, endX, endY){
        var xpoint;
        xpoint = (endX - iniX) / 4;
        return elem.setAttribute('d', "M " + iniX + " " + iniY + " H " + (iniX + 0.5 * xpoint) + " C " + (iniX + 2 * xpoint) + "," + iniY + " " + (iniX + xpoint * 2) + "," + endY + " " + (iniX + xpoint * 4) + "," + endY + " H " + endX);
      };
      update = function(){
        return setEdgePath(startPosition.x + StartPortOffset.left, startPosition.y + StartPortOffset.top, endPosition.x + EndPortOffset.left, endPosition.y + EndPortOffset.top);
      };
      scope.update = update;
      scope.updateWithId = function(id){
        if (dataedge.startNode === id || dataedge.endNode === id) {
          update();
        }
      };
      scope.reset = function(){
        var Startnode, StartPort, Endnode, EndPort;
        Startnode = graphElement.querySelector(".nodes .component[data-node-id='" + dataedge.startNode + "']");
        StartPort = Startnode.querySelector(".box[data-port='" + dataedge.startPort + "']");
        Endnode = graphElement.querySelector(".nodes .component[data-node-id='" + dataedge.endNode + "']");
        EndPort = Endnode.querySelector(".box[data-port='" + dataedge.endPort + "']");
        StartPortOffset = {
          top: StartPort.offsetTop + StartPort.offsetHeight * 0.75,
          left: StartPort.offsetLeft
        };
        EndPortOffset = {
          top: EndPort.offsetTop + EndPort.offsetHeight * 0.75,
          left: EndPort.offsetLeft
        };
        return update();
      };
      requestAnimationFrame(function(){
        scope.$watch('edge.endPort', function(){
          return scope.reset();
        });
        return scope.reset();
      });
    }
  };
});
app.directive("component", function($document){
  var pointerId;
  pointerId = 0;
  return {
    require: '^graphModel',
    scope: true,
    link: function(scope, element, attr, graphModelController){
      var datanode, startX, startY, title, position, elem, imstyle, mousemove, moveBy, mouseup;
      scope.transform = cssTransform.replace(/[A-Z]/g, function(v){
        return "-" + v.toLowerCase();
      });
      datanode = scope.$parent.data;
      startX = 0;
      startY = 0;
      title = datanode.title;
      position = datanode.position;
      elem = element[0];
      imstyle = elem.style;
      element.bind("pointerdown", function(ev){
        var event, targetTag, pointerId, x$;
        console.log(datanode);
        switch (ev.which) {
        case 2:
          return true;
        case 3:
          return false;
        }
        graphModelController.hidePopupAndEdge();
        event = ev.originalEvent;
        targetTag = event.target.tagName;
        console.log(targetTag);
        if (pointerId || (targetTag === 'INPUT' || targetTag === 'SELECT' || targetTag === 'LABEL' || targetTag === 'BUTTON' || targetTag === 'A')) {
          return true;
        }
        pointerId = event.pointerId;
        x$ = $document;
        x$.bind("pointermove", mousemove);
        x$.bind("pointerup", mouseup);
        startX = event.screenX;
        startY = event.screenY;
        return false;
      });
      mousemove = function(ev){
        var event;
        event = ev.originalEvent;
        moveBy(event.screenX - startX, event.screenY - startY);
        startX = event.screenX;
        startY = event.screenY;
      };
      moveBy = function(x, y){
        graphModelController.translateNode(datanode.id, position, x, y);
        scope.$digest();
      };
      mouseup = function(){
        var pointerId, x$;
        pointerId = 0;
        x$ = $document;
        x$.unbind("pointermove", mousemove);
        x$.unbind("pointerup", mouseup);
        return x$;
      };
    }
  };
});
app.directive("port", function($document){
  return {
    require: '^graphModel',
    scope: true,
    link: function(scope, element, attr, graphModelController){
      var datanode, title, position, elem, imstyle, ref$, ConnectIfOk, mousemove, mouseup;
      datanode = scope.$parent.data;
      title = datanode.title;
      position = datanode.position;
      elem = element[0];
      imstyle = elem.style;
      scope.componentId = datanode.id;
      scope.isOutputNode = (ref$ = attr.port) === 'output' || ref$ === 'error' || ref$ === 'retcode';
      element.bind("pointerdown", function(ev){
        var event, x$;
        console.log(ev);
        event = ev.originalEvent;
        graphModelController.startEdge(elem, position, event);
        x$ = $document;
        x$.bind("pointermove", mousemove);
        x$.bind("pointerup", mouseup);
        return false;
      });
      ConnectIfOk = function(startNode, startPort, endNode, endPort){
        var visualData, isOk, i$, ref$, len$, x;
        visualData = graphModelController.getVisualData();
        isOk = true;
        for (i$ = 0, len$ = (ref$ = visualData.connections).length; i$ < len$; ++i$) {
          x = ref$[i$];
          if ((x.startNode === endNode && x.endNode === startNode) || (x.startNode === startNode && x.endNode === endNode)) {
            isOk = false;
            break;
          }
        }
        if (isOk) {
          visualData.connections.push({
            startNode: startNode,
            startPort: startPort,
            endNode: endNode,
            endPort: endPort
          });
          graphModelController.updateScope();
        }
      };
      mousemove = function(ev){
        graphModelController.moveEdge(ev.originalEvent);
      };
      mouseup = function(ev){
        var event, pointedElem, $pointedElem, ref$, outAttr, outPortScope, x$;
        event = ev.originalEvent;
        pointedElem = document.elementFromPoint(event.clientX, event.clientY);
        $pointedElem = $(pointedElem);
        if (graphModelController.isFreeSpace(pointedElem)) {
          if ((ref$ = attr.port) === 'output' || ref$ === 'error' || ref$ === 'retcode') {
            graphModelController.showPopup(event, scope.componentId, attr.port, null, 'input');
          } else {
            graphModelController.showPopup(event, null, 'output', scope.componentId, attr.port);
          }
        } else {
          graphModelController.endEdge();
          outAttr = $pointedElem.attr("data-port");
          if (outAttr) {
            outPortScope = $pointedElem.scope();
            if (scope.isOutputNode !== outPortScope.isOutputNode) {
              if (scope.isOutputNode) {
                ConnectIfOk(scope.componentId, attr.port, outPortScope.componentId, outAttr);
              } else {
                ConnectIfOk(outPortScope.componentId, outAttr, scope.componentId, attr.port);
              }
            }
          }
        }
        x$ = $document;
        x$.unbind("pointermove", mousemove);
        x$.unbind("pointerup", mouseup);
      };
    }
  };
});
app.directive("graphModel", function($document){
  return {
    replace: false,
    scope: {
      graphModel: '=',
      options: '='
    },
    controller: [
      '$scope', '$element', '$modal', '$attrs', function(scope, element, $modal, attr){
        var pointerId, scale, graphX, graphY, startX, startY, edgeIniX, edgeIniY, elem, nodesElem, nodesElemStyle, edgesElem, edgesElemStyle, svgElem, $svgElem, workspace, $workspace, popup, $popup, popupHeight, $popupInput, graphModel, res$, key, ref$, val, x$, update, mousemove, mouseup, newComponent, newMacroComponent, newCommandComponent, mapMouseToScene, mapMouseToView, mapPointToScene, scaleFromMouse, MouseWheelHandler, mousewheelevt, simpleEdge, setEdgePath, popupState, startEdge, moveEdge, endEdge, showPopup, popupSubmit, hidePopup, hidePopupAndEdge, y$;
        pointerId = 0;
        scale = 1;
        graphX = 0;
        graphY = 0;
        startX = 0;
        startY = 0;
        edgeIniX = 0;
        edgeIniY = 0;
        elem = element[0];
        nodesElem = elem.querySelector(".nodes");
        nodesElemStyle = nodesElem.style;
        edgesElem = elem.querySelector(".edges");
        edgesElemStyle = edgesElem.style;
        svgElem = elem.querySelector("svg");
        $svgElem = $(svgElem);
        workspace = elem.querySelector(".workspace");
        $workspace = $(workspace);
        popup = elem.querySelector(".popup");
        $popup = $(popup);
        popupHeight = $popup.find("form").height();
        $popup.hide();
        $popupInput = $popup.find("input");
        graphModel = scope.graphModel;
        graphModel.macros = {
          sss: shellParser.createMacro('sss', 'ddd')
        };
        res$ = [];
        for (key in ref$ = graphModel.macros) {
          val = ref$[key];
          res$.push(key);
        }
        graphModel.macroList = res$;
        x$ = scope;
        x$.popupText = '';
        x$.graph = this;
        x$.$watch("graphModel", function(){
          return scope.visualData = scope.graphModel;
        });
        x$.visualData = scope.graphModel;
        x$.implementedCommands = listOfImplementedCommands;
        x$.isImplemented = isImplemented;
        x$.isArray = angular.isArray;
        x$.isString = angular.isString;
        x$.swapPrevious = function(array, index, id){
          var ref$, i$, len$, connection, results$ = [];
          if (index === 0) {
            return;
          }
          ref$ = [array[index - 1], array[index]], array[index] = ref$[0], array[index - 1] = ref$[1];
          for (i$ = 0, len$ = (ref$ = scope.visualData.connections).length; i$ < len$; ++i$) {
            connection = ref$[i$];
            if (connection.endNode === id) {
              if (connection.endPort === "file" + index) {
                results$.push(connection.endPort = "file" + (index - 1));
              } else if (connection.endPort === "file" + (index - 1)) {
                results$.push(connection.endPort = "file" + index);
              }
            }
          }
          return results$;
        };
        update = function(){
          var transform;
          transform = "translate(" + graphX + "px, " + graphY + "px) scale(" + scale + ")";
          nodesElemStyle[cssTransform] = transform;
          return edgesElemStyle[cssTransform] = transform;
        };
        update();
        mousemove = function(ev){
          var event;
          event = ev.originalEvent;
          graphX += event.screenX - startX;
          graphY += event.screenY - startY;
          startX = event.screenX;
          startY = event.screenY;
          update();
        };
        mouseup = function(){
          var x$;
          pointerId = 0;
          x$ = $document;
          x$.unbind("pointermove", mousemove);
          x$.unbind("pointerup", mouseup);
          return x$;
        };
        element.bind("pointerdown", function(ev){
          var event, targetTag, x$;
          if (ev.which === 3) {
            return false;
          }
          event = ev.originalEvent;
          targetTag = event.target.tagName;
          if (pointerId || (targetTag === 'INPUT' || targetTag === 'SELECT' || targetTag === 'LABEL' || targetTag === 'A' || targetTag === 'LI' || targetTag === 'BUTTON')) {
            return;
          }
          hidePopupAndEdge();
          pointerId = event.pointerId;
          x$ = $document;
          x$.bind("pointermove", mousemove);
          x$.bind("pointerup", mouseup);
          startX = event.screenX;
          startY = event.screenY;
          event.preventDefault();
          event.stopPropagation();
        });
        newComponent = function(content, position){
          if (in$(content.split(" ")[0], listOfImplementedCommands)) {
            return newCommandComponent(content, position);
          } else {
            return newMacroComponent(content, position);
          }
        };
        newMacroComponent = function(name, position){
          var visualData, newComponent;
          visualData = scope.visualData;
          newComponent = {
            type: 'subgraph',
            macro: graphModel.macros[name],
            id: visualData.counter++,
            position: {}
          };
          visualData.components.push(newComponent);
          importAll$(newComponent.position, position);
          return newComponent;
        };
        newCommandComponent = function(command, position){
          var visualData, newResult, x$, newComponent;
          visualData = scope.visualData;
          newResult = shellParser.parseCommand(command);
          x$ = newComponent = newResult.components[0];
          x$.id = visualData.counter++;
          importAll$(x$.position, position);
          visualData.components.push(newComponent);
          return newComponent;
        };
        mapMouseToScene = function(event){
          var ref$, x, y;
          ref$ = mapMouseToView(event), x = ref$.x, y = ref$.y;
          return mapPointToScene(x, y);
        };
        mapMouseToView = function(event){
          var offset;
          offset = $workspace.offset();
          return {
            x: Math.round(event.pageX - offset.left),
            y: Math.round(event.pageY - offset.top)
          };
        };
        mapPointToScene = function(x, y){
          return {
            x: (x - graphX) / scale,
            y: (y - graphY) / scale
          };
        };
        scaleFromMouse = function(amount, event){
          var ref$, x, y, relpointX, relpointY;
          if ((scale < 0.2 && amount < 1) || (scale > 20 && amount > 1)) {
            return;
          }
          hidePopupAndEdge();
          ref$ = mapMouseToView(event), x = ref$.x, y = ref$.y;
          relpointX = x - graphX;
          relpointY = y - graphY;
          graphX += Math.round(-relpointX * amount + relpointX);
          graphY += Math.round(-relpointY * amount + relpointY);
          scale *= amount;
          update();
        };
        MouseWheelHandler = function(event){
          if (!event.altKey) {
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          if ((event.wheelDelta || -event.detail) > 0) {
            return scaleFromMouse(1.1, event);
          } else {
            return scaleFromMouse(0.9, event);
          }
        };
        mousewheelevt = /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel";
        elem.addEventListener(mousewheelevt, MouseWheelHandler, false);
        simpleEdge = element.find('.emptyEdge')[0];
        setEdgePath = function(iniX, iniY, endX, endY){
          var xpoint;
          xpoint = (endX - iniX) / 4;
          return simpleEdge.setAttribute('d', "M " + iniX + " " + iniY + " \nH " + (iniX + 0.5 * xpoint) + " \nC " + (iniX + 2 * xpoint) + "," + iniY + " " + (iniX + xpoint * 2) + "," + endY + " " + (iniX + xpoint * 4) + "," + endY + " \nH " + endX);
        };
        popupState = {
          x: 0,
          y: 0,
          startNode: 0,
          startPort: 0
        };
        startEdge = function(elem, position, ev){
          this.hidePopup();
          edgeIniX = elem.offsetLeft + position.x;
          edgeIniY = elem.offsetTop + elem.offsetHeight * 0.75 + position.y;
          return setEdgePath(edgeIniX, edgeIniY, edgeIniX, edgeIniY);
        };
        moveEdge = function(event){
          var ref$, x, y;
          ref$ = mapMouseToScene(event), x = ref$.x, y = ref$.y;
          return setEdgePath(edgeIniX, edgeIniY, x, y);
        };
        endEdge = function(){
          return simpleEdge.setAttribute('d', "M 0 0");
        };
        showPopup = function(event, startNode, startPort, endNode, endPort){
          var ref$, x, y, x$;
          scope.popupText = '';
          ref$ = mapMouseToView(event), x = ref$.x, y = ref$.y;
          importAll$(popupState, {
            x: x,
            y: y
          });
          x$ = popupState;
          x$.startNode = startNode;
          x$.startPort = startPort;
          x$.endNode = endNode;
          x$.endPort = endPort;
          popup.style[cssTransform] = "translate(" + Math.round(x) + "px," + Math.round(y - popupHeight / 2) + "px)";
          $popup.show();
          $popupInput.focus();
          return scope.$digest();
        };
        popupSubmit = function(content){
          var comp;
          comp = newComponent(content, popupState);
          popupState.startNode == null && (popupState.startNode = comp.id);
          popupState.endNode == null && (popupState.endNode = comp.id);
          scope.visualData.connections.push({
            startNode: popupState.startNode,
            startPort: popupState.startPort,
            endNode: popupState.endNode,
            endPort: popupState.endPort
          });
          hidePopup();
          return endEdge();
        };
        hidePopup = function(){
          return $popup.hide();
        };
        hidePopupAndEdge = function(){
          $popup.hide();
          return endEdge();
        };
        scope.newMacroModal = function(){
          var form, modalInstance;
          form = {
            name: '',
            description: ''
          };
          modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: function($scope, $modalInstance){
              $scope.form = form;
              $scope.cancel = function(){
                return $modalInstance.dismiss('cancel');
              };
              $scope.ok = function(){
                $modalInstance.close(form);
              };
            }
          });
          return modalInstance.result.then(function(selectedItem){
            scope.graph.newMacro(form.name, form.description);
            return form.name = form.description = '';
          });
        };
        scope.newCommandAtTopLeft = function(command){
          return newCommandComponent(command, mapPointToScene(0, 0));
        };
        y$ = this;
        y$.removeComponent = function(id){
          var x$, res$, i$, ref$, len$, x;
          console.log("removing component");
          x$ = scope.visualData;
          res$ = [];
          for (i$ = 0, len$ = (ref$ = scope.visualData.components).length; i$ < len$; ++i$) {
            x = ref$[i$];
            if (x.id !== id) {
              res$.push(x);
            }
          }
          x$.components = res$;
          res$ = [];
          for (i$ = 0, len$ = (ref$ = scope.visualData.connections).length; i$ < len$; ++i$) {
            x = ref$[i$];
            if (x.startNode !== id && x.endNode !== id) {
              res$.push(x);
            }
          }
          x$.connections = res$;
        };
        y$.isFreeSpace = function(elem){
          return elem === svgElem || elem === workspace || elem === nodesElem;
        };
        y$.showPopup = showPopup;
        y$.nodesElement = nodesElem;
        y$.popupSubmit = popupSubmit;
        y$.hidePopup = hidePopup;
        y$.hidePopupAndEdge = hidePopupAndEdge;
        y$.nodesElement = nodesElem;
        y$.newCommandComponent = newCommandComponent;
        y$.newMacroComponent = newMacroComponent;
        y$.startEdge = startEdge;
        y$.moveEdge = moveEdge;
        y$.endEdge = endEdge;
        y$.isMacroView;
        y$.updateScope = function(){
          return scope.$digest();
        };
        y$.getVisualData = function(){
          return scope.visualData;
        };
        y$.mapPointToScene = mapPointToScene;
        y$.mapMouseToScene = mapMouseToScene;
        y$.mapMouseToView = mapMouseToView;
        y$.setGraphView = function(view){
          hidePopupAndEdge();
          scope.visualData = view;
          scope.$digest();
        };
        y$.revertToRoot = function(){
          scope.visualData = graphModel;
        };
        y$.newMacro = function(name, descr){
          var res$, key;
          graphModel.macros[name] = shellParser.createMacro(name, descr);
          res$ = [];
          for (key in graphModel.macros) {
            res$.push(key);
          }
          graphModel.macroList = res$;
        };
        y$.translateNode = function(id, position, x, y){
          var i$, ref$, len$, el;
          position.x += x / scale;
          position.y += y / scale;
          for (i$ = 0, len$ = (ref$ = edgesElem.querySelectorAll("[connector]")).length; i$ < len$; ++i$) {
            el = ref$[i$];
            $(el).scope().updateWithId(id);
          }
        };
      }
    ]
  };
});
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}
function importAll$(obj, src){
  for (var key in src) obj[key] = src[key];
  return obj;
}
/*
##sidebar

app.directive 'sidebar', ['$document', ($document) ->
  replace: false
  scope: true
  require: '^graphModel'
  controller: ($scope, $element, $modal, $attrs) ->
    form =
      name:''
      description:''    
    console.log $scope.graph
    $scope.implementedCommands = shellParser.implementedCommands
    $scope.open = -> 
      modalInstance = $modal.open {
        templateUrl: 'myModalContent.html'
        controller: ($scope, $modalInstance) !->
          ctrl = this
          $scope.form = form
          $scope.cancel = -> $modalInstance.dismiss('cancel');
          $scope.ok = !-> $modalInstance.close(form);
        resolve:
          items: -> $scope.items
      }

      modalInstance.result.then (selectedItem) ->
        $scope.graph.newMacro form.name, form.description
        form.name = form.description = ''

  link:(scope, element, attr,graphModelCtrl) !->
    requestAnimationFrame ->
      element.find('a[data-command]').each (index) ->
        $ this .bind 'click', (ev)->
          console.log ev
          graphModelCtrl.newCommandComponent do
            $(this).attr(\data-command)
            graphModelCtrl.mapPointToScene 0,0
          graphModelCtrl.updateScope!


  templateUrl: 'sidebarModel.html'

]


app.directive 'sidebarMacroComponent',  ->
  replace: true
  require: '^graphModel'
  scope:
      sidebarMacroComponent: '='
  link: (scope, element, attrs, graphModelCtrl) !->
      scope.selectItem = !->
        name = scope.sidebarMacroComponent
        graphModelCtrl.newMacroComponent graphModelCtrl.mapPointToScene 0,0
        #console.log graphModelCtrl.getVisualData!.macros[name]
  template: """
      <li>
          <a ng-click='selectItem()'>
              {{sidebarMacroComponent}}
          </a>
      </li>"""
# */
var activeDrop;
activeDrop = null;
app.directive('dropdownSelect', [
  '$document', function($document){
    return {
      restrict: 'A',
      replace: true,
      scope: {
        dropdownSelect: '=',
        dropdownModel: '=',
        dropdownOnchange: '&'
      },
      controller: [
        '$scope', '$element', '$attrs', function($scope, $element, $attrs){
          var body;
          this.select = function(selected){
            $scope.dropdownModel = selected;
            $scope.dropdownOnchange({
              selected: selected
            });
          };
          body = $document.find("body");
          body.bind("click", function(){
            $element.removeClass('active');
            activeDrop = null;
          });
          $element.bind('click', function(event){
            event.stopPropagation();
            if (activeDrop && activeDrop !== $element) {
              activeDrop.removeClass('active');
              activeDrop = null;
            }
            $element.toggleClass('active');
            activeDrop = $element;
          });
        }
      ],
      template: "<div class='wrap-dd-select'>\n    <span class='selected'>{{dropdownModel}}</span>\n    <ul class='dropdown'>\n        <li ng-repeat='item in dropdownSelect'\n            class='dropdown-item'\n            dropdown-select-item='item'>\n        </li>\n    </ul>\n</div>"
    };
  }
]);
app.directive('dropdownSelectItem', [function(){
  return {
    require: '^dropdownSelect',
    replace: true,
    scope: {
      dropdownSelectItem: '='
    },
    link: function(scope, element, attrs, dropdownSelectCtrl){
      scope.selectItem = function(){
        dropdownSelectCtrl.select(scope.dropdownSelectItem);
      };
    },
    template: "<li>\n    <a href='' class='dropdown-item'\n        ng-click='selectItem()'>\n        {{dropdownSelectItem}}\n    </a>\n</li>"
  };
}]);