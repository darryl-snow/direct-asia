###
The controller ties together the view with the model.

In this case the view is the components/car file and the model
is the $scope.car variable.
###

getMockData = ->
	data = models: [
		'Golf'
		'Micra'
		'Sera'
	]

angular.module('DirectAsia').controller 'CarCtrl', [
	'$scope'
	'Car'
	($scope, Car) ->

		getDataFromAPI = ->
			dataFromAPI = {}
			$http.get('http://api-url?lang=' + $rootScope.currentLanguage).success((data, status, headers, config) ->
				dataFromAPI = data
				return
			).error (data, status, headers, config) ->
				console.error data
				return
			dataFromAPI

		setupData = (data) ->
			$scope.car = new Car
			$scope.models = data.models
			return

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

		# setupData(getDataFromAPI());
		setupData getMockData()
		return
]

# ---
# generated by js2coffee 2.0.3