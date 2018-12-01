'use strict';


/**
 * クライアントがモバイルデバイスかどうか調べて結果を返す。
 * @return {boolean} クライアントがモバイルデバイスならtrue、さもなければfalse
 * @exports utility/isMobileDevice
 */
module.exports = function() {
  var ret = {
    iPhone: false,
    iPod: false,
    iPad: false,
    Android: false
  };

  if(navigator.userAgent.match('iPhone')) {ret.iPhone = true;}
  if(navigator.userAgent.match('iPod')) {ret.iPhone = true;}
  if(navigator.userAgent.match('iPad')) {ret.iPad = true;}
  if(navigator.userAgent.match('Android')) {ret.Android = true;}

  return ret;
};
