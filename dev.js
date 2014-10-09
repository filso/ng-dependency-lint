var assert = require('should');

// so we don't have to put the stuff we're testing into a string
var stringifyFunctionBody = require('./test/util').stringifyFunctionBody;
var annotate = function(arg) {
  return require('./main').lint(
    stringifyFunctionBody(arg));
};


var annotated = annotate(function() {
  angular.module('myMod', []).
  directive('myDir', function() {
    return {
      controller: function($scope, bleble, fs, hasdh) {
        $scope.test = true;
        !testVar;
        b / bleble + a;
        a+testVar;
        a-testVar;
        a=testVar;
        a*testVar;
        a/testVar;
        a<testVar;
        a>testVar;
        a&testVar;


      }
    };
  });
});
