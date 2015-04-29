/* direct-asia : 0.0.0 : Wed Apr 29 2015 22:46:26 GMT+0800 (CST) */

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
      }, 500);
    }
  };
});
