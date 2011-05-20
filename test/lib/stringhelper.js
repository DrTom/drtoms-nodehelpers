/*
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
*/var bindir, demo, fs, lib, libdir, maindir, path, testCase, testdir;
path = require('path');
fs = require('fs');
maindir = path.join(path.dirname(fs.realpathSync(__filename)), '../../');
libdir = maindir + "lib/";
lib = libdir;
testdir = maindir + "test/";
bindir = maindir + "bin/";
demo = maindir + "demo/lib/";
testCase = require('nodeunit').testCase;
module.exports = testCase({
  "string buffer": function(test) {
    var b2, sbuffer, x100, xyz;
    test.expect(4);
    sbuffer = require(lib + 'stringhelper').createStringBuffer();
    x100 = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
    sbuffer.append(x100);
    test.ok(sbuffer.toString() === x100, "append a simple string");
    b2 = require(lib + 'stringhelper').createStringBuffer();
    xyz = "xyz";
    b2.append(xyz);
    test.ok(b2.toString() === xyz, "second buffer");
    test.ok(sbuffer.toString() === x100, "second buffer doesn't influence first");
    sbuffer.append(x100);
    test.ok(sbuffer.toString() === x100 + x100, "resizing must be correct");
    return test.done();
  }
});