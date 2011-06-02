/*
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
*/var print, println, util;
util = require('util');
print = function() {
  return Array.prototype.slice.call(arguments).forEach(function(arg) {
    if (typeof arg === "string") {
      return process.stdout.write(" " + arg);
    } else if (typeof arg === "null") {
      return process.stdout.write(" null");
    } else {
      return process.stdout.write(util.inspect(arg));
    }
  });
};
println = function() {
  print.apply(this, arguments);
  return process.stdout.write("\n");
};
exports.print = print;
exports.println = println;