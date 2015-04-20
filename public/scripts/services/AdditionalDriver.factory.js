/* direct-asia : 0.0.0 : Mon Apr 20 2015 20:53:44 GMT+0800 (CST) */

/*
This is a class for instantiating additional drivers, as used on the quote page
 */
var AdditionalDriver;

AdditionalDriver = (function() {
  function AdditionalDriver() {
    this.firstName = null;
    this.lastName = null;
    this.dob = {
      day: null,
      month: null,
      year: null
    };
    this.gender = null;
    this.maritalStatus = null;
    this.occupation = null;
    this.drivingExperience = null;
    this.offences = null;
    this.accidents = {
      atFault: null,
      notAtFault: null
    };
    this.refusals = null;
  }

  return AdditionalDriver;

})();


/*
Using an Angular factory allows us to use dependency injection in the controller
and instantiate objects from there
 */

angular.module("DirectAsia").factory("AdditionalDriver", function() {
  return AdditionalDriver;
});
