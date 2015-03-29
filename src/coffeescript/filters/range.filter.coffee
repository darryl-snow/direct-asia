###
This is an angular filter that allows us to change the format of
expressions on the page. This one simply takes a total number and
returns an array from 0 to that number. The input value provided
will then be replaced by that array. Useful for generating lists.
###

angular.module "DirectAsia"
	.filter "range", ->
		(input, total) ->
			total = parseInt total
			for i in [0..total]
				input.push i
			return input