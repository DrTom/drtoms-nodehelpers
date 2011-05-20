var argparser, bold, fs, green, helpers, main, path, print, printTime, printer, println, red, reset, sayHello;
path = require('path');
fs = require('fs');
helpers = require('drtoms-nodehelpers');
main = path.join(path.dirname(fs.realpathSync(__filename)), '../../');
argparser = helpers.argparser;
printer = helpers.printer;
println = printer.println;
print = printer.print;
/*

  to define the first argument as a command to execute 
  use the commands 

  e.g. try

     node demo/lib/command.js sayHello
     node demo/lib/command.js sayHello -b -r

     node demo/lib/command.js printTime
     node demo/lib/command.js printTime --iso
*/
red = '\033[0;31m';
reset = '\033[0m';
bold = '\033[1m';
green = '\033[0;32m';
sayHello = function(argv) {
  argparser.parse({
    help: true,
    options: [
      {
        short: 'r',
        long: 'red',
        callback: function() {
          return print(red);
        }
      }, {
        short: 'b',
        long: 'bold',
        callback: function() {
          return print(bold);
        }
      }
    ]
  });
  return println("Hello World!" + reset);
};
printTime = function(argv) {
  var iso;
  iso = false;
  argparser.parse({
    help: true,
    options: [
      {
        short: "i",
        long: "iso",
        callback: function() {
          return iso = true;
        }
      }
    ]
  });
  return println((function(date) {
    if (iso) {
      return date.toISOString();
    } else {
      return date.toString();
    }
  })(new Date()));
};
argparser.parse({
  help: true,
  commands: [
    {
      command: "sayHello",
      callback: function(argv) {
        return sayHello(argv);
      }
    }, {
      command: "printTime",
      callback: function(argv) {
        return printTime(argv);
      }
    }
  ]
});