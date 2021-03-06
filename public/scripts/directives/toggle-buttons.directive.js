/* direct-asia : 0.0.0 : Thu Jul 09 2015 15:47:23 GMT+0800 (CST) */

/*
Directive for toggle buttons - buttons that toggle the state of a variable
on an underlying model

This will run on any element tag <toggle-buttons>

Because we're using transclude, the directive shares the parent scope.
This directive simply adds a function 'select' to the parent scope, allowing
the element to change the property of the parent scope's 'car' variable

e.g.
<toggle-buttons ng-click="select('make', 'nissan')"></toggle-buttons>
 */
angular.module("DirectAsia").directive("toggleButtons", function() {
  return {
    restrict: "E",
    transclue: true,
    link: function(scope, element, attrs) {
      return scope.select = function(property, value) {
        return scope.car[property] = value;
      };
    }
  };
});
