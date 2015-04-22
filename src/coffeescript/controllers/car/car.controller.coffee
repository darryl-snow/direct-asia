###

TESTING ONLY - can be deleted before production

This function simply mocks data that would be returned
from a back-end API. Data should include:

- available car models

###

getMockData = ->
	data = models: [
		'Golf'
		'Micra'
		'Sera'
	]

###
The controller ties together the view with the model.

In this case the view is the partials/car/car file and the main model
is the $scope.car variable.
###

angular.module('DirectAsia').controller 'CarCtrl', [
	'$scope'
	'Car'
	($scope, Car) ->

		thisYear = (new Date()).getFullYear()

		###
		This private function fetches data from the back-end to be used on the page

		(NOTE: This isn't used currently as the data is mocked by the
		function getMockData() above)
		###

		getDataFromAPI = ->
			dataFromAPI = {}
			$http.get('http://api-url?lang=' + $rootScope.currentLanguage).success((data, status, headers, config) ->
				dataFromAPI = data
			).error (data, status, headers, config) ->
				console.error data
			dataFromAPI

		###
		This is a private function to get tomorrow's date for the default
		plan start date
		###

		getTomorrowsDate = ->
			today = new Date()
			tomorrow = new Date today.getFullYear(), (today.getMonth() + 1), (today.getDate() + 1)

		###
		This private function formats the data returned from the server so that it
		can be used on the page
		###

		setupData = (data) ->
			$scope.car = new Car

			tomorrow = getTomorrowsDate()

			$scope.car.policy.start.day = tomorrow.getDate()
			$scope.car.policy.start.month = tomorrow.getMonth()
			$scope.car.policy.start.year = tomorrow.getFullYear()

			$scope.models = data.models

			$scope.age = 0

			$scope.modalShown = false

		$scope.$watch "car.year", ->
			age = thisYear - $scope.car.year
			if !isNaN age then $scope.age = age

		###
		This function is used for validating whether the selected start date is more
		more than 3 months in the future
		###

		$scope.startDateWithin3Months = ->
			today = new Date()
			startDate = new Date $scope.car.policy.start.year, ($scope.car.policy.start.month - 1), $scope.car.policy.start.day
			months = (startDate.getFullYear() - today.getFullYear()) * 12
			months -= today.getMonth() + 1
			months += startDate.getMonth() + 1
			months <= 3

		###
		This function is used for validating that the selected end date is after the start date
		###

		$scope.endDateAfterStartDate = ->
			startDate = new Date $scope.car.policy.start.year, ($scope.car.policy.start.month - 1), $scope.car.policy.start.day
			endDate = new Date $scope.car.policy.end.year, ($scope.car.policy.end.month - 1), $scope.car.policy.end.day
			endDate - startDate > 0

		###
		A scope function to manually update the model from the view.
		Most often angular will handle this automatically:

		e.g.
		<input ng-model="car.make" value='VW'> <-- change input value to update the model

		But sometimes it may need to be done manually as well...

		e.g.
		<button ng-click="select('make', 'Nissan')">Nissan</button>
		###

		$scope.select = (value, index, property) ->
			$scope.car[property] = value

		###
		Setup the data on the page using that returned from the server or mocked.
		###

		###
		setupData(getDataFromAPI());
		###
		setupData getMockData()
]