/* direct-asia : 0.0.0 : Mon Mar 30 2015 01:01:54 GMT+0800 (CST) */
angular.module("DirectAsia").controller("aboutYourDriverController", [
  "$scope", function($scope) {
    $scope.driver = {
      own_car: "",
      date_of_birth_day: "",
      date_of_birth_month: "",
      date_of_birth_year: "",
      gender: "",
      status: "",
      occupation: "",
      discount: "",
      residential: "",
      drivingLicense: "",
      demerit_points: "",
      refused_insurance: "",
      faultAccidents: "",
      notfaultAccidents: "",
      additional_drivers: "",
      additional_drivers_accidents: ""
    };
    $scope.proceed = {
      no_content: false
    };

    $scope.proceed.click = function() {
      $scope.proceed.no_content = true;
    };
    $scope.helps = {
      name: "",
      email: "",
      number: "",
      no_content: false,
      submit: false
    };
    $scope.helps.click = function() {
      if (!$scope.helps.name || !$scope.helps.email || !$scope.helps.number) {
        return $scope.helps.no_content = true;
      } else {
        return $scope.helps.submit = true;
      }
    };
    $scope.select = function(value, property) {
      return $scope.driver[property] = value;
    };
    $scope.occupations = ["Taxi Driver", "Truck Driver"];
    $scope.residentials = ["Hong Kong", "New Territories", "Kowloon"];
    $scope.drivingLicenses = ["1", "2", "3", "4", "5", "more than 5"];
    $scope.discounts = ["0%", "20%", "30%", "40%", "50%", "60%"];
    $scope.faults = ["0", "1", "2", "3", "4", "5", "5+"];
    return $scope.notFaults = ["0", "1", "2", "3", "4", "5", "5+"];
  }
]);
