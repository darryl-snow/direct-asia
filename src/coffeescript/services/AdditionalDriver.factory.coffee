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

angular.module "DirectAsia"
	.factory "AdditionalDriver", ->

		AdditionalDriver