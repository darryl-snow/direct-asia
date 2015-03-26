/* direct-asia : 0.0.0 : Thu Mar 26 2015 23:46:15 GMT+0800 (CST) */
var getMockData,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

getMockData = function() {
  var data;
  return data = {
    coverPlans: {
      comprehensive: {
        name: "Comprehensive",
        baseCost: 732
      },
      thirdPartyFireAndTheft: {
        name: "Third-Party Fire & Theft",
        baseCost: 594
      },
      thirdParty: {
        name: "Third-Party",
        baseCost: 540
      }
    },
    excesses: ["S$500", "S$1000", "S$2000", "S$3000", "S$4000", "S$5000"],
    feedback: ["Friends & Family", "TV", "Online", "Print/Billboards", "Social", "Taxi", "Cinema", "Other"],
    optionalCover: [
      {
        name: "Loss of use",
        description: "S$50 to help you with transport costs while your car is being repaired",
        cost: 156
      }, {
        name: "My workshop/ garage",
        description: "Gives you the freedom to select your own preferred workshop for an optional benefit",
        cost: 156
      }, {
        name: "Experienced Drivers",
        description: "Cover anyone over 30 with more than 2 years driving experience",
        cost: 156
      }, {
        name: "24 hr breakdown assistance",
        description: "Description",
        cost: 156
      }, {
        name: "24 months new for old replacement car",
        description: "Description",
        cost: 156
      }, {
        name: "Car modifications",
        description: "Description",
        cost: 156
      }, {
        name: "Medical expenses",
        description: "Description",
        cost: 156
      }, {
        name: "Personal accident",
        description: "Description",
        cost: 156
      }, {
        name: "Repatriation costs",
        description: "Description",
        cost: 156
      }
    ],
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
    selectedCover: "comprehensive",
    recommendedExcess: 2000
  };
};


/*
The controller ties together the view with the model.

In this case the view is the components/quote file and the model
is the $scope.quote variable.
 */

angular.module("DirectAsia").controller("QuoteCtrl", [
  "$scope", "$http", "InsurancePlan", "MainDriver", "Car", "AdditionalDriver", function($scope, $http, InsurancePlan, MainDriver, Car, AdditionalDriver) {
    var calculateTotalCost, getDataFromAPI, setupData;
    $scope.plan = new InsurancePlan();
    $scope.feedback = "";
    $scope.options = {
      coverPlans: [],
      excesses: [],
      feedback: [],
      optionalCover: [],
      recommendedExcess: null
    };
    $scope.recommendedOptionalCover = [];
    $scope.currentStep = 1;
    getDataFromAPI = function() {
      var dataFromAPI;
      dataFromAPI = {};
      $http.get("http://api-url").success(function(data, status, headers, config) {
        return dataFromAPI = data;
      }).error(function(data, status, headers, config) {
        return console.error(data);
      });
      return dataFromAPI;
    };
    setupData = function(data) {
      var car, mainDriver;
      $scope.options.coverPlans = data.coverPlans;
      $scope.options.excesses = data.excesses;
      $scope.options.feedback = data.feedback;
      $scope.options.optionalCover = data.optionalCover;
      $scope.options.recommendedExcess = data.recommendedExcess;
      $scope.recommendedOptionalCover[0] = $scope.options.optionalCover[0];
      $scope.recommendedOptionalCover[1] = $scope.options.optionalCover[1];
      $scope.recommendedOptionalCover[2] = $scope.options.optionalCover[2];
      mainDriver = new MainDriver;
      mainDriver.ownership = data.mainDriver.ownership;
      mainDriver.dob = {
        day: data.mainDriver.dob.day,
        month: data.mainDriver.dob.month,
        year: data.mainDriver.dob.year
      };
      mainDriver.age = data.mainDriver.age;
      mainDriver.gender = data.mainDriver.gender;
      mainDriver.maritalStatus = data.mainDriver.maritalStatus;
      mainDriver.occupation = data.mainDriver.occupation;
      mainDriver.residentialDistrict = data.mainDriver.residentialDistrict;
      mainDriver.drivingExperience = data.mainDriver.drivingExperience;
      mainDriver.noClaimsDiscount = data.mainDriver.noClaimsDiscount;
      mainDriver.offences = data.mainDriver.offences;
      mainDriver.refusals = data.mainDriver.refusals;
      mainDriver.accidents = {
        atFault: data.mainDriver.accidents.atFault,
        notAtFault: data.mainDriver.accidents.atFault
      };
      mainDriver.additionalDrivers = data.mainDriver.additionalDrivers;
      car = new Car;
      car.year = data.car.year;
      car.make = data.car.make;
      car.model = data.car.model;
      car.modified = data.car.modified;
      car.modifications = {
        airintakeexhaust: data.car.modifications.airintakeexhaust,
        bodykit: data.car.modifications.bodykit,
        rimstires: data.car.modifications.rimstires,
        suspensionstabiliser: data.car.modifications.suspensionstabiliser
      };
      car.ownership = data.car.ownership;
      car.financed = data.car.financed;
      car.kmsperyear = data.car.kmsperyear;
      car.lowmileageoption = data.car.lowmileageoption;
      car.usage = data.car.usage;
      $scope.plan.car = car;
      $scope.plan.mainDriver = mainDriver;
      $scope.plan.additionalDrivers.push(new AdditionalDriver);
      $scope.plan.cover = $scope.options.coverPlans[data.selectedCover];
      return $scope.plan.totalCost = $scope.plan.cover.baseCost;
    };
    setupData(getMockData());
    $scope["continue"] = function() {
      return $scope.currentStep++;
    };
    $scope.addAdditionalDriver = function() {
      return $scope.plan.additionalDrivers.push(new AdditionalDriver);
    };
    $scope.selectOption = function(option) {
      option.selected = !option.selected;
      if (option.selected && __indexOf.call($scope.plan.options, option) < 0) {
        $scope.plan.options.push(option);
      }
      if (!option.selected && __indexOf.call($scope.plan.options, option) >= 0) {
        $scope.plan.options = $scope.plan.options.filter(function(selectedOption) {
          return selectedOption !== option;
        });
      }
      return calculateTotalCost();
    };
    calculateTotalCost = function() {
      var option, optionsCost, _i, _len, _ref;
      optionsCost = 0;
      _ref = $scope.plan.options;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        optionsCost += option.cost;
      }
      return $scope.plan.totalCost = $scope.plan.cover.baseCost + optionsCost;
    };
    $scope.saveForLater = function() {
      return console.table($scope.plan);
    };
    return $scope.select = function(value, index, property) {
      return eval("$scope." + property + "='" + value + "'");
    };
  }
]);
