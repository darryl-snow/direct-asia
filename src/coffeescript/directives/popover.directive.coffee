###
Directive for showing Bootstrap popovers

Any element with the attribute 'popover' will have a popover
shown on click
###

angular.module "DirectAsia"
	.directive "popover", ->
		restrict: "A"
		link: (scope, element, attrs) ->

			###
			We have different types of popovers, which we specify in the element's
			'popoverType' attribute
			###
			type = if attrs.popoverType then attrs.popoverType else ""

			###
			In the 'popover' attribute, we specify the element containing
			the popover's HTML
			###
			el = attrs.popover

			###
			Activate the popover
			###
			element.popover
				html: true
				template: "<div class='popover " + type +
				 "' role='tooltip'><div class='arrow'></div>" +
				 "<h3 class='popover-title'></h3><div class='popover-content'></div></div>"
				content: ->
					###
					create an element from the popover html
					###
					angular.element(el).html()

			###
			add an event listener on the popover's close button so that
			the popover is closed when the close button is clicked
			###
			element.on "shown.bs.popover", ->
				closeButton = element.next().find ".popover-close-button"
				closeButton.on "click", (e) ->
					e.preventDefault()
					element.popover "hide"