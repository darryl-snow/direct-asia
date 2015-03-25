/* direct-asia : 0.0.0 : Wed Mar 25 2015 22:42:52 GMT+0800 (CST) */

/*
The controller ties together the view with the model.

In this case the view is the components/quote file and the model
is the $scope.quote variable.
 */
angular.module("DirectAsia").controller("QuoteCtrl", [
  "$scope", "$http", function($scope, $http) {
    $scope.plans = [
      {
        name: "Comprehensive",
        baseCost: 732
      }, {
        name: "Third-Party Fire & Theft",
        baseCost: 594
      }, {
        name: "Third-Party",
        baseCost: 540
      }
    ];
    $scope.selectedPlan = $scope.plans[0];
    $scope.data = {
      driver: "Female, 37 years old, 30% NCD, Certificate of Merit, 1st fault claim",
      car: "2010 Honda Civic, Low Mileage"
    };
    $scope.feedbackOptions = ["Friends & Family", "TV", "Online", "Print/Billboards", "Social", "Taxi", "Cinema", "Other"];
    $scope.select = function(value, index, property) {
      return $scope.car[property] = value;
    };
    $scope.selectPlan = function(plan) {
      return $scope.selectedPlan = plan;
    };
    $scope.getData = function() {
      return $http.get("http://api-url").success(function(data, status, headers, config) {
        $scope.plans = data.plans;
        $scope.selectedPlan = $scope.plans[0];
        return $scope.data = data.data;
      }).error(function(data, status, headers, config) {
        return console.error(data);
      });
    };
    return $scope.saveData = function() {
      return console.log("saving...");
    };
  }
]);
