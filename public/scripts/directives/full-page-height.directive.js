/* direct-asia : 0.0.0 : Wed Apr 29 2015 22:46:26 GMT+0800 (CST) */

/*
 * This directive works on elements with a 'full-page-height' attribute.
 * It simply sets the minimum height of the element to be the height of
 * the browser window, to make sections appear to be full-page.
 */
angular.module("DirectAsia").directive("fullPageHeight", function() {
  return {
    restrict: "A",
    link: function(scope, element, attrs) {
      return $(element).css("min-height", $(window).height());
    }
  };
});
