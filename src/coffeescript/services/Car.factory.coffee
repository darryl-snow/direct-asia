class Car

	constructor: ->
		@year = null
		@make = null
		@model = null
		@modified = null
		@modifications =
			airintakeexhaust: null
			bodykit: null
			rimstires: null
			suspensionstabiliser: null
		@ownership = null
		@financed = null
		@kmsperyear = null
		@lowmileageoption = null
		@usage = null

angular.module "DirectAsia"
	.factory "Car", ->

		Car