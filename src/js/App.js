import $ from 'jquery';
import setUA from './util/setUaBodyClass';
import Util from './Util.js';

import Map from './_map';
import P5Sketch from './P5Sketch'

// Application entry point
$(()=>{
  setUA();
  Map();

  $("a[href^='#']").on('click', function () {
    var speed = 500,
      href = $(this).attr("href"),
      target = $(href == "#" || href == "" ? 'html' : href),
      position = target.offset().top;
    $("html, body").animate({scrollTop: position - 40}, speed, "swing");
    return false;
  });

  //
  window.p5 = P5Sketch();
});
