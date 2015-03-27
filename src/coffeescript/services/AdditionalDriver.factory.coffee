###
This is a class for instantiating additional drivers, as used on the quote page
###

class AdditionalDriver

	constructor: ->
		@firstName = null
		@lastName = null
		@dob =
			day: null
			month: null
			year: null
		@gender = null
		@maritalStatus = null
		@occupation = null
		@drivingExperience = null
		@offences = null
		@accidents =
			atFault: null
			notAtFault: null
		@refusals = null

###
Using an Angular factory allows us to use dependency injection in the controller and instantiate
objects from there
###

angular.module "DirectAsia"
	.factory "AdditionalDriver", ->

		AdditionalDriver