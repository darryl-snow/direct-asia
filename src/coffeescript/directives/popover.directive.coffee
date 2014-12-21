angular.module "DirectAsia"
	.directive "popover", ->
		restrict: "A"
		link: (scope, element, attrs) ->

			type = if attrs.popoverType then attrs.popoverType else ""
			el = attrs.popover

			element.popover
				html: true
				template: "<div class='popover " + type +
				 "' role='tooltip'><div class='arrow'></div>" +
				 "<h3 class='popover-title'></h3><div class='popover-content'></div></div>"
				content: ->
					angular.element(el).html()

			element.on "shown.bs.popover", ->
				closeButton = element.next().find ".popover-close-button"
				closeButton.on "click", (e) ->
					e.preventDefault()
					element.popover "hide"