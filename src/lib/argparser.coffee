###
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
###

path = require 'path'
fs = require 'fs'

main = path.join(path.dirname(fs.realpathSync(__filename)),'../')
lib = main + "lib/"

printer = require lib + 'printer'
println = printer.println
print = printer.print

exports.parse = (pargs) ->

  ( ->

    argv =
      if pargs.argv?
        pargs.argv.slice 0
      else
        process.argv.slice 2

    # Commands ####################################

    if pargs.commands?
      command = argv[0]

      pargs.commands.forEach (cmd)->
        if command is cmd.command
          cmd.callback(argv.slice 1)


    # help ########################################

    printHelp = ->

      println "--------- help -------------"

      if pargs.commands?
        println "\nCommands: "
        pargs.commands.forEach (cmd)->
          println "  " +cmd.command
      
      println "\nOptions: "
      pargs.options.forEach (opt) ->
        print "  "
        print "-"+(opt.short + " or ") if opt.short?
        print "--"+opt.long + " "
        print "<VALUE>" if opt.value?
        print "; " + opt.description if opt.description?
        println ""

      process.exit 0


    if pargs.help?
      pargs.options = [] if not pargs.options?
      pargs.options.unshift {
        , long: "help"
        , callback: printHelp
        , description: "print out help about commands and options (which you are reading right now)"
        }


    # options #####################################

    if pargs.options? and argv.length > 0
      pargs.options.forEach (opt)->
        for i in [0..argv.length-1]
          arg=argv[i]
          if (arg.match /^-/) and arg is ("-"+opt.short) or  (arg.match /^--/) and arg is ("--"+opt.long)
            if opt.value?
              opt.callback(argv[i+1])
            else
              opt.callback()

  )()

