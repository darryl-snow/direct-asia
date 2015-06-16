/* direct-asia : 0.0.0 : Tue Jun 16 2015 18:28:06 GMT+0800 (CST) */

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
    excesses: ["500", "1000", "2000", "3000", "4000", "5000"],
    feedback: ["Friends & Family", "TV", "Online", "Print/Billboards", "Social", "Taxi", "Cinema", "Other"],
    optionalCover: [
      {
        name: "Loss of use",
        description: "S$50 to help you with transport costs while your car is being repaired",
        cost: 156,
        editable: false
      }, {
        name: "My workshop / garage",
        description: "Gives you the freedom to select your own preferred workshop for an optional benefit",
        cost: 156,
        editable: false
      }, {
        name: "Experienced Drivers",
        description: "Cover anyone over 30 with more than 2 years driving experience",
        cost: 156,
        editable: false
      }, {
        name: "24 hr breakdown assistance",
        description: "Description",
        cost: 156,
        editable: false
      }, {
        name: "24 months new for old replacement car",
        description: "Description",
        cost: 156,
        editable: false
      }, {
        name: "Car modifications",
        description: "Description",
        cost: 156,
        editable: true
      }, {
        name: "Medical expenses",
        description: "Description",
        cost: 156,
        editable: false
      }, {
        name: "Personal accident",
        description: "Description",
        cost: 156,
        editable: false
      }, {
        name: "Repatriation costs",
        description: "Description",
        cost: 156,
        editable: false
      }, {
        name: "NCPD",
        description: "Description",
        cost: 156,
        editable: false
      }, {
        name: "Uninsured loss recovery",
        description: "Description",
        cost: 156,
        editable: false
      }, {
        name: "Windscreen and window breakage",
        description: "Description",
        cost: 156,
        editable: false
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
      financed: true,
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
  "$scope", "$http", "InsurancePlan", "MainDriver", "Car", "AdditionalDriver", "$rootScope", function($scope, $http, InsurancePlan, MainDriver, Car, AdditionalDriver, $rootScope) {

    /*
    			plan = the resulting plan containing everything the user has selected.
    			This is what will be submitted to the server recommendedPlan = what
    			we're recommendingthe user selects, shown on the page as a comparison
    			savedPlan = in case the user wants to save the plan for later or switch
    			to the recommended plan and then switch back
     */
    var calculateTotalCost, getDataFromAPI, getOption, getRecommendedOptions, getRecommendedPlan, i, saveCurrentPlan, selectPreviousOptions, selectRecommendedOptions, setupData, _i;
    $scope.plan = new InsurancePlan();
    $scope.recommendedPlan = new InsurancePlan();
    $scope.savedPlan = new InsurancePlan();

    /*
    			Feedback is for recording how the user heard about DA. This is to be sent
    			to the server as well as the plan they've selected
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
    
    			This sets the current step as 'choose plan' so that only that section
    			will be displayed initially.
     */
    $scope.currentStep = 1;

    /*
    			This indicates whether the recommended plan has been selected from the comparison
    			section at the bottom of the page
     */
    $scope.selectRecommendedPlan = false;

    /*
    			This is a container object for the information about up to 4 additional drivers
    			the user may wish to add.
     */
    $scope.additionalDrivers = [];
    for (i = _i = 0; _i <= 3; i = ++_i) {
      $scope.additionalDrivers.push(new AdditionalDriver);
    }

    /*
    			This private function fetches data from the back-end to be used on the page
    
    			(NOTE: This isn't used currently as the data is mocked by the
    			function getMockData() above)
     */
    getDataFromAPI = function() {
      var dataFromAPI;
      dataFromAPI = {};

      /*
      				You'll want to get localised data returned from the server
       */
      $http.get("http://api-url?lang=" + $rootScope.currentLanguage).success(function(data, status, headers, config) {
        return dataFromAPI = data;
      }).error(function(data, status, headers, config) {
        return console.error(data);
      });
      return dataFromAPI;
    };

    /*
    			This private function takes the name of an optional benefit and
    			returns the object corresponding to that benefit, if it exists
     */
    getOption = function(name) {
      var option;
      option = $scope.options.optionalCover.filter(function(ob) {
        return ob.name.trim().toLowerCase() === name.trim().toLowerCase();
      });
      return option[0];
    };

    /*
    			This private function determines which options to recommend based
    			on data the user has previously entered, using the supplied logic
    			table
     */
    getRecommendedOptions = function(cover, driver, car) {
      var date, options, years;
      options = [];
      date = new Date;
      years = date.getFullYear() - car.year;

      /*
      				CO & TP+ get LOU
       */
      if ((cover === "Comprehensive" || cover === "Third-Party Fire & Theft") && options.length < 4) {
        options.push(getOption("Loss of Use"));
      }

      /*
      				CO gets new for old and my workshop if car is less than 1 years
       */
      if (years <= 1 && cover === "Comprehensive" && options.length < 4) {
        options.push(getOption("24 months new for old replacement car"));
      }

      /*
      				All cover plans get NCDP if driver has 50%NCD
       */
      if ((driver.noClaimsDiscount === "50%" || driver.noClaimsDiscount === "60%") && options.length < 4) {
        options.push(getOption("NCPD"));
      }

      /*
      				CO and TP+ get 24hrs bd if the driver is female
       */
      if ((cover === "Comprehensive" || cover === "Third-Party Fire & Theft") && options.length < 4) {
        options.push(getOption("24 hr breakdown assistance"));
      }

      /*
      				CO gets my workshop if car is less than 3 years
       */
      if (cover === "Comprehensive" && years <= 3 && options.length < 4) {
        options.push(getOption("My workshop / garage"));
      }

      /*
      				Everyone gets PA and ME. TPO also gets uninsured loss recovery
       */
      if (options.length < 4) {
        options.push(getOption("Personal accident"));
        options.push(getOption("Medical expenses"));
        if (cover === "Third-Party") {
          options.push(getOption("Uninsured loss recovery"));
        }
      }

      /*
      				TP+ and TPO get windscreen and window breakage if car is less than 5 years
       */
      if ((cover === "Third-Party Fire & Theft" || cover === "Third-Party") && years <= 5 && options.length < 4) {
        options.push(getOption("Windscreen and window breakage"));
      }
      return options;
    };

    /*
    			This private function determines which plan is recommended based on what the
    			user has selected
     */
    getRecommendedPlan = function() {
      var matched, option, _j, _len, _ref;
      $scope.recommendedPlan.car = $scope.plan.car;
      $scope.recommendedPlan.driver = $scope.plan.driver;
      $scope.recommendedPlan.cover = $scope.plan.cover;
      $scope.recommendedPlan.options = getRecommendedOptions($scope.plan.cover.name, $scope.mainDriver, $scope.car);

      /*
      				set recommended optional benefits
       */
      _ref = $scope.options.optionalCover;
      for (i = _j = 0, _len = _ref.length; _j < _len; i = ++_j) {
        option = _ref[i];
        option.recommended = false;
        matched = $scope.recommendedPlan.options.filter(function(recommendedOption) {
          return recommendedOption.name === option.name;
        });
        if (matched.length) {
          option.recommended = true;
        }
      }
      return calculateTotalCost($scope.recommendedPlan);
    };

    /*
    			This private function formats the data returned from the server so that it
    			can be used on the page
     */
    setupData = function(data) {

      /*
      				Get page options
       */
      $scope.options.coverPlans = data.coverPlans;
      $scope.options.excesses = data.excesses;
      $scope.options.feedback = data.feedback;
      $scope.options.optionalCover = data.optionalCover;

      /*
      				Get details about main driver
       */
      $scope.mainDriver = new MainDriver;
      $scope.mainDriver.ownership = data.mainDriver.ownership;
      $scope.mainDriver.dob = {
        day: data.mainDriver.dob.day,
        month: data.mainDriver.dob.month,
        year: data.mainDriver.dob.year
      };
      $scope.mainDriver.age = data.mainDriver.age;
      $scope.mainDriver.gender = data.mainDriver.gender;
      $scope.mainDriver.maritalStatus = data.mainDriver.maritalStatus;
      $scope.mainDriver.occupation = data.mainDriver.occupation;
      $scope.mainDriver.residentialDistrict = data.mainDriver.residentialDistrict;
      $scope.mainDriver.drivingExperience = data.mainDriver.drivingExperience;
      $scope.mainDriver.noClaimsDiscount = data.mainDriver.noClaimsDiscount;
      $scope.mainDriver.whyNoClaimsDiscount = data.mainDriver.whyNoClaimsDiscount;
      $scope.mainDriver.offences = data.mainDriver.offences;
      $scope.mainDriver.refusals = data.mainDriver.refusals;
      $scope.mainDriver.accidents = {
        atFault: data.mainDriver.accidents.atFault,
        notAtFault: data.mainDriver.accidents.atFault
      };
      $scope.mainDriver.additionalDrivers = data.mainDriver.additionalDrivers;

      /*
      				Get details about car
       */
      $scope.car = new Car;
      $scope.car.year = data.car.year;
      $scope.car.make = data.car.make;
      $scope.car.model = data.car.model;
      $scope.car.modified = data.car.modified;
      $scope.car.modifications = {
        airintakeexhaust: data.car.modifications.airintakeexhaust,
        bodykit: data.car.modifications.bodykit,
        rimstires: data.car.modifications.rimstires,
        suspensionstabiliser: data.car.modifications.suspensionstabiliser
      };
      $scope.car.ownership = data.car.ownership;
      $scope.car.financed = data.car.financed;
      $scope.car.kmsperyear = data.car.kmsperyear;
      $scope.car.lowmileageoption = data.car.lowmileageoption;
      $scope.car.usage = data.car.usage;

      /*
      				Save info for selected plan. Excess is recommended excess by default.
       */
      $scope.plan.car = $scope.car;
      $scope.plan.mainDriver = $scope.mainDriver;
      $scope.plan.additionalDrivers = [];
      $scope.plan.cover = $scope.options.coverPlans[data.selectedCover];
      $scope.plan.excess = data.recommendedPlan.excess;

      /*
      				Save info for recommended plan
       */
      $scope.recommendedPlan.excess = data.recommendedPlan.excess;
      getRecommendedPlan();

      /*
      				Calculate the annual costs for the selected plan
       */
      return calculateTotalCost($scope.plan);
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
    			This function is for the fixed navbar where the user can select
    			their cover type. When selecting a new type, the plan's total
    			cost should be recalculated.
     */
    $scope.selectPlan = function(cover) {
      $scope.plan.cover = cover;
      calculateTotalCost($scope.plan);
      return getRecommendedPlan();
    };

    /*
    			This function is a toggle  for selecting/deselecting an optional
    			benefit to add to the plan. If the plan isn't already selected it
    			will be added to the list. If the option is already selected it will
    			be removed. After changing the selected benefits, the plan's total
    			cost should be recalculated.
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
    			This function goes through the selected optional benefits and
    			tallies up the cost. Used for calculating the plan's total cost and
    			for showing a breakdown in the summary section.
     */
    $scope.calculateOptionsCost = function(plan) {
      var option, optionsCost, _j, _len, _ref;
      optionsCost = 0;
      _ref = plan.options;
      for (_j = 0, _len = _ref.length; _j < _len; _j++) {
        option = _ref[_j];
        optionsCost += option.cost;
      }
      return optionsCost;
    };

    /*
    			Private function for calculating the total cost of the plan. Used
    			only from within other functions in this controller.
     */
    calculateTotalCost = function(plan) {
      return plan.totalCost = plan.cover.baseCost + $scope.calculateOptionsCost(plan);
    };

    /*
    			This private function copies data from the currently selected plan
    			into another object for temporary storage.
     */
    saveCurrentPlan = function() {
      $scope.savedPlan.cover = $scope.plan.cover;
      $scope.savedPlan.totalCost = $scope.plan.totalCost;
      $scope.savedPlan.car = $scope.plan.car;
      $scope.savedPlan.mainDriver = $scope.plan.mainDriver;
      $scope.savedPlan.additionalDrivers = $scope.plan.additionalDrivers;
      $scope.savedPlan.referral = $scope.plan.referral;
      $scope.savedPlan.options = $scope.plan.options;
      return $scope.savedPlan.excess = $scope.plan.excess;
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

      /*
      				$http
      					method: "POST"
      					url: "http://api-url/plan"
      					data: $scope.plan
      				.success (response) ->
      
      					console.info "plan sent!"
      
      				.error (data, status, headers, config) ->
      
      					console.error data
       */
    };

    /*
    			This function is required for the custom select fields to work. When the
    			field value changes the corresponding scope variable is updated.
     */
    $scope.select = function(value, index, property) {
      if (value === -1) {
        value = 0;
      }
      return eval("$scope." + property + "='" + value + "'");
    };

    /*
    			When the user selects the recommended plan from the comparison pane
    			in the summary section or clicks the 'select plan and modify' button
    			in the first section, the recommended options ,and only those options,
    			should be pre-selected. The options displayed on the page are from the
    			$scope.options.optionalCover object, while the recommended options are
    			in the $scope.recommendedPlan.options object. The function loops through
    			the options on the page and if they are also in the recommended options
    			then the selectOption function is called on that option. This is a
    			private function called only from within functions in this controller.
     */
    selectRecommendedOptions = function() {
      var matched, option, _j, _len, _ref, _results;
      _ref = $scope.options.optionalCover;
      _results = [];
      for (_j = 0, _len = _ref.length; _j < _len; _j++) {
        option = _ref[_j];
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
    			When the user selects to revert to the previous plan from the comparison
    			pane in the summary section, the recommended options should be de-selected
    			and those previously selected re-selected. The options displayed on the page
    			are from the $scope.options.optionalCover object, while the previously
    			selected options are in the $savedPlan.options object. The function loops
    			through the options on the page and if they are also in the saved plan options
    			then the selectOption function is called on that option. This is a
    			private function called only from within functions in this controller.
     */
    selectPreviousOptions = function() {
      var matched, option, _j, _len, _ref, _results;
      _ref = $scope.options.optionalCover;
      _results = [];
      for (_j = 0, _len = _ref.length; _j < _len; _j++) {
        option = _ref[_j];
        option.selected = false;
        matched = $scope.savedPlan.options.filter(function(previousOption) {
          return previousOption.name === option.name;
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
    			When the user selects the 'select plan and modify' button in section
    			1, 2 things need to happen:
    			- the recommended plan is selected, so we call the
    			  selectRecommendedOptions function
    			- the user should go to the next section, so we call the continue function
     */
    $scope.selectPlanAndModify = function() {
      selectRecommendedOptions();
      return $scope["continue"](2);
    };

    /*
    			When the user selects the 'select plan' button in the comparison pane of
    			the summary section, The current plan should be saved, in case they need
    			to revert back to it later, then the current plan should be updated with
    			the cover, options, and excess from the recommended plan. The total cost
    			of the selected plan will then be the same as that for the recommended
    			plan. The function should also ensure that the recommended options are
    			selected and that the comparison pane is closed.
     */
    $scope.useRecommendedPlan = function() {
      saveCurrentPlan();
      $scope.plan.cover = $scope.recommendedPlan.cover;
      $scope.plan.options = $scope.recommendedPlan.options;
      selectRecommendedOptions();
      $scope.plan.excess = $scope.recommendedPlan.excess;
      $scope.plan.totalCost = $scope.recommendedPlan.totalCost;
      $scope.compare = false;
      return $scope.selectRecommendedPlan = true;
    };

    /*
    			In case the user wants to go back from the recommended plan to the
    			options they had selected previously, this function simply restores the
    			page to the state it was in before they selected the recommended plan.
    
    			Note: currently there is no 'revert to previous plan' button as this will
    			require design decisions
     */
    $scope.revertToPreviousPlan = function() {
      $scope.plan = $scope.savedPlan;
      selectPreviousOptions();
      $scope.selectRecommendedPlan = false;
      return $scope.compare = false;
    };

    /*
    			First hide any other forms that may be showing for the other additional
    			drivers. Reset the fake select boxes for new drivers. Then show the
    			form.
     */
    $scope.showNewDriverForm = function(driver) {
      var d, index, _j, _len, _ref;
      _ref = $scope.additionalDrivers;
      for (index = _j = 0, _len = _ref.length; _j < _len; index = ++_j) {
        d = _ref[index];
        d.editing = false;
        if (!d.added) {
          setTimeout(function() {
            return $("#editDriver" + index + "-experience").val("").trigger("change");
          }, 1000);
        }
      }
      return driver.editing = true;
    };

    /*
    			Check if the additional driver has already been added to the plan. If
    			so then return the index of that driver in the model's additional
    			drivers array, otherwise return false.
     */
    $scope.wasDriverAdded = function(driver) {
      var d, index, _j, _len, _ref;
      _ref = $scope.plan.additionalDrivers;
      for (index = _j = 0, _len = _ref.length; _j < _len; index = ++_j) {
        d = _ref[index];
        if (d === driver) {
          return index;
        }
      }
      return false;
    };

    /*
    			Remove the additional driver from the model and then reset the
    			driver information on the form. Synch data with the server.
     */
    $scope.removeAdditionalDriver = function(driver, index) {
      var additionalDrivers;
      additionalDrivers = $scope.plan.additionalDrivers.filter(function(ad) {
        return ad !== driver;
      });
      $scope.plan.additionalDrivers = additionalDrivers;
      $scope.additionalDrivers[index] = new AdditionalDriver;

      /*
      				synch data with server
       */
      return console.table($scope.plan.additionalDrivers);
    };

    /*
    			Hide all additional driver forms then show the form for this driver.
     */
    $scope.editAdditionalDriver = function(driver) {
      var d, _j, _len, _ref;
      _ref = $scope.additionalDrivers;
      for (_j = 0, _len = _ref.length; _j < _len; _j++) {
        d = _ref[_j];
        d.editing = false;
      }
      return driver.editing = true;
    };

    /*
    			If the driver is new then add the driver's details to the model's
    			additional drivers array. If not then update the model. Hide the
    			forms, synch data to the server, and log the results.
     */
    $scope.saveChangesToDriver = function(driver) {
      var index;
      console.log("saving driver");
      index = $scope.wasDriverAdded(driver);
      if (index) {
        $scope.plan.additionalDrivers[index] = driver;
      } else {
        $scope.plan.additionalDrivers.push(driver);
      }
      driver.editing = false;
      driver.added = true;

      /*
      				synch data with server
       */
      return console.table($scope.plan.additionalDrivers);
    };

    /*
    			Automatically send feedback to the server when the user
    			selects an option from the list
     */
    $scope.$watch("feedback", function() {
      if ($scope.feedback && !$scope.feedbackSent) {
        return $http({
          method: "POST",
          url: "http://api-url/feedback",
          data: $scope.feedback
        }).success(function(response) {
          console.info("feedback sent!");
          return $scope.feedbackSent = true;
        }).error(function(data, status, headers, config) {
          return console.error(data);
        });
      }
    });

    /*
    			Finally, now that all functions have been parsed, setup the data on the
    			page using that returned from the server or mocked.
     */

    /*
    			setupData getDataFromAPI()
     */
    return setupData(getMockData());
  }
]);
