angular.module "DirectAsia"
	.directive "inputGroup", ->
		restrict: "C"
		link: (scope, element, attrs) ->

			input = element.find "input"
			links = element.find ".dropdown-menu a"

			links.on "click", (e) ->
				e.preventDefault()
				input.val e.target.innerText