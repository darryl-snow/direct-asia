###
This is a class for instantiating main drivers, as used on the quote page
###

class MainDriver

	constructor: ->
		@ownership = null
		@dob =
			day: null
			month: null
			year: null
		@age = null
		@gender = null
		@maritalStatus = null
		@occupation = null
		@residentialDistrict = null
		@drivingExperience = null
		@noClaimsDiscount = null
		@offences = null
		@refusals = null
		@accidents =
			atFault: null
			notAtFault: null
		@additionalDrivers = null

###
Using an Angular factory allows us to use dependency injection in the controller and instantiate
objects from there
###

angular.module "DirectAsia"
	.factory "MainDriver", ->

		MainDriver