/* direct-asia : 0.0.0 : Mon Mar 30 2015 01:01:54 GMT+0800 (CST) */
angular.module("DirectAsia").controller("yourPolicy", [
  "$scope", function($scope) {
  	    $scope.policy = {
        registration_number: '',
        car_chassis_number: '',
        NCD: '',
        previous_insurer: '',
        previous_vehicle: '',
        policyhoder_first_name: '',
        policyholder_surename: '',
        policyholder_email: '',
        policyholder_confirm_email: '',
        policyholder_mobile_number: '',
        residential_address_line_1: '',
        residential_address_line_2: '',
        residential_district: '',
        residential_status: '',
        residential_hkid: '',
        driver_first_name: '',
        driver_surename: '',
        driver_residential_status: '',
        driver_hkid: '',
        driver_contact_number: '',
        driver_relationship_with_policyholder: '',
    };

    $scope.proceed = {
        no_content: false
    };

    $scope.proceed.click = function() {
            $scope.proceed.no_content = true;
    };
    $scope.select = function(value, property) {
        return $scope.policy[property] = value;
    };
    
    $scope.countries = ["Singapore", "malaysia"];
    $scope.policyholders = ["Policyholder 1", "Policyholder 2"];
    $scope.driver1policyholders = ["Policyholder 1", "Policyholder 2"];
    $scope.driver2policyholders = ["Policyholder 1", "Policyholder 2"];
    $scope.residentials = ["Address line 1", "Address line 2", "Residential district"];
    $scope.driver1residentials = ["Address line 1", "Address line 2", "Residential district"];
    return $scope.driver2residentials = ["Address line 1", "Address line 2", "Residential district"];
  }
]);
