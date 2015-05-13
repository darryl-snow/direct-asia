/* direct-asia : 0.0.0 : Wed May 13 2015 14:55:43 GMT+0800 (CST) */

/*
The controller ties together the view with the model.

In this case the view is the partials/help/help file and the main model
is the $scope.supportRequest variable.
 */
angular.module("DirectAsia").controller("helpCtrl", [
  "$scope", "$http", function($scope, $http) {

    /*
    		Setup scope variables
     */
    $scope.supportRequest = {
      name: "",
      email: "",
      number: ""
    };
    $scope.open = false;
    $scope.sent = false;

    /*
    		Show the help popover
     */
    $scope.showPopover = function() {
      return $scope.open = true;
    };

    /*
    		Hide the help popover
     */
    $scope.hidePopover = function() {
      return $scope.open = false;
    };

    /*
    		Submit the support request to the server
     */
    return $scope.sendRequest = function() {
      return $http({
        method: "POST",
        url: "http://api:port/support",
        data: $scope.supportRequest
      }).success(function(response) {

        /*
        				Hide the form and show the success message.
        				After 4 seconds hide the popover.
         */
        $scope.sent = true;
        return setTimeout(function() {
          return $scope.showPopover = false;
        }, 4000);
      }).error(function(response, status) {

        /*
        				The data could not be sent - log the error to the console
         */
        return console.error("The request failed with response " + response + " and status code " + status);
      });
    };
  }
]);
