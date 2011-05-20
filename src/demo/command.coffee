path = require 'path'
fs = require 'fs'

helpers = require 'drtoms-nodehelpers'
main = path.join(path.dirname(fs.realpathSync(__filename)),'../../')
argparser = helpers.argparser
printer = helpers.printer
println = printer.println
print = printer.print


###

  to define the first argument as a command to execute 
  use the commands 

  e.g. try

     node demo/lib/command.js sayHello
     node demo/lib/command.js sayHello -b -r

     node demo/lib/command.js printTime
     node demo/lib/command.js printTime --iso
###


red   = '\033[0;31m'
reset = '\033[0m'
bold  = '\033[1m'
green = '\033[0;32m'


sayHello = (argv) ->

  argparser.parse(
    help : true
    options : [
        { short: 'r'
        , long: 'red'
        , callback: () -> print red
        }
      , { short: 'b'
        , long: 'bold'
        , callback: () -> print bold
        }
      ]
  )

  println "Hello World!" + reset


printTime = (argv) ->

  iso = false
  argparser.parse(
    help: true
    options : [
      {
      , short: "i"
      , long: "iso"
      , callback : () -> iso = true
      }
    ]
  )

  println  ((date) -> if iso then date.toISOString() else date.toString()   )(new Date())


argparser.parse(

    help: true
    commands: [
      { command: "sayHello"
      , callback : (argv) -> sayHello argv
      }
    , { command: "printTime"
      , callback : (argv) -> printTime argv
      }
    ]

)
