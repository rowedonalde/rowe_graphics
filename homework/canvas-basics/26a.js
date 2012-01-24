/*
 * Script for 0126 #26a
 */

window.onload = 
(
  function()
  {
    //26a
    var canvas26a = document.getElementById('26a');
    var context26a = canvas26a.getContext('2d');
    context26a.fillStyle = "lavender";
    context26a.fillRect(0, 0, 200, 200);
    //draw vertical lines:
    for (x = 0; x <= 200; x += 10)
    {
      context26a.moveTo(x, 1);
      context26a.lineTo(x, 200);
    }
    //draw horizontal lines:
    for (y = 0; y <= 200; y += 10)
    {
      context26a.moveTo(1, y);
      context26a.lineTo(200, y);
    }
    context26a.strokeStyle = "white";
    context26a.stroke();
  }
);