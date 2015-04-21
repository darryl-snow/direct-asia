/* direct-asia : 0.0.0 : Tue Apr 21 2015 11:54:47 GMT+0800 (CST) */

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
    var getDataFromAPI, getTomorrowsDate, setupData;
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
    		This is a private function to get tomorrow's date for the default
    		plan start date
     */
    getTomorrowsDate = function() {
      var today, tomorrow;
      today = new Date();
      return tomorrow = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate() + 1);
    };

    /*
    		This private function formats the data returned from the server so that it
    		can be used on the page
     */
    setupData = function(data) {
      var tomorrow;
      $scope.car = new Car;
      tomorrow = getTomorrowsDate();
      $scope.car.policy.start.day = tomorrow.getDate();
      $scope.car.policy.start.month = tomorrow.getMonth();
      $scope.car.policy.start.year = tomorrow.getFullYear();
      return $scope.models = data.models;
    };

    /*
    		This function is used for validating whether the selected start date is more
    		more than 3 months in the future
     */
    $scope.startDateWithin3Months = function() {
      var months, startDate, today;
      today = new Date();
      startDate = new Date($scope.car.policy.start.year, $scope.car.policy.start.month - 1, $scope.car.policy.start.day);
      months = (startDate.getFullYear() - today.getFullYear()) * 12;
      months -= today.getMonth() + 1;
      months += startDate.getMonth() + 1;
      return months <= 3;
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
