var asynchelper, fs;
fs = require('fs');
asynchelper = require('./asynchelper');
exports.recursiveFileWalker = function(startDir, fileHandler, callback) {
  var recurse;
  recurse = function(path, cont) {
    var tracker;
    tracker = asynchelper.createTaskTracker(cont, path);
    return fs.readdir(path, function(err, files) {
      var doneRoot;
      doneRoot = tracker.createTask(path);
      if (err != null) {
        return doneRoot(err);
      } else {
        files.forEach(function(file) {
          var doneFile, fullpath;
          fullpath = path + "/" + file;
          doneFile = tracker.createTask(fullpath);
          return fs.stat(fullpath, function(err, stats) {
            if (err != null) {
              return doneFile(err);
            } else {
              if (stats.isDirectory()) {
                recurse(fullpath, tracker.createTask("recurse " + fullpath));
              }
              return fileHandler(fullpath, stats, doneFile);
            }
          });
        });
        return doneRoot();
      }
    });
  };
  return recurse(startDir, callback);
};