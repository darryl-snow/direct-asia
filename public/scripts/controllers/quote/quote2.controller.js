/* direct-asia : 0.0.0 : Mon Apr 13 2015 16:14:41 GMT+0800 (CST) */
angular.module("DirectAsia").controller("qouteController", [
  "$scope", function($scope) {
    $scope.drivingLicenses = ['Driver License 1', 'Driver License 2'];
    $scope.heardAboutUs = ['Friends & Family', 'TV', 'Online', 'Print/Billboards', 'Social', 'Taxi', 'Cinema', 'Other'];
    $scope.currency = {
      code: 'S$',
      name: 'Singapore Dollar'
    };
    $scope.plans = [
      {
        name: 'Comprehensive',
        price_per_year: 732,
        price_per_month: 61
      }, {
        name: 'Third-Party Fire & Theft',
        price_per_year: 594,
        price_per_month: 50
      }, {
        name: 'Third-Party',
        price_per_year: 540,
        price_per_month: 45
      }
    ];
    $scope.plans.selected = 0;
    $scope.plans.isActive = function($index) {
      if ($index === $scope.plans.selected) {
        return 'active';
      } else {
        return '';
      }
    };
    $scope.plans.click = function($index) {
      return $scope.plans.selected = $index;
    };
    $scope.covers = [
      {
        type: 'minimum',
        name: 'Specific Drivers',
        content: 'Name your drivers and save',
        price: '168',
        labels: 'per driver'
      }, {
        type: 'fixed',
        name: 'Anyone who drives',
        content: 'Get more Flexibility',
        price: '480',
        labels: 'all drivers'
      }
    ];
    $scope.covers.selected = 0;
    $scope.covers.isActive = function($index) {
      if ($index === $scope.covers.selected) {
        return 'active';
      } else {
        return '';
      }
    };
    $scope.covers.click = function($index) {
      return $scope.covers.selected = $index;
    };
    $scope.drivers = [
      {
        firstname: '',
        surname: '',
        birth_day: '',
        birth_month: '',
        birth_year: '',
        gender: '',
        status: '',
        occupation: '',
        years: '',
        demerit: '',
        accident: ''
      }
    ];
    $scope.drivers.selected = 0;
    $scope.drivers.isActive = function($index) {
      if ($index === $scope.drivers.selected) {
        return 'active';
      } else {
        return '';
      }
    };
    $scope.drivers.addDriver = function() {
      return $scope.drivers.push({
        firstname: '',
        surname: '',
        birth_day: '',
        birth_month: '',
        birth_year: '',
        gender: '',
        status: '',
        occupation: '',
        years: '',
        demerit: '',
        accident: ''
      });
    };
    $scope.drivers.select = function(value, property) {
      return $scope.drivers[property] = value;
    };
    $scope.optional_covers = [
      {
        name: '24 hr breakdown assistance',
        image: '../../images/break-icon.png',
        price: 'include',
        recomended: true,
        selected: false
      }, {
        name: '24 months new for old replacement car',
        image: '../../images/car-icon4.png',
        price: '156',
        recomended: true,
        selected: false
      }, {
        name: 'Car modifications',
        image: '../../images/clock-icon.png',
        price: '144',
        recomended: false,
        selected: false
      }, {
        name: 'My workshop/ garage',
        image: '../../images/garage-icon.png',
        price: '60',
        recomended: false,
        selected: false
      }, {
        name: 'Medical expenses',
        image: '../../images/medical-icon.png',
        price: '96',
        recomended: false,
        selected: false
      }, {
        name: 'Personal accident',
        image: '../../images/accident-icon.png',
        price: '96',
        recomended: false,
        selected: false
      }, {
        name: 'Loss of use',
        image: '../../images/lost-of-use-icon2.png',
        price: '120',
        recomended: false,
        selected: false
      }, {
        name: 'Repatriation costs',
        image: '../../images/plane-icon.png',
        price: '144',
        recomended: false,
        selected: false
      }
    ];
    $scope.optional_covers.selected = [];
    $scope.optional_covers.continue_text = 'NO THANKS, CONTINUE';
    $scope.optional_covers.isActive = function(optional_cover) {
      if (optional_cover.selected) {
        return 'active';
      } else {
        return '';
      }
    };
    $scope.optional_covers.click = function(optional_cover) {
      optional_cover.selected = !optional_cover.selected;
      $scope.optional_covers.selected = [];
      angular.forEach($scope.optional_covers, function(value, key) {
        if (value.selected) {
          return $scope.optional_covers.selected.push(value);
        }
      });
      if ($scope.optional_covers.selected.length > 0) {
        return $scope.optional_covers.continue_text = 'CONTINUE';
      } else {
        return $scope.optional_covers.continue_text = 'NO THANKS, CONTINUE';
      }
    };
    $scope.policies = [
      {
        price: '500',
        selected: false
      }, {
        price: '1,000',
        selected: false
      }, {
        price: '2,000',
        selected: false
      }, {
        price: '3,000',
        selected: false
      }, {
        price: '4,000',
        selected: false
      }, {
        price: '5,000',
        selected: false
      }
    ];
    $scope.policies.selected = void 0;
    $scope.policies.continue_text = 'NO THANKS, CONTINUE';
    $scope.$watch('policies.selected', function(newValue, oldValue) {
      if (newValue === void 0) {
        return $scope.policies.continue_text = 'NO THANKS, CONTINUE';
      } else {
        return $scope.policies.continue_text = 'CONTINUE';
      }
    });
    $scope.save = [
      {
        image: '../../images/camera-icon.png',
        title: 'Use in-car camera',
        save: '4',
        type: 'percentage',
        selected: false
      }, {
        image: '../../images/leaf-icon.png',
        title: 'Go paperless',
        save: '4',
        type: 'percentage',
        selected: false
      }, {
        image: '../../images/cloud-icon.png',
        title: 'Spread the Word',
        save: '0',
        type: 'exact',
        selected: false
      }, {
        image: '../../images/road-icon.png',
        title: 'Low Mileage Discount',
        save: '0',
        type: 'exact',
        selected: false
      }
    ];
    $scope.save.continue_text = 'NO THANKS, CONTINUE';
    $scope.save.select = function(item) {
      var found;
      item.selected = !item.selected;
      found = false;
      angular.forEach($scope.save, function(value, key) {
        if (!found) {
          if (value.selected) {
            return found = true;
          }
        }
      });
      if (found) {
        return $scope.save.continue_text = 'CONTINUE';
      } else {
        return $scope.save.continue_text = 'NO THANKS, CONTINUE';
      }
    };
    return $scope.goTo = function($index) {
      return section.goTo($index);
    };
  }
]);
