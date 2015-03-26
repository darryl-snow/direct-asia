angular.module "DirectAsia"
	.filter "slugify", ->
		(input) ->
			input.trim().replace(/[^\w\s-]/g, "").toLowerCase().replace(/[-\s]+/g, "-")