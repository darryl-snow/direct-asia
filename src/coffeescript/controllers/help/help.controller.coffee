###
The controller ties together the view with the model.

In this case the view is the partials/help/help file and the main model
is the $scope.supportRequest variable.
###

angular.module "DirectAsia"
	.controller "helpCtrl", ["$scope", "$http", ($scope, $http) ->

		###
		Setup scope variables
		###

		$scope.supportRequest =
			name: ""
			email: ""
			number: ""

		$scope.open = false
		$scope.sent = false

		###
		Show the help popover
		###

		$scope.showPopover = ->
			$scope.open = true

		###
		Hide the help popover
		###

		$scope.hidePopover = ->
			$scope.open = false

		###
		Submit the support request to the server
		###

		$scope.sendRequest = ->

			$http
				method: "POST"
				url: "http://api:port/support"
				data: $scope.supportRequest
			.success (response) ->

				###
				Hide the form and show the success message.
				After 4 seconds hide the popover.
				###

				$scope.sent = true

				setTimeout ->
					$scope.showPopover = false
				, 4000

			.error (response, status) ->

				###
				The data could not be sent - log the error to the console
				###

				console.error "The request failed with response " +
				 response + " and status code " + status

	]