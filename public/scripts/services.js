/* direct-asia : 0.0.0 : Fri Mar 27 2015 20:04:58 GMT+0800 (CST) */

/*
This is a class for instantiating additional drivers, as used on the quote page
 */
var AdditionalDriver;

AdditionalDriver = (function() {
  function AdditionalDriver() {
    this.firstName = null;
    this.lastName = null;
    this.dob = {
      day: null,
      month: null,
      year: null
    };
    this.gender = null;
    this.maritalStatus = null;
    this.occupation = null;
    this.drivingExperience = null;
    this.offences = null;
    this.accidents = {
      atFault: null,
      notAtFault: null
    };
    this.refusals = null;
  }

  return AdditionalDriver;

})();


/*
Using an Angular factory allows us to use dependency injection in the controller and instantiate
objects from there
 */

angular.module("DirectAsia").factory("AdditionalDriver", function() {
  return AdditionalDriver;
});


/*
This is a class for instantiating car objects, as used on the quote page
 */
var Car;

Car = (function() {
  function Car() {
    this.year = null;
    this.make = null;
    this.model = null;
    this.modified = null;
    this.modifications = {
      airintakeexhaust: null,
      bodykit: null,
      rimstires: null,
      suspensionstabiliser: null
    };
    this.ownership = null;
    this.financed = null;
    this.kmsperyear = null;
    this.lowmileageoption = null;
    this.usage = null;
  }

  return Car;

})();


/*
Using an Angular factory allows us to use dependency injection in the controller and instantiate
objects from there
 */

angular.module("DirectAsia").factory("Car", function() {
  return Car;
});


/*
Using the ng-resource module, this sets up a service that can be used
to interact with a RESTful API. Using the service sets up a new Angular
Resource object

Assuming the API is at `/api/caroptions`, the resource object will
automatically give us access to the following methods:

GET	/api/caroptions		returns all car options

To use the resource object in our controllers, we can just to something
like this:

CarOptions.query() - get all
 */
angular.module("DirectAsia").factory("CarOptions", [
  "$resource", function($resource) {
    return $resource("api/caroptions/");
  }
]);


/*
Using the ng-resource module, this sets up a service that can be used
to interact with a RESTful API. Using the service sets up a new Angular
Resource object

Assuming the API is at `/api/car`, the resource object will
automatically give us access to the following methods:

GET	/api/car		returns all car details
GET	/api/car/id		returns details about a car with ID `id`
POST	/api/car		creates a new car
DEL	/api/car/id		deletes details about a car with ID `id`
PUT	/api/car/id		updates details about a car with ID `id`

To use the resource object in our controllers, we can just to something
like this:

Cars.query() - get all
Cars.get("id") - get one

car = new Cars
car.$save() - create one
car.$delete() - delete one
car.$update() - update one
 */
angular.module("DirectAsia").factory("Cars", [
  "$resource", function($resource) {
    return $resource("api/car/:carId", {
      carId: "@_id"
    }, {
      update: {
        method: "PUT"
      }
    });
  }
]);


/*
This is a class for instantiating whole insurance plans, as used on the quote page. The quote page
is basically all about generating a plan and filling in these details. There may also be other plans,
such as saved plans or recommended plans, and so it makes sense to have a Class for this type of object.
 */
var InsurancePlan;

InsurancePlan = (function() {
  function InsurancePlan() {
    this.cover = null;
    this.totalCost = null;
    this.car = null;
    this.mainDriver = null;
    this.additionalDrivers = [];
    this.referral = null;
    this.options = [];
    this.excess = null;
  }

  return InsurancePlan;

})();


/*
Using an Angular factory allows us to use dependency injection in the controller and instantiate
objects from there
 */

angular.module("DirectAsia").factory("InsurancePlan", function() {
  return InsurancePlan;
});


/*
This is a class for instantiating main drivers, as used on the quote page
 */
var MainDriver;

MainDriver = (function() {
  function MainDriver() {
    this.ownership = null;
    this.dob = {
      day: null,
      month: null,
      year: null
    };
    this.age = null;
    this.gender = null;
    this.maritalStatus = null;
    this.occupation = null;
    this.residentialDistrict = null;
    this.drivingExperience = null;
    this.noClaimsDiscount = null;
    this.offences = null;
    this.refusals = null;
    this.accidents = {
      atFault: null,
      notAtFault: null
    };
    this.additionalDrivers = null;
  }

  return MainDriver;

})();


/*
Using an Angular factory allows us to use dependency injection in the controller and instantiate
objects from there
 */

angular.module("DirectAsia").factory("MainDriver", function() {
  return MainDriver;
});


/*
This is an angular filter that allows us to change the format of expressions on the page. This one simply
takes a total number and returns an array from 0 to that number. The input value provided will then be
replaced by that array. Useful for generating lists.
 */
angular.module("DirectAsia").filter("range", function() {
  return function(input, total) {
    var i, _i;
    total = parseInt(total);
    for (i = _i = 0; 0 <= total ? _i <= total : _i >= total; i = 0 <= total ? ++_i : --_i) {
      input.push(i);
    }
    return input;
  };
});


/*
This is an angular filter that allows us to change the format of expressions on the page. This filter takes
a string, removes special characters, and replaces spaces with hyphens. Useful for generating file names, such
as images or icons, based on an title. e.g. "24hr breakdown assistance" becomes "24hr-breakdown-assistance"
 */
angular.module("DirectAsia").filter("slugify", function() {
  return function(input) {
    return input.trim().replace(/[^\w\s-]/g, "").toLowerCase().replace(/[-\s]+/g, "-");
  };
});
