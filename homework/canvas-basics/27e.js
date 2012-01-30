/*
 * Script for 0126 #27e
 *
 * A ringed planet
 */

window.onload = 
(
  function()
  {
    //27d
    var canvas27e = document.getElementById('27e');
    var context27e = canvas27e.getContext('2d');
    
    //Draw space:
    context27e.fillStyle = "black";
    context27e.fillRect(0, 0, 500, 500);
    
    //Draw stars:
    for (i = 0; i < 100; i++)
    {
			context27e.beginPath();
			var x = Math.random() * 500;
			var y = Math.random() * 500;
			context27e.moveTo(x, y);
			context27e.lineTo(x, y + 1);
			context27e.strokeStyle = "white";
			context27e.stroke();
    }
    
    //Draw the background half of the ring:
    context27e.save(); //original
    context27e.translate(250, 250);
    context27e.scale(2, 0.5);
    context27e.beginPath();
    context27e.arc(0, -20, 100, 180 * Math.PI / 180, 0, false);
    context27e.lineWidth = 20;
    context27e.strokeStyle = "white";
    context27e.stroke();
    
    //Draw the planet:
    context27e.restore(); //original
    context27e.save(); //original
    context27e.translate(250, 250);
    context27e.beginPath();
    context27e.arc(0, 0, 100, 0, 2 * Math.PI, false);
    context27e.fillStyle = "orange";
    context27e.fill();
    
    var linGrad = context27e.createLinearGradient(-100, 0, 100, 0);
    linGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    linGrad.addColorStop(1, 'rgba(0, 0, 0, 1)');
    context27e.fillStyle = linGrad;
    context27e.fill();
    
    //Draw the foreground half of the ring:
    context27e.restore(); //original
    context27e.translate(250, 250);
    context27e.scale(2, 0.5);
    context27e.beginPath();
    context27e.arc(0, -20, 100, 180 * Math.PI / 180, 0, true);
    context27e.lineWidth = 20;
    context27e.strokeStyle = "white";
    context27e.stroke();
  }
);