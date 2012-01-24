/*
 * Script for 0126 #25c
 */

window.onload = 
(
  function()
  {
    //25c
    var canvas25c = document.getElementById('25c');
    var context25c = canvas25c.getContext('2d');
    context25c.fillStyle = "rgba(255, 0, 0, 0.5)";
    context25c.fillRect(75, 50, 75, 50);
    context25c.fillStyle = "rgba(0, 255, 0, 0.5)";
    context25c.fillRect(100, 75, 75, 50);
  }
);