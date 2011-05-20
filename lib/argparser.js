/*
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
*/var fs, lib, main, path, print, printer, println;
path = require('path');
fs = require('fs');
main = path.join(path.dirname(fs.realpathSync(__filename)), '../');
lib = main + "lib/";
printer = require(lib + 'printer');
println = printer.println;
print = printer.print;
exports.parse = function(pargs) {
  return (function() {
    var argv, command, printHelp;
    argv = pargs.argv != null ? pargs.argv.slice(0) : process.argv.slice(2);
    if (pargs.commands != null) {
      command = argv[0];
      pargs.commands.forEach(function(cmd) {
        if (command === cmd.command) {
          return cmd.callback(argv.slice(1));
        }
      });
    }
    printHelp = function() {
      println("--------- help -------------");
      if (pargs.commands != null) {
        println("\nCommands: ");
        pargs.commands.forEach(function(cmd) {
          return println("  " + cmd.command);
        });
      }
      println("\nOptions: ");
      pargs.options.forEach(function(opt) {
        print("  ");
        if (opt.short != null) {
          print("-" + (opt.short + " or "));
        }
        print("--" + opt.long + " ");
        if (opt.value != null) {
          print("<VALUE>");
        }
        if (opt.description != null) {
          print("; " + opt.description);
        }
        return println("");
      });
      return process.exit(0);
    };
    if (pargs.help != null) {
      if (!(pargs.options != null)) {
        pargs.options = [];
      }
      pargs.options.unshift({
        long: "help",
        callback: printHelp,
        description: "print out help about commands and options (which you are reading right now)"
      });
    }
    if ((pargs.options != null) && argv.length > 0) {
      return pargs.options.forEach(function(opt) {
        var arg, i, _ref, _results;
        _results = [];
        for (i = 0, _ref = argv.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
          arg = argv[i];
          _results.push((arg.match(/^-/)) && arg === ("-" + opt.short) || (arg.match(/^--/)) && arg === ("--" + opt.long) ? opt.value != null ? opt.callback(argv[i + 1]) : opt.callback() : void 0);
        }
        return _results;
      });
    }
  })();
};