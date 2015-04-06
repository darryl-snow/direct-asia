/* direct-asia : 0.0.0 : Mon Apr 06 2015 20:59:34 GMT+0800 (CST) */

/*
This is an angular filter that allows us to change the format
of expressions on the page. This filter takes a string, removes
special characters, and replaces spaces with hyphens. Useful
for generating file names, such as images or icons, based on an
title. e.g. "24hr breakdown assistance" becomes
"24hr-breakdown-assistance"
 */
angular.module("DirectAsia").filter("slugify", function() {
  return function(input) {
    return input.trim().replace(/[^\w\s-]/g, "").toLowerCase().replace(/[-\s]+/g, "-");
  };
});