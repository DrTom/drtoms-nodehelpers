###
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
###

util = require 'util'
stringhelper = require './stringhelper'

inspect = (object) -> (util.inspect.call this,object,true,null).replace /\n/g,""

levels =
  "ALL": 0
  "TRACE": 10
  "DEBUG": 20
  "INFO": 30
  "WARN": 40
  "ERROR": 50
  "FATAL": 60
  "OFF": 70

level2num = (level) ->
  if typeof level is 'string'
    levels[level]
  else
    level


num2level = (num) ->
  for key, value of levels
    if num is value
      return key


levelstyle =
  'TRACE' : 'normal'
  'DEBUG' : 'normal'
  'INFO'  : 'normal'
  'WARN' : 'bold'
  'ERROR' : 'bold'
  'FATAL' : 'bold'

levelcolor =
  'TRACE' : 'normal'
  'DEBUG' : 'normal'
  'INFO'  : 'green'
  'WARN' : 'magenta'
  'ERROR' : 'red'
  'FATAL' : 'red'

style = (str,style,enabled) ->
  styles =
    'normal'    : [10,  10]
    'bold'      : [1,  22]
    'italic'    : [3,  23]
    'underline' : [4,  24]
    'inverse'   : [7,  27]
  if enabled? and enabled
    '\033[' + styles[style][0] + 'm' + str + '\033[' + styles[style][1] + 'm'
  else
    str


colorize = (str,color,enabled) ->
  colors=
    'white'     : [37, 39]
    'grey'      : [90, 39]
    'black'     : [90, 39]
    'normal'    : [90, 39]
    'blue'      : [34, 39]
    'cyan'      : [36, 39]
    'green'     : [32, 39]
    'magenta'   : [35, 39]
    'red'       : [31, 39]
    'yellow'    : [33, 39]
  if enabled? and enabled
    '\033[' + colors[color][0] + 'm' + str + '\033[' + colors[color][1] + 'm'
  else
    str


defaultFormatter = (date,name,level,getMessage,opts) ->
  colors = (opts? and opts.colors? and opts.colors)
  showdate = (opts? and opts.showdate? and opts.showdate)
  showname = (opts? and opts.showname? and opts.showname)
  msg = (
    buffer = stringhelper.createStringBuffer()
    buffer.append (colorize "["+date.toISOString()+"] ",'grey',colors) if showdate
    buffer.append ("["+(style (colorize level,levelcolor[level],colors), levelstyle[level],colors)+"] ")
    buffer.append (colorize name,'grey',colors) if showname
    buffer.append " - "
    buffer.append getMessage()
    buffer.append "\n"
    buffer.toString() )

_defaultAppender = ( ->

  myLevel = level2num "WARN"

  _formatter = (date,name,level,getMessage) ->
    defaultFormatter date,name,level,getMessage,{colors:true,showname:true,showdate:false}

  formatter : (f) ->
    if f?
      _formatter = f
    _formatter

  level : (_lev) ->
    if _lev?
      myLevel = level2num _lev
    num2level myLevel

  setLevel : (lev) -> level(lev)

  append : (date,name,level,getMessage) ->
    if (level2num level) >= myLevel
      process.stdout.write _formatter date,name,level,getMessage
     
  name : "default"

  myLevel : myLevel

)()

_defaultAppenders = []
_defaultAppenders.push _defaultAppender


_createLogger = (_name) ->

  name: _name

  _appenders = []

  appenders : _appenders

  mynlevel = level2num "ALL"

  _log = ->
    date = new Date()
    args = Array.prototype.slice.call(arguments)
    loglevel = args.shift()
    nlevel = level2num loglevel
    getMessage = ->
      if not lazymessage?
        stringBuilder = stringhelper.createStringBuffer()
        args.forEach (arg) ->
          if typeof arg is 'string'
            stringBuilder.append arg
          else if typeof arg is 'function'
            stringBuilder.append '{"function": "' + arg.toString() + '"}'
          else
            stringBuilder.append inspect arg,true,null
            stringBuilder.append " "
        lazymessage = stringBuilder.toString()
      lazymessage

    if nlevel >=  mynlevel
      _appenders.forEach (appender) ->
        appender.append  date, _name, loglevel, getMessage
      _defaultAppenders.forEach (appender) ->
        appender.append  date, _name, loglevel, getMessage

  __log = (msg,pseudoargs) ->
    args = Array.prototype.slice.call pseudoargs
    args.unshift msg
    _log.apply this, args


  level : (newLevel) ->
    if newLevel?
      mynlevel = level2num newLevel
    num2level mynlevel

  log: -> _log.apply this,(Array.prototype.slice.call arguments)

  trace: -> __log "TRACE",arguments
  debug: -> __log "DEBUG",arguments
  info: -> __log "INFO",arguments
  warn: -> __log "WARN",arguments
  error: -> __log "ERROR",arguments
  fatal: -> __log "FATAL",arguments

loggers =
  default: _createLogger 'default'


logging =

  logger : (name) ->
    if name? and loggers[name]?
      loggers[name]
    else if name?
      _logger = _createLogger(name)
    else loggers['default']

  defaultFormatter : defaultFormatter

  defaultAppenders : ->
    _defaultAppenders

exports.logging = logging

