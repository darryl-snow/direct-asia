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
			"S$500"
			"S$1000"
			"S$2000"
			"S$3000"
			"S$4000"
			"S$5000"
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
		,
			name: "My workshop/ garage"
			description: "Gives you the freedom to select your own preferred
			 workshop for an optional benefit"
			cost: 156
		,
			name: "Experienced Drivers"
			description: "Cover anyone over 30 with more than 2 years driving experience"
			cost: 156
		,
			name: "24 hr breakdown assistance"
			description: "Description"
			cost: 156
		,
			name: "24 months new for old replacement car"
			description: "Description"
			cost: 156
		,
			name: "Car modifications"
			description: "Description"
			cost: 156
		,
			name: "Medical expenses"
			description: "Description"
			cost: 156
		,
			name: "Personal accident"
			description: "Description"
			cost: 156
		,
			name: "Repatriation costs"
			description: "Description"
			cost: 156
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
			options: [
				name: "Loss of use"
				description: "S$50 to help you with transport costs while your car is being repaired"
				cost: 156
			,
				name: "My workshop/ garage"
				description: "Gives you the freedom to select your own preferred
				 workshop for an optional benefit"
				cost: 156
			,
				name: "Experienced Drivers"
				description: "Cover anyone over 30 with more than 2 years driving experience"
				cost: 156
			]
			excess: 2000


###
The controller ties together the view with the model.

In this case the view is the components/quote file and the model
is the $scope.quote variable.
###

angular.module "DirectAsia"
	.controller "QuoteCtrl", [
		"$scope", "$http", "InsurancePlan", "MainDriver", "Car", "AdditionalDriver",
		($scope, $http, InsurancePlan, MainDriver, Car, AdditionalDriver) ->

			$scope.plan = new InsurancePlan()
			$scope.recommendedPlan = new InsurancePlan()
			$scope.savedPlan = new InsurancePlan()

			$scope.feedback = ""

			$scope.options =
				coverPlans: []
				excesses: []
				feedback: []
				optionalCover: []

			$scope.currentStep = 1

			getDataFromAPI = ->

				dataFromAPI = {}

				$http.get "http://api-url"
					.success (data, status, headers, config) ->

						dataFromAPI = data

					.error (data, status, headers, config) ->
						console.error data

				dataFromAPI

			setupData = (data) ->

				# get page options
				
				$scope.options.coverPlans = data.coverPlans
				$scope.options.excesses = data.excesses
				$scope.options.feedback = data.feedback
				$scope.options.optionalCover = data.optionalCover

				# get details about main driver

				mainDriver = new MainDriver
				mainDriver.ownership = data.mainDriver.ownership
				mainDriver.dob =
					day: data.mainDriver.dob.day
					month: data.mainDriver.dob.month
					year: data.mainDriver.dob.year
				mainDriver.age = data.mainDriver.age
				mainDriver.gender = data.mainDriver.gender
				mainDriver.maritalStatus = data.mainDriver.maritalStatus
				mainDriver.occupation = data.mainDriver.occupation
				mainDriver.residentialDistrict = data.mainDriver.residentialDistrict
				mainDriver.drivingExperience = data.mainDriver.drivingExperience
				mainDriver.noClaimsDiscount = data.mainDriver.noClaimsDiscount
				mainDriver.offences = data.mainDriver.offences
				mainDriver.refusals = data.mainDriver.refusals
				mainDriver.accidents =
					atFault: data.mainDriver.accidents.atFault
					notAtFault: data.mainDriver.accidents.atFault
				mainDriver.additionalDrivers = data.mainDriver.additionalDrivers

				# get details about car

				car = new Car
				car.year = data.car.year
				car.make = data.car.make
				car.model = data.car.model
				car.modified = data.car.modified
				car.modifications =
					airintakeexhaust: data.car.modifications.airintakeexhaust
					bodykit: data.car.modifications.bodykit
					rimstires: data.car.modifications.rimstires
					suspensionstabiliser: data.car.modifications.suspensionstabiliser
				car.ownership = data.car.ownership
				car.financed = data.car.financed
				car.kmsperyear = data.car.kmsperyear
				car.lowmileageoption = data.car.lowmileageoption
				car.usage = data.car.usage

				# save info for selected plan

				$scope.plan.car = car
				$scope.plan.mainDriver = mainDriver
				$scope.plan.additionalDrivers.push new AdditionalDriver
				$scope.plan.cover = $scope.options.coverPlans[data.selectedCover]

				# save info for recommended plan

				$scope.recommendedPlan.car = $scope.plan.car
				$scope.recommendedPlan.driver = $scope.plan.driver
				$scope.recommendedPlan.cover = data.recommendedPlan.cover
				$scope.recommendedPlan.options = data.recommendedPlan.options
				$scope.recommendedPlan.excess = data.recommendedPlan.excess

				for option, i in $scope.options.optionalCover

					matched = $scope.recommendedPlan.options.filter (recommendedOption) ->
					 recommendedOption.name is option.name

					if matched.length then option.recommended = true


				calculateTotalCost $scope.plan
				calculateTotalCost $scope.recommendedPlan

			$scope.continue = ->
				$scope.currentStep++

				# scroll down? - put in directive

			$scope.addAdditionalDriver = ->
				# if $scope.plan.additionalDrivers[0].firstname
				# 	$scope.plan.additionalDrivers.push new AdditionalDriver

				$scope.plan.additionalDrivers.push new AdditionalDriver

			$scope.selectPlan = (cover) ->

				$scope.plan.cover = cover
				calculateTotalCost()

			$scope.selectOption = (option) ->
				option.selected = !option.selected
				
				if option.selected and option not in $scope.plan.options
					$scope.plan.options.push option

				if !option.selected and option in $scope.plan.options
					$scope.plan.options = $scope.plan.options.filter (selectedOption) ->
					 selectedOption isnt option

				calculateTotalCost $scope.plan

			$scope.calculateOptionsCost = (plan) ->

				optionsCost = 0

				for option in plan.options
					optionsCost += option.cost

				optionsCost

			calculateTotalCost = (plan) ->

				plan.totalCost = plan.cover.baseCost + $scope.calculateOptionsCost(plan)

			$scope.saveForLater = ->
				# send data to server
				console.table $scope.plan

			$scope.select = (value, index, property) ->
				eval "$scope." + property + "='" + value + "'"

			selectRecommendedOptions = ->

				for option in $scope.options.optionalCover

					option.selected = false

					matched = $scope.recommendedPlan.options.filter (recommendedOption) ->
					 recommendedOption.name is option.name

					if matched.length then $scope.selectOption option

			$scope.selectPlanAndModify = ->

				selectRecommendedOptions()

				$scope.continue(2)

			$scope.useRecommendedPlan = ->

				$scope.savedPlan = $scope.plan
				$scope.plan.cover = $scope.recommendedPlan.cover
				$scope.plan.options = $scope.recommendedPlan.options
				selectRecommendedOptions()
				$scope.plan.excess = $scope.recommendedPlan.excess
				$scope.plan.totalCost = $scope.recommendedPlan.totalCost

				$scope.compare = false

			$scope.revertToPreviousPlan = ->

				$scope.plan = $scope.savedPlan

			# setupData getDataFromAPI()
			setupData getMockData()

	]