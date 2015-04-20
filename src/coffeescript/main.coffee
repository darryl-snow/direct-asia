###
Lovely welcome message
###

console.log "%c Welcome to Direct Asia Car Insurance ", """
background: #3498db;
color: #ffffff;
font-size: 18px;
font-family: 'Helvetica Neue';
font-weight: 300;
line-height: 30px;
height: 30px;
padding: 5px;
"""

###
Define main module
###

angular.module "DirectAsia", ["fsm", "pascalprecht.translate", "ui.bootstrap-slider"]
	.config ($translateProvider) ->

		###
		Setup translation content.
		prefix = path to JSON files
		suffix = file extension
		###

		$translateProvider.useStaticFilesLoader
			prefix: "../../content/",
			suffix: ".json"

		###
		Set default language
		###

		$translateProvider.preferredLanguage "en_GB"

	.run ["$rootScope", "$translate", ($rootScope, $translate) ->

		###
		Set current language variable for determining which options
		to display in language switcher menu
		###

		$rootScope.currentLanguage = "en_GB"

		###
		Global language switcher function.

		key = language code string / file name

		e.g. "en_GB" would load "en_GB.JSON"

		If not already loaded, requesting a new language will cause
		the JSON file to be loaded asynchronously. The new language
		will be displayed on the page immediately after the file is
		loaded.
		###

		$rootScope.switchLanguage = (key) ->
			$translate.use key
			$rootScope.currentLanguage = key
	]