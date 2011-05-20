/*
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
*/var asynchelper, bindir, child_process, demo, exec, execEnv, fs, lib, libdir, maindir, path, printer, println, testCase, testdir;
path = require('path');
fs = require('fs');
child_process = require('child_process');
exec = child_process.exec;
maindir = path.join(path.dirname(fs.realpathSync(__filename)), '../../');
libdir = maindir + "lib/";
lib = libdir;
testdir = maindir + "test/";
bindir = maindir + "bin/";
demo = maindir + "demo/";
asynchelper = require(lib + "asynchelper");
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
    "async task tracker": {
      "an error is reported": function(test) {
        var att, doneNamedTask;
        test.expect(2);
        att = asynchelper.createTaskTracker(function(err) {
          test.ok(err != null, "error reported");
          return test.ok(true, "test done");
        });
        doneNamedTask = att.createTask("my named Task");
        doneNamedTask("has an error");
        return test.done();
      },
      "more than one taks": function(test) {
        var att, doneNamedTask, doneUnnamedTask;
        test.expect(2);
        att = asynchelper.createTaskTracker(function(err) {
          test.ok(!(err != null), "no error reported");
          return test.ok(true, "test done");
        });
        doneNamedTask = att.createTask("my named Task");
        doneUnnamedTask = att.createTask();
        doneNamedTask();
        doneUnnamedTask();
        return test.done();
      },
      "multiple invocation": function(test) {
        var att, doneNamedTask;
        test.expect(4);
        att = asynchelper.createTaskTracker(function(err) {
          return test.ok(true, "test done");
        });
        doneNamedTask = att.createTask("my named Task");
        doneNamedTask();
        test.ok(att.getErrors().length === 0);
        doneNamedTask();
        test.ok(att.getErrors().length !== 0);
        return test.done();
      },
      "one named task should fire wo error": function(test) {
        var att, doneNamedTask, remTasks;
        att = asynchelper.createTaskTracker(function(err) {});
        doneNamedTask = att.createTask("myTask");
        remTasks = att.getOpenTasks();
        doneNamedTask();
        return test.done();
      }
    }
  };
})());