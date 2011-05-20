/*
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
*/var bindir, child_process, demo, exec, execEnv, filehelper, fs, lib, libdir, maindir, path, printer, println, testCase, testdir;
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
filehelper = require(lib + "filehelper");
printer = require(lib + 'printer');
println = printer.println;
testCase = require('nodeunit').testCase;
execEnv = {
  encoding: 'utf8',
  timeout: 0,
  maxBuffer: 200 * 1024,
  killSignal: 'SIGTERM',
  cwd: maindir,
  env: null
};
module.exports = testCase((function() {
  return {
    "recursive file walker": {
      "walking a flat directory ": function(test) {
        var fileHandler;
        test.expect(3);
        fileHandler = function(path, status, cont) {
          if (path.match(/insubsub01$/)) {
            test.ok(true, "seen insubsub01");
          }
          if (path.match(/insubsub02$/)) {
            test.ok(true, "seen insubsub02");
          }
          return cont();
        };
        return filehelper.recursiveFileWalker(maindir + "test/data/root/sub/subsub", fileHandler, function(err) {
          if (err != null) {
            println(err);
          }
          test.ok(!(err != null), "no error occured");
          return test.done();
        });
      },
      "walking a directory with subs": function(test) {
        var fileHandler;
        test.expect(6);
        fileHandler = function(path, status, cont) {
          if (path.match(/insubsub01$/)) {
            test.ok(true, "seen insubsub01");
          }
          if (path.match(/insubsub02$/)) {
            test.ok(true, "seen insubsub02");
          }
          if (path.match(/insub01$/)) {
            test.ok(true, "seen insub01");
          }
          if (path.match(/insub02$/)) {
            test.ok(true, "seen insub02");
          }
          if (path.match(/subsub$/)) {
            test.ok(true, "seen subsub");
          }
          return cont();
        };
        return filehelper.recursiveFileWalker(maindir + "test/data/root/sub", fileHandler, function(err) {
          if (err != null) {
            println(err);
          }
          test.ok(!(err != null), "no error occured");
          return test.done();
        });
      },
      "creating an error": function(test) {
        var fileHandler;
        test.expect(3);
        fileHandler = function(path, status, cont) {
          if (path.match(/insubsub01$/)) {
            test.ok(true, "seen insubsub01");
            return cont();
          } else if (path.match(/insubsub02$/)) {
            test.ok(true, "seen insubsub02");
            return cont("error insubsub02");
          } else {
            return cont();
          }
        };
        return filehelper.recursiveFileWalker(maindir + "test/data/root/sub/subsub", fileHandler, function(err) {
          test.ok(err != null, "returns error");
          return test.done();
        });
      }
    }
  };
})());