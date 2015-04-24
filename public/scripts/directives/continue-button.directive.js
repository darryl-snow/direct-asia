/* direct-asia : 0.0.0 : Fri Apr 24 2015 20:37:10 GMT+0800 (CST) */

/*
Directive for continue buttons - buttons at the bottom of
each page that first ensure the data from that page is sent
to the server and then loads the next page.

This will run on any element with a “continue” attribute
e.g. <button continue>Continue</button>

The element may also have 5 other attributes to pass data
to this directive:

modal (optional) -			the ID of the modal element to be
							shown if the modal conditions
							evaluate to true

modalConditions (optional) - the validation conditions under
							which a modal should be shown

next-page (required) - 		the URL of the page the user should
							be directed to once the data has
							been sent

page-data (optional) - 		the data to be sent to the server

success-modal (optional) -	the ID of a modal element to be shown
							once all form validations have passed
							but before the user proceeds to the
							next page

url (optional) -			the URL of the API that data should
							be sent to

valid (required) -			a parent scope variable indicating
							whether the page/form is ok for the
							user to leave (i.e. forms are valid)

e.g.
<button continue url="http://myAPIurl:port/plans" page-data="{{plan}}"
 next-page="thankyou.html">Continue</button>

If no page-data or url attributes are set then the page will just
redirect to the URL in the next-page attribute.
 */
angular.module("DirectAsia").directive("continue", [
  "$window", "$http", function($window, $http) {
    return {
      restrict: "A",
      scope: {
        modal: "@",
        modalConditions: "=",
        nextPage: "@",
        pageData: "@",
        successModal: "@",
        url: "@",
        valid: "="
      },
      link: function(scope, element, attrs) {

        /*
        			When the button is clicked...
         */
        return element.on("click", function() {

          /*
          				If validation conditions are met (conditions passed in element attribute)
           */
          var interval, modalHidden;
          if (scope.valid) {

            /*
            					If there is an additional validation step whereby a modal needs to be
            					shown requesting that the user has to make a call.
             */
            if (scope.modalConditions !== null && scope.modalConditions) {
              return $(scope.modal).modal();
            } else {

              /*
              						If there is data to be submitted before the user can continue
               */
              if (scope.pageData && scope.url) {

                /*
                							TESTING ONLY - delete this code and uncomment the block below
                							for production
                 */
                if (scope.successModal) {
                  $(scope.successModal).modal({
                    backdrop: "static",
                    keyboard: false
                  });
                  modalHidden = false;
                  $(scope.successModal).on("hide.bs.modal", function() {
                    return modalHidden = true;
                  });
                  return interval = setInterval(function() {
                    if (modalHidden) {
                      return $window.location.href = scope.nextPage;
                    }
                  }, 500);
                } else {
                  return $window.location.href = scope.nextPage;
                }

                /*
                
                							
                							Make an API call to submit the form data
                							
                
                							$http
                								method: "POST"
                								url: scope.url
                								cache: true
                								data: scope.pageData
                							.success (response) ->
                
                								
                								If another modal needs to be displayed before
                								the user can proceed
                								
                
                								if scope.successModal
                
                									
                									Initiate the modal and ensure it may only be
                									dismissed by clicking the button within the modal
                									
                
                									$(scope.successModal).modal
                										backdrop: "static"
                										keyboard: false
                
                									modalHidden = false
                
                									$(scope.successModal).on "hide.bs.modal", ->
                										modalHidden = true
                
                									
                									Wait for the event to be fired when the modal is
                									dismissed before proceeding to the next page
                									
                
                									interval = setInterval ->
                
                										if modalHidden
                
                											
                											Go to the next page
                											
                
                											$window.location.href = scope.nextPage
                
                									, 500
                
                								else
                								
                									
                									No success modal necessary, directly proceed to
                									the next page
                									
                
                									$window.location.href = scope.nextPage
                
                							.error (response, status) ->
                
                								
                								Data could not be sent, report the error to the console
                								
                
                								console.error "The request failed with response " +
                								 response + " and status code " + status
                 */
              } else {

                /*
                							No data needs to be sent, just a plain proceed button that
                							takes the user to the next page
                 */
                return $window.location.href = scope.nextPage;
              }
            }
          }
        });
      }
    };
  }
]);
