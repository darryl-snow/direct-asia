var directAsia = angular.module("DirectAsia", []);

directAsia.controller('chooseYourCover', function($scope, $http){
    $scope.covers = [{
            image: '../../images/comprehensive.png',
            name: 'Comprehensive',
            content: ''
        },{
            image: '../../images/third-party-plus.png',
            name: 'Third-Party Plus',
            content: '(includes Fire & Theft)'
        },{
            image: '../../images/third-party-only.png',
            name: 'Third-Party Only',
            content: ''
        }
    ];

    $scope.helps = {
        name: '',
        email: '',
        number: '',
        no_content: false,
        submit: false
    };

    $scope.helps.click = function() {
        if(!$scope.helps.name || !$scope.helps.email || !$scope.helps.number){
            $scope.helps.no_content = true;
        }else{
            $scope.helps.submit = true;
        }
    };
    $scope.covers.selected;

    $scope.covers.isActive = function($index) {
        if ($index == $scope.covers.selected) {
            return 'active';
        } else {
            return '';
        }
    };

    $scope.covers.click = function($index) {
        $scope.covers.selected = $index;
    };
});