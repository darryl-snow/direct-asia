/* direct-asia : 0.0.0 : Mon Apr 13 2015 16:14:41 GMT+0800 (CST) */
angular.module("DirectAsia").controller("review", [
  "$scope", function($scope) {
    $scope.review = {
        payment: "",
        bank: "",
        card_name: "",
        card_number: "",
        verification_number: "",
        review_month: "",
        review_year: ""

    };
  }
]);
