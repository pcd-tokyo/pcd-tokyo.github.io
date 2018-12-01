'use strict';




/**
 * 値がnullかundefinedだったらfalseを返す。
 * そうでなければtrueを返す。
 * @param x 値
 * @return 値がnullかundefinedだったらfalse、さもなければtrue。
 * @exports utility/existy
 */
module.exports = function(x) {
  return x != null;
};