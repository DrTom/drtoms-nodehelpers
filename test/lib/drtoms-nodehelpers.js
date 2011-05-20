/*
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
*/var helpers, testCase, util;
helpers = require('drtoms-nodehelpers');
util = require('util');
testCase = require('nodeunit').testCase;
module.exports = testCase((function() {
  return {
    'npm exports': {
      'printer is exported': function(test) {
        test.ok(helpers.printer != null, "printer is exported");
        test.ok((helpers.printer.println != null) && typeof helpers.printer.println === 'function', "printer has a println function");
        return test.done();
      },
      'stringhelper is exported': function(test) {
        test.ok(helpers.stringhelper != null, "stringhelper is exported");
        test.ok((helpers.stringhelper.createStringBuffer != null) && typeof helpers.stringhelper.createStringBuffer === 'function', "stringhelper has a createStringBuffer function");
        return test.done();
      },
      'asynchelper is exported': function(test) {
        test.ok(helpers.asynchelper != null, "asynchelper is exported");
        test.ok((helpers.asynchelper.createTaskTracker != null) && typeof helpers.asynchelper.createTaskTracker === 'function', "stringhelper has a stringbuilder function");
        return test.done();
      },
      'filehelper is exported': function(test) {
        test.ok(helpers.filehelper != null, "filehelper is exported");
        test.ok((helpers.filehelper.recursiveFileWalker != null) && typeof helpers.filehelper.recursiveFileWalker === 'function', "filehelper has a recursiveFileWalker function");
        return test.done();
      },
      'filehelper is exported': function(test) {
        test.ok(helpers.filehelper != null, "filehelper is exported");
        test.ok((helpers.filehelper.recursiveFileWalker != null) && typeof helpers.filehelper.recursiveFileWalker === 'function', "filehelper has a recursiveFileWalker function");
        return test.done();
      },
      'logging is exported': function(test) {
        test.ok(helpers.logging != null, "logging is exported");
        test.ok((helpers.logging.logger != null) && typeof helpers.logging.logger === 'function', "logger has a logging function");
        return test.done();
      }
    }
  };
})());