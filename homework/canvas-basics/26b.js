/*
 * Script for 0126 #26b
 */

window.onload = 
(
  function()
  {
    //26b
    var canvas26b = document.getElementById('26b');
    var context26b = canvas26b.getContext('2d');
    //draw vertical lines:
    for (x = 0; x <= 200; x += 10)
    {
      context26b.moveTo(x, 1);
      context26b.lineTo(x, 200);
    }
    //draw horizontal lines:
    for (y = 0; y <= 200; y += 10)
    {
      context26b.moveTo(1, y);
      context26b.lineTo(200, y);
    }
    context26b.strokeStyle = "lightgreen";
    context26b.stroke();
  }
);