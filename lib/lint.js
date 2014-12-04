
var logger = require('../lib/logger');

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}


// given an AST chunk for a fn, and component name
// find all unused dependency injections
module.exports = function (componentName, originalFn) {
  // if there's nothing to inject, don't annotate
  if (!originalFn.params || originalFn.params.length === 0) {
    return originalFn;
  }


  // don't search tree, just use regexp for performance reasons
  var range = originalFn.body.range;

  var code = global.inputCode.substr(range[0], range[1] - range[0]);

  // remove comments
  code = code.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, '$1');

  var notFoundList = [], foundList = [];

  originalFn.params.forEach(function (param) {
    var symbol = param.name;

    // we look for full word variable - possible surrounded by any non-word symbols
    var regexp = new RegExp('\\W' + escapeRegExp(symbol) + '\\W');

    var found = code.match(regexp);
    if (!found) {
      notFoundList.push(param);
    } else {
      foundList.push(param);
    }

  });

  if (notFoundList.length > 0) {
    if (global.options.removeUnused) {
      var str = global.outputCode;

      var ofnp = originalFn.params;
      var paramsRange = [ofnp[0].range[0], ofnp[ofnp.length - 1].range[1]];

      var newParamsStr = foundList.map(function(item) { return item.name; }).join(', ');
      console.log(newParamsStr);

      var output = '';
      // toLeave.forEach(function(range, i) {
      //   output += global.inputCode.slice(range[0], range[1]);
      //   console.log('add', range[0], range[1] - range[0]);
      // });

      var inp = global.inputCode; 
      output = inp.slice(0, paramsRange[0]) + newParamsStr + inp.slice(paramsRange[1], inp.length);
      global.outputCode = output;
    }



    logger.log(componentName, notFoundList);
  }

  return originalFn;
};
