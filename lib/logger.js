var logger = module.exports = {
  log: function(componentName, notFoundList) {
    console.log(componentName + ': ', notFoundList.join(', '));
  }
};