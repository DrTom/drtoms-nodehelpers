p###
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
###

ath = require 'path'
fs = require 'fs'

child_process = require 'child_process'
exec = child_process.exec

maindir = path.join(path.dirname(fs.realpathSync(__filename)),'../../')
libdir = maindir + "lib/"
lib = libdir
testdir = maindir + "test/"
bindir = maindir + "bin/"
demo = maindir + "demo/"

parser = require lib + "argparser"
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
 
module.exports = testCase(

  "the commands argument is given": (test) ->

    test.expect 1

    testfun = (argv) ->
      test.deepEqual argv, ["remaining argument"],
        "then the according callback with the remaining argument must be called"

    pargs =
      argv: ["mycommand", "remaining argument"]
      commands: [
        { command: "mycommand"
        , callback: (argv) -> testfun(argv)
        }
      ]

    parser.parse pargs

    test.done()



  "parsing options" : (test) ->

    test.expect 3

    opts =
    [ { short: 'a'
      , long: 'someoption'
      , description: 'just an option'
      , callback: -> test.ok true, "options a must be invoked"
      }
    , { short: 'v'
      , long: 'valuedoption'
      , description: 'just that has an value'
      , value : true
      , callback: (value) -> test.ok value is "XVAL", "options v with value XVAL must be invoked"
      }
    , { long: "longopt"
      , callback: () -> test.ok true, "a longopt has be called too"
      }
    ]

    parser.parse
      options: opts
      argv:
        [ "-a"
        , "-v"
        , "XVAL"
        , "--longopt"
        ]

    test.done()

  "help option" : (test) ->
    test.expect 2
    cmd = "node #{demo}opts.js --help"
    exec cmd , execEnv,(err,stdout,sterr) ->
      test.ok not err?
      test.ok (stdout.match /--help/), "'--help' must be present"
      test.done()








)
