###
This is a class for instantiating whole insurance plans, as used on the quote page. The quote page
is basically all about generating a plan and filling in these details. There may also be other plans,
such as saved plans or recommended plans, and so it makes sense to have a Class for this type of object.
###

class InsurancePlan

	constructor: ->
		@cover = null
		@totalCost = null
		@car = null
		@mainDriver = null
		@additionalDrivers = []
		@referral = null
		@options = []
		@excess = null

###
Using an Angular factory allows us to use dependency injection in the controller and instantiate
objects from there
###

angular.module "DirectAsia"
	.factory "InsurancePlan", ->

		InsurancePlan