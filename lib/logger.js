var logger = module.exports = {
  log: function(componentName, notFoundList) {
    var paramNames = notFoundList.map(function(p) { return p.name; })

    console.log(componentName + ': ', paramNames.join(', '));
  }
};