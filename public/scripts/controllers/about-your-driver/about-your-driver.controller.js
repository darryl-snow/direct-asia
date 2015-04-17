/* direct-asia : 0.0.0 : Sat Apr 18 2015 03:30:34 GMT+0800 (CST) */

/* direct-asia : 0.0.0 : Mon Apr 13 2015 16:14:41 GMT+0800 (CST) */
var getMockData;

getMockData = function() {
  var data;
  return data = {
    occupations: ['Taxi Driver', 'Truck Driver'],
    residentials: ['Hong Kong', 'New Territories', 'Kowloon'],
    drivingExperiences: ['1', '2', '3', '4', '5', 'more than 5'],
    discounts: ['0%', '20%', '30%', '40%', '50%', '60%'],
    faults: ['0', '1', '2', '2+'],
    notFaults: ['0', '1', '2', '2+']
  };
};

angular.module('DirectAsia').controller('aboutYourDriverCtrl', [
  '$scope', 'MainDriver', function($scope, MainDriver) {
    var getDataFromAPI, setupData;
    getDataFromAPI = function() {
      var dataFromAPI;
      dataFromAPI = {};
      $http.get('http://api-url?lang=' + $rootScope.currentLanguage).success(function(data, status, headers, config) {
        dataFromAPI = data;
      }).error(function(data, status, headers, config) {
        console.error(data);
      });
      return dataFromAPI;
    };
    setupData = function(data) {
      $scope.driver = new MainDriver;
      $scope.occupations = data.occupations;
      $scope.residentials = data.residentials;
      $scope.drivingExperiences = data.drivingExperiences;
      $scope.discounts = data.discounts;
      $scope.faults = data.faults;
      $scope.notFaults = data.notFaults;
    };
    $scope.select = function(value, property) {
      return $scope.driver[property] = value;
    };
    setupData(getMockData());
  }
]);
