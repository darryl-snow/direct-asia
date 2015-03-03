###
Using the ng-resource module, this sets up a service that can be used
to interact with a RESTful API. Using the service sets up a new Angular
Resource object

Assuming the API is at `/api/caroptions`, the resource object will
automatically give us access to the following methods:

GET	/api/caroptions		returns all car options

To use the resource object in our controllers, we can just to something
like this:

CarOptions.query() - get all
###

angular.module "DirectAsia"
	.factory "CarOptions", [
		"$resource", ($resource) ->
			$resource "api/caroptions/"
	]