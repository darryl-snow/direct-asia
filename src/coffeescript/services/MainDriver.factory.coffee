###
This is a class for instantiating main drivers, as used on the quote page
###

class MainDriver

	constructor: ->
		@ownership = null
		@dob = new Date()
		@age = null
		@gender = null
		@maritalStatus = null
		@occupation = null
		@residentialDistrict = null
		@drivingExperience = null
		@noClaimsDiscount = 30
		@whyNoClaimsDiscount = null
		@otherCarNoClaimsDiscount = 30
		@offences = null
		@refusals = null
		@accidents =
			atFault: null
			notAtFault: null
		@additionalDrivers = null

###
Using an Angular factory allows us to use dependency injection in the
controller and instantiate objects from there
###

angular.module "DirectAsia"
	.factory "MainDriver", ->

		MainDriver