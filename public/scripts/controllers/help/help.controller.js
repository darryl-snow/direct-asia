/* direct-asia : 0.0.0 : Fri Apr 03 2015 23:23:49 GMT+0800 (CST) */
angular.module("DirectAsia").controller("helpController", [
  "$scope", function($scope) {
    $scope.helps = {
      name: "",
      email: "",
      number: "",
      no_content: false,
      submit: false
    };
    return $scope.helps.click = function() {
      if (!$scope.helps.name || !$scope.helps.email || !$scope.helps.number) {
        return $scope.helps.no_content = true;
      } else {
        return $scope.helps.submit = true;
      }
    };
  }
]);
