angular.module "DirectAsia"
	.factory "Cars", [
		"$resource", ($resource) ->
			$resource "api/car/:carId",
				carId: "@_id"
			,
				update:
					method: "PUT"
	]