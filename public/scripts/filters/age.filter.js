/* direct-asia : 0.0.0 : Wed Apr 29 2015 22:46:26 GMT+0800 (CST) */

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
