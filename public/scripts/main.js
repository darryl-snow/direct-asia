/* direct-asia : 0.0.0 : Fri Apr 03 2015 23:23:49 GMT+0800 (CST) */

/*
Lovely welcome message
 */
var section, utility;

console.log("%c Welcome to Direct Asia Car Insurance ", "background: #3498db;\ncolor: #ffffff;\nfont-size: 18px;\nfont-family: 'Helvetica Neue';\nfont-weight: 300;\nline-height: 30px;\nheight: 30px;\npadding: 5px;");


/*
Define main module
 */

angular.module("DirectAsia", ["fsm", "pascalprecht.translate"]).config(function($translateProvider) {

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

section = {};

(function($) {
  return $(document).ready(function() {
    section.sections = $("body > .outer-wrap > section");
    $(".popover-close-button").click(function() {
      $(this).parent().parent().parent().find(".popover").removeClass("fade in");
      return $(this).parent().parent().parent().find(".popover").css("display", "none");
    });
    $(".popover-button").click(function() {
      if ($(this).parent().find(".popover").hasClass("fade")) {
        $(this).parent().find(".popover").removeClass("fade in");
        return $(this).parent().find(".popover").css("display", "none");
      } else {
        $(this).parent().find(".popover").addClass("fade in");
        return $(this).parent().find(".popover").css("display", "block");
      }
    });
    $(".hover-tooltip").hover(function() {
      if (!$(this).attr("aria-describedby")) {
        return $(this).trigger("click");
      }
    });
    return $(".overlay .overlay-close-button").click(function() {
      return $(".overlay").css("display", "none");
    });
  });
})(jQuery);

utility = {};
