###
Directive for continue buttons - buttons at the bottom of
each page that first ensure the data from that page is sent
to the server and then loads the next page.

This will run on any element with a “continue” attribute
e.g. <button continue>Continue</button>

The element should also have 3 other attributes to pass data
to this directive:

* page-data - 				the data to be sent to the server
*
* next-page (required) - 	the URL of the page the user should
* 							be directed to once the data has
* 							been sent
*
* url -						the URL of the API that data should
* 							be sent to
*
* valid -					a parent scope variable indicating
* 							whether the page/form is ok for the
* 							user to leave (i.e. forms are valid)
*
* e.g.
* <button continue url="http://myAPIurl:port/plans" page-data="{{plan}}"
*  next-page="thankyou.html">Continue</button>
*
* If no page-data or url attributes are set then the page will just
* redirect to the URL in the next-page attribute.
###

angular.module "DirectAsia"
	.directive "continue", ["$window", "$http", ($window, $http) ->
		restrict: "A"
		scope:
			pageData: "@"
			nextPage: "@"
			url: "@"
			valid: "="
		link: (scope, element, attrs) ->
			
			element.on "click", ->

				if scope.valid

					# console.table scope.pageData

					if scope.data and scope.url

						$http
							method: "POST"
							url: scope.url
							cache: true
							data: scope.pageData
						.success (response) ->
							# go to next page
							$window.location.href = scope.nextPage
						.error (response, status) ->
							console.error "The request failed with response " +
							 response + " and status code " + status

					else

						$window.location.href = scope.nextPage

	]