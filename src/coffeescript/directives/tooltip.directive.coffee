###
Directive for showing Bootstrap tooltips

Any element with the class 'showTooltip' will have a tooltip
shown on mouseover
###

angular.module "DirectAsia"
	.directive "showTooltip", ->
		restrict: "C"
		link: (scope, element, attrs) ->

			element.tooltip()