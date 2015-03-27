/* direct-asia : 0.0.0 : Fri Mar 27 2015 18:17:51 GMT+0800 (CST) */

/*
Lovely welcome message
 */
console.log("%c Welcome to Direct Asia Car Insurance ", "background: #3498db;\ncolor: #ffffff;\nfont-size: 18px;\nfont-family: 'Helvetica Neue';\nfont-weight: 300;\nline-height: 30px;\nheight: 30px;\npadding: 5px;");


/*
Define main module
 */

angular.module("DirectAsia", ["fsm", "pascalprecht.translate"]).config(function($translateProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: "../../content/",
    suffix: ".json"
  });
  return $translateProvider.preferredLanguage("en_GB");
}).run([
  "$rootScope", "$translate", function($rootScope, $translate) {
    $rootScope.currentLanguage = "en_GB";
    return $rootScope.switchLanguage = function(key) {
      $translate.use(key);
      return $rootScope.currentLanguage = key;
    };
  }
]);
