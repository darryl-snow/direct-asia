###
Directive for toggle buttons - buttons that toggle the state of a variable
on an underlying model

This will run on any element tag <toggle-buttons>

Because we're using transclude, the directive shares the parent scope.
This directive simply adds a function 'select' to the parent scope, allowing
the element to change the property of the parent scope's 'car' variable

e.g.
<toggle-buttons ng-click="select('make', 'nissan')"></toggle-buttons>
###

angular.module "DirectAsia"
	.directive "toggleButtons", ->
		restrict: "E"
		transclue: true
		link: (scope, element, attrs) ->

			scope.select = (property, value) ->
				scope.car[property] = value