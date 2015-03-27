/* direct-asia : 0.0.0 : Fri Mar 27 2015 15:47:48 GMT+0800 (CST) */
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

angular.module("DirectAsia").factory("AdditionalDriver", function() {
  return AdditionalDriver;
});

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

angular.module("DirectAsia").factory("InsurancePlan", function() {
  return InsurancePlan;
});

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

angular.module("DirectAsia").factory("MainDriver", function() {
  return MainDriver;
});

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

angular.module("DirectAsia").filter("slugify", function() {
  return function(input) {
    return input.trim().replace(/[^\w\s-]/g, "").toLowerCase().replace(/[-\s]+/g, "-");
  };
});
