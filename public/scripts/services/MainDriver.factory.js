/* direct-asia : 0.0.0 : Fri Jun 05 2015 20:26:39 GMT-0400 (AST) */

/*
This is a class for instantiating main drivers, as used on the quote page
 */
var MainDriver;

MainDriver = (function() {
  function MainDriver() {
    this.ownership = null;
    this.dob = new Date();
    this.age = null;
    this.gender = null;
    this.maritalStatus = null;
    this.occupation = null;
    this.residentialDistrict = null;
    this.drivingExperience = null;
    this.noClaimsDiscount = 30;
    this.whyNoClaimsDiscount = null;
    this.otherCarNoClaimsDiscount = 30;
    this.offences = null;
    this.refusals = null;
    this.accidents = {
      atFault: null,
      notAtFault: null
    };
    this.additionalDrivers = null;
  }

  return MainDriver;

})();


/*
Using an Angular factory allows us to use dependency injection in the
controller and instantiate objects from there
 */

angular.module("DirectAsia").factory("MainDriver", function() {
  return MainDriver;
});
