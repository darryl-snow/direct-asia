/* direct-asia : 0.0.0 : Sat Apr 25 2015 04:29:45 GMT+0800 (CST) */

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
    car: {
      year: "2013",
      make: "Nissan",
      model: "Micra",
      modified: true,
      modifications: {
        airintakeexhaust: false,
        bodykit: true,
        rimstires: true,
        suspensionstabiliser: false
      },
      ownership: "private",
      financed: false,
      kmsperyear: "> 15,000",
      lowmileageoption: true,
      usage: "personal use"
    },
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
    policy: {
      covers: ["Third Party - Death or Bodily injury", "Third Party - Property Damage", "Third Party - Collision Damage", "24 hour accident towing", "Own damage - No Other Vehicle Involved", "Windscreen/Window Breakage"],
      excess: "500",
      name: "Comprehensive Premium",
      number: "2332434535t66",
      savings: "167",
      total: "1356",
      registrationNumber: null,
      carChassisNumber: null,
      NCD: null,
      previousInsurer: null,
      previousVehicle: null,
      policyholderFirstName: null,
      policyholderLastName: null,
      policyholderEmail: null,
      policyholderConfirmEmail: null,
      policyholderMobileNumber: null,
      residentialAddressLine1: null,
      residentialAddressLine2: null,
      residentialDistrict: null,
      residentialStatus: null,
      residentialHKID: null,
      contactOption: null,
      driverFirstName: null,
      driverLastName: null,
      driverResidentialStatus: null,
      driverHKID: null,
      driverContactNumber: null,
      driverRelationshipWithPolicyholder: null
    },
    mainDriver: {
      ownership: true,
      dob: {
        day: 25,
        month: 3,
        year: 1983
      },
      age: 32,
      gender: "Female",
      maritalStatus: "single",
      occupation: "web developer",
      residentialDistrict: "PanLong Qu",
      drivingExperience: "more than 5",
      noClaimsDiscount: "30%",
      offences: false,
      refusals: false,
      accidents: {
        atFault: "1",
        notAtFault: "0"
      },
      additionalDrivers: false
    },
    additionalDrivers: {
      driver1: {
        firstName: null,
        lastName: null,
        residentialStatus: null,
        NRIC: null,
        relationshipWithPolicyHolder: null
      },
      driver2: {
        firstName: null,
        lastName: null,
        residentialStatus: null,
        NRIC: null,
        relationshipWithPolicyHolder: null
      }
    },
    countries: ["Singapore", "malaysia"],
    policyholders: ["Policyholder 1", "Policyholder 2"],
    driver1policyholders: ["Policyholder 1", "Policyholder 2"],
    driver2policyholders: ["Policyholder 1", "Policyholder 2"],
    residentials: ["Address line 1", "Address line 2", "Residential district"],
    driver1residentials: ["Address line 1", "Address line 2", "Residential district"],
    driver2residentials: ["Address line 1", "Address line 2", "Residential district"]
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
      $scope.car = data.car;
      $scope.covers = data.covers;
      $scope.policy = data.policy;
      $scope.mainDriver = data.mainDriver;
      $scope.additionalDrivers = driver.additionalDrivers;
      $scope.options.countries = data.countries;
      $scope.options.policyholders = data.policyholders;
      $scope.options.driver1policyholders = data.driver1policyholders;
      $scope.options.driver2policyholders = data.driver2policyholders;
      $scope.options.residentials = data.residentials;
      $scope.options.driver1residentials = data.driver1residentials;
      return $scope.options.driver2residentials = data.driver2residentials;
    };

    /*
    		Function for saving the plan for later - called by buttons in the
    		navbar and at the bottom of the page. When this is clicked, the saved
    		plan should be sent to the server (not implemented)
     */
    $scope.saveForLater = function() {
      saveCurrentPlan();

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
