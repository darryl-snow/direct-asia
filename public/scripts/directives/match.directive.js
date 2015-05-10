/* direct-asia : 0.0.0 : Mon May 11 2015 03:49:06 GMT+0800 (CST) */

/*
Directive for ensuring 2 input fields match,
e.g. confirm password
 */
angular.module("DirectAsia").directive("match", function($parse) {
  return {
    require: "ngModel",
    link: function(scope, element, attrs, ctrl) {
      return scope.$watch(function() {
        return $parse(attrs.match)(scope) === ctrl.$modelValue;
      }, function(currentValue) {
        return ctrl.$setValidity("mismatch", currentValue);
      });
    }
  };
});
