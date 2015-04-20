/* direct-asia : 0.0.0 : Mon Apr 20 2015 17:53:00 GMT+0800 (CST) */

/*
Directive for showing Bootstrap popovers

Any element with the attribute 'popover' will have a popover
shown on click
 */
angular.module("DirectAsia").directive("popover", function() {
  return {
    restrict: "A",
    link: function(scope, element, attrs) {

      /*
      			We have different types of popovers, which we specify in the element's
      			'popoverType' attribute
       */
      var el, trigger, type;
      type = attrs.popoverType ? attrs.popoverType : "";

      /*
      			Popovers may be triggered by click (default), hover, focus, or any combination
      			of these, which we specified in the element's 'trigger' attribute
       */
      trigger = attrs.trigger ? attrs.trigger : "click";

      /*
      			In the 'popover' attribute, we specify the element containing
      			the popover's HTML
       */
      el = attrs.popover;

      /*
      			Activate the popover
       */
      element.popover({
        html: true,
        trigger: trigger,
        template: "<div class='popover " + type + "' role='tooltip'><div class='arrow'></div>" + "<h3 class='popover-title'></h3><div class='popover-content'></div></div>",
        content: function() {

          /*
          					create an element from the popover html
           */
          return angular.element(el).html();
        },
        delay: {
          show: 50,
          hide: 2000
        }
      });

      /*
      			add an event listener on the popover's close button so that
      			the popover is closed when the close button is clicked
       */
      return element.on("shown.bs.popover", function() {
        var closeButton;
        closeButton = element.next().find(".popover-close-button");
        return closeButton.on("click", function(e) {
          e.preventDefault();
          return element.popover("hide");
        });
      });
    }
  };
});
