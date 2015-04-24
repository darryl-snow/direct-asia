/* direct-asia : 0.0.0 : Fri Apr 24 2015 20:37:10 GMT+0800 (CST) */

/*
 * This directive hides and shows the sticky navbar if the scroll position
 * is below or above the quote summary section.
 */
angular.module("DirectAsia").directive("modal", function() {
  return {
    restrict: "E",
    scope: {
      shown: "="
    },
    transclude: false,
    link: function(scope, element, attrs) {
      return $(element).on("hide.bs.modal", function() {
        scope.shown = true;
        return scope.$apply();
      });
    }
  };
});
