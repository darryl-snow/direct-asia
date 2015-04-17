###
Directive for showing Bootstrap tooltips

Any element with the class 'showTooltip' will have a tooltip
shown on mouseover
###

angular.module "DirectAsia"
	.directive "showTooltip", ->
		restrict: "C"
		scope:
			text: "@"
			title: "@"
		link: (scope, element, attrs) ->

			element.tooltip
				title: if scope.text then encodeURI(scope.text) else encodeURI(scope.title)