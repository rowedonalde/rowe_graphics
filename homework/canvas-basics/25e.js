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
    var edge = 100;
    context25e.translate(edge, 0);
    context25e.beginPath();
    context25e.moveTo(0, 0);
    
    for (i = 0; i < 5; i++)
    {
      context25e.lineTo(edge, 0);
      context25e.translate(edge, 0);
      context25e.rotate(Math.PI / 3);
    }
    
    context25e.closePath();
    context25e.fillStyle = "brown";
    context25e.fill();
    context25e.stroke();
  }
);