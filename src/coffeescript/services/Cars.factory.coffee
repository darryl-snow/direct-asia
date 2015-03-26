###
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
###

angular.module "DirectAsia"
	.factory "Cars", [
		"$resource", ($resource) ->
			$resource "api/car/:carId",
				carId: "@_id"
			,
				update:
					method: "PUT"
	]