###
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
###

###

  an UTF8 convenience string buffer
  
###
exports.createStringBuffer = () ->

  ( ->

    pos = 0
    buffer = new Buffer(128)

    resizeBuffer =  ->
      newBuffer = new Buffer(2 * buffer.length)
      buffer.copy(newBuffer,0,0)
      buffer = newBuffer

    append : (s) ->
      resizeBuffer() while pos + s.length > buffer.length
      pos += buffer.write(s,pos,'utf8')
        
    toString : ->
      buffer.toString('utf8',0,pos)

  )()
