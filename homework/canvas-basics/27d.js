/*
 * Script for 0126 #27d
 *
 * A smiley face
 */

window.onload = 
(
  function()
  {
    //27d
    var canvas27d = document.getElementById('27d');
    var context27d = canvas27d.getContext('2d');
    var makeEye = function(context, fill)
    {
			context.beginPath();
			context.moveTo(0, 0);
			context.bezierCurveTo(-7, 10, -7, 50, 0, 60);
			context.bezierCurveTo(7, 50, 7, 10, 0, 0);
			context.fillStyle = fill;
			context.fill();
    };
    
    //Draw the circle that makes the face:
    context27d.beginPath();
    context27d.arc(250, 250, 200, 0, Math.PI * 2, false);
    context27d.fillStyle = "yellow";
    context27d.fill();
    
    //draw the eyes:
    context27d.save(); //original
    context27d.translate(200, 150);
    makeEye(context27d, 'black');
    
    context27d.translate(100, 0);
    makeEye(context27d, 'black');
    
    //Draw the mouth:
    context27d.restore(); //original
    context27d.save(); //original
    context27d.translate(250, 350);
    context27d.beginPath();
    context27d.moveTo(-100, -20);
    context27d.bezierCurveTo(-50, 30, 50, 30, 100, -20);
    context27d.strokeStyle = "black";
    context27d.lineCap = "round";
    context27d.lineWidth = 3;
    context27d.stroke();
    
    //Overlay highlights:
    context27d.restore(); //original
    var radGrad = context27d.createRadialGradient(120, 120, 10, 250, 250, 200);
    radGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    radGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    context27d.beginPath();
    context27d.arc(250, 250, 200, 0, Math.PI * 2, false);
    context27d.closePath();
    context27d.fillStyle = radGrad;
    context27d.fill();
  }
);