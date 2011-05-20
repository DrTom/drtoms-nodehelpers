###
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
###

helpers = require 'drtoms-nodehelpers'

util = require 'util'

testCase = require('nodeunit').testCase

module.exports = testCase((()->

  'npm exports':

    'printer is exported' : (test)->

      test.ok helpers.printer?, "printer is exported"
      test.ok helpers.printer.println? and typeof helpers.printer.println is 'function', "printer has a println function"

      test.done()

    'stringhelper is exported' : (test)->

      test.ok helpers.stringhelper?, "stringhelper is exported"
      test.ok helpers.stringhelper.createStringBuffer? and typeof helpers.stringhelper.createStringBuffer is 'function', "stringhelper has a createStringBuffer function"
   
      test.done()


    'asynchelper is exported' : (test)->

      test.ok helpers.asynchelper?, "asynchelper is exported"
      test.ok helpers.asynchelper.createTaskTracker? and typeof helpers.asynchelper.createTaskTracker is 'function', "stringhelper has a stringbuilder function"
   
      test.done()

    'filehelper is exported' : (test)->

      test.ok helpers.filehelper?, "filehelper is exported"
      test.ok helpers.filehelper.recursiveFileWalker? and typeof helpers.filehelper.recursiveFileWalker is 'function', "filehelper has a recursiveFileWalker function"
   
      test.done()

    'filehelper is exported' : (test)->

      test.ok helpers.filehelper?, "filehelper is exported"
      test.ok helpers.filehelper.recursiveFileWalker? and typeof helpers.filehelper.recursiveFileWalker is 'function', "filehelper has a recursiveFileWalker function"
   
      test.done()


    'logging is exported' : (test)->

      test.ok helpers.logging?, "logging is exported"
      test.ok helpers.logging.logger? and typeof helpers.logging.logger is 'function', "logger has a logging function"
   
      test.done()



)())
