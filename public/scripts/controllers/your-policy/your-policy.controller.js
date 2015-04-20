/* direct-asia : 0.0.0 : Mon Apr 20 2015 21:50:45 GMT+0800 (CST) */
angular.module("DirectAsia").controller("yourPolicy", [
  "$scope", function($scope) {
    $scope.countries = ["Singapore", "malaysia"];
    $scope.policyholders = ["Policyholder 1", "Policyholder 2"];
    $scope.driver1policyholders = ["Policyholder 1", "Policyholder 2"];
    $scope.driver2policyholders = ["Policyholder 1", "Policyholder 2"];
    $scope.residentials = ["Address line 1", "Address line 2", "Residential district"];
    $scope.driver1residentials = ["Address line 1", "Address line 2", "Residential district"];
    return $scope.driver2residentials = ["Address line 1", "Address line 2", "Residential district"];
  }
]);
