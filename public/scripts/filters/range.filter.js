/* direct-asia : 0.0.0 : Fri Jun 05 2015 20:26:39 GMT-0400 (AST) */

/*
This is an angular filter that allows us to change the format of
expressions on the page. This one simply takes a total number and
returns an array from 0 to that number. The input value provided
will then be replaced by that array. Useful for generating lists.
 */
angular.module("DirectAsia").filter("range", function() {
  return function(input, total) {
    var i, j, ref;
    total = parseInt(total);
    for (i = j = 0, ref = total; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      input.push(i);
    }
    return input;
  };
});
