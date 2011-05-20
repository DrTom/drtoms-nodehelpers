###
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
###

path = require 'path'
fs = require 'fs'

child_process = require 'child_process'
exec = child_process.exec

maindir = path.join(path.dirname(fs.realpathSync(__filename)),'../../')
libdir = maindir + "lib/"
lib = libdir
testdir = maindir + "test/"
bindir = maindir + "bin/"
demo = maindir + "demo/lib/"

testCase = require('nodeunit').testCase

module.exports = testCase((()->


  eval fs.readFileSync libdir + "logging.js",'utf8'

  "num2level" : (test) ->
    test.ok ('ALL' is  num2level 0) ,'ALL is 0'
    test.ok ('TRACE' is num2level 10), 'WARN is 40'
    test.ok ('WARN' is num2level 40), 'WARN is 40'
    test.done()


  "_defaultAppender":(test)->

    test.ok _defaultAppender?, "_defaultAppender exists"
    test.ok _defaultAppender.level() is "WARN", "defaul level is WARN"


    test.done()




)())
