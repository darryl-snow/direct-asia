angular.module "DirectAsia"
	.controller "qouteController", ["$scope", ($scope) ->

		$scope.drivingLicenses = [
			'Driver License 1'
			'Driver License 2'
		]
		$scope.heardAboutUs = [
			'Friends & Family'
			'TV'
			'Online'
			'Print/Billboards'
			'Social'
			'Taxi'
			'Cinema'
			'Other'
		]
		# currency 
		$scope.currency =
			code: 'S$'
			name: 'Singapore Dollar'
		# controller for plan
		$scope.plans = [
			{
				name: 'Comprehensive'
				price_per_year: 732
				price_per_month: 61
			}
			{
				name: 'Third-Party Fire & Theft'
				price_per_year: 594
				price_per_month: 50
			}
			{
				name: 'Third-Party'
				price_per_year: 540
				price_per_month: 45
			}
		]
		$scope.plans.selected = 0

		$scope.plans.isActive = ($index) ->
			if $index == $scope.plans.selected
				'active'
			else
				''

		$scope.plans.click = ($index) ->
			$scope.plans.selected = $index

		# contoller for cover
		$scope.covers = [
			{
				type: 'minimum'
				name: 'Specific Drivers'
				content: 'Name your drivers and save'
				price: '168'
				labels: 'per driver'
			}
			{
				type: 'fixed'
				name: 'Anyone who drives'
				content: 'Get more Flexibility'
				price: '480'
				labels: 'all drivers'
			}
		]
		$scope.covers.selected = 0

		$scope.covers.isActive = ($index) ->
			if $index == $scope.covers.selected
				'active'
			else
				''

		$scope.covers.click = ($index) ->
			$scope.covers.selected = $index

		# controller for driver
		$scope.drivers = [ {
			firstname: ''
			surname: ''
			birth_day: ''
			birth_month: ''
			birth_year: ''
			gender: ''
			status: ''
			occupation: ''
			years: ''
			demerit: ''
			accident: ''
		} ]
		$scope.drivers.selected = 0

		$scope.drivers.isActive = ($index) ->
			if $index == $scope.drivers.selected
				'active'
			else
				''

		$scope.drivers.addDriver = ->
			$scope.drivers.push
				firstname: ''
				surname: ''
				birth_day: ''
				birth_month: ''
				birth_year: ''
				gender: ''
				status: ''
				occupation: ''
				years: ''
				demerit: ''
				accident: ''

		$scope.drivers.select = (value, property) ->
			$scope.drivers[property] = value

		# controller for optional cover
		$scope.optional_covers = [
			{
				name: '24 hr breakdown assistance'
				image: '../../images/break-icon.png'
				price: 'include'
				recomended: true
				selected: false
			}
			{
				name: '24 months new for old replacement car'
				image: '../../images/car-icon4.png'
				price: '156'
				recomended: true
				selected: false
			}
			{
				name: 'Car modifications'
				image: '../../images/clock-icon.png'
				price: '144'
				recomended: false
				selected: false
			}
			{
				name: 'My workshop/ garage'
				image: '../../images/garage-icon.png'
				price: '60'
				recomended: false
				selected: false
			}
			{
				name: 'Medical expenses'
				image: '../../images/medical-icon.png'
				price: '96'
				recomended: false
				selected: false
			}
			{
				name: 'Personal accident'
				image: '../../images/accident-icon.png'
				price: '96'
				recomended: false
				selected: false
			}
			{
				name: 'Loss of use'
				image: '../../images/lost-of-use-icon2.png'
				price: '120'
				recomended: false
				selected: false
			}
			{
				name: 'Repatriation costs'
				image: '../../images/plane-icon.png'
				price: '144'
				recomended: false
				selected: false
			}
		]
		$scope.optional_covers.selected = []
		$scope.optional_covers.continue_text = 'NO THANKS, CONTINUE'

		$scope.optional_covers.isActive = (optional_cover) ->
			if optional_cover.selected
				'active'
			else
				''

		$scope.optional_covers.click = (optional_cover) ->
			optional_cover.selected = !optional_cover.selected
			$scope.optional_covers.selected = []
			angular.forEach $scope.optional_covers, (value, key) ->
				if value.selected
					$scope.optional_covers.selected.push value
			if $scope.optional_covers.selected.length > 0
				$scope.optional_covers.continue_text = 'CONTINUE'
			else
				$scope.optional_covers.continue_text = 'NO THANKS, CONTINUE'

		# controller for policy
		$scope.policies = [
			{
				price: '500'
				selected: false
			}
			{
				price: '1,000'
				selected: false
			}
			{
				price: '2,000'
				selected: false
			}
			{
				price: '3,000'
				selected: false
			}
			{
				price: '4,000'
				selected: false
			}
			{
				price: '5,000'
				selected: false
			}
		]
		$scope.policies.selected = undefined
		$scope.policies.continue_text = 'NO THANKS, CONTINUE'
		$scope.$watch 'policies.selected', (newValue, oldValue) ->
			if newValue == undefined
				$scope.policies.continue_text = 'NO THANKS, CONTINUE'
			else
				$scope.policies.continue_text = 'CONTINUE'
		# controller for save
		$scope.save = [
			{
				image: '../../images/camera-icon.png'
				title: 'Use in-car camera'
				save: '4'
				type: 'percentage'
				selected: false
			}
			{
				image: '../../images/leaf-icon.png'
				title: 'Go paperless'
				save: '4'
				type: 'percentage'
				selected: false
			}
			{
				image: '../../images/cloud-icon.png'
				title: 'Spread the Word'
				save: '0'
				type: 'exact'
				selected: false
			}
			{
				image: '../../images/road-icon.png'
				title: 'Low Mileage Discount'
				save: '0'
				type: 'exact'
				selected: false
			}
		]
		$scope.save.continue_text = 'NO THANKS, CONTINUE'

		$scope.save.select = (item) ->
			item.selected = !item.selected
			found = false
			angular.forEach $scope.save, (value, key) ->
				if !found
					if value.selected
						found = true
			if found
				$scope.save.continue_text = 'CONTINUE'
			else
				$scope.save.continue_text = 'NO THANKS, CONTINUE'

		#* This will jump to section in the paramter

		$scope.goTo = ($index) ->
			section.goTo $index

	]