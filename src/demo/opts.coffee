###
  Very basic example.

  dromts-nodehelpers must be installed by npm to be called as shown in this file.
###

util =require 'util'
helpers = require 'drtoms-nodehelpers'

console.log util.inspect helpers

parser = helpers.argparser

console.log util.inspect parser

helpers.argparser.parse(
  options : [
    { short: 'h'
    , long : 'hello'
    , callback : () -> println "Hello World!"
    }
  ]
  help: true
)
