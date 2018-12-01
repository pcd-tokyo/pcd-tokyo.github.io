'use strict';




module.exports = function() {
  var ret = {
    ie6: false,
    ie7: false,
    ie8: false,
    ie9: false,
    ie10: false,
    ie11: false,
    chrome: false,
    safari: false,
    opera: false,
    firefox: false,
    android: false
  };

  ret.ie = (function() {return ret.ie6 || ret.ie7 || ret.ie8 || ret.ie9 || ret.ie10;})();
  ret.version = window.navigator.appVersion.toLowerCase();

  // ブラウザ種別判定
  var ua = window.navigator.userAgent.toLowerCase();
  var version = window.navigator.appVersion.toLowerCase();
  if(ua.indexOf('msie') !== -1) {
    if(version.indexOf('msie 6.') !== -1) {ret.ie6 = true;}
    else if(version.indexOf('msie 7.') !== -1) {ret.ie7 = true;}
    else if(version.indexOf('msie 8.') !== -1) {ret.ie8 = true;}
    else if(version.indexOf('msie 9.') !== -1) {ret.ie9 = true;}
    else if(version.indexOf('msie 10.') !== -1) {ret.ie10 = true;}
  }
  else if(ua.indexOf('trident/7') !== -1) {ret.ie11 = true;}
  else if(ua.indexOf('chrome') !== -1) {ret.chrome = true;}
  else if(ua.indexOf('safari') !== -1) {ret.safari = true;}
  else if(ua.indexOf('opera') !== -1) {ret.opera = true;}
  else if(ua.indexOf('firefox') !== -1) {ret.firefox = true;}
  else if(ua.indexOf('Andoroid') !== -1) {ret.android = true;}

  return ret;
};
