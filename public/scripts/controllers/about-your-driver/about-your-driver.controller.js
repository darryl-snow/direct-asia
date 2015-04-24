/* direct-asia : 0.0.0 : Fri Apr 24 2015 20:37:10 GMT+0800 (CST) */

/*

TESTING ONLY - can be deleted before production

This function simply mocks data that would be returned
from a back-end API. Data should include:

- available occupation options
- avilable residential district options
- available driving experience options
- available NCD options
- available at fault options
- available not at fault options
 */
var getMockData;

getMockData = function() {
  var data;
  return data = {
    occupations: ["Taxi Driver", "Truck Driver"],
    residentials: ["Hong Kong", "New Territories", "Kowloon"],
    drivingExperiences: ["1", "2", "3", "4", "5", "more than 5"],
    discounts: ["0%", "20%", "30%", "40%", "50%", "60%"],
    faults: ["0", "1", "2", "2+"],
    notFaults: ["0", "1", "2", "2+"]
  };
};


/*
The controller ties together the view with the model.

In this case the view is the partials/about-your-driver/about-your-driver file and the main model
is the $scope.driver variable.
 */

angular.module("DirectAsia").controller("aboutYourDriverCtrl", [
  "$scope", "MainDriver", "ageFilter", function($scope, MainDriver, ageFilter) {

    /*
    		This private function fetches data from the back-end to be used on the page
    
    		(NOTE: This isn't used currently as the data is mocked by the
    		function getMockData() above)
     */
    var getDataFromAPI, setupData;
    getDataFromAPI = function() {
      var dataFromAPI;
      dataFromAPI = {};
      $http.get("http://api-url?lang=" + $rootScope.currentLanguage).success(function(data, status, headers, config) {
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
      $scope.driver = new MainDriver;
      $scope.occupations = data.occupations;
      $scope.residentials = data.residentials;
      $scope.drivingExperiences = data.drivingExperiences;
      $scope.discounts = data.discounts;
      $scope.faults = data.faults;
      $scope.notFaults = data.notFaults;
      return $scope.modalShown = false;
    };

    /*
    		This is an Angular watch function that calculates and saves the driver's age when
    		they enter their DOB
     */
    $scope.$watchGroup(["driver.dob.day", "driver.dob.month", "driver.dob.year"], function(newValues, oldValues, scope) {
      var age;
      age = ageFilter(newValues[2] + "/" + newValues[1] + "/" + newValues[0]);
      if (!isNaN(age && newValues[0] && newValues[1] && newValues[2])) {
        return $scope.driver.age = age;
      }
    });

    /*
    		This is an Angular watch function that removes values for why no NCD and NCD on
    		other car when the NCD selected is not 0
     */
    $scope.$watch("driver.noClaimsDiscount", function(newValue, oldValue) {
      if (newValue !== 0) {
        $scope.driver.whyNoClaimsDiscount = null;
        return $scope.driver.otherCarNoClaimsDiscount = null;
      }
    });

    /*
    		This is an Angular watch function that removes the value for NCD on
    		other car when the reason for 0% NCD is not that the driver is insured
    		on another policy
     */
    $scope.$watch("driver.whyNoClaimsDiscount", function(newValue, oldValue) {
      if (newValue !== "Insured as a named driver on another policy") {
        return $scope.driver.otherCarNoClaimsDiscount = null;
      }
    });

    /*
    		This function is used for validating whether the driver's age is between 18 and 69
     */
    $scope.isValidAge = function() {
      return $scope.driver.age >= 18 && $scope.driver.age < 70;
    };

    /*
    		This function is required for the custom select fields to work. When the
    		field value changes the corresponding scope variable is updated.
     */
    $scope.select = function(value, property) {
      return $scope.driver[property] = value;
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
