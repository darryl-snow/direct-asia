angular.module "DirectAsia"
	.controller "CarCtrl", ["$scope", "Cars", ($scope, Cars) ->

		$scope.car =
			year: 2014
			make: undefined
			model: undefined
			modified: true
			modifications:
				bodykit: false
				rimstires: false
				suspensionstabiliser: true
				airintakeexhaust: true
			ownership: undefined
			financed: null
			kmsperyear: "> 15,000"
			usage: undefined

		$scope.years = [
			"2014"
			"2013"
			"2012"
		]

		$scope.makes = [
			"VW"
			"Nissan"
			"Toyota"
		]

		$scope.models = [
			"Golf"
			"Micra"
			"Sera"
		]

		$scope.select = (value, index, property) ->
			$scope.car[property] = value

		$scope.proceed = ->
			console.log $scope.car

			# ================
			# Send JSON to API
			# ================
			#
			# car = new Cars
			# 	year: @scope.car.year
			# 	make: @scope.car.make
			# 	model: @scope.car.model
			# 	modified: @scope.car.modified
			# 	modifications:
			# 		bodykit: @scope.car.bodykit
			# 		rimstires: @scope.car.rimstires
			# 		suspensionstabiliser: @scope.car.suspensionstabiliser
			# 		airintakeexhaust: @scope.car.airintakeexhaust
			# 	ownership: @scope.car.ownership
			# 	financed: @scope.car.financed
			# 	kmsperyear: @scope.car.kmsperyear
			# 	usage: @scope.car.usage

			# car.$save (response) ->

			# 	if !response.errors?

			# 		console.info "Saved!"

			# 	else

			# 		console.error response.errors

	]