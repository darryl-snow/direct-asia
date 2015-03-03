###
Directive for dropdown menus containing selectable items.
This will apply to all elements with the class 'input-group'.
###

angular.module "DirectAsia"
	.directive "inputGroup", ->
		restrict: "C"
		link: (scope, element, attrs) ->

			###
			Find the input element in the group
			###
			input = element.find "input"

			###
			Find the list of input options
			###
			links = element.find ".dropdown-menu a"

			###
			When any of the input options are selected then
			update the content of the input element
			###
			links.on "click", (e) ->
				e.preventDefault()
				input.val e.target.innerText