angular.module "DirectAsia"
	.controller "aboutYourDriverController", ["$scope", ($scope) ->

		$scope.driver =
			own_car: ""
			date_of_birth: ""
			gender: ""
			status: ""
			occupation: ""
			discount: "50%"
			residential: ""
			valid_driving: ""
			demerit_points: ""
			refused_insurance: ""
			accidents: ""
			additional_drivers: ""
			additional_drivers_accidents: ""
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

		$scope.select = (value, property) ->
			$scope.driver[property] = value

		$scope.occupations = [
			"Taxi Driver"
			"Truck Driver"
		]
		$scope.residentials = [
			"Hong Kong"
			"New Territories"
			"Kowloon"
		]
		$scope.drivingLicenses = [
			"1"
			"2"
			"3"
			"4"
			"5"
			"more than 5"
		]
		$scope.discounts = [
			"0%"
			"20%"
			"30%"
			"40%"
			"50%"
			"60%"
		]
		$scope.faults = [
			"0"
			"1"
			"2"
			"3"
			"4"
			"5"
			"5+"
		]
		$scope.notFaults = [
			"0"
			"1"
			"2"
			"3"
			"4"
			"5"
			"5+"
		]
	]