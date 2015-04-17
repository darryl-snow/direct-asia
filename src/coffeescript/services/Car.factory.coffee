###
This is a class for instantiating car objects, as used on the quote page
###

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
		@policy =
			start:
				day: null
				month: null
				year: null
			end:
				day: null
				month: null
				year: null

###
Using an Angular factory allows us to use dependency injection in the controller
and instantiate objects from there
###

angular.module "DirectAsia"
	.factory "Car", ->

		Car