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

filehelper = require lib + "filehelper"
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

  "recursive file walker":

    "walking a flat directory ": (test)->
      test.expect 3
      fileHandler = (path,status,cont) ->
        if path.match /insubsub01$/ then test.ok true, "seen insubsub01"
        if path.match /insubsub02$/ then test.ok true, "seen insubsub02"
        cont()

      filehelper.recursiveFileWalker maindir+"test/data/root/sub/subsub",fileHandler, (err) ->
        println err if err?
        test.ok not err?, "no error occured"
        test.done()
    
    "walking a directory with subs": (test)->
      test.expect 6

      fileHandler = (path,status,cont) ->
        if path.match /insubsub01$/ then test.ok true, "seen insubsub01"
        if path.match /insubsub02$/ then test.ok true, "seen insubsub02"
        if path.match /insub01$/ then test.ok true, "seen insub01"
        if path.match /insub02$/ then test.ok true, "seen insub02"
        if path.match /subsub$/ then test.ok true, "seen subsub"
        cont()

      filehelper.recursiveFileWalker maindir+"test/data/root/sub",fileHandler, (err) ->
        println err if err?
        test.ok not err?, "no error occured"
        test.done()

    "creating an error": (test)->
      test.expect 3
      fileHandler = (path,status,cont) ->
        if path.match /insubsub01$/
          test.ok true, "seen insubsub01"
          cont()
        else if path.match /insubsub02$/
          test.ok true, "seen insubsub02"
          cont("error insubsub02")
        else
          cont()

      filehelper.recursiveFileWalker maindir+"test/data/root/sub/subsub",fileHandler, (err) ->
        #println err if err?
        test.ok err?, "returns error"
        test.done()
)())
