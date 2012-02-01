/*
 * Script for 0126 #25d
 * An orange X joining opposite corners
 */

window.onload = 
(
  function()
  {
    //25d
    var canvas25d = document.getElementById('25d');
    var context25d = canvas25d.getContext('2d');
    context25d.moveTo(0, 0);
    context25d.lineTo(200, 200);
    context25d.moveTo(0, 200);
    context25d.lineTo(200, 0);
    context25d.strokeStyle = "orange";
    context25d.stroke();
  }
);