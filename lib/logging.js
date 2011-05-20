/*
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
*/var colorize, defaultFormatter, inspect, level2num, levelcolor, levels, levelstyle, loggers, logging, num2level, stringhelper, style, util, _createLogger, _defaultAppender, _defaultAppenders;
util = require('util');
stringhelper = require('./stringhelper');
inspect = function(object) {
  return (util.inspect.call(this, object, true, null)).replace(/\n/g, "");
};
levels = {
  "ALL": 0,
  "TRACE": 10,
  "DEBUG": 20,
  "INFO": 30,
  "WARN": 40,
  "ERROR": 50,
  "FATAL": 60,
  "OFF": 70
};
level2num = function(level) {
  if (typeof level === 'string') {
    return levels[level];
  } else {
    return level;
  }
};
num2level = function(num) {
  var key, value;
  for (key in levels) {
    value = levels[key];
    if (num === value) {
      return key;
    }
  }
};
levelstyle = {
  'TRACE': 'normal',
  'DEBUG': 'normal',
  'INFO': 'normal',
  'WARN': 'bold',
  'ERROR': 'bold',
  'FATAL': 'bold'
};
levelcolor = {
  'TRACE': 'normal',
  'DEBUG': 'normal',
  'INFO': 'green',
  'WARN': 'magenta',
  'ERROR': 'red',
  'FATAL': 'red'
};
style = function(str, style, enabled) {
  var styles;
  styles = {
    'normal': [10, 10],
    'bold': [1, 22],
    'italic': [3, 23],
    'underline': [4, 24],
    'inverse': [7, 27]
  };
  if ((enabled != null) && enabled) {
    return '\033[' + styles[style][0] + 'm' + str + '\033[' + styles[style][1] + 'm';
  } else {
    return str;
  }
};
colorize = function(str, color, enabled) {
  var colors;
  colors = {
    'white': [37, 39],
    'grey': [90, 39],
    'black': [90, 39],
    'normal': [90, 39],
    'blue': [34, 39],
    'cyan': [36, 39],
    'green': [32, 39],
    'magenta': [35, 39],
    'red': [31, 39],
    'yellow': [33, 39]
  };
  if ((enabled != null) && enabled) {
    return '\033[' + colors[color][0] + 'm' + str + '\033[' + colors[color][1] + 'm';
  } else {
    return str;
  }
};
defaultFormatter = function(date, name, level, getMessage, opts) {
  var buffer, colors, msg, showdate, showname;
  colors = (opts != null) && (opts.colors != null) && opts.colors;
  showdate = (opts != null) && (opts.showdate != null) && opts.showdate;
  showname = (opts != null) && (opts.showname != null) && opts.showname;
  return msg = (buffer = stringhelper.createStringBuffer(), showdate ? buffer.append(colorize("[" + date.toISOString() + "] ", 'grey', colors)) : void 0, buffer.append("[" + (style(colorize(level, levelcolor[level], colors), levelstyle[level], colors)) + "] "), showname ? buffer.append(colorize(name, 'grey', colors)) : void 0, buffer.append(" - "), buffer.append(getMessage()), buffer.append("\n"), buffer.toString());
};
_defaultAppender = (function() {
  var myLevel, _formatter;
  myLevel = level2num("WARN");
  _formatter = function(date, name, level, getMessage) {
    return defaultFormatter(date, name, level, getMessage, {
      colors: true,
      showname: true,
      showdate: false
    });
  };
  return {
    formatter: function(f) {
      if (f != null) {
        _formatter = f;
      }
      return _formatter;
    },
    level: function(_lev) {
      if (_lev != null) {
        myLevel = level2num(_lev);
      }
      return num2level(myLevel);
    },
    setLevel: function(lev) {
      return level(lev);
    },
    append: function(date, name, level, getMessage) {
      if ((level2num(level)) >= myLevel) {
        return process.stdout.write(_formatter(date, name, level, getMessage));
      }
    },
    name: "default",
    myLevel: myLevel
  };
})();
_defaultAppenders = [];
_defaultAppenders.push(_defaultAppender);
_createLogger = function(_name) {
  var mynlevel, __log, _appenders, _log;
  ({
    name: _name
  });
  _appenders = [];
  ({
    appenders: _appenders
  });
  mynlevel = level2num("ALL");
  _log = function() {
    var args, date, getMessage, loglevel, nlevel;
    date = new Date();
    args = Array.prototype.slice.call(arguments);
    loglevel = args.shift();
    nlevel = level2num(loglevel);
    getMessage = function() {
      var lazymessage, stringBuilder;
      if (!(typeof lazymessage !== "undefined" && lazymessage !== null)) {
        stringBuilder = stringhelper.createStringBuffer();
        args.forEach(function(arg) {
          if (typeof arg === 'string') {
            return stringBuilder.append(arg);
          } else if (typeof arg === 'function') {
            return stringBuilder.append('{"function": "' + arg.toString() + '"}');
          } else {
            stringBuilder.append(inspect(arg, true, null));
            return stringBuilder.append(" ");
          }
        });
        lazymessage = stringBuilder.toString();
      }
      return lazymessage;
    };
    if (nlevel >= mynlevel) {
      _appenders.forEach(function(appender) {
        return appender.append(date, _name, loglevel, getMessage);
      });
      return _defaultAppenders.forEach(function(appender) {
        return appender.append(date, _name, loglevel, getMessage);
      });
    }
  };
  __log = function(msg, pseudoargs) {
    var args;
    args = Array.prototype.slice.call(pseudoargs);
    args.unshift(msg);
    return _log.apply(this, args);
  };
  return {
    level: function(newLevel) {
      if (newLevel != null) {
        mynlevel = level2num(newLevel);
      }
      return num2level(mynlevel);
    },
    log: function() {
      return _log.apply(this, Array.prototype.slice.call(arguments));
    },
    trace: function() {
      return __log("TRACE", arguments);
    },
    debug: function() {
      return __log("DEBUG", arguments);
    },
    info: function() {
      return __log("INFO", arguments);
    },
    warn: function() {
      return __log("WARN", arguments);
    },
    error: function() {
      return __log("ERROR", arguments);
    },
    fatal: function() {
      return __log("FATAL", arguments);
    }
  };
};
loggers = {
  "default": _createLogger('default')
};
logging = {
  logger: function(name) {
    var _logger;
    if ((name != null) && (loggers[name] != null)) {
      return loggers[name];
    } else if (name != null) {
      return _logger = _createLogger(name);
    } else {
      return loggers['default'];
    }
  },
  defaultFormatter: defaultFormatter,
  defaultAppenders: function() {
    return _defaultAppenders;
  }
};
exports.logging = logging;