###
 * This directive works on elements with a 'full-page-height' attribute.
 * It simply sets the minimum height of the element to be the height of
 * the browser window, to make sections appear to be full-page.
###

angular.module "DirectAsia"
	.directive "fullPageHeight", ->
		restrict: "A"
		link: (scope, element, attrs) ->
			$(element).css "min-height", $(window).height()