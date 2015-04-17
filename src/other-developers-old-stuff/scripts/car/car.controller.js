function getMockData() {

	return data = {
		models: ["Golf", "Micra", "Sera"]
	};

}

/*
The controller ties together the view with the model.

In this case the view is the components/car file and the model
is the $scope.car variable.
 */
angular.module("DirectAsia").controller("CarCtrl", [
	"$scope", "Car", function($scope, Car) {

		getDataFromAPI = function() {
			var dataFromAPI = {};

			$http.get("http://api-url?lang=" + $rootScope.currentLanguage).success(function(data, status, headers, config) {
				dataFromAPI = data;
			}).error(function(data, status, headers, config) {
				console.error(data);
			});

			return dataFromAPI;
		};

		setupData = function(data) {

			$scope.car = new Car();

			$scope.models = data.models;

		}

		/*
		A scope function to manually update the model from the view.
		Most often angular will handle this automatically:
		
		e.g.
		<input ng-model="car.make" value='VW'> <-- change input value to update the model
		
		But sometimes it may need to be done manually as well...
		
		e.g.
		<button ng-click="select('make', 'Nissan')">Nissan</button>
		 */
		$scope.select = function(value, index, property) {
			return $scope.car[property] = value;
		};

		// setupData(getDataFromAPI());
		setupData(getMockData());

	}
]);