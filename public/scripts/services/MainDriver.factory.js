/* direct-asia : 0.0.0 : Mon Apr 20 2015 20:53:44 GMT+0800 (CST) */

/*
This is a class for instantiating main drivers, as used on the quote page
 */
var MainDriver;

MainDriver = (function() {
  function MainDriver() {
    this.ownership = null;
    this.dob = {
      day: null,
      month: null,
      year: null
    };
    this.age = null;
    this.gender = null;
    this.maritalStatus = null;
    this.occupation = null;
    this.residentialDistrict = null;
    this.drivingExperience = null;
    this.noClaimsDiscount = 0;
    this.whyNoClaimsDiscount = null;
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
