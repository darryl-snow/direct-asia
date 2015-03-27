/* direct-asia : 0.0.0 : Fri Mar 27 2015 15:47:48 GMT+0800 (CST) */

/*
Directive for dropdown menus containing selectable items.
This will apply to all elements with the class 'input-group'.
 */
angular.module("DirectAsia").directive("inputGroup", function() {
  return {
    restrict: "C",
    link: function(scope, element, attrs) {

      /*
      			Find the input element in the group
       */
      var input, links;
      input = element.find("input");

      /*
      			Find the list of input options
       */
      links = element.find(".dropdown-menu a");

      /*
      			When any of the input options are selected then
      			update the content of the input element
       */
      return links.on("click", function(e) {
        e.preventDefault();
        return input.val(e.target.innerText);
      });
    }
  };
});


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
      var el, type;
      type = attrs.popoverType ? attrs.popoverType : "";

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
        template: "<div class='popover " + type + "' role='tooltip'><div class='arrow'></div>" + "<h3 class='popover-title'></h3><div class='popover-content'></div></div>",
        content: function() {

          /*
          					create an element from the popover html
           */
          return angular.element(el).html();
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


/*
Directive for replacing default `select` inputs with fancy ones
using the jQuery 'Selecter' plugin
http://formstone.it/components/selecter

This directive will run on select elements in which <option> child
elements have the attribute 'selecter'
 */
angular.module("DirectAsia").directive("selecter", function($timeout, $parse) {
  return function(scope, element, attrs) {

    /*
    			scope.$last ensures iteration is complete when
    			populating the select options with data e.g.
    			using ng-repeat
     */
    if (scope.$last) {

      /*
      				set a timeout to ensure the select element
      				has been set up before running this
       */
      return $timeout(function() {

        /*
        					get the default text to display
         */
        var selecterConfig;
        selecterConfig = {
          label: attrs.label
        };

        /*
        					add the label to the configuration options set on the element's
        					attributes in the markup
         */
        jQuery.extend(selecterConfig, $parse(attrs.selecterConfig)());

        /*
        					add a callback so that when the default select has been replaced
        					we can update the scope to let angular know that the selected value
        					has been changed and so the scope variables need to be updated
         */
        jQuery.extend(selecterConfig, {
          callback: function(value, index) {
            return scope.$apply(function() {
              var propagateF;
              propagateF = $parse(attrs.selecterCallback)(scope);

              /*
              								in the markup, there is a 'property' attribute
              								on the select element that indicates the scope
              								variable to be updated
               */
              return propagateF(value, index, attrs.property);
            });
          }
        });

        /*
        					now we've set all the configuration options, so run the selecter
        					plugin on the select element
         */
        return angular.element(attrs.selecterTarget).selecter(selecterConfig);
      });
    }
  };
});


/*
Directive for toggle buttons - buttons that toggle the state of a variable
on an underlying model

This will run on any element tag <toggle-buttons>

Because we're using transclude, the directive shares the parent scope.
This directive simply adds a function 'select' to the parent scope, allowing
the element to change the property of the parent scope's 'car' variable

e.g.
<toggle-buttons ng-click="select('make', 'nissan')"></toggle-buttons>
 */
angular.module("DirectAsia").directive("toggleButtons", function() {
  return {
    restrict: "E",
    transclue: true,
    link: function(scope, element, attrs) {
      return scope.select = function(property, value) {
        return scope.car[property] = value;
      };
    }
  };
});


/*
Directive for showing Bootstrap tooltips

Any element with the class 'showTooltip' will have a tooltip
shown on mouseover
 */
angular.module("DirectAsia").directive("showTooltip", function() {
  return {
    restrict: "C",
    link: function(scope, element, attrs) {
      return element.tooltip();
    }
  };
});
