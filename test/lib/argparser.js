var bindir, child_process, demo, exec, execEnv, fs, lib, libdir, maindir, parser, path, printer, println, testCase, testdir;
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
parser = require(lib + "argparser");
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
module.exports = testCase({
  "the commands argument is given": function(test) {
    var pargs, testfun;
    test.expect(1);
    testfun = function(argv) {
      return test.deepEqual(argv, ["remaining argument"], "then the according callback with the remaining argument must be called");
    };
    pargs = {
      argv: ["mycommand", "remaining argument"],
      commands: [
        {
          command: "mycommand",
          callback: function(argv) {
            return testfun(argv);
          }
        }
      ]
    };
    parser.parse(pargs);
    return test.done();
  },
  "parsing options": function(test) {
    var opts;
    test.expect(3);
    opts = [
      {
        short: 'a',
        long: 'someoption',
        description: 'just an option',
        callback: function() {
          return test.ok(true, "options a must be invoked");
        }
      }, {
        short: 'v',
        long: 'valuedoption',
        description: 'just that has an value',
        value: true,
        callback: function(value) {
          return test.ok(value === "XVAL", "options v with value XVAL must be invoked");
        }
      }, {
        long: "longopt",
        callback: function() {
          return test.ok(true, "a longopt has be called too");
        }
      }
    ];
    parser.parse({
      options: opts,
      argv: ["-a", "-v", "XVAL", "--longopt"]
    });
    return test.done();
  },
  "help option": function(test) {
    var cmd;
    test.expect(2);
    cmd = "node " + demo + "opts.js --help";
    return exec(cmd, execEnv, function(err, stdout, sterr) {
      test.ok(!(err != null));
      test.ok(stdout.match(/--help/), "'--help' must be present");
      return test.done();
    });
  }
});