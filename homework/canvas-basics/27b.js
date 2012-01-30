/*
 * Script for 0126 #27b
 *
 * A solid cube
 */

window.onload = 
(
  function()
  {
    //27b
    var canvas27b = document.getElementById('27b');
    var context27b = canvas27b.getContext('2d');
    
    var east = 450;
    var west = 0;
    var north = 0;
    var northBottom = north + (east - west) / (1.5 * 1.5);
    var south = north + (east - west) /1.5;
    var southBottom = south + (east - west) / (1.5 * 1.5);
    
    //draw top:
    context27b.beginPath();
    context27b.moveTo((east + west) / 2, north);
    context27b.lineTo(east, (south + north) / 2);
    context27b.lineTo((east + west) / 2, south);
    context27b.lineTo(west + 1, (south + north) / 2);
    context27b.closePath();
    context27b.fillStyle = "lightgray";
    context27b.fill();
    
    //draw left:
    context27b.beginPath();
    context27b.moveTo(west, (south + north) / 2);
    context27b.lineTo((east + west) / 2, south);
    context27b.lineTo((east + west) / 2, southBottom);
    context27b.lineTo(west - 1, (southBottom + northBottom) / 2);
    context27b.closePath();
    context27b.fillStyle = "gray";
    context27b.fill();
    
    //draw right:
    context27b.beginPath();
    context27b.moveTo(east, (south + north) / 2);
    context27b.lineTo((east + west) / 2, south);
    context27b.lineTo((east + west) / 2, southBottom);
    context27b.lineTo(east, (southBottom + northBottom) / 2);
    context27b.fillStyle = "darkgray";
    context27b.fill();
  }
);