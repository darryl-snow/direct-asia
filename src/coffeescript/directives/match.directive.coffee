###
Directive for ensuring 2 input fields match,
e.g. confirm password
###

angular.module "DirectAsia"
	.directive "match", ($parse) ->
		require: "ngModel"
		link: (scope, element, attrs, ctrl) ->

			scope.$watch ->
				$parse(attrs.match)(scope) is ctrl.$modelValue
			, (currentValue) ->
				ctrl.$setValidity "mismatch", currentValue