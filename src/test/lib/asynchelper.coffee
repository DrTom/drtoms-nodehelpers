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
demo = maindir + "demo/"

asynchelper = require lib + "asynchelper"
printer = require lib + 'printer'
println = printer.println

testCase = require('nodeunit').testCase
 
execEnv =
  encoding: 'utf8'
  timeout: 0
  maxBuffer: 200*1024
  killSignal: 'SIGTERM'
  cwd: maindir
  env: null
 

module.exports = testCase((()->

  "async task tracker":

    "an error is reported": (test) ->

      test.expect 2

      att = asynchelper.createTaskTracker (err) ->
        test.ok err?,"error reported"
        test.ok true,"test done"

      doneNamedTask = att.createTask ("my named Task")

      doneNamedTask("has an error")

      test.done()


    "more than one taks": (test) ->

      test.expect 2

      att = asynchelper.createTaskTracker (err) ->
        test.ok not err?,"no error reported"
        test.ok true,"test done"


      doneNamedTask = att.createTask("my named Task")

      doneUnnamedTask = att.createTask()

      doneNamedTask()
      doneUnnamedTask()

      test.done()

    "multiple invocation": (test) ->

      test.expect 4

      att = asynchelper.createTaskTracker (err) ->
        test.ok true,"test done"

      doneNamedTask = att.createTask("my named Task")

      doneNamedTask()
      test.ok att.getErrors().length is 0

      # doneNamedTask() should never be called more than once 
      #   if so we add an error; however, it is possible that
      #   the final continuation has been called already once
      doneNamedTask()
      test.ok att.getErrors().length isnt 0

      test.done()

    "one named task should fire wo error": (test) ->

      #test.expect 3

      att = asynchelper.createTaskTracker (err) ->
        #test.ok not err?, "no error should be reported"
        #test.ok true,"all tests are done"

      doneNamedTask = att.createTask ("myTask")

      remTasks = att.getOpenTasks()
#      test.ok remTasks.myTask?

      doneNamedTask()

      test.done()


)())
