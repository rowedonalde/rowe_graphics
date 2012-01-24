/*
 * Script for 0126 #25b
 */

window.onload = 
(
  function()
  {
    //25b
    var canvas25b = document.getElementById('25b');
    var context25b = canvas25b.getContext('2d');
    context25b.moveTo(0, 0);
    context25b.lineTo(200, 0);
    context25b.lineTo(200, 200);
    context25b.lineTo(0, 200);
    context25b.lineTo(0, 0);
    context25b.stroke();
  }
);