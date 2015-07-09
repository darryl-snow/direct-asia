/* direct-asia : 0.0.0 : Thu Jul 09 2015 15:47:23 GMT+0800 (CST) */

/*
Directive for showing Bootstrap tooltips

Any element with the class 'showTooltip' will have a tooltip
shown on mouseover
 */
angular.module("DirectAsia").directive("showTooltip", function() {
  return {
    restrict: "C",
    scope: {
      text: "@",
      title: "@"
    },
    link: function(scope, element, attrs) {
      return element.tooltip({
        title: scope.text ? encodeURI(scope.text) : encodeURI(scope.title)
      });
    }
  };
});
