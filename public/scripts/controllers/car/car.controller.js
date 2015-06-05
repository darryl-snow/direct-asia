/* direct-asia : 0.0.0 : Fri Jun 05 2015 14:14:28 GMT-0400 (AST) */

/*

TESTING ONLY - can be deleted before production

This function simply mocks data that would be returned
from a back-end API. Data should include:

- available car models
 */
var getMockData,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

getMockData = function() {
  var data;
  return data = {
    makes: ["Volkswagon", "Nissan", "Toyota", "xxxx", "Other"],
    models: ["Golf", "Micra", "Sera", "ZZZZ", "Other"],
    years: ["2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004"],
    plan: {
      image: "../../images/comprehensive.png",
      name: "Comprehensive",
      tagline: "",
      covers: ["Third Party - Death or Bodily injury", "Third Party - Property Damage", "Third Party - Collision Damage", "24 hour accident towing", "Own damage - No Other Vehicle Involved", "Windscreen/Window Breakage"]
    }
  };
};


/*
The controller ties together the view with the model.

In this case the view is the partials/car/car file and the main model
is the $scope.car variable.
 */

angular.module("DirectAsia").controller("CarCtrl", [
  "$scope", "Car", function($scope, Car) {
    var getDataFromAPI, getDate, getTomorrowsDate, setupData, thisYear;
    thisYear = (new Date()).getFullYear();

    /*
    		This private function fetches data from the back-end to be used on the page
    
    		(NOTE: This isn't used currently as the data is mocked by the
    		function getMockData() above)
     */
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
    		This is a private function to get tomorrow's date for the default
    		plan start date
     */
    getTomorrowsDate = function() {
      var today, tomorrow;
      today = new Date();
      return tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    };

    /*
    		This private function formats the data returned from the server so that it
    		can be used on the page
     */
    setupData = function(data) {
      var tomorrow;
      $scope.car = new Car;
      tomorrow = getTomorrowsDate();
      $scope.makes = data.makes;
      $scope.models = data.models;
      $scope.years = data.years;
      $scope.plan = data.plan.name;
      $scope.age = 0;
      return $scope.modalShown = false;
    };
    $scope.$watch("car.year", function() {
      var age;
      age = thisYear - $scope.car.year;
      if (!isNaN(age)) {
        return $scope.age = age;
      }
    });

    /*
    		The date picker returns a formatted string while sometimes the model
    		is a date object so this function just normalises the date
     */
    getDate = function(d) {
      var date;
      date = d;
      if (date.indexOf("/" !== -1)) {
        date = date.split("/");
        date = date.reverse();
        date = date.join("/");
        date = new Date(date);
      }
      return date;
    };

    /*
    		This function is used to validate whether the selected start date is on
    		or after tomorrow
     */
    $scope.startDateOnOrAfterTomorrow = function() {
      var startDate, tomorrow;
      tomorrow = getTomorrowsDate();
      startDate = getDate($scope.car.policy.startDate);
      return (startDate - tomorrow) >= 0;
    };

    /*
    		This function is used for validating whether the selected start date is more
    		more than 3 months in the future
     */
    $scope.startDateWithin3Months = function() {
      var months, startDate, today;
      today = new Date();
      startDate = getDate($scope.car.policy.startDate);
      months = (startDate.getFullYear() - today.getFullYear()) * 12;
      months -= today.getMonth() + 1;
      months += startDate.getMonth() + 1;
      return months <= 3;
    };

    /*
    		This function is used for validating that the selected end date is after the start date
     */
    $scope.endDateAfterStartDate = function() {
      var endDate, startDate;
      startDate = getDate($scope.car.policy.startDate);
      endDate = getDate($scope.car.policy.endDate);
      return (endDate - startDate) > 0;
    };

    /*
    		This function is used for validating that the selected end date is within 7 and 18 months
    		after the selected start date
     */
    $scope.endDateWithin7And18MonthsAfterStartDate = function() {
      var endDate, months, startDate;
      startDate = getDate($scope.car.policy.startDate);
      endDate = getDate($scope.car.policy.endDate);
      months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
      months -= startDate.getMonth() + 1;
      months += endDate.getMonth() + 1;
      return months >= 7 && months <= 18;
    };

    /*
    		This function is used for validating that the selected car make & model is
    		covered. If not a modal should be shown.
     */
    $scope.carIsCovered = function() {
      var ref, ref1;
      return (ref = $scope.car.make, indexOf.call($scope.makes, ref) >= 0) && (ref1 = $scope.car.model, indexOf.call($scope.models, ref1) >= 0);
    };

    /*
    		This function is used for validating that the car is not more than 10 years old.
     */
    $scope.carIsNotMoreThan10YearsOld = function() {
      return (new Date()).getFullYear() - $scope.car.year <= 10;
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
