/* direct-asia : 0.0.0 : Sat Apr 18 2015 03:30:34 GMT+0800 (CST) */

/*
 * This directive hides and shows the sticky navbar if the scroll position
 * is below or above the quote summary section.
 */
angular.module("DirectAsia").directive("stickyNav", function() {
  return {
    restrict: "A",
    link: function(scope, element, attrs) {
      var didScroll;
      didScroll = false;
      $(window).on("scroll", function() {
        return didScroll = true;
      });
      return setInterval(function() {
        if (didScroll) {
          if (($(window).scrollTop() > $("#quote5").offset().top) || ($(window).scrollTop() < 0)) {
            return $(element).css("visibility", "hidden");
          } else {
            return $(element).css("visibility", "visible");
          }
        }
      }, 250);
    }
  };
});
