import $ from 'jquery';
import setUA from './util/setUaBodyClass';
import Util from './Util.js';
import AOS from 'aos';

import Map from './_map';
import P5Sketch from './P5Sketch'

// Application entry point
$(()=>{
  setUA();
  Map();
  AOS.init({
    once: true
  });
  let scrollTop = $(window).scrollTop();
  let windowH = $(window).innerHeight();

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

  // Toggle SP Workshop
  $('.timetable__openarea li').on('click', function(){
    $(this).toggleClass('is-open');
  });

  $(window).on('scroll', function(){
    scrollTop = $(window).scrollTop();

    if (scrollTop > windowH) {
      $('nav').addClass('is-active');
    } else {
      $('nav').removeClass('is-active');
    }
  })

  $(window).on('resize', function(){
    windowH = $(window).innerHeight();
  })

});
