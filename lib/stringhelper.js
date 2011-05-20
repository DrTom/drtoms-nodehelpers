/*
Copyright 2011 Thomas Schank
Released under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3
*/
/*

  an UTF8 convenience string buffer
  
*/exports.createStringBuffer = function() {
  return (function() {
    var buffer, pos, resizeBuffer;
    pos = 0;
    buffer = new Buffer(128);
    resizeBuffer = function() {
      var newBuffer;
      newBuffer = new Buffer(2 * buffer.length);
      buffer.copy(newBuffer, 0, 0);
      return buffer = newBuffer;
    };
    return {
      append: function(s) {
        while (pos + s.length > buffer.length) {
          resizeBuffer();
        }
        return pos += buffer.write(s, pos, 'utf8');
      },
      toString: function() {
        return buffer.toString('utf8', 0, pos);
      }
    };
  })();
};