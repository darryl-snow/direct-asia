###
The controller ties together the view with the model.

In this case the view is the components/quote file and the model
is the $scope.quote variable.
###

angular.module "DirectAsia"
	.controller "QuoteCtrl", ["$scope", "$http", ($scope, $http) ->

		# mock data about available plans
		$scope.plans = [
			name: "Comprehensive"
			baseCost: 732
		,
			name: "Third-Party Fire & Theft"
			baseCost: 594
		,
			name: "Third-Party"
			baseCost: 540
		]

		$scope.selectedPlan = $scope.plans[0]

		# mock data about driver & car
		
		$scope.data =
			driver: "Female, 37 years old, 30% NCD, Certificate of Merit, 1st fault claim"
			car: "2010 Honda Civic, Low Mileage"

		$scope.feedbackOptions = [
			"Friends & Family"
			"TV"
			"Online"
			"Print/Billboards"
			"Social"
			"Taxi"
			"Cinema"
			"Other"
		]

		$scope.select = (value, index, property) ->
			$scope.car[property] = value

		$scope.selectPlan = (plan) ->
			$scope.selectedPlan = plan

		$scope.getData = ->

			$http.get "http://api-url"
				.success (data, status, headers, config) ->

					# data about available plans
					$scope.plans = data.plans
					$scope.selectedPlan = $scope.plans[0]

					# data about the car and driver
					$scope.data = data.data

				.error (data, status, headers, config) ->
					console.error data

		$scope.saveData = ->
			console.log "saving..."
	]