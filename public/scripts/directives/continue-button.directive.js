/* direct-asia : 0.0.0 : Mon Apr 13 2015 16:14:41 GMT+0800 (CST) */

/*
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
* e.g.
* <button continue url="http://myAPIurl:port/plans" page-data="{{plan}}"
*  next-page="thankyou.html">Continue</button>
*
* If no page-data or url attributes are set then the page will just
* redirect to the URL in the next-page attribute.
 */
angular.module("DirectAsia").directive("continue", [
  "$window", "$http", function($window, $http) {
    return {
      restrict: "A",
      scope: {
        pageData: "@",
        nextPage: "@",
        url: "@"
      },
      link: function(scope, element, attrs) {
        return element.on("click", function() {
          if (scope.data && scope.url) {
            return $http({
              method: "POST",
              url: scope.url,
              cache: true,
              data: scope.pageData
            }).success(function(response) {
              return $window.location.href = scope.nextPage;
            }).error(function(response, status) {
              return console.error("The request failed with response " + response + " and status code " + status);
            });
          } else {
            return $window.location.href = scope.nextPage;
          }
        });
      }
    };
  }
]);
