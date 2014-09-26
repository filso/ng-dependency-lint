

var handler = module.exports = {
  handle: function(componentName, notFoundList) {
    if (this.mode == LOGGING) {
      console.log(componentName + ': ', notFoundList.join(', '));
    } else if (this.mode == CLEAN) {
      
    }
  }
};