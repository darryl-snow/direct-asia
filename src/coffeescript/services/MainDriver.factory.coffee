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

angular.module "DirectAsia"
	.factory "MainDriver", ->

		MainDriver