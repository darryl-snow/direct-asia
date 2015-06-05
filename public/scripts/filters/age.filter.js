/* direct-asia : 0.0.0 : Fri Jun 05 2015 14:14:28 GMT-0400 (AST) */

/*
This is an angular filter that takes a DOB
and returns the age of the person
 */
angular.module("DirectAsia").filter("age", function() {
  return function(input, total) {
    var age, birthDate, m, today;
    today = new Date();
    birthDate = new Date(input);
    age = today.getFullYear() - birthDate.getFullYear();
    m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
});
