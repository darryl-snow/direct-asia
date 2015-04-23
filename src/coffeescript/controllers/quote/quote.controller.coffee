###

TESTING ONLY - can be deleted before production

This function simply mocks data that would be returned
from a back-end API. Data should include:

- available cover plans (e.g. comprehensive, 3rd party, etc.)
- excess options
- feedback options
- all available optional benefits
- main driver info (from previous page)
- car info (from previous page)
- selected cover plan (from previous page)
- recommended plan details

###

getMockData = ->

	data =
		coverPlans:
			comprehensive:
				name: "Comprehensive"
				baseCost: 732
			thirdPartyFireAndTheft:
				name: "Third-Party Fire & Theft"
				baseCost: 594
			thirdParty:
				name: "Third-Party"
				baseCost: 540
		excesses: [
			"500"
			"1000"
			"2000"
			"3000"
			"4000"
			"5000"
		]
		feedback: [
			"Friends & Family"
			"TV"
			"Online"
			"Print/Billboards"
			"Social"
			"Taxi"
			"Cinema"
			"Other"
		]
		optionalCover: [
			name: "Loss of use"
			description: "S$50 to help you with transport costs while your car is being repaired"
			cost: 156
			editable: false
		,
			name: "My workshop / garage"
			description: "Gives you the freedom to select your own preferred
			 workshop for an optional benefit"
			cost: 156
			editable: false
		,
			name: "Experienced Drivers"
			description: "Cover anyone over 30 with more than 2 years driving experience"
			cost: 156
			editable: false
		,
			name: "24 hr breakdown assistance"
			description: "Description"
			cost: 156
			editable: false
		,
			name: "24 months new for old replacement car"
			description: "Description"
			cost: 156
			editable: false
		,
			name: "Car modifications"
			description: "Description"
			cost: 156
			editable: true
		,
			name: "Medical expenses"
			description: "Description"
			cost: 156
			editable: false
		,
			name: "Personal accident"
			description: "Description"
			cost: 156
			editable: false
		,
			name: "Repatriation costs"
			description: "Description"
			cost: 156
			editable: false
		,
			name: "NCPD"
			description: "Description"
			cost: 156
			editable: false
		,
			name: "Uninsured loss recovery"
			description: "Description"
			cost: 156
			editable: false
		,
			name: "Windscreen and window breakage"
			description: "Description"
			cost: 156
			editable: false
		]
		mainDriver:
			ownership: true
			dob:
				day: 25
				month: 3
				year: 1983
			age: 32
			gender: "Female"
			maritalStatus: "single"
			occupation: "web developer"
			residentialDistrict: "PanLong Qu"
			drivingExperience: "more than 5"
			noClaimsDiscount: "30%"
			offences: false
			refusals: false
			accidents:
				atFault: "1"
				notAtFault: "0"
			additionalDrivers: false
		car:
			year: "2013"
			make: "Nissan"
			model: "Micra"
			modified: true
			modifications:
				airintakeexhaust: false
				bodykit: true
				rimstires: true
				suspensionstabiliser: false
			ownership: "private"
			financed: false
			kmsperyear: "> 15,000"
			lowmileageoption: true
			usage: "personal use"
		selectedCover: "comprehensive"
		recommendedPlan:
			cover:
				name: "Comprehensive"
				baseCost: 732
			excess: 2000


###
The controller ties together the view with the model.

In this case the view is the components/quote file and the main model
is the $scope.plan variable.
###

angular.module "DirectAsia"
	.controller "QuoteCtrl", [
		"$scope",
		"$http",
		"InsurancePlan",
		"MainDriver",
		"Car",
		"AdditionalDriver",
		"$rootScope",
		($scope, $http, InsurancePlan, MainDriver, Car, AdditionalDriver, $rootScope) ->

			###
			plan = the resulting plan containing everything the user has selected.
			This is what will be submitted to the server recommendedPlan = what
			we're recommendingthe user selects, shown on the page as a comparison
			savedPlan = in case the user wants to save the plan for later or switch
			to the recommended plan and then switch back
			###

			$scope.plan = new InsurancePlan()
			$scope.recommendedPlan = new InsurancePlan()
			$scope.savedPlan = new InsurancePlan()

			###
			Feedback is for recording how the user heard about DA. This is to be sent
			to the server as well as the plan they've selected
			###

			$scope.feedback = ""

			###
			Options to be displayed on the page
			###

			$scope.options =
				coverPlans: []
				excesses: []
				feedback: []
				optionalCover: []

			###
			The page has 5 steps:

			- Choose plan
			- Add additional drivers
			- Select optional benefits
			- Choose policy excess
			- Summary / Save

			This sets the current step as 'choose plan' so that only that section
			will be displayed initially.

			###

			$scope.currentStep = 1

			###
			This indicates whether the recommended plan has been selected from the comparison
			section at the bottom of the page
			###

			$scope.selectRecommendedPlan = false

			###
			This is a container object for the information about up to 4 additional drivers
			the user may wish to add.
			###

			$scope.additionalDrivers = []
			for i in [0..3]
				$scope.additionalDrivers.push new AdditionalDriver

			###
			This private function fetches data from the back-end to be used on the page

			(NOTE: This isn't used currently as the data is mocked by the
			function getMockData() above)
			###

			getDataFromAPI = ->

				dataFromAPI = {}

				###
				You'll want to get localised data returned from the server
				###

				$http.get "http://api-url?lang=" + $rootScope.currentLanguage
					.success (data, status, headers, config) ->

						dataFromAPI = data

					.error (data, status, headers, config) ->
						console.error data

				dataFromAPI

			###
			This private function takes the name of an optional benefit and
			returns the object corresponding to that benefit, if it exists
			###

			getOption = (name) ->

				option = $scope.options.optionalCover.filter (ob) ->
					ob.name.trim().toLowerCase() is name.trim().toLowerCase()

				option[0]

			###
			This private function determines which options to recommend based
			on data the user has previously entered, using the supplied logic
			table
			###

			getRecommendedOptions = (cover, driver, car) ->

				options = []
				date = new Date
				years = date.getFullYear() - car.year

				###
				CO & TP+ get LOU
				###

				if (cover is "Comprehensive" or cover is "Third-Party Fire & Theft") and
					options.length < 4

						options.push getOption "Loss of Use"

				###
				CO gets new for old and my workshop if car is less than 1 years
				###

				if years <= 1 and cover is "Comprehensive" and options.length < 4
					options.push getOption "24 months new for old replacement car"

				###
				All cover plans get NCDP if driver has 50%NCD
				###

				if (driver.noClaimsDiscount is "50%" or driver.noClaimsDiscount is "60%") and
					options.length < 4

						options.push getOption "NCPD"

				###
				CO and TP+ get 24hrs bd if the driver is female
				###

				if (cover is "Comprehensive" or cover is "Third-Party Fire & Theft") and
					options.length < 4

						options.push getOption "24 hr breakdown assistance"

				###
				CO gets my workshop if car is less than 3 years
				###

				if cover is "Comprehensive" and years <= 3 and options.length < 4

					options.push getOption "My workshop / garage"

				###
				Everyone gets PA and ME. TPO also gets uninsured loss recovery
				###
				
				if options.length < 4
					options.push getOption "Personal accident"
					options.push getOption "Medical expenses"

					if cover is "Third-Party"
						options.push getOption "Uninsured loss recovery"

				###
				TP+ and TPO get windscreen and window breakage if car is less than 5 years
				###

				if (cover is "Third-Party Fire & Theft" or cover is "Third-Party") and
					years <= 5 and options.length < 4

						options.push getOption "Windscreen and window breakage"

				options

			###
			This private function determines which plan is recommended based on what the
			user has selected
			###

			getRecommendedPlan = ->

				$scope.recommendedPlan.car = $scope.plan.car
				$scope.recommendedPlan.driver = $scope.plan.driver
				$scope.recommendedPlan.cover = $scope.plan.cover
				$scope.recommendedPlan.options =
					getRecommendedOptions $scope.plan.cover.name, $scope.mainDriver, $scope.car

				###
				set recommended optional benefits
				###

				for option, i in $scope.options.optionalCover

					option.recommended = false

					matched = $scope.recommendedPlan.options.filter (recommendedOption) ->
					 recommendedOption.name is option.name

					if matched.length then option.recommended = true

				calculateTotalCost $scope.recommendedPlan

			###
			This private function formats the data returned from the server so that it
			can be used on the page
			###

			setupData = (data) ->

				###
				Get page options
				###
				
				$scope.options.coverPlans = data.coverPlans
				$scope.options.excesses = data.excesses
				$scope.options.feedback = data.feedback
				$scope.options.optionalCover = data.optionalCover

				###
				Get details about main driver
				###

				$scope.mainDriver = new MainDriver
				$scope.mainDriver.ownership = data.mainDriver.ownership
				$scope.mainDriver.dob =
					day: data.mainDriver.dob.day
					month: data.mainDriver.dob.month
					year: data.mainDriver.dob.year
				$scope.mainDriver.age = data.mainDriver.age
				$scope.mainDriver.gender = data.mainDriver.gender
				$scope.mainDriver.maritalStatus = data.mainDriver.maritalStatus
				$scope.mainDriver.occupation = data.mainDriver.occupation
				$scope.mainDriver.residentialDistrict = data.mainDriver.residentialDistrict
				$scope.mainDriver.drivingExperience = data.mainDriver.drivingExperience
				$scope.mainDriver.noClaimsDiscount = data.mainDriver.noClaimsDiscount
				$scope.mainDriver.whyNoClaimsDiscount = data.mainDriver.whyNoClaimsDiscount
				$scope.mainDriver.offences = data.mainDriver.offences
				$scope.mainDriver.refusals = data.mainDriver.refusals
				$scope.mainDriver.accidents =
					atFault: data.mainDriver.accidents.atFault
					notAtFault: data.mainDriver.accidents.atFault
				$scope.mainDriver.additionalDrivers = data.mainDriver.additionalDrivers

				###
				Get details about car
				###

				$scope.car = new Car
				$scope.car.year = data.car.year
				$scope.car.make = data.car.make
				$scope.car.model = data.car.model
				$scope.car.modified = data.car.modified
				$scope.car.modifications =
					airintakeexhaust: data.car.modifications.airintakeexhaust
					bodykit: data.car.modifications.bodykit
					rimstires: data.car.modifications.rimstires
					suspensionstabiliser: data.car.modifications.suspensionstabiliser
				$scope.car.ownership = data.car.ownership
				$scope.car.financed = data.car.financed
				$scope.car.kmsperyear = data.car.kmsperyear
				$scope.car.lowmileageoption = data.car.lowmileageoption
				$scope.car.usage = data.car.usage

				###
				Save info for selected plan. Excess is recommended excess by default.
				###

				$scope.plan.car = $scope.car
				$scope.plan.mainDriver = $scope.mainDriver
				$scope.plan.additionalDrivers = []
				$scope.plan.cover = $scope.options.coverPlans[data.selectedCover]
				$scope.plan.excess = data.recommendedPlan.excess

				###
				Save info for recommended plan
				###

				$scope.recommendedPlan.excess = data.recommendedPlan.excess
				getRecommendedPlan()

				###
				Calculate the annual costs for the selected plan
				###

				calculateTotalCost $scope.plan

			###
			This function is used by the 'continue' buttons and simply sets the current step
			so that the appropriate sections may be displayed
			###

			$scope.continue = (step) ->
				$scope.currentStep = step

			###
			This function adds another additional driver to the plan
			###

			$scope.addAdditionalDriver = ->
				# if $scope.plan.additionalDrivers[0].firstname
				# 	$scope.plan.additionalDrivers.push new AdditionalDriver

				$scope.plan.additionalDrivers.push new AdditionalDriver

			###
			This function is for the fixed navbar where the user can select
			their cover type. When selecting a new type, the plan's total
			cost should be recalculated.
			###

			$scope.selectPlan = (cover) ->

				$scope.plan.cover = cover
				calculateTotalCost $scope.plan

				getRecommendedPlan()

			###
			This function is a toggle  for selecting/deselecting an optional
			benefit to add to the plan. If the plan isn't already selected it
			will be added to the list. If the option is already selected it will
			be removed. After changing the selected benefits, the plan's total
			cost should be recalculated.
			###

			$scope.selectOption = (option) ->
				option.selected = !option.selected
				
				if option.selected and option not in $scope.plan.options
					$scope.plan.options.push option

				if !option.selected and option in $scope.plan.options
					$scope.plan.options = $scope.plan.options.filter (selectedOption) ->
					 selectedOption isnt option

				calculateTotalCost $scope.plan

			###
			This function goes through the selected optional benefits and
			tallies up the cost. Used for calculating the plan's total cost and
			for showing a breakdown in the summary section.
			###

			$scope.calculateOptionsCost = (plan) ->

				optionsCost = 0

				for option in plan.options
					optionsCost += option.cost

				optionsCost

			###
			Private function for calculating the total cost of the plan. Used
			only from within other functions in this controller.
			###

			calculateTotalCost = (plan) ->

				plan.totalCost = plan.cover.baseCost + $scope.calculateOptionsCost(plan)

			###
			This private function copies data from the currently selected plan
			into another object for temporary storage.
			###

			saveCurrentPlan = ->
				$scope.savedPlan.cover = $scope.plan.cover
				$scope.savedPlan.totalCost = $scope.plan.totalCost
				$scope.savedPlan.car = $scope.plan.car
				$scope.savedPlan.mainDriver = $scope.plan.mainDriver
				$scope.savedPlan.additionalDrivers = $scope.plan.additionalDrivers
				$scope.savedPlan.referral = $scope.plan.referral
				$scope.savedPlan.options = $scope.plan.options
				$scope.savedPlan.excess = $scope.plan.excess

			###
			Function for saving the plan for later - called by buttons in the
			navbar and at the bottom of the page. When this is clicked, the saved
			plan should be sent to the server (not implemented)
			###

			$scope.saveForLater = ->

				saveCurrentPlan()

				###
				send data to server
				- for now just log the plan to the console
				###
				console.table $scope.plan

			###
			This function is required for the custom select fields to work. When the
			field value changes the corresponding scope variable is updated.
			###

			$scope.select = (value, index, property) ->

				if value is -1 then value = 0

				eval "$scope." + property + "='" + value + "'"

			###
			When the user selects the recommended plan from the comparison pane
			in the summary section or clicks the 'select plan and modify' button
			in the first section, the recommended options ,and only those options,
			should be pre-selected. The options displayed on the page are from the
			$scope.options.optionalCover object, while the recommended options are
			in the $scope.recommendedPlan.options object. The function loops through
			the options on the page and if they are also in the recommended options
			then the selectOption function is called on that option. This is a
			private function called only from within functions in this controller.
			###

			selectRecommendedOptions = ->

				for option in $scope.options.optionalCover

					option.selected = false

					matched = $scope.recommendedPlan.options.filter (recommendedOption) ->
						recommendedOption.name is option.name

					if matched.length then $scope.selectOption option

			###
			When the user selects to revert to the previous plan from the comparison
			pane in the summary section, the recommended options should be de-selected
			and those previously selected re-selected. The options displayed on the page
			are from the $scope.options.optionalCover object, while the previously
			selected options are in the $savedPlan.options object. The function loops
			through the options on the page and if they are also in the saved plan options
			then the selectOption function is called on that option. This is a
			private function called only from within functions in this controller.
			###

			selectPreviousOptions = ->

				for option in $scope.options.optionalCover

					option.selected = false

					matched = $scope.savedPlan.options.filter (previousOption) ->
						previousOption.name is option.name

					if matched.length then $scope.selectOption option

			###
			When the user selects the 'select plan and modify' button in section
			1, 2 things need to happen:
			- the recommended plan is selected, so we call the
			  selectRecommendedOptions function
			- the user should go to the next section, so we call the continue function
			###

			$scope.selectPlanAndModify = ->

				selectRecommendedOptions()

				$scope.continue(2)

			###
			When the user selects the 'select plan' button in the comparison pane of
			the summary section, The current plan should be saved, in case they need
			to revert back to it later, then the current plan should be updated with
			the cover, options, and excess from the recommended plan. The total cost
			of the selected plan will then be the same as that for the recommended
			plan. The function should also ensure that the recommended options are
			selected and that the comparison pane is closed.
			###

			$scope.useRecommendedPlan = ->

				saveCurrentPlan()

				$scope.plan.cover = $scope.recommendedPlan.cover
				$scope.plan.options = $scope.recommendedPlan.options
				selectRecommendedOptions()
				$scope.plan.excess = $scope.recommendedPlan.excess
				$scope.plan.totalCost = $scope.recommendedPlan.totalCost

				$scope.compare = false
				$scope.selectRecommendedPlan = true

			###
			In case the user wants to go back from the recommended plan to the
			options they had selected previously, this function simply restores the
			page to the state it was in before they selected the recommended plan.

			Note: currently there is no 'revert to previous plan' button as this will
			require design decisions
			###

			$scope.revertToPreviousPlan = ->

				$scope.plan = $scope.savedPlan
				selectPreviousOptions()
				$scope.selectRecommendedPlan = false
				$scope.compare = false

			###
			First hide any other forms that may be showing for the other additional
			drivers. Reset the fake select boxes for new drivers. Then show the
			form.
			###
			$scope.showNewDriverForm = (driver) ->

				for d, index in $scope.additionalDrivers
					d.editing = false

					if !d.added
						# dirty hack!
						setTimeout ->
							$("#editDriver" + index + "-experience").val("").trigger("change");
						, 1000

				driver.editing = true

			###
			Check if the additional driver has already been added to the plan. If
			so then return the index of that driver in the model's additional
			drivers array, otherwise return false.
			###
			$scope.wasDriverAdded = (driver) ->

				for d, index in $scope.plan.additionalDrivers
					if d is driver
						return index

				false

			###
			Remove the additional driver from the model and then reset the
			driver information on the form. Synch data with the server.
			###
			$scope.removeAdditionalDriver = (driver, index) ->

				additionalDrivers = $scope.plan.additionalDrivers.filter (ad) ->
					ad isnt driver

				$scope.plan.additionalDrivers = additionalDrivers

				$scope.additionalDrivers[index] = new AdditionalDriver

				###
				synch data with server
				###

				console.table $scope.plan.additionalDrivers

			###
			Hide all additional driver forms then show the form for this driver.
			###
			$scope.editAdditionalDriver = (driver) ->

				for d in $scope.additionalDrivers
					d.editing = false

				driver.editing = true

			###
			If the driver is new then add the driver's details to the model's
			additional drivers array. If not then update the model. Hide the
			forms, synch data to the server, and log the results.
			###
			$scope.saveChangesToDriver = (driver) ->

				console.log "saving driver"

				index = $scope.wasDriverAdded driver

				if index then $scope.plan.additionalDrivers[index] = driver
				else $scope.plan.additionalDrivers.push driver

				driver.editing = false
				driver.added = true

				###
				synch data with server
				###

				console.table $scope.plan.additionalDrivers

			###
			Finally, now that all functions have been parsed, setup the data on the
			page using that returned from the server or mocked.
			###

			###
			setupData getDataFromAPI()
			###
			setupData getMockData()

	]