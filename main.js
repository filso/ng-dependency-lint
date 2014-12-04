var esprima = require('esprima'),
  astral = require('astral')();

// register ng linter in astral
require('./lint')(astral);
exports.lint = function(inputCode, options) {
  global.inputCode = inputCode;
  global.outputCode = inputCode;
  global.options = options;

  var ast = esprima.parse(inputCode, {
    tolerant: true,
    range: true,
    tokens: true
  });


  astral.run(ast);

  return global.outputCode;

};