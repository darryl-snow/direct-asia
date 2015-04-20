/* direct-asia : 0.0.0 : Mon Apr 20 2015 17:53:00 GMT+0800 (CST) */
var getMockData;

getMockData = function() {
  var data;
  return data = {
    plans: [
      {
        image: '../../images/comprehensive.png',
        name: 'Comprehensive',
        tagline: '',
        covers: ['Third Party - Death or Bodily injury', 'Third Party - Property Damage', 'Third Party - Collision Damage', '24 hour accident towing', 'Own damage - No Other Vehicle Involved', 'Windscreen/Window Breakage']
      }, {
        image: '../../images/third-party-plus.png',
        name: 'Third-Party Plus',
        tagline: '(includes Fire & Theft)',
        covers: ['Third Party - Death or Bodily injury', 'Third Party - Property Damage', 'Third Party - Collision Damage', '24 hour accident towing']
      }, {
        image: '../../images/third-party-only.png',
        name: 'Third-Party Only',
        tagline: '',
        covers: ['Third Party - Death or Bodily injury', 'Third Party - Property Damage', 'Third Party - Collision Damage']
      }
    ],
    covers: [
      {
        name: 'Third Party - Death or Bodily injury',
        description: 'Your liability will be covered if you injure someone in an accident that involves your car.'
      }, {
        name: 'Third Party - Property Damage',
        description: 'You will be covered if property belonging to another vehicle is damaged by you in a car accident.'
      }, {
        name: 'Third Party - Collision Damage',
        description: 'If you collide with another vehicle, your car repairs will be covered as long as the cost is below the market value of your car. If the cost of the repairs is higher than the value of your car, or if your car cannot be repaired, we will pay you the value of your vehicle at the time of the claim.'
      }, {
        name: '24 hour accident towing',
        description: 'If your car cannot be driven after an accident, we will tow it at anytime to one of our approved repair workshops or to your preferred workshop if you choose this optional benefit.'
      }, {
        name: 'Own damage - No Other Vehicle Involved',
        description: 'If you crash your car (with no other vehicle involved) or if your car accidentally catches on fire, is stolen or suffers damages in a natural disaster, we will cover the repairs as long as the cost is below the market value of your car. If the cost of the repairs is higher, or if it cannot be repaired, we will pay you the value of your vehicle at the time of the claim.'
      }, {
        name: 'Windscreen/Window Breakage',
        description: 'If you want to replace a damaged windscreen, you\'ll need to pay HKD$100 (before GST) out of your own pocket. You won\'t need to pay if the windscreen can be repaired instead of replaced.'
      }
    ]
  };
};

angular.module('DirectAsia').controller('yourPlanCtrl', [
  '$scope', function($scope) {
    var getDataFromAPI, setupData;
    getDataFromAPI = function() {
      var dataFromAPI;
      dataFromAPI = {};
      $http.get('http://api-url?lang=' + $rootScope.currentLanguage).success(function(data, status, headers, config) {
        dataFromAPI = data;
      }).error(function(data, status, headers, config) {
        console.error(data);
      });
      return dataFromAPI;
    };
    setupData = function(data) {
      $scope.plans = data.plans;
      $scope.covers = data.covers;
      $scope.coverDetails = {
        plan: $scope.plans[0],
        financed: false,
        agreed: true
      };
    };
    $scope.selectPlan = function(plan) {
      $scope.coverDetails.plan = plan;
    };
    $scope.doesPlanIncludeCover = function(plan, cover) {
      var i;
      i = 0;
      while (i < plan.covers.length) {
        if (plan.covers[i] === cover.name) {
          return true;
        }
        i++;
      }
      return false;
    };
    setupData(getMockData());
  }
]);
