angular.module "DirectAsia"
	.directive "showTooltip", ->
		restrict: "C"
		link: (scope, element, attrs) ->

			element.tooltip()