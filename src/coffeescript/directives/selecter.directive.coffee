angular.module "DirectAsia"
	.directive "selecter", ($timeout, $parse) ->
		(scope, element, attrs) ->

			if scope.$last

				$timeout ->
					selecterConfig =
						label: attrs.label
					jQuery.extend selecterConfig, $parse(attrs.selecterConfig)()

					jQuery.extend selecterConfig,
						callback: (value, index) ->
							scope.$apply ->
								propagateF = $parse(attrs.selecterCallback)(scope)
								propagateF(value, index, attrs.property)

					angular.element(attrs.selecterTarget).selecter selecterConfig