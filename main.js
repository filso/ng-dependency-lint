var esprima = require('esprima'),
  astral = require('astral')();

// register ng linter in astral
require('./lint')(astral);
exports.lint = function(inputCode, options) {
  global.inputCode = inputCode;

  var ast = esprima.parse(inputCode, {
    tolerant: true,
    range: true,
    tokens: true
  });

  astral.run(ast);
};