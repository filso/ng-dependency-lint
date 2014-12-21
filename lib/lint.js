
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

  if (notFoundList.length > 0 || global.options.separateWithNewline) {
    if (global.options.removeUnused) {
      var str = global.outputCode;

      var ofnp = originalFn.params;
      var paramsRange = [ofnp[0].range[0], ofnp[ofnp.length - 1].range[1]];

      var separateWithNewline = global.options.separateWithNewline;
      var inp = global.inputCode; 


      var justWhitespace = true;

      var whitespace = (function findWhiteSpace() {
        var i = ofnp[0].range[0];
        var ret = '';
        
        for(; i > 0 && inp[i] != '\n'; i--) {
          if (inp[i] != ' ') {
            justWhitespace = false;
          }

        }
        i++;
        
        for(; inp[i] == ' '; i++) {
          ret += ' ';
        }
        return ret;

      })();

      console.log(whitespace, whitespace.length);


      var separator = ', ';
      if (separateWithNewline) {
        // ^\s+

        // console.log('ha!');
        separator = ',\n' + whitespace + '  ';
      }
      var newParamsStr = foundList.map(function(item) { return item.name; }).join(separator);
      if (separateWithNewline && !justWhitespace) {
        newParamsStr = '\n' + whitespace + '  ' + newParamsStr + '\n' + whitespace;
      }
      console.log(newParamsStr);

      var output = inp.slice(0, paramsRange[0]) + newParamsStr + inp.slice(paramsRange[1], inp.length);
      global.outputCode = output;
    }



    logger.log(componentName, notFoundList);
  }

  return originalFn;
};
