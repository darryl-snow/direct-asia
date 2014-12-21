# Lovely welcome message
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

jQuery = require "jQuery"
bootstrap = require "bootstrap"
iCheck = require "iCheck"
selecter = require "selecter"
stepper = require "stepper"
angular = require "angular"
ngResource = require "ngResource"

angular.module "DirectAsia", ["ngResource"]

# Services
require "./services/Car.factory.coffee"

# Controllers
require "./controllers/Car.controller.coffee"

# Directives
require "./directives/input-group.directive.coffee"
require "./directives/popover.directive.coffee"
require "./directives/selecter.directive.coffee"
require "./directives/toggle-buttons.directive.coffee"
require "./directives/tooltip.directive.coffee"