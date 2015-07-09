###

TESTING ONLY - can be deleted before production

This function simply mocks data that would be returned
from a back-end API. Data should include:

- available cover plans, including all relevant information about each
- avilable optional benefits, including descriptions of each

###

getMockData = ->
	data =
		plans: [
			{
				image: "../../images/comprehensive.png"
				name: "Comprehensive"
				tagline: ""
				price: "S$884.73"
				policyExcess: ["HK$99,999", "S$600"]
				covers: [
					"Third Party - Death or Bodily injury"
					"Third Party - Property Damage"
					"Third Party - Collision Damage"
					"24 hour accident towing"
					"Own damage - No Other Vehicle Involved"
					"Windscreen/Window Breakage"
				]
			}
			{
				image: "../../images/third-party-plus.png"
				name: "Third-Party Plus"
				tagline: "(includes Fire & Theft)"
				price: "S$884.73"
				policyExcess: ["S$600"]
				covers: [
					"Third Party - Death or Bodily injury"
					"Third Party - Property Damage"
					"Third Party - Collision Damage"
					"24 hour accident towing"
				]
			}
			{
				image: "../../images/third-party-only.png"
				name: "Third-Party Only"
				tagline: ""
				price: "S$884.73"
				policyExcess: []
				covers: [
					"Third Party - Death or Bodily injury"
					"Third Party - Property Damage"
					"Third Party - Collision Damage"
				]
			}
		]
		covers: [
			{
				name: "Third Party - Death or Bodily injury"
				description: "Your liability will be covered if you injure someone in an accident that involves your car."
			}
			{
				name: "Third Party - Property Damage"
				description: "You will be covered if property belonging to another vehicle is damaged by you in a car accident."
			}
			{
				name: "Third Party - Collision Damage"
				description: "If you collide with another vehicle, your car repairs will be covered as long as the cost is below the market value of your car. If the cost of the repairs is higher than the value of your car, or if your car cannot be repaired, we will pay you the value of your vehicle at the time of the claim."
			}
			{
				name: "24 hour accident towing"
				description: "If your car cannot be driven after an accident, we will tow it at anytime to one of our approved repair workshops or to your preferred workshop if you choose this optional benefit."
			}
			{
				name: "Own damage - No Other Vehicle Involved"
				description: "If you crash your car (with no other vehicle involved) or if your car accidentally catches on fire, is stolen or suffers damages in a natural disaster, we will cover the repairs as long as the cost is below the market value of your car. If the cost of the repairs is higher, or if it cannot be repaired, we will pay you the value of your vehicle at the time of the claim."
			}
			{
				name: "Windscreen/Window Breakage"
				description: "If you want to replace a damaged windscreen, you\"ll need to pay HKD$100 (before GST) out of your own pocket. You won\"t need to pay if the windscreen can be repaired instead of replaced."
			}
			{
				name: "Policy Excess"
				options: true
				description: "Your excess policy description."
			}
		]

###
The controller ties together the view with the model.

In this case the view is the partials/choose-your-cover/choose-your-cover file and the main model
is the $scope.coverDetails variable.
###

angular.module("DirectAsia").controller "yourPlanCtrl", [
	"$scope"
	($scope) ->

		###
		This private function fetches data from the back-end to be used on the page

		(NOTE: This isn't used currently as the data is mocked by the
		function getMockData() above)
		###

		getDataFromAPI = ->
			dataFromAPI = {}
			$http.get("http://api-url?lang=" + $rootScope.currentLanguage).success((data, status, headers, config) ->
				dataFromAPI = data
			).error (data, status, headers, config) ->
				console.error data
			dataFromAPI

		###
		This private function formats the data returned from the server so that it
		can be used on the page
		###

		setupData = (data) ->
			$scope.plans = data.plans
			$scope.covers = data.covers
			# Data to be sent back to the server
			$scope.coverDetails =
				plan: $scope.plans[0]
				agreed: false

			$scope.selection = {}

			# Iterator index table
			$scope.i = -1

			# Set selection defaults
			angular.forEach data.plans, (object, i) ->
				if (object.policyExcess.length > 0)
					$scope.selection[object.name] = object.policyExcess[0]

		###
		This function is used to get plans based on index as it relates to 
		the table type being generated i.e. mobile|desktop
		###

		$scope.getPlans = (i) ->
			if (i < 0)
				return $scope.plans
			else 
				return [$scope.plans[i]]

		###
		This function is used to get one plan based on index as it relates to 
		the table type being generated i.e mobile|desktop
		###

		$scope.getPlan = (i, plan) ->
			if (i < 0)
				return plan
			else 
				return $scope.plans[i]

		###
		This function is used to select a particular cover plan
		###

		$scope.selectPlan = (plan) ->
			$scope.coverDetails.plan = plan

		###
		This function checks whether an otional benefit is included in a
		specific cover plan in order to determine if a checkmark should
		be displayed in the table under the column for that plan and the
		row for that benefit.
		###

		$scope.doesPlanIncludeCover = (plan, cover) ->
			i = 0
			while i < plan.covers.length
				if plan.covers[i] == cover.name
					return true
				i++
			false

		###
		Setup the data on the page using that returned from the server or mocked.
		###

		###
		setupData(getDataFromAPI());
		###
		setupData getMockData()
]