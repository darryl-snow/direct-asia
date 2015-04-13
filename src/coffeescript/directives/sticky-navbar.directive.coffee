###
 * This directive hides and shows the sticky navbar if the scroll position
 * is below or above the quote summary section.
###

angular.module "DirectAsia"
	.directive "stickyNav", ->
		restrict: "A"
		link: (scope, element, attrs) ->
			
			didScroll = false

			$(window).on "scroll", ->
				didScroll = true

			setInterval ->

				if didScroll

					if ($(window).scrollTop() > $("#quote5").offset().top) ||
					($(window).scrollTop() < 0)
						$(element).css "visibility", "hidden"
					else
						$(element).css "visibility", "visible"

			, 250