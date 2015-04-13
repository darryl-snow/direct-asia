/* direct-asia : 0.0.0 : Mon Apr 13 2015 16:14:41 GMT+0800 (CST) */

/*
The controller ties together the view with the model.

In this case the view is the components/car file and the model
is the $scope.car variable.
 */
angular.module("DirectAsia").controller("CarCtrl", [
  "$scope", function($scope) {

    /*
    		Set default values for the car model
     */
    $scope.car = {
      year: 2014,
      make: void 0,
      model: void 0,
      modified: true,
      modifications: {
        bodykit: false,
        rimstires: false,
        suspensionstabiliser: true,
        airintakeexhaust: true
      },
      ownership: void 0,
      financed: null,
      kmsperyear: "> 15,000",
      lowmileageoption: false,
      usage: void 0
    };

    /*
    		================================================
    		Get options JSON from API
    		
    		This is how you would use the CarOptions service
    		to query the API and get the year make, and model
    		options with which to populate the select fields
    		================================================
    		options = CarOptions.query ->
    			$scope.years = options.years
    			$scope.makes = options.makes
    			$scope.models = options.models
     */

    /*
    		Set default values for the year options - delete if getting from API
     */
    $scope.years = ["2014", "2013", "2012"];

    /*
    		Set default values for the makes options - delete if getting from API
     */
    $scope.makes = ["VW", "Nissan", "Toyota"];

    /*
    		Set default values for the models options - delete if getting from API
     */
    $scope.models = ["Golf", "Micra", "Sera"];

    /*
    		A scope function to manually update the model from the view.
    		Most often angular will handle this automatically:
    		
    		e.g.
    		<input ng-model="car.make" value='VW'> <-- change input value to update the model
    		
    		But sometimes it may need to be done manually as well...
    		
    		e.g.
    		<button ng-click="select('make', 'Nissan')">Nissan</button>
     */
    $scope.select = function(value, index, property) {
      return $scope.car[property] = value;
    };

    /*
    		A scope function to be called when the proceed button is pressed - this function
    		processes the form
     */
    return $scope.proceed = function() {

      /*
      			For testing only - logs the current state of the car model to
      			the console for checking
       */
      return console.log($scope.car);

      /*
      				This function will handle sending data to the back-end API
       */
    };
  }
]);
