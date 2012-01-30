/*
 * Script for 0126 #28c
 *
 * A solid cube and sphere with shadows
 */

window.onload = 
(
  function()
  {
    //28c
    var canvas28c = document.getElementById('28c');
    var context28c = canvas28c.getContext('2d');
    
    context28c.translate(300, 0);
    
    var east = 450;
    var west = 0;
    var north = 0;
    var northBottom = north + (east - west) / (1.5 * 1.5);
    var south = north + (east - west) /1.5;
    var southBottom = south + (east - west) / (1.5 * 1.5);
    
    //draw top:
    context28c.beginPath();
    context28c.moveTo((east + west) / 2, north);
    context28c.lineTo(east, (south + north) / 2);
    context28c.lineTo((east + west) / 2, south);
    context28c.lineTo(west + 1, (south + north) / 2);
    context28c.closePath();
    context28c.fillStyle = "lightgray";
    context28c.fill();
    
    //draw left:
    context28c.beginPath();
    context28c.moveTo(west, (south + north) / 2);
    context28c.lineTo((east + west) / 2, south);
    context28c.lineTo((east + west) / 2, southBottom);
    context28c.lineTo(west - 1, (southBottom + northBottom) / 2);
    context28c.closePath();
    context28c.fillStyle = "gray";
    context28c.fill();
    
    //draw right:
    context28c.beginPath();
    context28c.moveTo(east, (south + north) / 2);
    context28c.lineTo((east + west) / 2, south);
    context28c.lineTo((east + west) / 2, southBottom);
    context28c.lineTo(east, (southBottom + northBottom) / 2);
    context28c.fillStyle = "darkgray";
    context28c.fill();
    
    //draw the cube's shadow:
    context28c.save() //(300, 0)
    context28c.beginPath();
    context28c.moveTo((east + west) / 2, southBottom);
    context28c.lineTo(west, 1.5 * southBottom - northBottom / 2);
    context28c.translate(- (east + west) / 2 + west, -southBottom + (southBottom + northBottom) / 2);
    context28c.lineTo(west, 1.5 * southBottom - northBottom / 2);
    context28c.restore(); //(300, 0);
    context28c.lineTo(west, (southBottom + northBottom) / 2);
    context28c.closePath()
    context28c.fillStyle = "rgba(0, 0, 0, 0.65)";
    context28c.fill();
    
    //position for the sphere:
    context28c.translate(1000, 0);
    context28c.save();
    
    //draw the sphere's shadow:
    context28c.translate(250, 250 + 200);
    context28c.rotate(215 * Math.PI / 180);
    context28c.beginPath();
    context28c.arc(0, -200, 200, 0, Math.PI * 2, false);
    context28c.fillStyle = "rgba(0, 0, 0, 0.65)";
    context28c.fill();
    
    //draw the sphere:
    context28c.restore();
    context28c.beginPath();
    context28c.arc(250, 250, 200, 0, 2 * Math.PI, false);
    var radGrad = context28c.createRadialGradient(250, 250, 200, 400, 100, 10);
    radGrad.addColorStop(0, 'darkred');
    radGrad.addColorStop(.9, 'red');
    radGrad.addColorStop(1, 'white');
    context28c.fillStyle = radGrad;
    context28c.fill();
  }
);