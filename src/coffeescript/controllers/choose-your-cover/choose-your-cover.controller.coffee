angular.module "DirectAsia"
	.controller "chooseYourCover", ["$scope", ($scope) ->

		$scope.covers = [
			image: '../../images/comprehensive.png'
			name: 'Comprehensive'
			content: ''
		,
			image: '../../images/third-party-plus.png'
			name: 'Third-Party Plus'
			content: '(includes Fire & Theft)'
		,
			image: '../../images/third-party-only.png'
			name: 'Third-Party Only'
			content: ''
		]

		$scope.helps =
			name: ""
			email: ""
			number: ""
			no_content: false
			submit: false

		$scope.helps.click = ->

			if !$scope.helps.name or !$scope.helps.email or !$scope.helps.number

				$scope.helps.no_content = true

			else

				$scope.helps.submit = true

		$scope.covers.selected

		$scope.covers.isActive = ($index) ->

			if $index == $scope.covers.selected

				"active"

			else

				""

		$scope.covers.click = ($index) ->

			$scope.covers.selected = $index
	]