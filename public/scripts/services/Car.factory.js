/* direct-asia : 0.0.0 : Fri Apr 10 2015 11:42:18 GMT+0800 (CST) */

/*
This is a class for instantiating car objects, as used on the quote page
 */
var Car;

Car = (function() {
  function Car() {
    this.year = null;
    this.make = null;
    this.model = null;
    this.modified = null;
    this.modifications = {
      airintakeexhaust: null,
      bodykit: null,
      rimstires: null,
      suspensionstabiliser: null
    };
    this.ownership = null;
    this.financed = null;
    this.kmsperyear = null;
    this.lowmileageoption = null;
    this.usage = null;
  }

  return Car;

})();


/*
Using an Angular factory allows us to use dependency injection in the controller
and instantiate objects from there
 */

angular.module("DirectAsia").factory("Car", function() {
  return Car;
});
