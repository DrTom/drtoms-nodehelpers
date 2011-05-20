/*
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
*/var crypto, logger, logging, util, _;
_ = require('underscore');
crypto = require('crypto');
util = require('util');
logging = (require('./logging')).logging;
logger = logging.logger('drtoms-asynchelper');
logger.level("OFF");
exports.createTaskTracker = function(cont, opts) {
  var errors, name, opentasks, tracker_fired;
  name = ((opts != null) && opts.name) || "NONAME";
  errors = [];
  opentasks = {};
  tracker_fired = false;
  logger.info("creating TaskTracker: " + name + " " + (util.inspect(opts)));
  return {
    createTask: function(uniqname) {
      var closed, _uniqname;
      closed = false;
      _uniqname = (uniqname || "???") + "-" + crypto.createHash('md5').update(Math.random().toString()).digest('hex');
      logger.debug("TaskTracker: " + name + ", create Task " + _uniqname);
      if (tracker_fired) {
        logger.error("TaskTracker: " + name + ", is already closed when asked to create Task " + _uniqname);
      }
      opentasks[_uniqname] = new Date();
      return function(err) {
        var errobj;
        logger.debug("TaskTracker: " + name + ", closing task: " + _uniqname);
        if (closed) {
          logger.error("TaskTracker: " + name + ", task is alredy closed: " + _uniqname);
        }
        closed = true;
        if (err != null) {
          errobj = {};
          errobj[_uniqname] = err;
          errors.push(errobj);
        }
        if (!(opentasks[_uniqname] != null)) {
          errobj = {};
          errobj[_uniqname] = "end of task signal was envoked multiple times";
          errors.push(errobj);
        }
        delete opentasks[_uniqname];
        if (_.isEmpty(opentasks)) {
          logger.info("TaskTracker: " + name + ", all tasks processed, firing continuation");
          tracker_fired = true;
          return cont((errors.length === 0 ? void 0 : errors));
        }
      };
    },
    getName: function() {
      return name;
    },
    getOpenTasks: function() {
      return _.clone(opentasks);
    },
    getErrors: function() {
      return errors;
    }
  };
};