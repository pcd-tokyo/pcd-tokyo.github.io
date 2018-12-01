'use strict';
import $ from 'jquery';
import whichUserAgent from './whichUserAgent.js';
import whichMobile from'./whichMobile.js';



/**
 * ブラウザがIEだった場合、そのバージョンを示すクラスをbody要素に付与する。
 * また、モバイルだったらその端末種別を示すクラスもbody②付与する。
 */
module.exports = function() {
  var $body = $('body');

  var ua = whichUserAgent();
  if(ua.ie6) {$body.addClass('ua-ie6');}
  else if(ua.ie7) {$body.addClass('ua-ie');}
  else if(ua.ie8) {$body.addClass('ua-ie');}
  else if(ua.ie9) {$body.addClass('ua-ie');}
  else if(ua.ie10) {$body.addClass('ua-ie');}
  else if(ua.ie11) {$body.addClass('ua-ie');}
  else if(ua.chrome) {$body.addClass('ua-chrome');}
  else if(ua.firefox) {$body.addClass('ua-firefox');}
  else if(ua.safari) {$body.addClass('ua-safari');}

  var mobile = whichMobile();
  if(mobile.iPhone)   {$body.addClass('mobile-iPhone');}
  else if(mobile.iPod) {$body.addClass('mobile-iPod');}
  else if(mobile.iPad) {$body.addClass('mobile-iPad');}
  else if(mobile.Android) {$body.addClass('mobile-android');}
};
