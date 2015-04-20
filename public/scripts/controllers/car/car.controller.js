/* direct-asia : 0.0.0 : Mon Apr 20 2015 17:53:00 GMT+0800 (CST) */

/*

TESTING ONLY - can be deleted before production

This function simply mocks data that would be returned
from a back-end API. Data should include:

- available car models
 */
var getMockData;

getMockData = function() {
  var data;
  return data = {
    models: ['Golf', 'Micra', 'Sera']
  };
};


/*
The controller ties together the view with the model.

In this case the view is the partials/car/car file and the main model
is the $scope.car variable.
 */

angular.module('DirectAsia').controller('CarCtrl', [
  '$scope', 'Car', function($scope, Car) {

    /*
    		This private function fetches data from the back-end to be used on the page
    
    		(NOTE: This isn't used currently as the data is mocked by the
    		function getMockData() above)
     */
    var getDataFromAPI, setupData;
    getDataFromAPI = function() {
      var dataFromAPI;
      dataFromAPI = {};
      $http.get('http://api-url?lang=' + $rootScope.currentLanguage).success(function(data, status, headers, config) {
        return dataFromAPI = data;
      }).error(function(data, status, headers, config) {
        return console.error(data);
      });
      return dataFromAPI;
    };

    /*
    		This private function formats the data returned from the server so that it
    		can be used on the page
     */
    setupData = function(data) {
      $scope.car = new Car;
      return $scope.models = data.models;
    };

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

    /*
    		Setup the data on the page using that returned from the server or mocked.
     */

    /*
    		setupData(getDataFromAPI());
     */
    return setupData(getMockData());
  }
]);
