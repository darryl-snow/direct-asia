/* direct-asia : 0.0.0 : Fri Jun 05 2015 20:18:54 GMT-0400 (AST) */

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
    this.policy = {
      startDate: (new Date()).toString(),
      endDate: (new Date()).toString()
    };
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
