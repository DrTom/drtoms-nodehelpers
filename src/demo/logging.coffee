logging = (require 'drtoms-nodehelpers').logging
util = require 'util'

console.log util.inspect logging

logger = logging.logger()

logger.log 'DEBUG', 'gibberish ....'
logger.log 'INFO', 'tell you something: ...'
logger.log 'WARN', 'I warn you!'
logger.log 'ERROR', 'bad bad'
logger.log 'FATAL', 'bye bye'


logging.defaultAppenders().forEach (appender)->
  appender.level('ALL')

logger.log 'DEBUG', 'gibberish ....'
logger.log 'INFO', 'tell you something: ...'
logger.log 'WARN', 'I warn you!'
logger.log 'ERROR', 'bad bad'
logger.log 'FATAL', 'bye bye'


myLogger = logging.logger 'myLogger'
myLogger.log "WARN", "a message"
myLogger.info "a info"
myLogger.warn "other message"


#
# make the default appender more file-friendly
#

#console.log typeof logging.defaultFormatter
#console.log logging.defaultFormatter.toString()
#
#
#myFormatter = (date,level,getMessage) ->
#  logging.defaultFormatter date,level,getMessage, {colors:false,showname:true,showdate:true}
#
#console.log typeof myFormatter
#
#logging.defaultAppenders().forEach (appender) ->
#  if appender.name is 'default'
#    appender.formatter myFormatter
#
logger.log 'DEBUG', 'gibberish ....'
logger.log 'INFO', 'tell you something: ...'
logger.log 'WARN', 'I warn you!'
logger.log 'ERROR', 'bad bad'
logger.log 'FATAL', 'bye bye'




