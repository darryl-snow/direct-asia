var directAsia = angular.module("DirectAsia", []);

directAsia.controller('yourPolicy', function($scope, $http) {
    $scope.countries = ['Singapore', 'malaysia'];
    $scope.policyholders = ['Policyholder 1', 'Policyholder 2'];
    $scope.driver1policyholders = ['Policyholder 1', 'Policyholder 2'];
    $scope.driver2policyholders = ['Policyholder 1', 'Policyholder 2'];
    $scope.residentials = ['Address line 1', 'Address line 2', 'Residential district'];
    $scope.driver1residentials = ['Address line 1', 'Address line 2', 'Residential district'];
    $scope.driver2residentials = ['Address line 1', 'Address line 2', 'Residential district'];
});