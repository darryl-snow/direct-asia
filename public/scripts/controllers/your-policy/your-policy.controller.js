/* direct-asia : 0.0.0 : Mon May 11 2015 03:49:06 GMT+0800 (CST) */

/*

TESTING ONLY - can be deleted before production

This function simply mocks data that would be returned
from a back-end API. Data should include:

- car details
- optional benefit details
- chosen policy details
- main driver details
- additional driver details
- countries
- policyholders
- driver1policyholders
- driver2policyholders
- residentials
- driver1residentials
- driver2residentials
 */
var getMockData;

getMockData = function() {
  var data;
  return data = {
    policy: {
      excess: "500",
      name: "Comprehensive Premium",
      number: "2332434535t66",
      savings: "167",
      total: "1356",
      covers: [
        {
          name: "Loss of use",
          description: "S$50 to help you with transport costs while your car is being repaired",
          cost: 156
        }, {
          name: "My workshop / garage",
          description: "Gives you the freedom to select your own preferred workshop for an optional benefit",
          cost: 156
        }, {
          name: "Experienced Drivers",
          description: "Cover anyone over 30 with more than 2 years driving experience",
          cost: 156
        }
      ],
      car: {
        year: null,
        make: null,
        model: null,
        modified: false,
        modifications: {
          airintakeexhaust: false,
          bodykit: false,
          rimstires: false,
          suspensionstabiliser: false
        },
        ownership: null,
        financed: false,
        kmsperyear: null,
        lowmileageoption: true,
        usage: null,
        registrationNumber: null,
        carChassisNumber: null
      },
      policyHolder: {
        previousInsurer: null,
        previousVehicle: null,
        firstName: null,
        lastName: null,
        email: null,
        confirmEmail: null,
        mobileNumber: null,
        residentialAddressLine1: null,
        residentialAddressLine2: null,
        residentialDistrict: null,
        residentialStatus: null,
        residentialHKID: null,
        contactOption: null
      },
      mainDriver: {
        firstName: null,
        lastName: null,
        ownership: true,
        dob: {
          day: 0,
          month: 0,
          year: 0
        },
        age: 0,
        gender: null,
        maritalStatus: null,
        occupation: null,
        residentialDistrict: null,
        drivingExperience: null,
        noClaimsDiscount: null,
        offences: false,
        refusals: false,
        accidents: {
          atFault: null,
          notAtFault: null
        },
        additionalDrivers: false,
        contactNumber: null,
        relationshipWithPolicyholder: null,
        HKID: null,
        residentialStatus: null
      },
      additionalDrivers: [
        {
          firstName: null,
          lastName: null,
          dob: {
            day: null,
            month: null,
            year: null
          },
          gender: null,
          maritalStatus: null,
          occupation: null,
          drivingExperience: null,
          offences: null,
          accidents: {
            atFault: null,
            notAtFault: null
          },
          refusals: null,
          residentialStatus: null,
          NRIC: null,
          relationshipWithPolicyHolder: null
        }, {
          firstName: null,
          lastName: null,
          dob: {
            day: null,
            month: null,
            year: null
          },
          gender: null,
          maritalStatus: null,
          occupation: null,
          drivingExperience: null,
          offences: null,
          accidents: {
            atFault: null,
            notAtFault: null
          },
          refusals: null,
          residentialStatus: null,
          NRIC: null,
          relationshipWithPolicyHolder: null
        }
      ]
    },
    options: {
      covers: [
        {
          name: "Loss of use",
          description: "S$50 to help you with transport costs while your car is being repaired",
          cost: 156
        }, {
          name: "My workshop / garage",
          description: "Gives you the freedom to select your own preferred workshop for an optional benefit",
          cost: 156
        }, {
          name: "Experienced Drivers",
          description: "Cover anyone over 30 with more than 2 years driving experience",
          cost: 156
        }
      ],
      countries: ["Singapore", "malaysia"],
      relationships: ["Mother", "Father", "Spouse"],
      districts: ["Kowloon", "Central", "New Territories"]
    }
  };
};


/*
The controller ties together the view with the model.

In this case the view is the partials/review-and-buy/review-and-buy1
and partials/review-and-buy/review-and-buy2 file and the main model
is the $scope.review variable.
 */

angular.module("DirectAsia").controller("yourPolicyCtrl", [
  "$scope", function($scope) {

    /*
    		This private function fetches data from the back-end to be used on the page
    
    		(NOTE: This isn't used currently as the data is mocked by the
    		function getMockData() above)
     */
    var getDataFromAPI, setupData;
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
    setupData = function(data) {
      $scope.policy = data.policy;
      return $scope.options = data.options;
    };

    /*
    		Function for saving the plan for later - called by buttons in the
    		navbar and at the bottom of the page. When this is clicked, the saved
    		plan should be sent to the server (not implemented)
     */
    $scope.saveForLater = function() {

      /*
      			send data to server
      			- for now just log the plan to the console
       */
      return console.table($scope.plan);
    };

    /*
    		setupData(getDataFromAPI());
     */
    setupData(getMockData());
    return $scope.select = function(value, property) {
      return $scope.policy[property] = value;
    };
  }
]);
