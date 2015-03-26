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

angular.module "DirectAsia"
	.factory "InsurancePlan", ->

		InsurancePlan