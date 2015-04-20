###
UNFINISHED
###

angular.module "DirectAsia"
	.controller "SOSCtrl", ["$scope", ($scope) ->

		###
		Default data for main driver
		###
		$scope.maindriver =
			kmsperyear: "24 - 35"
			yearslicensed: 3
			yearscovered: undefined
			claims: [
				number: 1
				day: "01"
				month: "Mar"
				year: "2013"
				nature: "Collision w/Stationary Object"
				vehicleInvolved: true
			]

		###
		Default options for years select input
		###
		$scope.years = (year for year in [1..$scope.maindriver.yearslicensed])

		###
		Default options for nature of claim select input
		###
		$scope.natures = [
			"Collision w/ Stationary Object"
		]

		###
		Default data for additional drivers
		###
		$scope.additionalDrivers = [
			firstName: undefined
			lastName: undefined
			dob: undefined
			gender: undefined
			claims: [
				number: 1
				date: undefined
				nature: undefined
				vehicleInvolved: true
			]
		]

		###
		A scope function to manually update the model from the view.
		###

		$scope.selectMainDriver = (value, index, property) ->
			$scope.maindriver[property] = value

		$scope.addAdditionalDriver = ->

		$scope.SelectAdditionalDriver = (driver) ->

	]