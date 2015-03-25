angular.module "DirectAsia"
	.filter "range", ->
		(input, total) ->
			total = parseInt total
			for i in [0..total]
				input.push i
			return input