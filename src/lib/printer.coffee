###
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
###

util = require 'util'

print = ->

  Array.prototype.slice.call(arguments).forEach (arg) ->

    if typeof arg is "string"
      process.stdout.write " "+arg
    else if typeof arg is "null"
      process.stdout.write " null"
    else
      process.stdout.write util.inspect arg


println = ->

  print.apply this,arguments
  process.stdout.write "\n"


exports.print = print
exports.println = println

