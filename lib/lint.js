
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

  var notFoundList = [];

  originalFn.params.forEach(function (param) {
    var symbol = param.name;

    // we look for full word variable - possible surrounded by any non-word symbols
    var regexp = new RegExp('\\W' + escapeRegExp(symbol) + '\\W');

    var found = code.match(regexp);
    if (!found) {
      notFoundList.push(symbol);
    }

  });

  if (notFoundList.length > 0) {
    logger.log(componentName, notFoundList);
  }

  return originalFn;
};
