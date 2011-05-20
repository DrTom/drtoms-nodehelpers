###
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
###

_ = require 'underscore'
crypto = require 'crypto'
util = require 'util'

logging = (require './logging').logging

logger = logging.logger('drtoms-asynchelper')

logger.level("OFF")

exports.createTaskTracker = (cont,opts) ->
    
    name = (opts? and opts.name) or "NONAME"
    errors = []
    opentasks = {}
    tracker_fired = false

    logger.info "creating TaskTracker: " + name + " " + (util.inspect opts)

    createTask : (uniqname) ->
      closed = false
      _uniqname = (uniqname or "???" ) + "-" + crypto.createHash('md5').update(Math.random().toString()).digest('hex')
      logger.debug "TaskTracker: " + name + ", create Task " + _uniqname
      if tracker_fired then logger.error "TaskTracker: " + name + ", is already closed when asked to create Task " + _uniqname
      opentasks[_uniqname]=new Date()
      (err) ->
        logger.debug "TaskTracker: " + name + ", closing task: " + _uniqname
        if closed then logger.error "TaskTracker: " + name + ", task is alredy closed: " + _uniqname
        closed=true
        if err?
          errobj = {}; errobj[_uniqname] = err
          errors.push errobj
        if not opentasks[_uniqname]?
          errobj = {}; errobj[_uniqname] = "end of task signal was envoked multiple times"
          errors.push errobj
        delete opentasks[_uniqname]
        if _.isEmpty opentasks
          logger.info "TaskTracker: " + name + ", all tasks processed, firing continuation"
          tracker_fired = true
          cont (if errors.length is 0 then undefined else errors)

    getName : () -> name

    getOpenTasks: () -> _.clone opentasks

    getErrors : () -> errors

