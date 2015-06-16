/* direct-asia : 0.0.0 : Tue Jun 16 2015 18:28:06 GMT+0800 (CST) */

/*
This is a class for instantiating whole insurance plans, as used on the
quote page. The quote page is basically all about generating a plan and
filling in these details. There may also be other plans, such as saved
plans or recommended plans, and so it makes sense to have a Class for
this type of object.
 */
var InsurancePlan;

InsurancePlan = (function() {
  function InsurancePlan() {
    this.cover = null;
    this.totalCost = null;
    this.car = null;
    this.mainDriver = null;
    this.additionalDrivers = [];
    this.referral = null;
    this.options = [];
    this.excess = null;
  }

  return InsurancePlan;

})();


/*
Using an Angular factory allows us to use dependency injection in the
controller and instantiate objects from there
 */

angular.module("DirectAsia").factory("InsurancePlan", function() {
  return InsurancePlan;
});
