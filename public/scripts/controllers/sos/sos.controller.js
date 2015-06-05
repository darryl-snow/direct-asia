/* direct-asia : 0.0.0 : Fri Jun 05 2015 14:14:28 GMT-0400 (AST) */

/*
UNFINISHED
 */
angular.module("DirectAsia").controller("SOSCtrl", [
  "$scope", function($scope) {

    /*
    		Default data for main driver
     */
    var year;
    $scope.maindriver = {
      kmsperyear: "24 - 35",
      yearslicensed: 3,
      yearscovered: void 0,
      claims: [
        {
          number: 1,
          day: "01",
          month: "Mar",
          year: "2013",
          nature: "Collision w/Stationary Object",
          vehicleInvolved: true
        }
      ]
    };

    /*
    		Default options for years select input
     */
    $scope.years = (function() {
      var i, ref, results;
      results = [];
      for (year = i = 1, ref = $scope.maindriver.yearslicensed; 1 <= ref ? i <= ref : i >= ref; year = 1 <= ref ? ++i : --i) {
        results.push(year);
      }
      return results;
    })();

    /*
    		Default options for nature of claim select input
     */
    $scope.natures = ["Collision w/ Stationary Object"];

    /*
    		Default data for additional drivers
     */
    $scope.additionalDrivers = [
      {
        firstName: void 0,
        lastName: void 0,
        dob: void 0,
        gender: void 0,
        claims: [
          {
            number: 1,
            date: void 0,
            nature: void 0,
            vehicleInvolved: true
          }
        ]
      }
    ];

    /*
    		A scope function to manually update the model from the view.
     */
    $scope.selectMainDriver = function(value, index, property) {
      return $scope.maindriver[property] = value;
    };
    $scope.addAdditionalDriver = function() {};
    return $scope.SelectAdditionalDriver = function(driver) {};
  }
]);
