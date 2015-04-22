###
 * This directive hides and shows the sticky navbar if the scroll position
 * is below or above the quote summary section.
###

angular.module "DirectAsia"
	.directive "modal", ->
		restrict: "E"
		scope:
			shown: "="
		transclude: false
		link: (scope, element, attrs) ->

			$(element).on "hide.bs.modal", ->
				scope.shown = true
				scope.$apply()