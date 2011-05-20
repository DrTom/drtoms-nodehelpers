fs = require 'fs'
asynchelper = require './asynchelper'

exports.recursiveFileWalker = (startDir,fileHandler,callback) ->

  recurse = (path,cont) ->

    tracker = asynchelper.createTaskTracker(cont,path)
    fs.readdir path, (err,files) ->
      doneRoot = tracker.createTask(path)
      if err?
        doneRoot(err)
      else
        files.forEach (file) ->
          fullpath = path+"/"+file
          doneFile = tracker.createTask(fullpath)
          fs.stat fullpath, (err,stats) ->
            if err?
              doneFile(err)
            else
              if stats.isDirectory()
                recurse fullpath,tracker.createTask("recurse "+fullpath)
              fileHandler fullpath, stats, doneFile
        doneRoot()

  recurse startDir, callback

