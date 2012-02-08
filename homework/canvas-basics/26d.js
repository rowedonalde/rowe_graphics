/*
 * Script for 0126 #26d
 *
 * Polka dots on a pink background
 */

window.onload = 
(
  function()
  {
    //26d
    var canvas26d = document.getElementById('26d');
    var context26d = canvas26d.getContext('2d');
    
    //Fill in the background:
    context26d.fillStyle = "brown";
    context26d.fillRect(0, 0, 500, 500);
  
    //Set up constants for polka dots:
    context26d.fillStyle = "pink";
    var radius = 25;
    var startAngle = 0;
    var endAngle = Math.PI * 2;
    var isClockwise = true;
    
    //Generate rows and columns of dots:
    for (y = radius; y <= 500 - radius; y += 4 * radius)
    {
			for (x = radius; x <= 500 - radius; x += 4 * radius)
			{
				context26d.beginPath();
				context26d.arc(x, y, radius, startAngle, endAngle, isClockwise);
				context26d.fill();
			}
    }
    
  }
);