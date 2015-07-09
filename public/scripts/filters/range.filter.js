/* direct-asia : 0.0.0 : Thu Jul 09 2015 15:47:23 GMT+0800 (CST) */

/*
This is an angular filter that allows us to change the format of
expressions on the page. This one simply takes a total number and
returns an array from 0 to that number. The input value provided
will then be replaced by that array. Useful for generating lists.
 */
angular.module("DirectAsia").filter("range", function() {
  return function(input, total) {
    var i, _i;
    total = parseInt(total);
    for (i = _i = 0; 0 <= total ? _i <= total : _i >= total; i = 0 <= total ? ++_i : --_i) {
      input.push(i);
    }
    return input;
  };
});
