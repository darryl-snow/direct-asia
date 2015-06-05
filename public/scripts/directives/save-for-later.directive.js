/* direct-asia : 0.0.0 : Fri Jun 05 2015 14:14:28 GMT-0400 (AST) */

/*
Directive for save for later buttons - buttons at the bottom of
some pages that first validate the user data and then save it
if possible.

This will run on any element with a “save-for-later” attribute
e.g. <button save-for-later>Save for later</button>

The element may also have 5 other attributes to pass data
to this directive:

modals (optional) -	An array of objects that specify the modal
					windows to be shown under which conditions.
					The conditions should evaluate to true or
					false and the popup should be the ID of the
					modal element. e.g. [{
						condition: true/false
						popup: '#myModal'
					}]
 */
angular.module("DirectAsia").directive("saveForLater", [
  "$window", "$http", function($window, $http) {
    return {
      restrict: "A",
      scope: {
        modals: "="
      },
      link: function(scope, element, attrs) {

        /*
        			When the button is clicked...
         */
        return element.on("click", function() {

          /*
          				If there is an additional validation step whereby a modal needs to be
          				shown requesting that the user has to make a call.
           */
          var canProceed, condition, i, len, modal, popup, ref;
          canProceed = true;
          if (scope.modals !== null && scope.modals) {
            ref = scope.modals;
            for (i = 0, len = ref.length; i < len; i++) {
              modal = ref[i];
              condition = modal.condition;
              popup = modal.popup;
              if (condition) {
                $(popup).modal();
                canProceed = false;
              }
            }
          }
          if (canProceed) {
            return scope.$parent.saveForLater();
          }
        });
      }
    };
  }
]);
