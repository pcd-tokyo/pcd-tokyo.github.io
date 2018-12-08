/**
 * Created by Akihiro-Kato on 2016/06/19.
 */
'use strict';

module.exports = function(){
  google.maps.event.addDomListener(window, 'load', init);

  function init() {
    var mapOptions = {
      zoom: 18,
      scrollwheel: false,
      disableDoubleClickZoom: false,
      draggable: false,
      center: new google.maps.LatLng(35.654161, 139.705584),
      styles: [
        {
          "stylers": [
            { "hue": "#79abcc" },
            { "lightness": 10 },
            { "saturation": 60 }
          ]
        }
      ]
    };
    var mapElement = document.getElementById('gmap');
    var map = new google.maps.Map(mapElement, mapOptions);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(35.654161, 139.705584),
      map: map,
      title: 'Circus Tokyo'
    });
  }
};
