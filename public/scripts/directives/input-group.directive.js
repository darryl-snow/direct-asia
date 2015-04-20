/* direct-asia : 0.0.0 : Mon Apr 20 2015 17:53:00 GMT+0800 (CST) */

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
