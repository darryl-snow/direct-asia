/* direct-asia : 0.0.0 : Mon Mar 30 2015 01:01:54 GMT+0800 (CST) */
angular.module("DirectAsia").controller("chooseYourCover", [
  "$scope", function($scope) {
    $scope.covers = [
      {
        image: '../../images/comprehensive.png',
        name: 'Comprehensive',
        content: ''
      }, {
        image: '../../images/third-party-plus.png',
        name: 'Third-Party Plus',
        content: '(includes Fire & Theft)'
      }, {
        image: '../../images/third-party-only.png',
        name: 'Third-Party Only',
        content: ''
      }
    ];
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
    $scope.covers.selected;
    $scope.covers.isActive = function($index) {
      if ($index === $scope.covers.selected) {
        return "active";
      } else {
        return "";
      }
    };
    return $scope.covers.click = function($index) {
      return $scope.covers.selected = $index;
    };
  }
]);
