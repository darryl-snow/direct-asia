angular.module "DirectAsia"
	.directive "toggleButtons", ->
		restrict: "E"
		transclue: true
		link: (scope, element, attrs) ->

			scope.select = (property, value) ->
				scope.car[property] = value