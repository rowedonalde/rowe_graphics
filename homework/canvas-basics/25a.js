/*
 * Script for 0126 #25a
 *
 * Blue square
 */

window.onload = 
(
  function()
  {
    //25a
    var canvas25a = document.getElementById('canv25a');
    var context25a = canvas25a.getContext('2d');
    context25a.fillStyle = "rgb(0, 0, 255)";
    context25a.translate(100, 100);
    context25a.fillRect(-25, -25, 50, 50);
  }
);