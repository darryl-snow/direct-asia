/* direct-asia : 0.0.0 : Tue Mar 31 2015 14:15:31 GMT+0800 (CST) */

/*
Directive for showing Bootstrap tooltips

Any element with the class 'showTooltip' will have a tooltip
shown on mouseover
 */
angular.module("DirectAsia").directive("showTooltip", function() {
  return {
    restrict: "C",
    link: function(scope, element, attrs) {
      return element.tooltip();
    }
  };
});
