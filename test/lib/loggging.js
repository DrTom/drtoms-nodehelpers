/*
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
*/var bindir, child_process, demo, exec, fs, lib, libdir, maindir, path, testCase, testdir;
path = require('path');
fs = require('fs');
child_process = require('child_process');
exec = child_process.exec;
maindir = path.join(path.dirname(fs.realpathSync(__filename)), '../../');
libdir = maindir + "lib/";
lib = libdir;
testdir = maindir + "test/";
bindir = maindir + "bin/";
demo = maindir + "demo/lib/";
testCase = require('nodeunit').testCase;
module.exports = testCase((function() {
  eval(fs.readFileSync(libdir + "logging.js", 'utf8'));
  return {
    "num2level": function(test) {
      test.ok('ALL' === num2level(0), 'ALL is 0');
      test.ok('TRACE' === num2level(10), 'WARN is 40');
      test.ok('WARN' === num2level(40), 'WARN is 40');
      return test.done();
    },
    "_defaultAppender": function(test) {
      test.ok(typeof _defaultAppender !== "undefined" && _defaultAppender !== null, "_defaultAppender exists");
      test.ok(_defaultAppender.level() === "WARN", "defaul level is WARN");
      return test.done();
    }
  };
})());