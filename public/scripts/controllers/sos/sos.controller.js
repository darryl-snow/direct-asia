/* direct-asia : 0.0.0 : Mon Apr 20 2015 21:50:45 GMT+0800 (CST) */

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
      var _i, _ref, _results;
      _results = [];
      for (year = _i = 1, _ref = $scope.maindriver.yearslicensed; 1 <= _ref ? _i <= _ref : _i >= _ref; year = 1 <= _ref ? ++_i : --_i) {
        _results.push(year);
      }
      return _results;
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
