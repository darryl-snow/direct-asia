/* direct-asia : 0.0.0 : Wed Mar 25 2015 22:42:52 GMT+0800 (CST) */

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
