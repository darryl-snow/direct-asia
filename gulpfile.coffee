# Dependencies
gulp		= require "gulp"
plugins		= require("gulp-load-plugins")(lazy: false)
run			= require "run-sequence"
critical 	= require "critical"

express		= require "express"
open 		= require "open"
path		= require "path"
lr			= require("tiny-lr")()

pkg			= require "./package.json"

# Configuration

Config =
	build: "./public/"
	name: pkg.name
	port: 9000
	publish: true
	src: "./src/"
	version: pkg.version

# Reset

gulp.task "reset", ->
	return gulp.src Config.build + "*", read: false
		.pipe plugins.clean
			force: true

# Compile coffeescript

gulp.task "coffeescript", ->
	gulp.src Config.src + "coffeescript/**/*.coffee"
	.pipe plugins.plumber()
	.pipe plugins.coffeelint()
	.pipe plugins.coffeelint.reporter()

	gulp.src Config.src + "coffeescript/main.coffee", read: false
	.pipe plugins.plumber()
	.pipe plugins.browserify
		transform: ["coffeeify"]
		shim:
			jQuery:
				path: Config.src + "lib/jquery/dist/jquery.js"
				exports: "$"
			bootstrap:
				path: Config.src + "lib/bootstrap/dist/js/bootstrap.js"
				exports: "bootstrap"
				depends: 
					jQuery: "$"
			iCheck:
				path: Config.src + "lib/Bootflat/bootflat/js/icheck.min.js"
				exports: "iCheck"
				depends:
					jQuery: "$"
					bootstrap: "bootstrap"
			selecter:
				path: Config.src + "lib/Selecter/jquery.fs.selecter.min.js"
				exports: "selecter"
				depends:
					jQuery: "$"
					bootstrap: "bootstrap"
			stepper:
				path: Config.src + "lib/Bootflat/bootflat/js/jquery.fs.stepper.min.js"
				exports: "stepper"
				depends:
					jQuery: "$"
					bootstrap: "bootstrap"
			angular:
				path: Config.src + "lib/angular/angular.js"
				exports: "angular"
			ngResource:
				path: Config.src + "lib/ng-resource/dist/ng-resource.js"
				exports: "ngResource"
	.pipe plugins.if Config.publish, plugins.uglify()
	.pipe plugins.rename "main.js"
	.pipe plugins.header "/* " + Config.name + " : " + Config.version + " : " + new Date() + " */"
	.pipe plugins.size
		showFiles: true
	.pipe gulp.dest Config.build + "scripts"

# Compile Stylus

gulp.task "sass", ->
	gulp.src Config.src + "sass/main.scss"
	.pipe plugins.plumber()
	.pipe plugins.sass()
	.pipe plugins.autoprefixer "last 1 version", "> 1%"
	.pipe plugins.if Config.publish, plugins.minifyCss()
	.pipe plugins.rename "main.css"
	.pipe plugins.header "/* " + Config.name + " : " + Config.version + " : " + new Date() + " */"
	.pipe plugins.size
		showFiles: true
	.pipe gulp.dest Config.build + "styles"

# Inline the "above the fold" CSS

gulp.task "critical", ->

	critical.generate
		base: Config.build
		src: "index.html"
		dest: Config.build + "styles/main.css"
		width: 320
		height: 480
		minify: true
		extract: true
	, (err, output) ->
		critical.inline
			base: Config.build
			src: "index.html"
			dest: "index.html"
			minify: true

		gulp.src Config.build + "/*.css", read: false
		.pipe plugins.clean
			force: true

# Compile Jade

gulp.task "jade", ->
	gulp.src Config.src + "jade/*.jade"
	.pipe plugins.plumber()
	.pipe plugins.jade
		pretty: true
		data:
			description: pkg.description
			keywords: pkg.keywords
	.pipe gulp.dest Config.build

	gulp.src Config.src + "jade/includes/*.jade"
	.pipe plugins.plumber()
	.pipe plugins.jade
		pretty: true
		data:
			description: pkg.description
			keywords: pkg.keywords
	.pipe gulp.dest Config.build + "partials"

# Optimise images

gulp.task "images", ->
	gulp.src Config.src + "images/**/*.{jpg,png,gif}"
		.pipe plugins.plumber()
		.pipe plugins.imagemin
			cache: false
		.pipe plugins.size
			showFiles: true
		.pipe gulp.dest Config.build + "images"

	gulp.src Config.src + "images/**/*.svg"
		.pipe plugins.plumber()
		.pipe plugins.svgmin()
		.pipe plugins.size
			showFiles: true
		.pipe gulp.dest Config.build + "images"

# Copy additional files

gulp.task "copy-files", ->
	
	gulp.src Config.src + "lib/**/*"
	.pipe gulp.dest Config.build + "lib"

	gulp.src Config.src + "fonts/*"
	.pipe gulp.dest Config.build + "styles"

	gulp.src Config.src + "images/*.xml"
	.pipe gulp.dest Config.build + "images"

	# gulp.src Config.src + "sitemap.xml"
	# .pipe gulp.dest Config.build

# Watch for changes to files

gulp.task "watch", ->
	gulp.watch [
		Config.build + "scripts/**/*.js"
		Config.build + "styles/**/*.css"
		Config.build + "*.html"
		Config.build + "images/**/*.{jpg,png,gif,svg}"
	], notifyLivereload

	gulp.watch Config.src + "coffeescript/**/*.coffee", ["coffeescript"]
	gulp.watch Config.src + "sass/**/*.scss", ["sass"]
	gulp.watch Config.src + "jade/**/*.jade", ["jade"]
	gulp.watch Config.src + "images/**/*.{jpg,png,gif,svg}", ["images"]
	gulp.watch Config.src + "*", ["copy-files"]
	gulp.watch Config.src + "images/favicons/*.xml", ["copy-files"]

# Run a test server

gulp.task "server", ->
	app = express()
	app.use require("connect-livereload")()
	app.use express.static Config.build
	app.listen Config.port
	lr.listen 35729
	setTimeout ->
		open "http://localhost:" + Config.port + "/styleguide.html"
	, 3000

# Update the livereload server

notifyLivereload = (event) ->

	fileName = "/" + path.relative Config.build, event.path
	gulp.src event.path, read: false
		.pipe require("gulp-livereload")(lr)

# Default (development) task

gulp.task "default", ->
	Config.publish = false
	run ["coffeescript", "sass", "jade", "images", "copy-files"], "critical", "watch", "server"

gulp.task "deploy", ->
	Config.publish = true
	run "coffeescript"
	run "sass"
	run "jade"
	run "images"
	run "copy-files"
	run "critical"