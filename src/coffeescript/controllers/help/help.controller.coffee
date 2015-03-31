angular.module "DirectAsia"
	.controller "helpController", ["$scope", ($scope) ->

		$scope.helps =
			name: ""
			email: ""
			number: ""
			no_content: false
			submit: false

		$scope.helps.click = ->

			if !$scope.helps.name or !$scope.helps.email or !$scope.helps.number

				$scope.helps.no_content = true

			else

				$scope.helps.submit = true

	]