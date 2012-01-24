/*
 * Script for 0126 #25e
 */

window.onload = 
(
  function()
  {
    //25e
    var canvas25e = document.getElementById('25e');
    var context25e = canvas25e.getContext('2d');
    context25e.beginPath();
    context25e.moveTo(70, 0);
    context25e.lineTo(140, 0);
    context25e.lineTo(210, 70);
    context25e.lineTo(210, 140);
    context25e.lineTo(140, 210);
    context25e.lineTo(70, 210);
    context25e.lineTo(0, 140);
    context25e.lineTo(0, 70);
    context25e.closePath();
    context25e.fillStyle = "brown";
    context25e.fill();
  }
);