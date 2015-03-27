/* direct-asia : 0.0.0 : Fri Mar 27 2015 20:04:58 GMT+0800 (CST) */

/*

TESTING ONLY - can be deleted before production

This function simply mocks data that would be returned
from a back-end API. Data should include:

- available cover plans (e.g. comprehensive, 3rd party, etc.)
- excess options
- feedback options
- all available optional benefits
- main driver info (from previous page)
- car info (from previous page)
- selected cover plan (from previous page)
- recommended plan details
 */
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
    recommendedPlan: {
      cover: {
        name: "Comprehensive",
        baseCost: 732
      },
      options: [
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
        }
      ],
      excess: 2000
    }
  };
};


/*
The controller ties together the view with the model.

In this case the view is the components/quote file and the main model
is the $scope.plan variable.
 */

angular.module("DirectAsia").controller("QuoteCtrl", [
  "$scope", "$http", "InsurancePlan", "MainDriver", "Car", "AdditionalDriver", function($scope, $http, InsurancePlan, MainDriver, Car, AdditionalDriver) {

    /*
    			plan = the resulting plan containing everything the user has selected. This is what will be submitted to the server
    			recommendedPlan = what we're recommendingthe user selects, shown on the page as a comparison
    			savedPlan = in case the user wants to save the plan for later or switch to the recommended plan and then switch back
     */
    var calculateTotalCost, getDataFromAPI, selectRecommendedOptions, setupData;
    $scope.plan = new InsurancePlan();
    $scope.recommendedPlan = new InsurancePlan();
    $scope.savedPlan = new InsurancePlan();

    /*
    			Feedback is for recording how the user heard about DA. This is to be sent to the server as well as the plan they've selected
     */
    $scope.feedback = "";

    /*
    			Options to be displayed on the page
     */
    $scope.options = {
      coverPlans: [],
      excesses: [],
      feedback: [],
      optionalCover: []
    };

    /*
    			The page has 5 steps:
    
    			- Choose plan
    			- Add additional drivers
    			- Select optional benefits
    			- Choose policy excess
    			- Summary / Save
    
    			This sets the current step as 'choose plan' so that only that section will be displayed initially.
     */
    $scope.currentStep = 1;

    /*
    			This function fetches data from the back-end to be used on the page
    
    			(NOTE: This isn't used currently as the data is mocked by the function getMockData() above)
     */
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

    /*
    			This function formats the data returned from the server so that it can be used on the page
     */
    setupData = function(data) {

      /*
      				get page options
       */
      var car, i, mainDriver, matched, option, _i, _len, _ref;
      $scope.options.coverPlans = data.coverPlans;
      $scope.options.excesses = data.excesses;
      $scope.options.feedback = data.feedback;
      $scope.options.optionalCover = data.optionalCover;

      /*
      				get details about main driver
       */
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

      /*
      				get details about car
       */
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

      /*
      				save info for selected plan
       */
      $scope.plan.car = car;
      $scope.plan.mainDriver = mainDriver;
      $scope.plan.additionalDrivers.push(new AdditionalDriver);
      $scope.plan.cover = $scope.options.coverPlans[data.selectedCover];

      /*
      				save info for recommended plan
       */
      $scope.recommendedPlan.car = $scope.plan.car;
      $scope.recommendedPlan.driver = $scope.plan.driver;
      $scope.recommendedPlan.cover = data.recommendedPlan.cover;
      $scope.recommendedPlan.options = data.recommendedPlan.options;
      $scope.recommendedPlan.excess = data.recommendedPlan.excess;

      /*
      				set recommended optional benefits
       */
      _ref = $scope.options.optionalCover;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        option = _ref[i];
        matched = $scope.recommendedPlan.options.filter(function(recommendedOption) {
          return recommendedOption.name === option.name;
        });
        if (matched.length) {
          option.recommended = true;
        }
      }

      /*
      				Calculate the annual costs for the selected and recommended plans
       */
      calculateTotalCost($scope.plan);
      return calculateTotalCost($scope.recommendedPlan);
    };

    /*
    			This function is used by the 'continue' buttons and simply sets the current step
    			so that the appropriate sections may be displayed
     */
    $scope["continue"] = function(step) {
      return $scope.currentStep = step;
    };

    /*
    			This function adds another additional driver to the plan
     */
    $scope.addAdditionalDriver = function() {
      return $scope.plan.additionalDrivers.push(new AdditionalDriver);
    };

    /*
    			This function is for the fixed navbar where the user can select their cover type. When selecting
    			a new type, the plan's total cost should be recalculated.
     */
    $scope.selectPlan = function(cover) {
      $scope.plan.cover = cover;
      return calculateTotalCost($scope.plan);
    };

    /*
    			This function is a toggle  for selecting/deselecting an optional benefit to add to the plan.
    			If the plan isn't already selected it will be added to the list.
    			If the plan is already selected it will be removed.
    			After changing the selected benefits, the plan's total cost should be recalculated.
     */
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
      return calculateTotalCost($scope.plan);
    };

    /*
    			This function goes through the selected optional benefits and tallies up the cost.
    			Used for calculating the plan's total cost and for showing a breakdown in the summary section.
     */
    $scope.calculateOptionsCost = function(plan) {
      var option, optionsCost, _i, _len, _ref;
      optionsCost = 0;
      _ref = plan.options;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        optionsCost += option.cost;
      }
      return optionsCost;
    };

    /*
    			Private function for calculating the total cost of the plan. Used only from within
    			other functions in this controller.
     */
    calculateTotalCost = function(plan) {
      return plan.totalCost = plan.cover.baseCost + $scope.calculateOptionsCost(plan);
    };

    /*
    			Function for saving the plan for later - called by buttons in the navbar and at the bottom
    			of the page. When this is clicked, the saved plan should be sent to the server (not implemented)
     */
    $scope.saveForLater = function() {
      $scope.savedPlan = $scope.plan;

      /*
      				send data to server
      				- for now just log the plan to the console
       */
      return console.table($scope.plan);
    };

    /*
    			This function is required for the custom select fields to work. When the field value
    			changes the corresponding scope variable is updated.
     */
    $scope.select = function(value, index, property) {
      return eval("$scope." + property + "='" + value + "'");
    };

    /*
    			When the user selects the recommended plan from the comparison pane in the summary section
    			or clicks the 'select plan and modify' button in the first section, the recommended options
    			,and only those options, should be pre-selected. The options displayed on the page are from the 
    			$scope.options.optionalCover object, while the recommended options are in the 
    			$scope.recommendedPlan.options object. The function loops through the options on the page 
    			and if they are also in the recommended options then the selectOption function is called on 
    			that option. This is a private function called only from within functions in this controller.
     */
    selectRecommendedOptions = function() {
      var matched, option, _i, _len, _ref, _results;
      _ref = $scope.options.optionalCover;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        option.selected = false;
        matched = $scope.recommendedPlan.options.filter(function(recommendedOption) {
          return recommendedOption.name === option.name;
        });
        if (matched.length) {
          _results.push($scope.selectOption(option));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    /*
    			When the user selects the 'select plan and modify' button in section 1, 2 things need to happen:
    			- the recommended plan is selected, so we call the selectRecommendedOptions function
    			- the user should go to the next section, so we call the continue function
     */
    $scope.selectPlanAndModify = function() {
      selectRecommendedOptions();
      return $scope["continue"](2);
    };

    /*
    			When the user selects the 'select plan' button in the comparison pane of the summary section,
    			The current plan should be saved, in case they need to revert back to it later, then the current
    			plan should be updated with the cover, options, and excess from the recommended plan. The total
    			cost of the selected plan will then be the same as that for the recommended plan. The function
    			should also ensure that the recommended options are selected and that the comparison pane is
    			closed.
     */
    $scope.useRecommendedPlan = function() {
      $scope.savedPlan = $scope.plan;
      $scope.plan.cover = $scope.recommendedPlan.cover;
      $scope.plan.options = $scope.recommendedPlan.options;
      selectRecommendedOptions();
      $scope.plan.excess = $scope.recommendedPlan.excess;
      $scope.plan.totalCost = $scope.recommendedPlan.totalCost;
      return $scope.compare = false;
    };

    /*
    			In case the user wants to go back from the recommended plan to the options they had selected
    			previously, this function simply restores the page to the state it was in before they selected
    			the recommended plan.
    
    			Note: currently there is no 'revert to previous plan' button as this will require design decisions
     */
    $scope.revertToPreviousPlan = function() {
      return $scope.plan = $scope.savedPlan;
    };

    /*
    			Finally, now that all functions have been parsed, setup the data on the page using that returned
    			from the server or mocked.
     */

    /*
    			setupData getDataFromAPI()
     */
    return setupData(getMockData());
  }
]);
