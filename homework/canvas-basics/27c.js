/*
 * Script for 0126 #27c
 *
 * A baseball, a tennis ball, and a golfball
 */

window.onload = 
(
  function()
  {
    //27c
    var canvas27c = document.getElementById('27c');
    var context27c = canvas27c.getContext('2d');
    
    var r = 100;
    
    //draw the baseball:
    context27c.beginPath();
    context27c.arc(200, 200, r, 0, 2 * Math.PI, true);
    context27c.closePath();
    var radGrad = context27c.createRadialGradient(150, 150, 20, 200, 200, r);
    radGrad.addColorStop(0, 'white');
    radGrad.addColorStop(0.2, 'rgb(250, 250, 220)');
    radGrad.addColorStop(1, 'rgb(220, 220, 200)');
    
    context27c.fillStyle = radGrad;
    context27c.fill();
    
    //draw its stitches:
    context27c.save(); //original
    context27c.translate(40, 200);
    context27c.rotate(60 * Math.PI / 180);
    context27c.beginPath();
    for (i = 0; i < 70 * Math.PI / 180; i += 10 * Math.PI / 180)
    {
      context27c.moveTo(0, -100);
      context27c.lineTo(0, -105);
      context27c.strokeStyle = "red";
      context27c.stroke();
      context27c.rotate(10 * Math.PI / 180);
    }
    context27c.restore(); //original
    context27c.save(); //original
    context27c.translate(360, 200);
    context27c.rotate(240 * Math.PI / 180);
    for (i = 0; i < 70 * Math.PI / 180; i += 10 * Math.PI / 180)
    {
      context27c.moveTo(0, -100);
      context27c.lineTo(0, -105);
      context27c.strokeStyle = "red";
      context27c.stroke();
      context27c.rotate(10 * Math.PI / 180);
    }
    context27c.restore(); //original
    
    //draw the tennis ball:
    context27c.beginPath();
    context27c.arc(200, 500, r, 0, 2 * Math.PI, true);
    var radGrad = context27c.createRadialGradient(150, 450, 20, 200, 500, r);
    radGrad.addColorStop(0, '#FAF5B6');
    radGrad.addColorStop(0.2, '#FFF01C');
    radGrad.addColorStop(1, 'yellow');
    
    context27c.fillStyle = radGrad;
    context27c.fill();
    
    //draw its stitches:
    context27c.beginPath();
    context27c.strokeStyle = "white";
    context27c.lineWidth = 6;
    context27c.arc(40, 500, 100, -38 * Math.PI / 180, 38* Math.PI/ 180, false);
    context27c.stroke();
    context27c.beginPath();
    context27c.arc(360, 500, 100, 142 * Math.PI / 180, 218 * Math.PI / 180, false);
    context27c.stroke();
    
    //Draw the Golf Ball:
    context27c.beginPath();
    context27c.arc(200, 800, r, 0, 2 * Math.PI, true);
    context27c.closePath();
    var radGrad = context27c.createRadialGradient(150, 750, 20, 200, 800, r);
    radGrad.addColorStop(0, 'white');
    radGrad.addColorStop(0.2, 'rgb(250, 250, 220)');
    radGrad.addColorStop(1, 'rgb(220, 220, 200)');
    
    context27c.fillStyle = radGrad;
    context27c.fill();
    
    //Draw its dimples:
    context27c.translate(200, 800)
    context27c.fillStyle = "rgb(200, 200, 180)";
    //draw the center dimple layer:
    var dimpleR = 5;
    for (x = -r + dimpleR + 1; x <= r - dimpleR - 1; x += 2 * dimpleR + 1)
    {
      context27c.beginPath();
      context27c.arc(x, 0, dimpleR, 0, Math.PI * 2, true);
      context27c.fill();
    }
    
    //draw layers of dots:
    //context27c.save();
    for (y = 2 * dimpleR + 1; y <= r - dimpleR - 1; y += 2 * dimpleR + 1)
    {
			var chordLen =  Math.sqrt(r*r - y*y);
			//via http://www.ehow.com/how_5142025_calculate-chord-length.html
			
			for (x = -chordLen + dimpleR + 1; x <= chordLen - dimpleR - 1; x += 2 * dimpleR + 1)
			{
				context27c.beginPath();
				context27c.arc(x, y, dimpleR, 0, Math.PI * 2, true);
				context27c.fill();
				
				context27c.beginPath();
				context27c.arc(x, -y, dimpleR, 0, Math.PI * 2, true);
				context27c.fill();
			}
    }
  }
);