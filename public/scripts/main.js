/* direct-asia : 0.0.0 : Wed May 13 2015 14:55:43 GMT+0800 (CST) */

/*
Lovely welcome message
 */
console.log("%c Welcome to Direct Asia Car Insurance ", "background: #3498db;\ncolor: #ffffff;\nfont-size: 18px;\nfont-family: 'Helvetica Neue';\nfont-weight: 300;\nline-height: 30px;\nheight: 30px;\npadding: 5px;");


/*
Define main module
 */

angular.module("DirectAsia", ["fsm", "pascalprecht.translate", "ui.bootstrap-slider", "ng-bootstrap-datepicker", "ui.select"]).config(function($translateProvider) {

  /*
  		Setup translation content.
  		prefix = path to JSON files
  		suffix = file extension
   */
  $translateProvider.useStaticFilesLoader({
    prefix: "../../content/",
    suffix: ".json"
  });

  /*
  		Set default language
   */
  return $translateProvider.preferredLanguage("en_GB");
}).run([
  "$rootScope", "$translate", function($rootScope, $translate) {

    /*
    		Set current language variable for determining which options
    		to display in language switcher menu
     */
    $rootScope.currentLanguage = "en_GB";

    /*
    		Global language switcher function.
    
    		key = language code string / file name
    
    		e.g. "en_GB" would load "en_GB.JSON"
    
    		If not already loaded, requesting a new language will cause
    		the JSON file to be loaded asynchronously. The new language
    		will be displayed on the page immediately after the file is
    		loaded.
     */
    return $rootScope.switchLanguage = function(key) {
      $translate.use(key);
      return $rootScope.currentLanguage = key;
    };
  }
]);
