###
This is an angular filter that allows us to change the format of expressions on the page. This filter takes
a string, removes special characters, and replaces spaces with hyphens. Useful for generating file names, such
as images or icons, based on an title. e.g. "24hr breakdown assistance" becomes "24hr-breakdown-assistance"
###

angular.module "DirectAsia"
	.filter "slugify", ->
		(input) ->
			input.trim().replace(/[^\w\s-]/g, "").toLowerCase().replace(/[-\s]+/g, "-")