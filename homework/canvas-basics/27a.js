/*
 * Script for 0126 #27a
 *
 * A wireframe cube in the bottom right corner
 */

window.onload = 
(
  function()
  {
    //27a
    var canvas27a = document.getElementById('27a');
    var context27a = canvas27a.getContext('2d');
    
    var east = 450;
    var west = 350;
    var north = 300;
    var northBottom = north + (east - west) / (1.5 * 1.5);
    var south = north + (east - west) /1.5;
    var southBottom = south + (east - west) / (1.5 * 1.5);
    
    context27a.strokeStyle = "green";
    
    //draw top:
    context27a.beginPath();
    context27a.moveTo((east + west) / 2, north);
    context27a.lineTo(east, (south + north) / 2);
    context27a.lineTo((east + west) / 2, south);
    context27a.lineTo(west, (south + north) / 2);
    context27a.closePath();
    context27a.stroke();
    
    //draw bottom:
    context27a.beginPath();
    context27a.moveTo((east + west) / 2, northBottom);
    context27a.lineTo(east, (southBottom + northBottom) / 2);
    context27a.lineTo((east + west) / 2, southBottom);
    context27a.lineTo(west, (southBottom + northBottom) / 2);
    context27a.closePath();
    context27a.stroke();
    
    //draw sides:
    context27a.moveTo((east + west) / 2, north);
    context27a.lineTo((east + west) / 2, northBottom);
    context27a.moveTo(east, (south + north) / 2);
    context27a.lineTo(east, (southBottom + northBottom) / 2);
    context27a.moveTo((east + west) / 2, south);
    context27a.lineTo((east + west) / 2, southBottom);
    context27a.moveTo(west, (south + north) / 2);
    context27a.lineTo(west, (southBottom + northBottom) / 2);
    context27a.stroke();
  }
);